# Active project scope

The current branch contains a local garment design studio and a read-only visual catalogue. The studio supports local editing and explicit SVG downloads; the optional backend remains read-only. There are no commerce workflows.

## Included

- In-memory garment editing with original vector templates, built-in graphics, text, colours, front/back layers, undo/redo, and SVG mockup export.
- No server-side storage of designs; refreshing clears the studio.

- A responsive React/Vite interface.
- Fictional catalogue entries and local image assets.
- Client-side category filtering.
- An in-memory image preview modal.
- An optional Node.js mock API serving the same fictional records through read-only GET routes.
- About and scope documentation.

## Explicitly excluded

- Accounts, login, registration, profiles, or password reset.
- User-linked messages, reviews, wishlists, carts, orders, or addresses.
- Checkout, Stripe, shipping, refunds, or any payment processing.
- Contact forms, newsletter subscriptions, or email delivery.
- Databases, Supabase, server-side persistence, analytics, and uploads. The optional mock API is in-memory and read-only.
- Real customer, buyer, subscriber, or donor information.

The repository has a genuine prior commit history from the earlier implementation. The current branch records a deliberate product change: the active application is now a non-transactional visual study with an optional fictional-data mock API. Eligibility remains subject to program review, ownership confirmation, and a complete Git-history credential audit.
