## Description

Test task. This repo contains frontend for backend in another repo: "grants-apply-be"

## Getting Started

Install yarn if necessary

```
npm install --global yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Before deployment

Make sure you have your `.env` file composed correctly. Example for local setup:

```
NEXT_PUBLIC_BACKEND_URL="http://localhost:4002"
```

## Deployment/containerization

```bash
yarn container:app
```