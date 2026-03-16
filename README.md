# Lieu

> Discover the spots only locals know about.

Lieu is a community-driven tourist discovery platform that helps tourists find hidden gems and authentic local favorites — curated by locals, not algorithms. Skip the tourist traps and explore secret cafes, hidden viewpoints, neighborhood restaurants, and more across cities in the Philippines.

---

## Monorepo Structure

```
Lieu/
├── backend/     # NestJS REST API
├── web/         # React web app (Vite + TanStack Router)
├── mobile/      # Mobile app (planned)
└── shared/      # Shared utilities (planned)
```

## Tech Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Backend  | NestJS 11, TypeScript                           |
| Frontend | React 19, Vite 7, TanStack Router, Tailwind CSS |
| Mobile   | React Native                                    |

## Getting Started

### Prerequisites

- Node.js 20+
- npm or compatible package manager

### Backend

```bash
cd backend
npm install
npm run start:dev
```

The API server runs at `http://localhost:3000`.

### Web

```bash
cd web
npm install
npm run dev
```

The web app runs at `http://localhost:5173`.

## Features

- **Explore map** — Interactive map with pinned local spots across cities
- **Local spotlights** — Hand-picked gems submitted by community members
- **City browsing** — Discover spots across Davao, Baguio, Iloilo, Vigan, and more
- **Light / Dark / Auto theme** — Persistent theme preference via localStorage
- **Gem submission** — (Planned) Let locals submit their favorite hidden spots

## Development

### Backend tests

```bash
cd backend
npm run test        # unit tests
npm run test:e2e    # end-to-end tests
```

### Web tests

```bash
cd web
npm run test
```

### Linting

```bash
cd backend && npm run lint
cd web && npm run lint
```
