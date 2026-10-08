# Testimonial section — October 8, 2026

Objective: compact customer-review display near the homepage bottom, with an Add your testimonial button underneath.

Released: commit 56d750d on automintly/automintly-website main. Production homepage and testimonials.js returned HTTP 200 and contained the new feature. Live browser verified button expansion, name-field focus, required publication consent, and private-email labeling. Proof: ../../outputs/Testimonials_Live_2026-10-08.png in the local Automintly workspace.

Files: index.html, testimonials.css, testimonials.js, testimonials.test.js; package.json includes the new tests. Compliance test permits the requested collection section while still rejecting fabricated review cards/ratings. Two stale navigation assertions were updated to the existing Dashboard dropdown; actual navigation was not changed.

Tests: test-first run failed for missing submission support. Final npm test: 45 passed, zero failed. Preview showed no horizontal overflow at the observed narrow 459px viewport. A requested 390px override did not establish an actual 390px viewport, so that width is not claimed tested.

Submissions: uses the existing registered health-check Netlify form, labeled TESTIMONIAL FOR REVIEW in its message field. A synthetic QA-only submission returned HTTP 200 with a thank-you response. Provider storage, email notification delivery and spam classification were not independently verified. Cross-origin browser responses are opaque; feedback explicitly states receipt is unconfirmed and retains entered text. Direct-email fallback provided. No testimonials are automatically published and no real review was invented.

Publishing real reviews: inspect private submissions, confirm genuine service experience and publication permission, agree attribution, then manually add up to three approved quotes to the review-list area. Never include email or sensitive customer information. Consent covers publication of submitted name/business and testimonial; do not silently rewrite claims or create ratings. Remove the empty-state paragraph when approved quotes exist. Source/source permission should remain in private business records, not the public repository.

Preservation: worked from a fresh sparse clone of production HEAD 421e7b5; unrelated dirty publish-repo changes were untouched. No new paid service or automatic public-submission endpoint was introduced.

Next action: confirm the QA entry and notification in the existing Netlify Forms inbox, then publish only genuine approved testimonials. Receipt remains the only unverified operational check.
