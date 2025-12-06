## TypeScript Express API

### Quickstart

Prerequisites:
- Node.js 18+ and pnpm

Create environment file:
```bash
cp .env.example .env
```

Install dependencies:
```bash
pnpm install
pnpm postinstall
```

Run in development:
```bash
pnpm dev
```

Build and run:
```bash
pnpm build
pnpm start
```

Run tests:
```bash
pnpm test
```

Lint and format:
```bash
pnpm lint
pnpm format
```

### MongoDB via Docker
- Configure environment (optional overrides in `.env`):
	- `MONGO_PORT` (default 27017)
	- `MONGO_INITDB_ROOT_USERNAME` (default root)
	- `MONGO_INITDB_ROOT_PASSWORD` (default password)
- Start MongoDB:
```bash
docker compose up -d mongo
docker compose ps
```
- Connect from app with `MONGO_URI` (example):
```
mongodb://root:password@localhost:27017/ir_db?authSource=admin
```

### API
- GET `/health` → `{ "status": "ok" }`

### Environment
- `PORT` (default `3000`)
