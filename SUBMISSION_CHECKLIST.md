# Submission checklist

This checklist records the repository requirements that can be verified before submission. It does not replace the program review or Kahveh's confirmation.

## Repository requirements

- [x] **Personal ownership:** the project owner has confirmed that SWERRV is personally owned, not owned by a company, client, employer, or university.
- [x] **Public repository:** the project is published at [fariethedev/swerrv-clothingbrand-website](https://github.com/fariethedev/swerrv-clothingbrand-website).
- [x] **Root README:** the README explains the purpose, audience, technology, local setup, data boundary, and the fact that this is the read-only rescope of the earlier production implementation.
- [x] **Root license:** the repository contains an MIT license in `LICENSE`.
- [x] **Real history:** the existing development sequence and commit messages were retained. History was rewritten only to remove exposed credentials; commits were not squashed or replaced with a new project history.
- [x] **No active secrets:** the active tree contains no credentials or environment files. The rewritten history was scanned and the resulting force push was accepted by GitHub push protection.
- [x] **No real personal or customer data:** the active catalogue uses fictional sample descriptions and static assets only. It has no accounts, forms, messaging, checkout, uploads, or persistent visitor data.
- [x] **Non-personal-data scope:** the active application is a read-only visual catalogue and does not process other people's personal data.
- [x] **Planned work:** `ROADMAP.md` documents 56 hours across 20 future development days, with every item limited to the read-only catalogue and fictional-data mock API scope.
- [x] **Verification:** the active frontend passes `npm run build` and `npm run lint`.

## Final external confirmation

- [ ] **Program eligibility confirmed:** Kahveh/program reviewers must confirm that this scope is accepted. Repository changes cannot tick this box on their behalf.

## Security follow-up

Any credentials that were ever exposed in the old history must still be revoked or rotated with their providers. Redacting Git history does not invalidate a credential. The pre-redaction history backup is local-only and must not be submitted or shared.
