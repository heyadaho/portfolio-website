# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 🔒 Password protection

The whole site sits behind a shared password, enforced by [`middleware.ts`](middleware.ts)
at the repo root (Vercel Routing Middleware). Vercel runs it before any file is
served, so no page, image or asset reaches the browser without a valid session
cookie.

Two environment variables are required (Vercel → Settings → Environment Variables,
all environments):

| Variable | Value |
| :------- | :---- |
| `SITE_PASSWORD` | The password you share with whoever gets to see the site |
| `SITE_AUTH_SECRET` | A long random string used to sign the session cookie (`openssl rand -hex 32`) |

If either is missing the site fails closed and serves a "not configured" notice.

Signing in sets an `el_access` cookie that lasts 30 days. Changing `SITE_PASSWORD`
locks out anyone who hasn't signed in yet; changing `SITE_AUTH_SECRET` signs
everyone out immediately.

The gate does not run under `astro dev`, since Vercel middleware only runs on Vercel.
To exercise it locally, put both variables in `.env` and run `npx vercel dev`.
