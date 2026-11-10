# ---- build ----
FROM node:24-alpine AS build
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Install first so the dependency layer caches independently of source edits.
# postinstall runs `prisma generate`, so the schema and config must exist before npm ci.
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci

# NEXT_PUBLIC_* values are inlined at build time (read by src/components/marketing/site-data.ts).
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY . .
RUN npm run build

# ---- runtime ----
FROM node:24-alpine AS final
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0 \
    AUTH_TRUST_HOST=true

# Full node_modules is kept: the prisma CLI (migrate deploy) and the generated client are needed at runtime.
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/src/generated ./src/generated
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --from=build --chown=node:node /app/prisma.config.ts /app/package.json /app/next.config.ts ./

USER node
EXPOSE 8080

# Apply pending migrations on every boot so a fresh Railway Postgres is ready before
# the app serves traffic, then start Next. Railway assigns $PORT at runtime; fall back to 8080.
CMD ["sh", "-c", "npx prisma migrate deploy && exec npx next start -p ${PORT:-8080}"]
