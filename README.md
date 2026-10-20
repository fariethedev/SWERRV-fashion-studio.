# SWERRV Garment Studio

SWERRV is a garment editor for independent clothing-brand owners who want to turn design ideas into clear specifications for their manufacturers. The next development phase is a tech-pack builder: owners will combine garment views, measurements, materials, colour references, artwork placement, and construction notes into a downloadable document they can send to a manufacturer themselves.

**Tech-pack creation and PDF export are planned, not implemented yet.** The current application supports the visual design workflow described below.

SWERRV includes a local garment design workspace at `/` and `/studio`. Choose a T-shirt, hoodie, or sweatshirt; change fabric colour; switch front/back; add text and built-in vector graphics; drag, resize, rotate, reorder, and delete layers; undo/redo; and export an SVG mockup. Templates and graphic primitives are authored in source code, with no image dependencies for the studio.

Designs remain in memory and are lost on refresh. Export each side separately to retain a visual mockup. Artwork outside the dashed print area is clipped. Exports are illustrations, not dimensioned production print files. This version has no 3D rendering or uploaded-image editor.

Run `npm run test:studio` inside `swerrvfrontend` for history and state tests. The [roadmap](ROADMAP.md) separates implemented features from **28 hours of remaining development**.

## Existing catalogue

SWERRV also includes a read-only fashion lookbook and visual catalogue. It presents fictional editorial studies focused on silhouette, texture, colour, and composition. Visitors can browse the index, search and filter the lookbook, sort the archive, and open an in-memory image preview with study metadata.

This repository is personally owned and is the rescope of an earlier SWERRV clothing-commerce implementation. The active application combines a local garment editor with a read-only catalogue. It has no customer accounts, contact collection, checkout, or messaging. An optional local mock API serves fictional catalogue records over GET requests only. The earlier implementation remains visible in Git history as development context; it is not part of the active running scope.

## Who it serves

The primary audience is independent clothing-brand owners and garment designers preparing designs for manufacturing. The planned workflow is to edit a garment, specify how it should be made, check the specification, and download a tech pack for sharing outside the app.

## Planned work — 28 hours

- [ ] Local design and specification save/load with validation — **4h**.
- [ ] Size charts, garment measurements, units, and tolerances — **5h**.
- [ ] Fabric composition, weight, trims, colours, and construction notes — **4h**.
- [ ] Front/back technical views with artwork dimensions and placement annotations — **4h**.
- [ ] Multi-page tech-pack preview and PDF export — **5h**.
- [ ] Completeness checks and document revision tracking — **3h**.
- [ ] Workflow tests, export checks, and setup documentation — **3h**.

These are future tasks, separate from the existing editor. See [ROADMAP.md](ROADMAP.md) for completion criteria. Tech packs will use garment specifications, not customer records, body measurements linked to people, or manufacturer contact details. Sending the downloaded file is outside the app; no email integration is planned. Specifications will require review with the manufacturer before production.

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

The build and lint commands cover the garment studio and catalogue.

## Data and privacy

All catalogue descriptions are fictional sample content. The application has no account, contact-submission, or write API workflows. Search and view settings appear in the URL and may remain in browser history or hosting request logs; avoid entering personal information. The optional mock API serves catalogue records and does not implement request logging or a database. Hosting infrastructure must be reviewed separately.

Fonts use local fallbacks without Google Fonts requests. Image rights, identifiable people, and image metadata remain subject to the review described in [ASSET_REVIEW.md](ASSET_REVIEW.md). Fictional descriptions do not establish that photographs are fictional.

The current implementation is a local garment editor and catalogue with a read-only mock API; tech-pack creation is the planned next phase. This documentation does not certify program eligibility. Disclose this intended scope to reviewers.

See [SCOPE.md](SCOPE.md) for the explicit boundary of the active project, [ROADMAP.md](ROADMAP.md) for the planned development work, and [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) for the repository-readiness checklist.
