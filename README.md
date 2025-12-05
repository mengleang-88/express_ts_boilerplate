## TypeScript Express API

### Quickstart

Prerequisites:
- Node.js 18+ and pnpm

Install dependencies:
```bash
pnpm install
```

Create environment file:
```bash
cp .env.example .env
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

### API
- GET `/health` → `{ "status": "ok" }`

### Environment
- `PORT` (default `3000`)
