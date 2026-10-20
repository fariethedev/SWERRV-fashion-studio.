# SWERRV mock API

This is an optional local Node.js mock backend for the SWERRV visual catalogue. It serves fictional catalogue records only. It has no database, authentication, accounts, forms, payments, messaging, uploads, analytics, or write routes.

## Run it

```bash
cd mock-api
npm run dev
```

The API listens on `http://localhost:8787` by default. Set `PORT` to use another local port.

Open the visual application at `http://localhost:5173/lookbook` after starting the frontend in a second terminal. Opening an API endpoint directly displays JSON, which is the data format consumed by the app. The frontend now requests this API by default through its development proxy, including search, category, and sort parameters. The garment studio edits designs locally; these routes serve the catalogue only.

## Read-only routes

- `GET /health`
- `GET /api/looks`
- `GET /api/looks/:id`
- `GET /api/looks?category=Studio&q=texture&sort=newest`

The API is deliberately in-memory. Restarting it restores the same fictional sample catalogue, and it never accepts or stores visitor data.
