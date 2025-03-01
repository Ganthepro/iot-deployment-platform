FROM node:22-alpine AS base

RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm run build

FROM base AS deploy
RUN apk add --update curl && rm -rf /var/cache/apk/*

WORKDIR /app
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json ./package.json

USER node

EXPOSE 8080
CMD ["pnpm", "preview"]
