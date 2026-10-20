# Submission checklist

This checklist records the repository requirements that can be verified before submission. It does not replace the program review or Kahveh's confirmation.

## Repository requirements

- [x] **Personal ownership:** the project owner has confirmed that SWERRV is personally owned, not owned by a company, client, employer, or university.
- [x] **Public repository:** the project is published at [fariethedev/swerrv-clothingbrand-website](https://github.com/fariethedev/swerrv-clothingbrand-website).
- [x] **Root README:** the README explains the purpose, audience, technology, local setup, data boundary, and the fact that this is the read-only rescope of the earlier production implementation.
- [x] **Root license:** the repository contains an MIT license in `LICENSE`.
- [x] **Real history:** the existing development sequence and commit messages were retained. History was rewritten only to remove exposed credentials; commits were not squashed or replaced with a new project history.
- [x] **Credential revocation — owner confirmed:** Farai reports rotating the credentials and confirms that all previously exposed credentials have been revoked, covering Stripe, Google OAuth, database passwords, JWT signing secrets, and Resend. This records the owner's confirmation; provider-side revocation was not independently verified by the coding assistant.
- [x] **Known-secret history cleanup and follow-up scan:** known credentials were redacted from history. The follow-up pattern scan covered the then-published `main` history (77 commits and 471 text file versions) and identified no additional secrets. This is a bounded scan result, not a guarantee that every possible secret is absent; GitHub push protection is not a complete audit.
- [ ] **Personal data and asset permissions:** personal photography, original brand ownership, and identifiable-person publication/session-sharing permissions are owner-confirmed. The five Picsart files have been removed from current distribution. Permissions for their historical copies, other relevant historical third-party assets, and metadata review remain open; see `ASSET_REVIEW.md` for the evidence and outstanding checks. The overall check is incomplete.
- [ ] **Intended scope and deployment:** disclose the local garment studio, text editing, SVG export, and existing catalogue to reviewers; review hosting logs and external requests, and obtain the program's scope decision. Mock data alone does not establish eligibility.
- [ ] **Commit attribution:** confirm the commit email is linked to the owner's GitHub account.
- [x] **Planned work:** `ROADMAP.md` separates implemented studio features from 28 hours of remaining development for the local garment design tool.
- [x] **Verification:** the active frontend passes `npm run build` and `npm run lint`.

## Final external confirmation

- [ ] **Program eligibility confirmed:** Kahveh/program reviewers must confirm that this scope is accepted. Repository changes cannot tick this box on their behalf.

## Security follow-up

The owner has confirmed revocation of all previously exposed credentials. No credential values or private provider records are recorded here. The pre-redaction history backup still contains the original values and must not be submitted or shared. Any newly discovered exposed credentials require separate revocation and cleanup.
