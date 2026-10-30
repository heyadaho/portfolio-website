// Vercel Routing Middleware (formerly Edge Middleware). Gates the whole site
// behind a shared password.
// Runs before any static file is served, so nothing reaches the browser
// until a valid session cookie is present.
//
// Required environment variables (Vercel → Settings → Environment Variables):
//   SITE_PASSWORD     the password shared with whoever gets to see the site
//   SITE_AUTH_SECRET  a long random string used to sign the session cookie
//
// Both are required. If either is missing the site fails closed.

import { next } from '@vercel/functions';

import { loginPage, noticePage } from './src/auth/login-page';

export const config = {
  // Everything except Vercel's own endpoints and the favicon, which the
  // login page itself needs.
  matcher: ['/((?!_vercel|favicon\\.svg|favicon\\.ico).*)'],
};

// Supplied by the edge runtime; declared here so the project needs no Node types.
declare const process: { env: Record<string, string | undefined> };

const COOKIE_NAME = 'el_access';
const SESSION_DAYS = 30;

export default async function middleware(request: Request): Promise<Response> {
  const password = process.env.SITE_PASSWORD;
  const secret = process.env.SITE_AUTH_SECRET;

  if (!password || !secret) {
    return htmlResponse(
      noticePage(
        'Not configured',
        'This site is password protected, but SITE_PASSWORD and SITE_AUTH_SECRET have not been set.',
      ),
      503,
    );
  }

  // next() hands the request on to the static site.
  if (await hasValidSession(request, secret)) return next();

  if (request.method === 'POST') {
    const submitted = await readPassword(request);

    if (submitted !== null && constantTimeEqual(submitted, password)) {
      const url = new URL(request.url);
      return new Response(null, {
        status: 303,
        headers: {
          Location: url.pathname + url.search,
          'Set-Cookie': await sessionCookie(secret),
          'Cache-Control': 'no-store',
        },
      });
    }

    return htmlResponse(loginPage({ error: true }), 401);
  }

  return htmlResponse(loginPage({ error: false }), 401);
}

function htmlResponse(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

async function readPassword(request: Request): Promise<string | null> {
  try {
    const form = await request.formData();
    const value = form.get('password');
    return typeof value === 'string' ? value : null;
  } catch {
    return null;
  }
}

/* ── Session cookie ─────────────────────────────────────────────
   Value is `<expiry>.<signature>`, signed with HMAC-SHA256 so it
   cannot be forged without the secret.
─────────────────────────────────────────────────────────────── */

async function sessionCookie(secret: string): Promise<string> {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const expiry = Math.floor(Date.now() / 1000) + maxAge;
  const value = `${expiry}.${await sign(String(expiry), secret)}`;

  return [
    `${COOKIE_NAME}=${value}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ].join('; ');
}

async function hasValidSession(request: Request, secret: string): Promise<boolean> {
  const cookie = readCookie(request.headers.get('cookie'), COOKIE_NAME);
  if (!cookie) return false;

  const separator = cookie.indexOf('.');
  if (separator === -1) return false;

  const expiry = cookie.slice(0, separator);
  const signature = cookie.slice(separator + 1);

  if (!/^\d+$/.test(expiry)) return false;
  if (Number(expiry) <= Math.floor(Date.now() / 1000)) return false;

  return constantTimeEqual(signature, await sign(expiry, secret));
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;

  for (const part of header.split(';')) {
    const separator = part.indexOf('=');
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim();
    }
  }

  return null;
}

async function sign(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function constantTimeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bytesA = encoder.encode(a);
  const bytesB = encoder.encode(b);

  // Compare every byte regardless of length so timing leaks neither the
  // password nor its length.
  let mismatch = bytesA.length ^ bytesB.length;
  const length = Math.max(bytesA.length, bytesB.length);

  for (let i = 0; i < length; i++) {
    mismatch |= (bytesA[i] ?? 0) ^ (bytesB[i] ?? 0);
  }

  return mismatch === 0;
}
