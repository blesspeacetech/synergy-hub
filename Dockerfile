# syntax=docker/dockerfile:1.7

# --- builder ---
FROM node:22-alpine AS builder
WORKDIR /app

# Enable corepack for bun compatibility if needed, but use npm
COPY package.json bun.lock* package-lock.json* ./
RUN npm ci --ignore-scripts --no-audit --no-fund || npm install --ignore-scripts --no-audit --no-fund

COPY . .
# Build args for site URL (baked into client bundle at build time)
ARG VITE_SITE_URL=https://arichiglobalsynergy.com
ENV VITE_SITE_URL=$VITE_SITE_URL
RUN npm run build

# --- runner ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Only production deps + built output
COPY package.json bun.lock* package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund || npm install --omit=dev --ignore-scripts --no-audit --no-fund

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", ".output/server/index.mjs"]
