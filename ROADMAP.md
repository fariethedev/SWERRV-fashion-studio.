# Garment Studio development plan

## Implemented baseline

- [x] T-shirt, hoodie, and sweatshirt vector templates with fabric colours.
- [x] Independent front/back artwork layers.
- [x] Built-in text, circle, rectangle, star, and lightning graphics.
- [x] Pointer dragging, position sliders, size, rotation, ink colour, and layer ordering.
- [x] Undo/redo and layer deletion.
- [x] SVG mockup export with editor guides removed.

These features are implemented work, not future hours. The studio uses in-memory state: refreshing clears a design. Exports are illustrative, not production print specifications.

## Next development phase — 28 hours

All items below are future estimates, not completed sessions. Schedule program sessions only after explicit project approval.

| Status | Work | Hours | Completion evidence |
| --- | --- | ---: | --- |
| Planned | Versioned project JSON save/load with strict validation and size limits | 4 | Round-trip designs; reject malformed files with clear errors |
| Planned | Snapping, alignment guides, and centre/distribute tools | 4 | Consistent placement across resized previews and both sides |
| Planned | Accurate text bounds and printable-area overflow warnings | 3 | Rotated text and shapes report clipping correctly |
| Planned | Grouped editing transactions and keyboard shortcuts | 3 | One slider gesture equals one undo; shortcuts respect text fields |
| Planned | PNG export with resolution options | 3 | Correct dimensions and artwork on front/back exports |
| Planned | Sleeve views and reusable original graphic presets | 4 | Independent sleeve artwork and documented original assets |
| Planned | Browser interaction and accessibility tests | 4 | Drag, touch, keyboard, undo, and export scenarios exercised |
| Planned | Performance, documentation, and release checks | 3 | Layer-limit stress test, setup verification, and scope review |

Total remaining planned work: **28 hours**. Estimates cover work genuinely intended for the design tool; they are not a guarantee of program selection.

## Scope

Garment Studio edits original vector garment concepts locally. It has no customer accounts, checkout, contact collection, remote artwork uploads, analytics, or server-side design storage. Text is rendered as text, not executed as markup. Avoid entering personal information. Any future file import must be reviewed for its data scope.

The existing lookbook and optional fictional catalogue API remain available. Photographs in the legacy catalogue still require the asset review in ASSET_REVIEW.md. Credential rotation, historical review, and program approval remain outstanding as recorded in SUBMISSION_CHECKLIST.md.
