# 20-day development plan

This is the planned next 20 development days for SWERRV. Each day is a focused working session; estimates are working hours, not calendar promises. The plan adds depth to the read-only visual catalogue and its local fictional-data mock API without introducing accounts, personal-data processing, payments, messaging, or persistence.

## Days 1–5 — Product foundation

- [ ] **Day 1 — Scope and content model (3h):** document the catalogue schema, editorial vocabulary, and rules for fictional-only entries.
- [ ] **Day 2 — API contract (3h):** define response shapes, query parameters, error responses, and read-only route expectations.
- [ ] **Day 3 — Mock API hardening (3h):** add route validation, consistent headers, safe error handling, and a small health contract.
- [ ] **Day 4 — Frontend data adapter (3h):** isolate API loading, static fallback, loading states, and source-status messaging.
- [ ] **Day 5 — URL state and navigation (3h):** refine shareable filters, sorting, presentation mode, and route-level empty states.

## Days 6–10 — Catalogue experience

- [ ] **Day 6 — Grid/list presentation (2h):** refine both catalogue layouts and preserve the chosen view across navigation.
- [ ] **Day 7 — Keyboard navigation (3h):** add visible focus states, predictable tab order, and keyboard-first menu behavior.
- [ ] **Day 8 — Modal accessibility (3h):** add focus return, focus containment, Escape behavior, and screen-reader labels.
- [ ] **Day 9 — Image resilience (2h):** add missing-image, loading, and reduced-motion states using local assets only.
- [ ] **Day 10 — Responsive art direction (3h):** improve image crops, captions, spacing, and breakpoints for small screens.

## Days 11–15 — Editorial depth and quality

- [ ] **Day 11 — Field notes expansion (2h):** add more static editorial notes and a clear content-provenance convention.
- [ ] **Day 12 — Component structure (3h):** split catalogue cards, controls, modal details, and notes into maintainable components.
- [ ] **Day 13 — Accessibility review (3h):** run a manual contrast, semantics, reduced-motion, and keyboard review.
- [ ] **Day 14 — Frontend tests (4h):** test filtering, sorting, URL state, empty results, and modal close behavior.
- [ ] **Day 15 — API tests (3h):** test health, list, detail, query, 404, and method-rejection responses.

## Days 16–20 — Release readiness

- [ ] **Day 16 — Performance pass (3h):** review image sizes, lazy loading, bundle output, and perceived loading behavior.
- [ ] **Day 17 — Continuous integration (3h):** add install, lint, build, mock API syntax, and secret-scan checks.
- [ ] **Day 18 — Asset and license review (2h):** document local image provenance and confirm fictional content boundaries.
- [ ] **Day 19 — Documentation release pass (2h):** update setup instructions, API examples, scope notes, and a changelog entry.
- [ ] **Day 20 — Submission rehearsal (3h):** run the complete build, security, history, privacy, and public-repository checklist.

Total planned work: **56 hours across 20 development days**.

The non-transactional scope remains fixed: no accounts, personal-data collection, payments, messaging, uploads, analytics, or server-side persistence.
