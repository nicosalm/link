# link

Yet another url shortener, but this time themed around Link from Legend of Zelda!!

### Deploy guide

To pull the latest image:

Create `docker-compose.yml`:
```yaml
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
```

Create `.env`:
```
AUTH_PASSWORD=your_password
ORIGIN=https://yourdomain.com
```

(Optional) Set a different port:
```
PORT=8080
```

Then run:
```bash
docker compose up -d
```

Database initializes on first request. Data persists in `./data/prod.db`.


Update with:
```bash
docker compose pull && docker compose up -d
```