FROM node:20-alpine AS deps
RUN npm install -g pnpm@latest
WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./
RUN apk add --no-cache python3 make g++ && \
    pnpm install --frozen-lockfile && \
    apk del python3 make g++

FROM node:20-alpine AS builder
RUN npm install -g pnpm@latest
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG COMMIT_HASH=unknown
ENV COMMIT_HASH=${COMMIT_HASH}
RUN pnpm build && pnpm prune --prod

FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 && \
    mkdir -p /app/data && chown nodejs:nodejs /app/data

COPY --from=builder --chown=nodejs:nodejs /app/build ./build
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

USER nodejs
EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "build"]
