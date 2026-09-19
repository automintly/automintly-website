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
const industriesHtml = fs.readFileSync(path.join(root, 'industries.html'), 'utf8');
const contractingHtml = fs.readFileSync(path.join(root, 'contracting.html'), 'utf8');
const trustCleanupHtml = fs.readFileSync(path.join(root, 'website-trust-cleanup.html'), 'utf8');
const trustCheckHtml = fs.readFileSync(path.join(root, 'website-trust-check.html'), 'utf8');
const revenuePathWatchHtml = fs.readFileSync(path.join(root, 'revenue-path-watch.html'), 'utf8');
const websiteUpgraderHtml = fs.readFileSync(path.join(root, 'website-upgrader.html'), 'utf8');
const clientDashboardHtml = fs.readFileSync(path.join(root, 'client-dashboard.html'), 'utf8');
const partnersHtml = fs.readFileSync(path.join(root, 'partners.html'), 'utf8');
const healthCheckHtml = fs.readFileSync(path.join(root, 'health-check.html'), 'utf8');
const solutionsHtml = fs.readFileSync(path.join(root, 'solutions.html'), 'utf8');
const acquisitionOperationsScreenHtml = fs.readFileSync(path.join(root, 'acquisition-operations-screen.html'), 'utf8');
const vendorPaymentScreenHtml = fs.readFileSync(path.join(root, 'vendor-payment-screen.html'), 'utf8');
const vendorPaymentGuideHtml = fs.readFileSync(path.join(root, 'check-duplicate-vendor-payments-csv.html'), 'utf8');
const agentAuditGuideHtml = fs.readFileSync(path.join(root, 'ai-agent-audit-log-template.html'), 'utf8');
const dashboardManifest = JSON.parse(fs.readFileSync(path.join(root, 'dashboard-manifest.json'), 'utf8'));
const dashboardInstall = fs.readFileSync(path.join(root, 'dashboard-install-v4.js'), 'utf8');
const dashboardServiceWorker = fs.readFileSync(path.join(root, 'dashboard-sw.js'), 'utf8');
const dashboardShortcut = fs.readFileSync(path.join(root, 'automintly-dashboard.html'), 'utf8');
const trackingConfig = fs.readFileSync(path.join(root, 'conversion-tracking-config.js'), 'utf8');
const trackingScript = fs.readFileSync(path.join(root, 'conversion-tracking.js'), 'utf8');
const spaceEntryScript = fs.readFileSync(path.join(root, 'space-entry.js'), 'utf8');
const sitemapXml = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const charcoalTheme = fs.readFileSync(path.join(root, 'charcoal-theme.css'), 'utf8');
const complianceCss = fs.readFileSync(path.join(root, 'compliance.css'), 'utf8');

