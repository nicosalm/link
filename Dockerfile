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

RUN mkdir -p /app/data

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000

ARG COMMIT_HASH=unknown
ENV NODE_ENV=production
ENV COMMIT_HASH=${COMMIT_HASH}

CMD ["node", "build"]
