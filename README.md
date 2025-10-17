# link

Yet another url shortener, but this time themed around Link from Legend of Zelda!!

### Deploy (Local)

```bash
git clone https://github.com/nicosalm/link.git
cd link
cp .env.example .env  # set AUTH_PASSWORD, and optionally PORT/ORIGIN
docker compose up -d
```

Database initializes on first request. Data persists in `./data/prod.db`.

For HTTPS, configure a reverse proxy (Caddy, Nginx, etc).

### Deploy (Pull from GHCR)

```bash
docker pull ghcr.io/nicosalm/link:latest
docker compose up -d
```

Update:
```bash
docker compose pull && docker compose up -d
```
