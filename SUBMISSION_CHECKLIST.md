# Submission checklist

This checklist records the repository requirements that can be verified before submission. It does not replace the program review or Kahveh's confirmation.

## Repository requirements

- [x] **Personal ownership:** the project owner has confirmed that SWERRV is personally owned, not owned by a company, client, employer, or university.
- [x] **Public repository:** the project is published at [fariethedev/swerrv-clothingbrand-website](https://github.com/fariethedev/swerrv-clothingbrand-website).
- [x] **Root README:** the README explains the purpose, audience, technology, local setup, data boundary, and the fact that this is the read-only rescope of the earlier production implementation.
- [x] **Root license:** the repository contains an MIT license in `LICENSE`.
- [x] **Real history:** the existing development sequence and commit messages were retained. History was rewritten only to remove exposed credentials; commits were not squashed or replaced with a new project history.
- [ ] **Secrets and credential rotation:** known credentials were redacted from history. Confirm revocation/rotation of Stripe, Google OAuth, database, JWT, and Resend credentials, and complete a scan of all submitted refs. GitHub push protection is not a complete audit.
- [ ] **Personal data and asset permissions:** descriptions are fictional, but photographs, metadata, and historical files still require review. Record publication rights and any identifiable people in `ASSET_REVIEW.md`.
- [ ] **Intended scope and deployment:** disclose the local garment studio, text editing, SVG export, and existing catalogue to reviewers; review hosting logs and external requests, and obtain the program's scope decision. Mock data alone does not establish eligibility.
- [ ] **Commit attribution:** confirm the commit email is linked to the owner's GitHub account.
- [x] **Planned work:** `ROADMAP.md` separates implemented studio features from 28 hours of remaining development for the local garment design tool.
- [x] **Verification:** the active frontend passes `npm run build` and `npm run lint`.

## Final external confirmation

- [ ] **Program eligibility confirmed:** Kahveh/program reviewers must confirm that this scope is accepted. Repository changes cannot tick this box on their behalf.

## Security follow-up

Any credentials that were ever exposed in the old history must still be revoked or rotated with their providers. Redacting Git history does not invalidate a credential. The pre-redaction history backup is local-only and must not be submitted or shared.
