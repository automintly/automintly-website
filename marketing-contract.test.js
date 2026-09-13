'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const builder = fs.readFileSync(path.join(root, 'builder.js'), 'utf8');
const builderHtml = fs.readFileSync(path.join(root, 'build-your-automation.html'), 'utf8');
const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const contractingHtml = fs.readFileSync(path.join(root, 'contracting.html'), 'utf8');
const trustCleanupHtml = fs.readFileSync(path.join(root, 'website-trust-cleanup.html'), 'utf8');
const trustCheckHtml = fs.readFileSync(path.join(root, 'website-trust-check.html'), 'utf8');
const revenuePathWatchHtml = fs.readFileSync(path.join(root, 'revenue-path-watch.html'), 'utf8');
const trackingConfig = fs.readFileSync(path.join(root, 'conversion-tracking-config.js'), 'utf8');
const trackingScript = fs.readFileSync(path.join(root, 'conversion-tracking.js'), 'utf8');
const sitemapXml = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const charcoalTheme = fs.readFileSync(path.join(root, 'charcoal-theme.css'), 'utf8');

function arrayConstant(name) {
  const match = builder.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n  \\]);`));
  assert.ok(match, `${name} must remain a readable array constant`);
  return vm.runInNewContext(match[1], Object.create(null));
}

function offerCard(title) {
  const heading = `<h3>${title}</h3>`;
  const position = homepage.indexOf(heading);
  assert.notEqual(position, -1, `${title} offer is missing`);
  const start = homepage.lastIndexOf('<article class="money-system-card">', position);
  const end = homepage.indexOf('</article>', position);
  assert.ok(start >= 0 && end > position, `${title} offer card is malformed`);
  return homepage.slice(start, end + '</article>'.length);
}

const products = arrayConstant('products');
const bundles = arrayConstant('outcomeBundles');

test('marketing catalog keeps 30 paid products plus one included Contracting add-on', () => {
  assert.equal(products.length, 31);
  assert.equal(new Set(products.map(product => product.id)).size, products.length);
  assert.ok(products.every(product => Number.isSafeInteger(product.price) && product.price >= 0));
  assert.ok(products.every(product => Number.isSafeInteger(product.points) && product.points >= 0));
  assert.deepEqual(
    Object.fromEntries(products.filter(product => ['spend-guard', 'old-lead-reactivation', 'advanced-market-research', 'government-opportunity-finder'].includes(product.id)).map(product => [product.id, [product.name, product.price, product.points]])),
    {
      'advanced-market-research': ['Advanced Market Research', 2495, 3],
      'government-opportunity-finder': ['Government Opportunity Finder & Bid Support', 0, 0],
      'old-lead-reactivation': ['Dormant Customer Reactivation', 995, 2],
      'spend-guard': ['Automintly Spend Guard', 1995, 3]
    }
  );
});

test('government opportunity support is selective and keeps submission and fee boundaries visible', () => {
  const industryTabsPosition = homepage.indexOf('<nav class="indbar"');
  const contractingBannerPosition = homepage.indexOf('<a class="contracting-banner"');
  const mainPosition = homepage.indexOf('<main id="top">');
  const heroPosition = homepage.indexOf('<section class="hero"');
  const problemPosition = homepage.indexOf('<section class="problem"');
  const recoveryPosition = homepage.indexOf('<section class="recovery"');
  const servicesPosition = homepage.indexOf('<section class="services"');
  assert.ok(industryTabsPosition >= 0 && mainPosition > industryTabsPosition);
  assert.ok(heroPosition > mainPosition && problemPosition > heroPosition);
  assert.ok(contractingBannerPosition > problemPosition && recoveryPosition > contractingBannerPosition);
  assert.ok(servicesPosition > recoveryPosition);
  assert.match(homepage, /<a class="contracting-banner" href="contracting\.html"/);
  assert.match(homepage, /<h3>Government opportunity search &amp; bid support<\/h3>/);
  assert.match(homepage, /<a class="service-link" href="contracting\.html">Explore Contracting/);
  assert.match(homepage, /does not submit a bid or contact an agency automatically/i);
  assert.match(homepage, /do not guarantee awards/i);
  assert.match(homepage, /No upfront search fee/);
  assert.match(homepage, /pay no Contracting add-on fee unless a qualifying contract is awarded/i);
  assert.match(homepage, /success fee is offered only where legally permitted and agreed in writing before bid support begins/i);
  assert.match(builderHtml, /name="goals" value="government"><span>Contracting<\/span>/);
  assert.match(builder, /product\.id === 'government-opportunity-finder' && !matched\.length/);
  assert.match(builder, /NAICS, SAM registration, set-aside eligibility/);
  assert.match(builder, /includedAddon:true/);
  assert.match(builder, /Contracting adds no setup charge or dashboard scope points/);
});

test('Contracting has a dedicated, evidence-bounded service page', () => {
  assert.match(contractingHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/contracting\.html">/);
  assert.match(contractingHtml, /Government contracts are out there\. Let’s find the ones that fit your business\./);
  assert.match(contractingHtml, /\$0 upfront/);
  assert.match(contractingHtml, /build-your-automation\.html\?add=government-opportunity-finder/);
  assert.match(contractingHtml, /does not promise awards, automatically submit bids, contact agencies on your behalf/i);
  assert.match(contractingHtml, /Any award-based success fee is considered only where legally permitted and agreed in writing before bid support begins/i);
  assert.match(contractingHtml, /https:\/\/sam\.gov\/entity-registration/);
  assert.match(contractingHtml, /https:\/\/www\.acquisition\.gov\/far\/subpart-3\.4/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/contracting\.html/);
});

test('advanced market research is visible and selectable from the public site', () => {
  assert.match(homepage, /<h3>Advanced market research automation<\/h3>/);
  assert.match(homepage, /build-your-automation\.html\?add=advanced-market-research/);
  assert.match(builder, /id:'advanced-market-research'/);
  assert.match(builder, /name:'Advanced Market Research'/);
  assert.match(builder, /price:2495,points:3/);
  assert.match(homepage, /Recommendations remain drafts until your assigned reviewer approves them\./);
});

test('Quote-to-Cash remains an itemized four-module system with honest totals', () => {
  const bundle = bundles.find(item => item.id === 'quote-to-cash-accelerator');
  assert.ok(bundle);
  assert.deepEqual(Array.from(bundle.products), ['lead-follow-up', 'crm-automation', 'quote-flow', 'cashchaser']);
  const included = bundle.products.map(id => products.find(product => product.id === id));
  assert.ok(included.every(Boolean));
  assert.equal(included.reduce((sum, product) => sum + product.price, 0), 5880);
  assert.equal(included.reduce((sum, product) => sum + product.points, 0), 9);
  assert.match(builder, /Each automation is itemized and can be removed separately/);
});

test('focused landing offers carry only reviewed IDs into the builder', () => {
  const spend = offerCard('Automintly Spend Guard');
  assert.match(spend, /\$1,995/);
  assert.match(spend, /build-your-automation\.html\?add=spend-guard/);

  const quote = offerCard('Quote-to-Cash Accelerator');
  assert.match(quote, /\$5,880/);
  assert.match(quote, /build-your-automation\.html\?bundle=quote-to-cash-accelerator/);

  const dormant = offerCard('Dormant Customer Reactivation');
  assert.match(dormant, /\$995/);
  assert.match(dormant, /build-your-automation\.html\?add=old-lead-reactivation/);

  assert.match(builder, /getAll\('add'\)\.filter\(id => byId\(id\)\)/);
  assert.match(builder, /outcomeBundles\.find\(bundle => bundle\.id === requested\.get\('bundle'\)\)/);
});

test('dashboard access and external costs remain separate from setup', () => {
  assert.match(builderHtml, /dashboard fee is based on their combined scope/i);
  assert.match(builderHtml, /Third-party provider and usage charges are separate and paid by the customer/i);
  assert.match(builderHtml, /no payment information is collected on this page/i);
  assert.match(builderHtml, /Automation Reliability Care are included with dashboard access/i);
});

test('website trust cleanup has an honest fixed-scope conversion path', () => {
  assert.match(trustCleanupHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/website-trust-cleanup\.html">/);
  assert.match(trustCleanupHtml, /Website Trust Cleanup/);
  assert.match(trustCleanupHtml, /\$149/);
  assert.match(trustCleanupHtml, /Up to five agreed public-page fixes/);
  assert.match(trustCleanupHtml, /No subscription\. Scope agreed before access\./);
  assert.doesNotMatch(trustCleanupHtml, /noindex/);
  assert.match(homepage, /href="website-trust-cleanup\.html"/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/website-trust-cleanup\.html/);
});

test('website trust self-check stays private in-browser and routes to the exact offer', () => {
  assert.match(trustCheckHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/website-trust-check\.html">/);
  assert.match(trustCheckHtml, /60-Second Website Trust Check/);
  assert.match(trustCheckHtml, /Runs only in your browser\. Nothing is submitted\./);
  assert.match(trustCheckHtml, /name="q8"/);
  assert.match(trustCheckHtml, /website_trust_check/);
  assert.match(trustCheckHtml, /website-trust-cleanup\.html\?utm_source=automintly/);
  assert.doesNotMatch(trustCheckHtml, /<form[^>]+action=/i);
  assert.doesNotMatch(trustCheckHtml, /\bfree\b/i);
  assert.doesNotMatch(trustCheckHtml, /noindex/);
  assert.match(homepage, /href="website-trust-check\.html"/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/website-trust-check\.html/);
});

test('website trust measurement hooks remain privacy-minimal and disabled', () => {
  assert.match(trackingConfig, /enabled:\s*false/);
  assert.match(trackingConfig, /provider:\s*"none"/);
  assert.match(trackingScript, /website_trust_check_start/);
  assert.match(trackingScript, /website_trust_check_complete/);
  assert.match(trackingScript, /website_trust_offer_click/);
  assert.match(trackingScript, /website_trust_scope_email_click/);
  assert.match(trackingScript, /estimate_form_submitted_unverified/);
  assert.match(trackingScript, /"result_band"/);
  assert.match(trackingScript, /\["page", "placement", "industry", "destination", "result_band"\]/);
  assert.match(trustCheckHtml, /conversion-tracking-config\.js/);
  assert.match(trustCheckHtml, /website_trust_check_complete/);
  assert.match(trustCleanupHtml, /conversion-tracking-config\.js/);
});

test('Revenue Path Watch has an honest invoice-based offer and dormant measurement hook', () => {
  assert.match(revenuePathWatchHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/revenue-path-watch\.html">/);
  assert.match(revenuePathWatchHtml, /Revenue Path Watch/);
  assert.match(revenuePathWatchHtml, /\$99 \+ \$49\/mo/);
  assert.match(revenuePathWatchHtml, /initial \$148 invoice for setup and the first month/);
  assert.match(revenuePathWatchHtml, /data-conversion-event="revenue_path_scope_click"/);
  assert.match(revenuePathWatchHtml, /conversion-tracking-config\.js/);
  assert.doesNotMatch(revenuePathWatchHtml, /\bfree\b/i);
  assert.doesNotMatch(revenuePathWatchHtml, /noindex/i);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/revenue-path-watch\.html/);
  assert.match(trackingConfig, /enabled:\s*false/);
  assert.match(trackingConfig, /provider:\s*"none"/);
  assert.match(trackingScript, /revenue_path_scope_click/);
});

test('shared charcoal theme keeps text readable on every themed page', () => {
  const themedPages = [
    'index.html',
    'industries.html',
    'recovery.html',
    'roi-calculator.html',
    'privacy.html',
    'n8n-workflow-active-but-not-running.html'
  ];

  for (const file of themedPages) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(html, /charcoal-theme\.css\?v=green-contrast-v4["']/, `${file} must load the current shared theme`);
    assert.match(html, /<body class="[^"]*charcoal-theme[^"]*">/, `${file} must activate the shared theme`);
  }

  assert.match(charcoalTheme, /body\.charcoal-theme \{[\s\S]*--bg:#17191b;[\s\S]*--text:#dfebe5;[\s\S]*--muted:#a7b6af;/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.money-systems \{[\s\S]*?background:var\(--bg-2\);/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.money-systems-head p,[\s\S]*?\.money-system-note \{ color:#b8c8c0; \}/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.offer-facts dd \{ color:#dce8e2; \}/);
});

test('included dashboard band uses the green Automintly palette', () => {
  assert.match(charcoalTheme, /body\.charcoal-theme \.included \{ background:#101513; \}/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.included \.tagline \{ color:#86f5c4; \}/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.included h2 \{ color:#f3fff9; \}/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.included p \{ color:#c2d2ca; \}/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.included \.inc-item \{[\s\S]*?background:#1b2924;[\s\S]*?border:1px solid #405249;[\s\S]*?color:#86f5c4;/);
});
