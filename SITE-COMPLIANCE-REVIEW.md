# Automintly Website Compliance Review

Review date: September 14, 2026

Scope: public marketing pages listed in `sitemap.xml`. This is an engineering and content-risk review, not legal advice or a guarantee against claims.

## Implemented

- Added public Privacy, Website Terms, Cookie, Refund and Cancellation, and Accessibility pages.
- Added a required, plain-language consent acknowledgment to the public inquiry form.
- Limited the written-health-check form to name, work email, response preference, three short workflow questions, and consent. Company, business website, interest, and conditional project type remain optional. The public form still collects no phone number.
- Added field length limits and a warning not to submit passwords, payment information, health information, government identifiers, or other sensitive personal data.
- Removed `novalidate`; native validation and keyboard-operable controls now remain available.
- Added a skip link, consistent visible keyboard focus, legal footer links, reduced-motion handling, and responsive policy layouts.
- Removed Google Fonts requests from public pages. Active public media is served locally.
- Confirmed optional analytics are disabled. Added an affirmative-consent gate so GA4 or Plausible cannot load merely because tracking is later enabled.
- Added Global Privacy Control and Do Not Track handling for optional analytics.
- Confirmed there are no third-party iframes or embedded advertising scripts on the public pages.
- Confirmed there are no published customer reviews, star ratings, or attributed testimonials on the public pages.
- Qualified or removed absolute claims about results, uptime credits, lock-in, reporting, exports, call coverage, and performance pricing.
- Added automated checks for policy coverage, form consent, external embeds, image alternatives, tracking consent, wording, and critical color contrast.

## Current data map

| Data or request | Purpose | Provider or recipient | Required? |
| --- | --- | --- | --- |
| Name, work email, response preference, current inquiry or task channels, response process, and outcome-tracking method | Respond to and scope the requested written health check | Automintly; Netlify form processing; email provider | Yes for the form |
| Company, business website, interest, and conditional project type | Add optional business context | Same as above | No |
| IP, browser, request and security logs | Deliver and protect the site | Cloudflare, Render, and possibly Netlify for form processing | Operational |
| Appointment details after following the booking link | Schedule the selected appointment | Google Calendar under Google's terms | User choice |
| Optional analytics | Aggregate site measurement | None currently; configured provider only after consent | Disabled |

## Legal and operational risks that still need an owner decision

1. **Legal business identity and address — blocker before paid checkout or scaled commercial email.** The verified public details are the Automintly brand, `automintly.com`, `automintly@gmail.com`, and service area of the United States. The legal entity name, state of formation, physical mailing address, and business phone were not provided and must not be invented. Add the exact registered entity and a valid business mailing address to customer contracts, invoices, commercial-email footers, and any online checkout.
2. **Attorney review — blocker before relying on these documents as final legal terms.** A California/United States launch was assumed from the available project context. Counsel should review the actual entity, principal place of business, states/countries served, service agreements, limitation of liability, data-processing terms, and sector requirements.
3. **CCPA applicability — review at least annually and before data practices expand.** The business's revenue, California consumer volume, and sale/share facts were not available. If Automintly becomes subject to the CCPA, implement the required notices, request procedures, verification records, and any applicable opt-out mechanisms.
4. **Recurring billing — blocker before enabling a live subscription checkout.** Before accepting an automatically renewing California consumer subscription, show renewal terms before consent, capture affirmative consent separately, provide the required acknowledgment, retain consent records, and support an easy online cancellation method. The current public site does not complete a purchase.
5. **Government contracting — legal review required before quoting or collecting a percentage.** FAR 52.203-5 restricts contingent fees for federal contracts except for bona fide employees or established commercial or selling agencies. Do not promise, quote, or collect a percentage-based government-contract fee until procurement counsel confirms a lawful structure and approves the written agreement.
6. **Health and medical clients — BAA and workflow review required before PHI.** Do not receive protected health information through the public form. Sign an appropriate business-associate agreement and approve vendors, access controls, retention, and incident procedures before any workflow processes PHI.
7. **Calls, texts, email, recordings, and AI disclosures — workflow-specific review required.** Telemarketing, automated texts/calls, call recording, email marketing, and chatbot use can trigger federal and state consent, disclosure, suppression-list, identification, and recordkeeping rules. Obtain written client instructions and legal review before activation.
8. **Accessibility is ongoing.** The site aims for WCAG 2.2 AA but is not certified. Repeat automated and manual keyboard, screen-reader, zoom, mobile, and contrast testing after material content or layout changes.
9. **Image and media rights — evidence blocker.** No third-party hotlinked images were found, but the repository does not prove ownership or licensing of every local media asset. Preserve source/generator records, prompts, license terms at creation, invoices, model/property releases, and permission for client-provided content. See `MEDIA-RIGHTS-REGISTER.md`.
10. **Claims need evidence.** Do not add customer results, savings, revenue, reviews, uptime commitments, response guarantees, “best” claims, rankings, or security/compliance claims without dated source evidence and written approval. Clearly label illustrations and estimates.

## Official references reviewed

- California Online Privacy Protection Act, Business and Professions Code section 22575: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22575.
- California Attorney General, CCPA: https://oag.ca.gov/privacy/ccpa
- California Automatic Renewal Law, Business and Professions Code section 17602: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17602.
- U.S. Department of Justice, Guidance on Web Accessibility and the ADA: https://www.ada.gov/resources/web-guidance/
- W3C, Web Content Accessibility Guidelines 2.2: https://www.w3.org/TR/WCAG22/
- Federal Trade Commission, final rule on fake reviews and testimonials: https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
- Federal Acquisition Regulation 52.203-5, Covenant Against Contingent Fees: https://www.acquisition.gov/far/52.203-5
- U.S. Department of Health and Human Services, HIPAA business associates: https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html

## Release checklist

- Run `npm test`.
- Review every changed public page at desktop and phone widths.
- Confirm the public form reaches the intended inbox without sending sensitive test data.
- Confirm the production host serves the new policy pages and no unexpected analytics, pixels, or embeds load.
- Obtain the legal identity/address and counsel decisions above before paid checkout or scaled outreach.
