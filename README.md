# Synergy Hub — ARICHI GLOBAL SYNERGY LTD

Corporate website for **ARICHI GLOBAL SYNERGY LTD** — IT consultancy, real estate, educational support, and agro-services.

Stack: **TanStack Start** (React 19 + TanStack Router), **Vite 8**, **Tailwind CSS v4**, **Nitro**, **TypeScript (strict)**.

## Quick start

Requires Node.js `>=20.19.0` ([nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone <this-repository-url>
cd synergy-hub
npm ci            # or npm install
cp .env.example .env   # set VITE_SITE_URL
npm run dev       # http://localhost:8080
```

## Scripts

| Script                 | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run dev`          | Vite dev server with HMR (port 8080)                               |
| `npm run build`        | Production SSR build → `.output/` (Nitro `node-server`)            |
| `npm run start`        | Run production server (`node .output/server/index.mjs`, port 3000) |
| `npm run preview`      | Vite preview (static preview, not SSR)                             |
| `npm run typecheck`    | `tsc --noEmit` strict check                                        |
| `npm run lint`         | ESLint                                                             |
| `npm run lint:ci`      | ESLint with `--max-warnings=0` (CI)                                |
| `npm run format`       | Prettier write                                                     |
| `npm run format:check` | Prettier check                                                     |

## Environment

Copy `.env.example` → `.env`:

```
VITE_SITE_URL=https://arichiglobalsynergy.com
NITRO_PRESET=node-server   # optional: vercel, cloudflare-module, netlify, aws-lambda
PORT=3000
HOST=0.0.0.0
```

`VITE_SITE_URL` is baked into the client bundle at build time for canonical URLs, OG tags, sitemap, and JSON-LD. Change via build arg in Docker: `docker build --build-arg VITE_SITE_URL=https://your-domain`.

Contact form server function (`src/lib/contactFn.ts`) logs submissions via `console.log` JSON. Replace with your email provider (Resend / SendGrid / SES) in production.

## Production build

```sh
npm run build
npm run start   # serves SSR on 0.0.0.0:3000
# health check
curl http://localhost:3000/health
# sitemap
curl http://localhost:3000/sitemap.xml
```

Security headers are set via `vite.config.ts` → `nitro.routeRules` (HSTS-ready, `x-frame-options: DENY`, `x-content-type-options: nosniff`, `referrer-policy`, `permissions-policy`). Static assets have `cache-control: immutable` (1 year).

## Docker

```sh
docker build -t synergy-hub --build-arg VITE_SITE_URL=https://arichiglobalsynergy.com .
docker run -p 3000:3000 -e VITE_SITE_URL=https://arichiglobalsynergy.com synergy-hub
curl http://localhost:3000/health
```

Healthcheck is built in (`wget http://127.0.0.1:3000/health`).

## Deploy

### Azure Container Apps (recommended for this stack)

```sh
az containerapp up --name synergy-hub --source . --env-vars VITE_SITE_URL=https://arichiglobalsynergy.com
# or build and push image to ACR, then deploy
```

Env: `NITRO_PRESET=node-server` (default), `PORT=3000`.

### Vercel

Set `NITRO_PRESET=vercel` before build, or `vercel --prod`.

### Cloudflare Workers / Pages

Set `NITRO_PRESET=cloudflare-module`, add `wrangler.json`, `npm run build` produces `dist/` with `wrangler` output.

### Node / VM / VPS

`npm run build && npm run start` behind a reverse proxy (Caddy/Nginx). Ensure `HOST=0.0.0.0 PORT=3000`.

## SEO & observability

- `src/lib/site.ts` — single `siteConfig` for URL, name, description, contact.
- `src/routes/__root.tsx` — OG, Twitter, canonical, JSON-LD Organization, `theme-color`, `robots`.
- `public/sitemap.xml` static + dynamic `/sitemap.xml` via `src/server.ts` (uses request host or `VITE_SITE_URL`).
- `public/robots.txt` with `Sitemap: /sitemap.xml`.
- Per-route `head()` uses `absoluteUrl()` for canonical/og:url.
- Health endpoint: `GET /health` and `GET /api/health` → `{ status: "ok", timestamp }`.
- Error handling: `src/lib/error-capture.ts` wraps `console.error` to preserve stacks; `src/server.ts` normalizes h3 swallowed errors; `src/lib/error-page.ts` renders safe 500 HTML (no stack leak).
- Contact: Zod validation, honeypot (`website` field), rate limit (5/hour, 1/15s per IP), CSRF protected via `createCsrfMiddleware` in `src/start.ts`.

## Security

- CSRF middleware for server functions (`src/start.ts`).
- Honeypot + rate limit on `/contact` (`src/lib/contactFn.ts`).
- Nitro routeRules headers; add `strict-transport-security` in reverse proxy or Nitro if terminating TLS at app.
- No secrets in repo; use `.env` and platform env vars.

## Project structure

```
src/
  components/   # site-header, site-footer, ui/*
  routes/       # __root.tsx, index.tsx, services.tsx, about.tsx, contact.tsx
  lib/          # site.ts, contact.ts, contactFn.ts, utils.ts, error-*
  server.ts     # Nitro entry, health/sitemap hooks, error normalization
  start.ts      # TanStack Start instance with error + CSRF middleware
public/
  favicon.svg, favicon.ico, robots.txt, sitemap.xml
vite.config.ts  # tailwind, tsconfig-paths, tanstackStart, nitro, viteReact
```

## License

Private — ARICHI GLOBAL SYNERGY LTD.
