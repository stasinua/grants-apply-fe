## Description

Test task. This repo contains frontend for backend in another repo: "grants-apply-be"

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Before deployment

Make sure you have your `.env` file composed correctly. Example for local setup:

```
NEXT_PUBLIC_BACKEND_URL="http://localhost:4002"
```

## Deployment/containerization

```bash
docker build -t grants-apply-fe .
```