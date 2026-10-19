# SWERRV Visual Catalogue

SWERRV is a read-only fashion lookbook and visual catalogue. It presents fictional editorial studies focused on silhouette, texture, colour, and composition. Visitors can browse the index, filter the lookbook, and open an in-memory image preview.

This repository is personally owned and is the rescope of an earlier SWERRV clothing-commerce implementation. The active version is intentionally a frontend-only catalogue: it does not create accounts, collect contact details, accept payments, submit forms, send messages, use cookies for profiles, call a backend, or persist visitor data. The earlier implementation remains visible in Git history as development context; it is not part of the active running scope.

## Who it serves

The project is for anyone exploring a small editorial fashion archive on the web: viewers, designers, and developers interested in a focused React interface with no account or transaction workflow.

## Technology

- React 19
- Vite 7
- React Router
- CSS with a small responsive editorial design system
- Static image assets served from `swerrvfrontend/public/images`

There is no active backend, database, authentication provider, payment provider, analytics integration, upload system, or external API.

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

The build and lint commands only cover the active catalogue entry points. No environment file is required.

## Data and privacy

All catalogue descriptions are fictional sample content. The app has no forms or write operations and stores only temporary UI state in the browser while a visitor is viewing a lookbook preview. Do not add real customer, subscriber, buyer, or user data to this repository.

See [SCOPE.md](SCOPE.md) for the explicit boundary of the active project and [ROADMAP.md](ROADMAP.md) for the planned development work.
