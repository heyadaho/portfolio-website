// Markup for the password gate. Self-contained: the middleware serves this
// before any of the site's own CSS or JS is reachable, so everything the
// page needs is inline.

const STYLES = `
  :root {
    --c-base:          #0B140E;
    --c-surface:       #131D16;
    --c-ink:           #F0EDE8;
    --c-ink-mid:       rgba(240, 237, 232, 0.50);
    --c-accent:        #C4A882;
    --c-accent-dim:    rgba(196, 168, 130, 0.28);
    --c-border:        rgba(240, 237, 232, 0.09);
    --c-border-strong: rgba(240, 237, 232, 0.18);
    --c-error:         #D98A7B;
  }

  :root[data-theme="light"] {
    --c-base:          #F5F3EF;
    --c-surface:       #ECEAE5;
    --c-ink:           #1A1A1A;
    --c-ink-mid:       #5C5C5C;
    --c-accent:        #B8936A;
    --c-accent-dim:    rgba(184, 147, 106, 0.22);
    --c-border:        rgba(26, 26, 26, 0.09);
    --c-border-strong: rgba(26, 26, 26, 0.18);
    --c-error:         #A5503D;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

  body {
    min-height: 100svh;
    display: grid;
    place-items: center;
    padding: 2rem 1.5rem;
    background-color: var(--c-base);
    color: var(--c-ink);
    font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.7;
  }

  main {
    width: 100%;
    max-width: 26rem;
    animation: rise 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes rise {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    main { animation: none; }
  }

  .label {
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--c-ink-mid);
  }

  h1 {
    margin: 1.25rem 0 0.5rem;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2.5rem;
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.022em;
  }

  p.intro {
    color: var(--c-ink-mid);
    margin-bottom: 2.5rem;
  }

  form { display: flex; flex-direction: column; gap: 0.75rem; }

  label[for="password"] {
    font-size: 0.82rem;
    color: var(--c-ink-mid);
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    background-color: var(--c-surface);
    border: 1px solid var(--c-border-strong);
    border-radius: 2px;
    color: var(--c-ink);
    font: inherit;
    letter-spacing: 0.08em;
    transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  input:focus {
    outline: none;
    border-color: var(--c-accent);
    box-shadow: 0 0 0 3px var(--c-accent-dim);
  }

  button {
    margin-top: 0.5rem;
    padding: 0.85rem 1rem;
    background-color: var(--c-accent);
    border: none;
    border-radius: 2px;
    color: #0B140E;
    font: inherit;
    font-weight: 500;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  button:hover { opacity: 0.88; }

  button:focus-visible {
    outline: 2px solid var(--c-ink);
    outline-offset: 2px;
  }

  .error {
    color: var(--c-error);
    font-size: 0.82rem;
  }

  footer {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--c-border);
    font-size: 0.82rem;
    color: var(--c-ink-mid);
  }

  footer a { color: var(--c-accent); text-decoration: none; }
  footer a:hover { text-decoration: underline; }
`;

const THEME_SCRIPT = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      if (stored) document.documentElement.setAttribute('data-theme', stored);
    } catch (e) {}
  })();
`;

function shell(title: string, body: string): string {
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:wght@400&display=swap" />
<title>${title}</title>
<script>${THEME_SCRIPT}</script>
<style>${STYLES}</style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>`;
}

export function loginPage({ error }: { error: boolean }): string {
  return shell(
    'Ed Lake — Private',
    `<p class="label">Private</p>
<h1>Ed Lake</h1>
<p class="intro">This portfolio is shared by invitation. Enter the password to continue.</p>
<form method="POST">
  <label for="password">Password</label>
  <input
    type="password"
    id="password"
    name="password"
    autocomplete="current-password"
    autofocus
    required
    aria-describedby="${error ? 'password-error' : ''}"
  />
  ${error ? '<p class="error" id="password-error" role="alert">That password is not right. Try again.</p>' : ''}
  <button type="submit">Enter</button>
</form>
<footer>
  Don't have the password? Email <a href="mailto:heyadaho@gmail.com">heyadaho@gmail.com</a>.
</footer>`,
  );
}

export function noticePage(title: string, message: string): string {
  return shell(
    `Ed Lake — ${title}`,
    `<p class="label">${title}</p>
<h1>Ed Lake</h1>
<p class="intro">${message}</p>`,
  );
}
