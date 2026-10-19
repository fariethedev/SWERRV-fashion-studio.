# SWERRV Visual Catalogue

SWERRV is a read-only fashion lookbook and visual catalogue. It presents fictional editorial studies focused on silhouette, texture, colour, and composition. Visitors can browse the index, search and filter the lookbook, sort the archive, and open an in-memory image preview with study metadata.

This repository is personally owned and is the rescope of an earlier SWERRV clothing-commerce implementation. The active version is intentionally a read-only catalogue: it does not create accounts, collect contact details, accept payments, submit forms, send messages, use cookies for profiles, or persist visitor data. An optional local mock API serves fictional catalogue records over GET requests only. The earlier implementation remains visible in Git history as development context; it is not part of the active running scope.

## Who it serves

The project is for anyone exploring a small editorial fashion archive on the web: viewers, designers, and developers interested in a focused React interface with no account or transaction workflow.

## Technology

- React 19
- Vite 7
- React Router
- CSS with a small responsive editorial design system
- Static image assets served from `swerrvfrontend/public/images`
- Node.js built-in HTTP server for the optional read-only mock API

The repository includes an optional local Node.js mock API. It has no database, authentication provider, payment provider, analytics integration, upload system, or external service dependency.

## Run locally

```bash
cd swerrvfrontend
npm ci
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

No environment file is required for the static fallback. To run the optional mock API in another terminal:

```bash
cd mock-api
npm run dev
```

Copy `swerrvfrontend/.env.example` to `swerrvfrontend/.env` and restart Vite if you want the frontend to read from `http://localhost:8787`; if the API is unavailable, it falls back to the bundled fictional catalogue.

The build and lint commands cover the active catalogue entry points.

## Data and privacy

All catalogue descriptions are fictional sample content. The app has no forms or write operations and stores only temporary UI state in the browser while a visitor is viewing a lookbook preview. Do not add real customer, subscriber, buyer, or user data to this repository.

See [SCOPE.md](SCOPE.md) for the explicit boundary of the active project, [ROADMAP.md](ROADMAP.md) for the planned development work, and [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) for the repository-readiness checklist.
