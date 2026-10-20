# Garment Studio development plan

The next phase turns the garment editor into a tech-pack preparation tool for independent clothing-brand owners. Owners will download a specification document and send it to their manufacturer outside the app. Tech-pack generation is not implemented yet.

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
| Planned | Versioned local project save/load for designs and specifications | 4 | Round-trip artwork and specifications; reject malformed or oversized JSON |
| Planned | Size chart and garment measurement editor | 5 | Named measurement points, size columns, cm/in units, and tolerances; reject invalid values |
| Planned | Materials and construction specification | 4 | Capture fabric composition, weight, trims, colour references, seams, and construction notes |
| Planned | Annotated front/back technical views | 4 | Explicit artwork dimensions and placement offsets appear in both preview and export; distinguish actual units from screen coordinates |
| Planned | Multi-page tech-pack preview and PDF export | 5 | Export garment views, size charts, materials, and notes with readable pagination; check long tables and text |
| Planned | Completeness checks and document revisions | 3 | Flag missing specifications and clipped artwork; include style code, revision number, and revision date |
| Planned | Workflow tests and documentation | 3 | Test specification validation, save/load, and export; document a complete fictional sample pack and manufacturer-review step |

Total remaining planned work: **28 hours**. Estimates cover work genuinely intended for the design tool; they are not a guarantee of program selection.

## Scope

Garment Studio edits original vector garment concepts locally. Planned tech packs describe garments, not individual people: no customer records, person-linked body measurements, manufacturer contact directory, or email sending is planned. Owners share downloaded packs themselves. Packs require manufacturer review before production; the editor does not certify manufacturability.

There are no customer accounts, checkout, remote artwork uploads, analytics, or server-side design storage. Planned save/load uses local project files. Text is rendered as text, not executed as markup. Avoid entering personal information.

The existing lookbook and optional fictional catalogue API remain available. Photographs in the legacy catalogue still require the asset review in ASSET_REVIEW.md. Credential rotation, historical review, and program approval remain outstanding as recorded in SUBMISSION_CHECKLIST.md.