test('AI agent audit-log guide is source-backed, bounded, and routes to the existing product', () => {
  assert.match(agentAuditGuideHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/ai-agent-audit-log-template\.html">/);
  assert.match(agentAuditGuideHtml, /"@type": "TechArticle"/);
  assert.match(agentAuditGuideHtml, /NIST NCCoE: Accelerating the Adoption of Software and AI Agent Identity and Authorization/);
  assert.match(agentAuditGuideHtml, /OWASP Logging Cheat Sheet/);
  assert.match(agentAuditGuideHtml, /Passwords, access tokens, API keys, recovery codes, and one-time verification codes/);
  assert.match(agentAuditGuideHtml, /It is not a compliance certification or a substitute for legal or security review/);
  assert.match(agentAuditGuideHtml, /https:\/\/tymilroy\.gumroad\.com\/l\/agent-action-audit-ledger\?utm_source=automintly&amp;utm_medium=seo_guide&amp;utm_campaign=agent_action_audit_ledger&amp;utm_content=ai_agent_audit_log_template/);
  assert.match(homepage, /href="ai-agent-audit-log-template\.html"/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/ai-agent-audit-log-template\.html/);
});

test('partner page has bounded delivery and referral paths', () => {
  assert.match(partnersHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/partners\.html">/);
  assert.match(partnersHtml, /Add automation delivery without building a new department\./);
  assert.match(partnersHtml, /Workflow rescue/);
  assert.match(partnersHtml, /Content operations/);
  assert.match(partnersHtml, /Lead operations/);
  assert.match(partnersHtml, /written wholesale scope and invoice/i);
  assert.match(partnersHtml, /bookkeeping, IT, MSP, or CRM partner/i);
  assert.match(partnersHtml, /Any referral fee or account credit must be agreed in writing before the introduction/i);
  assert.match(partnersHtml, /payable only after Automintly receives the client's payment/i);
  assert.match(partnersHtml, /href="health-check\.html\?source=partner-bottom">Request a partner scope<\/a>/);
  assert.doesNotMatch(partnersHtml, /mailto:/i);
  assert.match(homepage, /href="partners\.html">Partners<\/a>/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/partners\.html/);
});

test('dedicated no-call Health Check preserves consent and anti-abuse controls', () => {
  assert.match(healthCheckHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/health-check\.html">/);
  assert.match(healthCheckHtml, /<title>Written Automation Health Check \| Automintly<\/title>/);
  assert.match(healthCheckHtml, /recommended scope and price/i);
  assert.doesNotMatch(healthCheckHtml.replace(/value="free-health-check"/g, ''), /free written|free health check/i);
  assert.match(healthCheckHtml, /name="health-check"/);
  assert.match(healthCheckHtml, /action="https:\/\/sweet-puffpuff-9243c4\.netlify\.app\/"/);
  assert.match(healthCheckHtml, /data-netlify="true"/);
  assert.match(healthCheckHtml, /netlify-honeypot="bot-field"/);
  assert.match(healthCheckHtml, /name="consent"[^>]+required/);
  assert.match(healthCheckHtml, /Do not include passwords, payment information, health information/i);
  assert.match(healthCheckHtml, /Submitting this form does not charge you|No charge to submit/i);
  assert.match(healthCheckHtml, /Paid work begins only after you review and accept a written scope and payment request/i);
  assert.doesNotMatch(healthCheckHtml, /name="phone"|type="tel"/i);
  assert.match(healthCheckHtml, /mode:'no-cors'/);
  assert.match(healthCheckHtml, /cannot confirm receipt/i);
  assert.match(homepage, /href="health-check\.html\?source=homepage-hero"/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/health-check\.html/);
});

test('solutions hub creates specific outcome-led acquisition paths without guarantees', () => {
  assert.match(solutionsHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/solutions\.html">/);
  assert.match(solutionsHtml, /id="systems"/);
  assert.match(solutionsHtml, /Revenue Rescue/);
  assert.match(solutionsHtml, /Cash &amp; Cost Control/);
  assert.match(solutionsHtml, /Growth Intelligence/);
  assert.match(solutionsHtml, /Every system reports into the Outcome Control Center/);
  assert.match(solutionsHtml, /interest=Revenue%20Rescue/);
  assert.match(solutionsHtml, /interest=Cash%20%26%20Cost%20Control/);
  assert.match(solutionsHtml, /interest=Growth%20Intelligence/);
  assert.match(healthCheckHtml, /<option>Revenue Rescue<\/option>/);
  assert.match(healthCheckHtml, /<option>Cash &amp; Cost Control<\/option>/);
  assert.match(healthCheckHtml, /<option>Growth Intelligence<\/option>/);
  assert.match(solutionsHtml, /HVAC and home services/);
  assert.match(solutionsHtml, /Dental and medical/);
  assert.match(solutionsHtml, /Salons and spas/);
  assert.match(solutionsHtml, /Property management/);
  assert.match(solutionsHtml, /Roofing and skilled trades/);
  assert.match(solutionsHtml, /Dashboard evidence/g);
  assert.match(solutionsHtml, /cannot guarantee a booking or sale/i);
  assert.match(solutionsHtml, /Health Check is directional|Written Health Check/i);
  assert.match(solutionsHtml, /01 · SCOPE \+ PRICE/);
  assert.doesNotMatch(solutionsHtml, /Free Health Check|01 · FREE/i);
  assert.match(solutionsHtml, /\$249/);
  assert.match(solutionsHtml, /health-check\.html\?source=solutions/);
  assert.match(homepage, /href="solutions\.html">Solutions<\/a>/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/solutions\.html/);
});

test('acquisition operations screen preserves its fixed scope, proof, and boundaries', () => {
  assert.match(acquisitionOperationsScreenHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/acquisition-operations-screen\.html">/);
  assert.match(acquisitionOperationsScreenHtml, /\$399/);
  assert.match(acquisitionOperationsScreenHtml, /Up to 12 recurring workflows and 10 tools/);
  assert.match(acquisitionOperationsScreenHtml, /https:\/\/contra\.com\/s\/Q66qrXB2-find-the-automation-upside-before-you-buy-a-business/);
  assert.match(acquisitionOperationsScreenHtml, /https:\/\/contra\.com\/p\/lkUsLW7Q-automation-upside-autopsy-or-fictional-buyer-operations-screen/);
  assert.match(acquisitionOperationsScreenHtml, /Financial, legal, tax, valuation, security, ownership, or seller verification/);
  assert.match(acquisitionOperationsScreenHtml, /A guarantee of savings, revenue, purchase quality, or acquisition outcome/);
  assert.match(homepage, /href="acquisition-operations-screen\.html">Screen the operation before buying a business/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/acquisition-operations-screen\.html/);
});

test('agent action audit ledger has one attributable self-service path', () => {
  assert.match(homepage, /Get the local agent audit ledger — \$49/);
  assert.match(homepage, /https:\/\/tymilroy\.gumroad\.com\/l\/agent-action-audit-ledger\?utm_source=automintly&amp;utm_medium=website&amp;utm_campaign=agent_action_audit_ledger&amp;utm_content=custom_systems_card/);
  assert.equal((homepage.match(/tymilroy\.gumroad\.com\/l\/agent-action-audit-ledger/g) || []).length, 1);
});

function arrayConstant(name) {
  const match = builder.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n  \\]);`));
  assert.ok(match, `${name} must remain a readable array constant`);
  return vm.runInNewContext(match[1], Object.create(null));
}

const products = arrayConstant('products');
const bundles = arrayConstant('outcomeBundles');
const addons = arrayConstant('addons');

test('customers have an honest dashboard access and install path', () => {
  assert.match(homepage, /href="client-dashboard\.html">Client Dashboard<\/a>/);
  assert.match(homepage, /href="client-dashboard\.html" class="nav-account">Dashboard<\/a>/);
  assert.match(homepage, /href="client-dashboard\.html#install">Download dashboard shortcut<\/a>/);
  assert.match(clientDashboardHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/client-dashboard\.html">/);
  assert.match(clientDashboardHtml, /Open my dashboard/);
  assert.match(clientDashboardHtml, /View safe demo/);
  assert.match(clientDashboardHtml, /Request client access/);
  assert.match(clientDashboardHtml, /Download dashboard shortcut/);
  assert.match(clientDashboardHtml, /Your AI Sales Closer appears under My Automations/);
  assert.match(clientDashboardHtml, /real customer accounts are not open yet/i);
  assert.match(clientDashboardHtml, /do not enter real customer data there/i);
  assert.match(clientDashboardHtml, /does not contain your business data, password, session or API keys/i);
  assert.match(clientDashboardHtml, /href="#main-content">Skip to main content/);
  assert.match(clientDashboardHtml, /aria-label="Legal and accessibility"/);
  assert.doesNotMatch(clientDashboardHtml, /site-compliance\.js|compliance\.css/);
  assert.match(clientDashboardHtml, /https:\/\/automintly-platform-staging\.onrender\.com\/platform\/login/);
  assert.match(clientDashboardHtml, /https:\/\/automintly-platform-preview\.onrender\.com\//);
  assert.equal((clientDashboardHtml.match(/automintly-platform-staging\.onrender\.com/g) || []).length, 3);
  assert.doesNotMatch(clientDashboardHtml, />Open protected dashboard</);
  assert.doesNotMatch(clientDashboardHtml, /127\.0\.0\.1|localhost/);
  assert.equal(dashboardManifest.start_url, '/client-dashboard.html?source=installed');
  assert.equal(dashboardManifest.display, 'standalone');
  assert.deepEqual(dashboardManifest.icons.slice(0, 2).map(icon => [icon.src, icon.sizes, icon.type]), [
    ['/dashboard-icon-192.png', '192x192', 'image/png'],
    ['/dashboard-icon-512.png', '512x512', 'image/png']
  ]);
  assert.match(clientDashboardHtml, /href="automintly-dashboard\.html" download="automintly-dashboard\.html"/);
  assert.match(clientDashboardHtml, /src="dashboard-install-v4\.js"/);
  assert.doesNotMatch(dashboardInstall, /new Blob|createObjectURL|link\.click\(\)/);
  assert.match(dashboardInstall, /automintly-platform-staging\.onrender\.com\/platform\/login/);
  assert.match(dashboardInstall, /localDashboardUrl\.port = '3100'/);
  assert.match(dashboardInstall, /data-dashboard-access/);
  assert.doesNotMatch(dashboardInstall, /localStorage|sessionStorage|document\.cookie/);
  assert.match(dashboardInstall, /serviceWorker\.register\('dashboard-sw\.js'\)/);
  assert.match(dashboardServiceWorker, /automintly-dashboard-launcher-v5/);
  assert.match(dashboardServiceWorker, /'\/automintly-dashboard\.html'/);
  assert.match(dashboardServiceWorker, /'\/dashboard-install-v4\.js'/);
  assert.match(dashboardServiceWorker, /self\.skipWaiting\(\)/);
  assert.match(dashboardShortcut, /automintly-platform-staging\.onrender\.com\/platform\/login/);
  assert.match(dashboardShortcut, /noindex,nofollow/);
  assert.doesNotMatch(dashboardShortcut, /password|session|api[_ -]?key/i);
  assert.match(dashboardServiceWorker, /event\.respondWith\(fetch\(event\.request\)/);
  assert.match(dashboardServiceWorker, /url\.origin !== self\.location\.origin/);
  assert.doesNotMatch(dashboardServiceWorker, /automintly-platform-staging/);
});

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

test('automation rescue card offers the verified self-service kit', () => {
  assert.match(homepage, /<div class="service-actions">/);
  assert.match(homepage, /Use the self-service rescue kit — \$29/);
  assert.match(
    homepage,
    /https:\/\/tymilroy\.gumroad\.com\/l\/workflow-rescue-kit\?utm_source=automintly&amp;utm_medium=website&amp;utm_campaign=workflow_rescue_kit&amp;utm_content=automation_rescue_card/
  );
});

test('Contracting has a dedicated navigation tab and an honest pre-checkout recommendation', () => {
  const industryTabsPosition = homepage.indexOf('<nav class="indbar"');
  const mainPosition = homepage.indexOf('<main id="top">');
  const heroPosition = homepage.indexOf('<section class="hero"');
  const problemPosition = homepage.indexOf('<section class="problem"');
  const recoveryPosition = homepage.indexOf('<section class="recovery"');
  const servicesPosition = homepage.indexOf('<section class="services"');
  assert.ok(industryTabsPosition >= 0 && mainPosition > industryTabsPosition);
  assert.ok(heroPosition > mainPosition && problemPosition > heroPosition);
  assert.ok(recoveryPosition > problemPosition);
  assert.ok(servicesPosition > recoveryPosition);
  assert.doesNotMatch(homepage, /class="contracting-banner"/);
  assert.match(homepage, /<a href="contracting\.html">Contracting<\/a>/);
  assert.match(industriesHtml, /contractingTab\.href = 'contracting\.html'/);
  assert.match(homepage, /<h3>Government opportunity search &amp; bid support<\/h3>/);
  assert.match(homepage, /<a class="service-link" href="contracting\.html">Explore Contracting/);
  assert.match(homepage, /does not submit a bid or contact an agency automatically/i);
  assert.match(homepage, /do not guarantee awards/i);
  assert.match(homepage, /\$0 upfront search fee/);
  assert.match(homepage, /pay no Contracting add-on fee unless a qualifying contract is awarded/i);
  assert.match(homepage, /success fee is offered only where legally permitted and agreed in writing before bid support begins/i);
  assert.match(builderHtml, /name="goals" value="government"><span>Contracting<\/span>/);
  assert.match(builder, /product\.id === 'government-opportunity-finder' && !matched\.length/);
  assert.match(builder, /NAICS, SAM registration, set-aside eligibility/);
  assert.match(builder, /includedAddon:true/);
  assert.match(builder, /Contracting adds no setup charge or dashboard scope points/);
  assert.match(builderHtml, /id="contracting-recommendation"/);
  assert.match(builder, /BEFORE YOU FINISH/);
  assert.match(builder, /Add Contracting check · \$0 upfront/);
  assert.match(builder, /percentage-based success fee applies only after a qualifying award, where legally permitted and agreed in writing before bid support begins/i);
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
  assert.match(builder, /Every service stays itemized and can be removed separately/);
});

test('focused offers live in the shopping flow instead of a duplicate homepage pricing block', () => {
  assert.doesNotMatch(homepage, /class="money-systems"/);
  assert.doesNotMatch(homepage, /class="money-system-card"/);
  assert.match(builderHtml, /<summary>See and price all automations<\/summary>/);
  assert.match(builderHtml, /<summary>Browse service bundles<\/summary>/);
  assert.match(builderHtml, /review every included service and the combined total in your cart/i);
  assert.match(builder, /id:'spend-guard'/);
  assert.match(builder, /id:'old-lead-reactivation'/);
  assert.match(builder, /getAll\('add'\)\.filter\(id => byId\(id\)\)/);
  assert.match(builder, /outcomeBundles\.find\(bundle => bundle\.id === requested\.get\('bundle'\)\)/);
  assert.doesNotMatch(builder, /<strong>\$\{money\(total\)\}<\/strong>/);
  assert.match(builder, /See the combined total in your cart\./);
});

test('builder organizes itemized selections into the three OutcomeOS systems', () => {
  assert.match(builderHtml, /id="outcome-fit"/);
  assert.match(builderHtml, /id="cart-system-mix"/);
  assert.match(builder, /id:'revenue-rescue',name:'Revenue Rescue'/);
  assert.match(builder, /id:'cash-cost-control',name:'Cash & Cost Control'/);
  assert.match(builder, /id:'growth-intelligence',name:'Growth Intelligence'/);
  assert.match(builder, /function systemMix\(productIds\)/);
  assert.match(builder, /System labels organize the work; they do not add another charge\./);
  assert.match(builderHtml, /Every automation and price remains itemized\./);
});

test('builder can submit a minimal no-call plan request without collecting payment data', () => {
  assert.match(builderHtml, /id="plan-request-form"/);
  assert.match(builderHtml, /name="form-name" value="health-check"/);
  assert.match(builderHtml, /netlify-honeypot="bot-field"/);
  assert.match(builderHtml, /name="email" type="email"[^>]+required/);
  assert.match(builderHtml, /name="consent" type="checkbox"[^>]+required/);
  assert.match(builderHtml, /Email only — no call/);
  assert.match(builderHtml, /no payment information is collected on this page/i);
  assert.match(builderHtml, /What happens after your plan request/);
  assert.match(builderHtml, /No paid work begins until you review and accept both/);
  assert.doesNotMatch(builderHtml, /What happens after checkout/i);
  assert.doesNotMatch(builderHtml, /name="(?:card|card_number|cvv|cvc|payment)"/i);
  assert.match(builder, /mode:'no-cors'/);
  assert.match(builder, /cannot confirm delivery from the form provider/);
  assert.match(builder, /Use the email fallback/);
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

test('Website Studio offers six layouts across honest $200, $400, and $600 tiers', () => {
  const websiteTiers = addons.filter(addon => addon.group === 'website-studio');
  assert.deepEqual(
    Array.from(websiteTiers, addon => [addon.id, addon.price]),
    [
      ['website-studio-clean-launch', 200],
      ['website-studio-service-snapshot', 200],
      ['website-studio-lead-engine', 400],
      ['website-studio-trust-builder', 400],
      ['website-studio-brand-story', 600],
      ['website-studio-premium-showcase', 600]
    ]
  );
  assert.match(homepage, /<h3>Automintly Website Studio<\/h3>/);
  assert.match(homepage, /fixed at \$200, \$400, or \$600/);
  assert.match(homepage, /href="website-upgrader\.html"/);
  assert.match(websiteUpgraderHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/website-upgrader\.html">/);
  assert.match(websiteUpgraderHtml, /Six layouts\. Three clear tiers\./);
  websiteTiers.forEach(addon => assert.match(websiteUpgraderHtml, new RegExp(`build-your-automation\\.html\\?addon=${addon.id}`)));
  assert.match(websiteUpgraderHtml, /one compatible one-page business website/i);
  assert.match(websiteUpgraderHtml, /does not guarantee conversions, search rankings, or accessibility certification/i);
  assert.match(builder, /requested\.getAll\('addon'\)/);
  assert.match(builder, /addon\.group/);
  assert.match(builder, /const addonAliases/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/website-upgrader\.html/);
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

test('VendorLeak has a bounded owned page and dormant source-tagged checkout path', () => {
  assert.match(vendorPaymentScreenHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/vendor-payment-screen\.html">/);
  assert.match(vendorPaymentScreenHtml, /\$199 one time/);
  assert.match(vendorPaymentScreenHtml, /up to 10,000 rows/i);
  assert.match(vendorPaymentScreenHtml, /three business days/i);
  assert.match(vendorPaymentScreenHtml, /Fictional product proof only/i);
  assert.match(vendorPaymentScreenHtml, /Candidates are not proof of error or fraud/i);
  assert.doesNotMatch(vendorPaymentScreenHtml, /\bfree\b/i);
  assert.doesNotMatch(vendorPaymentScreenHtml, /noindex/i);
  assert.match(vendorPaymentScreenHtml, /utm_source=automintly/);
  assert.match(vendorPaymentScreenHtml, /utm_campaign=vendorleak_pilot/);
  assert.match(vendorPaymentScreenHtml, /data-conversion-event="vendorleak_offer_click"/);
  assert.match(vendorPaymentScreenHtml, /conversion-tracking-config\.js/);
  assert.match(homepage, /href="vendor-payment-screen\.html"/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/vendor-payment-screen\.html/);
  assert.match(trackingScript, /vendorleak_offer_click/);
  assert.match(trackingConfig, /enabled:\s*false/);
  assert.match(trackingConfig, /provider:\s*"none"/);
});

test('VendorLeak search guide is evidence-bounded and routes to the unchanged offer', () => {
  assert.match(vendorPaymentGuideHtml, /<link rel="canonical" href="https:\/\/automintly\.com\/check-duplicate-vendor-payments-csv\.html">/);
  assert.match(vendorPaymentGuideHtml, /How to check a vendor payment CSV for duplicate-payment candidates/);
  assert.match(vendorPaymentGuideHtml, /review queue, not an accounting conclusion/i);
  assert.match(vendorPaymentGuideHtml, /not use the screening file itself as authority to reverse, withhold, reclaim, or dispute a payment/i);
  assert.match(vendorPaymentGuideHtml, /docs\.oracle\.com/);
  assert.match(vendorPaymentGuideHtml, /learn\.microsoft\.com/);
  assert.match(vendorPaymentGuideHtml, /gao\.gov/);
  assert.match(vendorPaymentGuideHtml, /utm_medium=organic_search/);
  assert.match(vendorPaymentGuideHtml, /utm_campaign=vendorleak_csv_guide/);
  assert.equal((vendorPaymentGuideHtml.match(/data-conversion-event="vendorleak_offer_click"/g) || []).length, 3);
  assert.doesNotMatch(vendorPaymentGuideHtml, /guarantee|recovered amount|we found|we saved/i);
  assert.match(vendorPaymentScreenHtml, /href="check-duplicate-vendor-payments-csv\.html"/);
  assert.match(sitemapXml, /https:\/\/automintly\.com\/check-duplicate-vendor-payments-csv\.html/);
});

test('shared charcoal theme keeps text readable on every themed page', () => {
  const themedPages = [
    'index.html',
    'industries.html',
    'recovery.html',
    'roi-calculator.html',
    'n8n-workflow-active-but-not-running.html',
    'website-upgrader.html'
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
  const privacyHtml = fs.readFileSync(path.join(root, 'privacy.html'), 'utf8');
  assert.match(privacyHtml, /compliance\.css\?v=legal-v1/);
  assert.match(privacyHtml, /<body class="legal-page">/);
});

test('included dashboard band uses the green Automintly palette', () => {
  assert.match(charcoalTheme, /body\.charcoal-theme \.included \{ background:#101513; \}/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.included \.tagline \{ color:#86f5c4; \}/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.included h2 \{ color:#f3fff9; \}/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.included p \{ color:#c2d2ca; \}/);
  assert.match(charcoalTheme, /body\.charcoal-theme \.included \.inc-item \{[\s\S]*?background:#1b2924;[\s\S]*?border:1px solid #405249;[\s\S]*?color:#86f5c4;/);
});

test('homepage leads with the broad Automintly proposition before the dedicated HVAC solution', () => {
  const heroPosition = homepage.indexOf('<section class="hero"');
  const hvacPosition = homepage.indexOf('<section class="industry-focus" id="hvac-home-services"');
  assert.ok(heroPosition >= 0 && hvacPosition > heroPosition);
  assert.match(homepage, /Turn repetitive work into systems that run\./);
  assert.match(homepage, /customer service, sales, operations, finance, and reporting/i);
  assert.match(homepage, /What Automintly can connect/);
  assert.match(homepage, /Featured solution · HVAC &amp; home services/);
  assert.match(homepage, /Recover the lead after a missed call\./);
  assert.match(homepage, /Built as a focused industry solution—not the limit of what Automintly can automate\./);
  assert.match(homepage, /Start with a written Automation Health Check\./);
  assert.match(homepage, /No call is required/i);
  assert.match(homepage, /\$249 Automation Revenue-Leak Snapshot/);
  assert.match(homepage, /\$795 Automation Opportunity Audit/);
  assert.match(homepage, /Implementation is always quoted separately\./);
  assert.match(homepage, /Answer three short workflow questions\./);
  assert.match(homepage, /What written next step would you like\?/);
  assert.match(homepage, /Written Automation Health Check — send the scope and price/);
  assert.match(homepage, /value="free-health-check"/);
  assert.doesNotMatch(homepage.replace(/value="free-health-check"/g, ''), /free written Automation Health Check/i);
  assert.match(homepage, /\$249 Revenue-Leak Snapshot — send the written scope and payment request/);
  assert.match(homepage, /\$795 Automation Opportunity Audit — send the written scope and payment request/);
  assert.match(homepage, /Submitting this form does not charge you\./);
  assert.match(homepage, /Paid work begins only after you review and accept the written scope and payment request\./);
  assert.match(homepage, /Where do new inquiries or tasks arrive today\?/);
  assert.match(homepage, /What happens when nobody responds immediately\?/);
  assert.match(homepage, /How do you know whether the work was booked, completed, closed, or lost\?/);
  assert.match(homepage, /Lead added to the CRM workflow/);
  assert.match(homepage, /Follow-up queue with human controls/);
  assert.match(homepage, /action="https:\/\/sweet-puffpuff-9243c4\.netlify\.app\/"/);
  assert.match(homepage, /fetch\('https:\/\/sweet-puffpuff-9243c4\.netlify\.app\/'/);
  assert.match(homepage, /mode: 'no-cors'/);
  assert.match(homepage, /cannot confirm receipt/i);
});

test('industry pages use the same no-call health-check and paid-review path', () => {
  assert.match(industriesHtml, /Written Health Check/);
  assert.match(industriesHtml, /recommended scope, and price/i);
  assert.doesNotMatch(industriesHtml, /Free written Health Check/i);
  assert.match(industriesHtml, /\$249 Revenue-Leak Snapshot/);
  assert.match(industriesHtml, /Automation Opportunity Audit remains available for \$795/);
  assert.match(industriesHtml, /implementation is always quoted separately\./i);
  assert.match(industriesHtml, /b\.id = k/);
  assert.match(industriesHtml, /b\.setAttribute\('aria-controls', 'top'\)/);
  assert.match(industriesHtml, /window\.addEventListener\('hashchange'/);
  assert.match(industriesHtml, /if\(INDUSTRIES\[next\] && next !== current\) select\(next, false\)/);
});

test('homepage navigation is organized by universal business needs', () => {
  assert.match(homepage, /href="#customer-workflows">Customer response<\/a>/);
  assert.match(homepage, /href="#growth-workflows">Sales &amp; growth<\/a>/);
  assert.match(homepage, /href="#operations-workflows">Daily operations<\/a>/);
  assert.match(homepage, /href="#visibility-workflows">Data &amp; reporting<\/a>/);
  assert.match(homepage, /href="build-your-automation\.html">Pricing &amp; plan<\/a>/);
  assert.doesNotMatch(homepage, /<span class="indbar-label">/);
  assert.doesNotMatch(homepage, /<span class="indbar-label">By industry<\/span>/);
  assert.doesNotMatch(homepage, /<nav class="indbar"[^>]*>[\s\S]*?Home services[\s\S]*?<\/nav>/);
});

test('desktop header keeps its navigation links in a compact group', () => {
  assert.match(complianceCss, /header > \.nav > \.navlinks\s*\{[\s\S]*?flex:\s*0 1 auto;[\s\S]*?justify-content:\s*flex-start;/);
  assert.match(complianceCss, /header > \.nav > \.navcta\s*\{[\s\S]*?margin-left:\s*auto;/);
  assert.doesNotMatch(complianceCss, /header > \.nav > \.navlinks\s*\{[\s\S]{0,160}?justify-content:\s*space-between;/);
});

test('builder includes the fixed-price no-call revenue-leak snapshot', () => {
  const snapshot = addons.find(addon => addon.id === 'revenue-leak-snapshot');
  assert.ok(snapshot);
  assert.equal(snapshot.price, 249);
  assert.equal(snapshot.billing, 'one-time');
  assert.match(snapshot.description, /one workflow/i);
});

test('landing videos prefer lower-bandwidth AV1 while preserving MP4 fallbacks', () => {
  assert.match(homepage, /automintly-mobile-type-v17c-av1\.webm/);
  assert.match(homepage, /automintly-mobile-type-v17c\.mp4/);
  assert.match(homepage, /automintly-orbital-forward-desktop-4k-seamless-v23-av1\.webm/);
  assert.match(homepage, /automintly-orbital-forward-desktop-4k-seamless-v23\.mp4/);
  assert.match(spaceEntryScript, /primary\.canPlayType\(source\.type\)!==''/);
});

test('homepage presents OutcomeOS as three measurable systems with six honest control layers', () => {
  assert.match(homepage, /id="outcomeos"/);
  assert.match(homepage, /Find the leak\. Supervise the fix\. Prove the result\./);
  for (const system of ['Revenue Rescue', 'Cash &amp; Cost Control', 'Growth Intelligence']) {
    assert.match(homepage, new RegExp(system));
  }
  for (const layer of ['Business Leak Map', 'Human Approval Center', 'Unified Customer Timeline', 'Automation Test Center', 'Outcome Ledger', 'Reliability Center']) {
    assert.match(homepage, new RegExp(layer));
  }
  assert.match(homepage, /separate estimates from evidence/i);
  assert.match(homepage, /AI can prepare work; a person decides/i);
  assert.doesNotMatch(homepage, /guaranteed (revenue|savings|results)/i);
});
