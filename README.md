link
====

link is a small, self-hosted URL shortener with a modest Legend of
Zelda theme. It is a SvelteKit application backed by SQLite (via
better-sqlite3 and Drizzle) and packaged as a single Docker image, so
a typical deploy is a compose file, an env file, and a volume for the
database.

A prebuilt image is published at `ghcr.io/nicosalm/link:latest`. A
minimal `docker-compose.yml` exposes port 3000 and mounts a data
directory for the SQLite file:

    services:
      app:
        image: ghcr.io/nicosalm/link:latest
        ports:
          - "${PORT:-3000}:3000"
        environment:
          - DATABASE_URL=/app/data/prod.db
          - AUTH_PASSWORD=${AUTH_PASSWORD}
          - ORIGIN=${ORIGIN}
        volumes:
          - ./data:/app/data
        restart: unless-stopped

Alongside it, a `.env` file sets the admin password and the public
origin:

    AUTH_PASSWORD=your_password
    ORIGIN=https://yourdomain.com

`PORT` is optional and defaults to 3000. Run `docker compose up -d` to
start the service; the database is initialized on the first request
and persists under `./data/prod.db`. To update to the latest image,
run `docker compose pull && docker compose up -d`.

The management UI is gated by the configured password. Once signed
in, you can create short codes (optionally with a vanity slug and an
expiry date), toggle them active or inactive, and delete them.
Visiting `/{code}` on the configured origin issues a 301 to the stored
URL when the code is active, and 404s otherwise.

For local development, copy `.env.example` to `.env`, then run
`pnpm install` and `pnpm dev`. The dev server listens on port 8532
and uses a local SQLite file (`local.db` by default). Drizzle
migrations are managed with `pnpm db:push` and `pnpm db:generate`;
`pnpm check` runs svelte-check and `pnpm test` runs the Vitest suite.
