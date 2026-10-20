# SWERRV Garment Studio

SWERRV includes a local garment design workspace at `/` and `/studio`. Choose a T-shirt, hoodie, or sweatshirt; change fabric colour; switch front/back; add text and built-in vector graphics; drag, resize, rotate, reorder, and delete layers; undo/redo; and export an SVG mockup. Templates and graphic primitives are authored in source code, with no image dependencies for the studio.

Designs remain in memory and are lost on refresh. Export each side separately to retain a visual mockup. Artwork outside the dashed print area is clipped. Exports are illustrations, not dimensioned production print files. This version has no 3D rendering or uploaded-image editor.

Run `npm run test:studio` inside `swerrvfrontend` for history and state tests. The [roadmap](ROADMAP.md) separates implemented features from **28 hours of remaining development**.

## Existing catalogue

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

During development, the lookbook requests `/api/looks` through Vite, which forwards to the Node API on port 8787. Search, category, and sorting changes issue new API requests. Run both servers; no environment file is needed. If the API is unavailable, the catalogue uses bundled records and labels the result as a static fallback. The garment studio is a browser-based editor and does not depend on this catalogue API.

For production hosting, route `/api` to the Node service or set `VITE_MOCK_API_URL` before building. Vite's development proxy is not included in a static deployment.

The build and lint commands cover the active catalogue entry points.

## Data and privacy

All catalogue descriptions are fictional sample content. The application has no account, contact-submission, or write API workflows. Search and view settings appear in the URL and may remain in browser history or hosting request logs; avoid entering personal information. The optional mock API serves catalogue records and does not implement request logging or a database. Hosting infrastructure must be reviewed separately.

Fonts use local fallbacks without Google Fonts requests. Image rights, identifiable people, and image metadata remain subject to the review described in [ASSET_REVIEW.md](ASSET_REVIEW.md). Fictional descriptions do not establish that photographs are fictional.

The current implementation is a catalogue with a read-only mock API. This documentation does not certify future intended use or program eligibility. If commerce or customer-data functionality remains part of the intended project, disclose that to reviewers; a mock or review-only version does not resolve the program restriction.

See [SCOPE.md](SCOPE.md) for the explicit boundary of the active project, [ROADMAP.md](ROADMAP.md) for the planned development work, and [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) for the repository-readiness checklist.
