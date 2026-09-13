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
const trustCleanupHtml = fs.readFileSync(path.join(root, 'website-trust-cleanup.html'), 'utf8');
const trustCheckHtml = fs.readFileSync(path.join(root, 'website-trust-check.html'), 'utf8');
const trackingConfig = fs.readFileSync(path.join(root, 'conversion-tracking-config.js'), 'utf8');
const trackingScript = fs.readFileSync(path.join(root, 'conversion-tracking.js'), 'utf8');
const sitemapXml = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');

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

test('marketing catalog keeps 29 distinct individually priced products', () => {
  assert.equal(products.length, 29);
  assert.equal(new Set(products.map(product => product.id)).size, products.length);
  assert.ok(products.every(product => Number.isSafeInteger(product.price) && product.price > 0));
  assert.ok(products.every(product => Number.isSafeInteger(product.points) && product.points > 0));
  assert.deepEqual(
    Object.fromEntries(products.filter(product => ['spend-guard', 'old-lead-reactivation'].includes(product.id)).map(product => [product.id, [product.name, product.price, product.points]])),
    {
      'old-lead-reactivation': ['Dormant Customer Reactivation', 995, 2],
      'spend-guard': ['Automintly Spend Guard', 1995, 3]
    }
  );
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
