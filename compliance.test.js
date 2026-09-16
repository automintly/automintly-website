const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const publicPages = [...sitemap.matchAll(/<loc>https:\/\/automintly\.com\/(.*?)<\/loc>/g)]
  .map((match) => match[1] || "index.html")
  .map((name) => name === "" ? "index.html" : name);

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function luminance(hex) {
  const channels = hex.replace("#", "").match(/.{2}/g).map((part) => parseInt(part, 16) / 255);
  const linear = channels.map((value) => value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a, b) {
  const first = luminance(a);
  const second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

test("every sitemap page exists and loads the compliance layer", () => {
  for (const page of publicPages) {
    assert.ok(fs.existsSync(path.join(root, page)), `${page} must exist`);
    const html = read(page);
    assert.match(html, /<html\s+lang="en"/i, `${page} must declare English`);
    assert.match(html, /<title>[^<]+<\/title>/i, `${page} must have a title`);
    assert.match(html, /<main(?:\s|>)/i, `${page} must have a main landmark`);
    assert.match(html, /compliance\.css/i, `${page} must load compliance.css`);
    assert.match(html, /site-compliance\.js/i, `${page} must load site-compliance.js`);
  }
});

test("public pages do not load Google Fonts or third-party embeds", () => {
  for (const page of publicPages) {
    const html = read(page);
    assert.doesNotMatch(html, /fonts\.(?:googleapis|gstatic)\.com/i, `${page} must not load Google Fonts`);
    assert.doesNotMatch(html, /<(?:iframe|embed|object)\b/i, `${page} must not embed third-party content`);
    const remoteScripts = [...html.matchAll(/<script[^>]+src=["'](https?:\/\/[^"']+)/gi)].map((match) => match[1]);
    assert.deepEqual(remoteScripts, [], `${page} must not statically load remote scripts`);
  }
});

test("images have text alternatives or are explicitly decorative", () => {
  for (const page of publicPages) {
    for (const match of read(page).matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      const alt = tag.match(/\balt=["']([^"']*)["']/i);
      assert.ok(alt, `${page} image is missing alt text: ${tag}`);
      if (alt[1] === "") {
        assert.match(tag, /aria-hidden=["']true["']/i, `${page} decorative image must be hidden from assistive technology`);
      }
    }
  }
});

test("the inquiry form minimizes data and requires clear consent", () => {
  const html = read("index.html");
  const form = html.match(/<form id="contact-form"[\s\S]*?<\/form>/i)?.[0] || "";
  assert.ok(form, "contact form must exist");
  assert.doesNotMatch(form, /\bnovalidate\b/i);
  assert.match(form, /id="f-name"[^>]+maxlength="100"[^>]+required/i);
  assert.match(form, /id="f-email"[^>]+maxlength="254"[^>]+required/i);
  assert.match(form, /id="f-contact"[^>]+required/i);
  assert.match(form, /id="f-channels"[^>]+maxlength="500"[^>]+required/i);
  assert.match(form, /id="f-message"[^>]+maxlength="2000"[^>]+required/i);
  assert.match(form, /id="f-outcomes"[^>]+maxlength="1500"[^>]+required/i);
  assert.match(form, /id="f-consent"[^>]+required/i);
  assert.match(form, /for="f-consent"[\s\S]*Privacy Policy/i);
  assert.match(form, /Do not include passwords, payment information, health information/i);
  assert.match(read("index.html"), /form\.checkValidity\(\)/);
  assert.match(read("index.html"), /form\.reportValidity\(\)/);
});

test("tracking is disabled and optional providers require affirmative consent", () => {
  assert.match(read("conversion-tracking-config.js"), /enabled:\s*false/);
  const tracking = read("conversion-tracking.js");
  assert.match(tracking, /hasAnalyticsConsent\(\)/);
  assert.match(tracking, /navigator\.globalPrivacyControl/);
  assert.match(tracking, /navigator\.doNotTrack/);
  assert.match(tracking, /Allow optional analytics/);
  assert.match(tracking, /Use necessary cookies only/);
  assert.match(tracking, /Max-Age=15552000/);
  assert.match(tracking, /SameSite=Lax/);
});

test("all legal pages contain effective dates, contact details, and canonical URLs", () => {
  for (const page of ["privacy.html", "terms.html", "cookie-policy.html", "refund-policy.html", "accessibility.html"]) {
    const html = read(page);
    assert.match(html, new RegExp(`https://automintly\\.com/${page.replace(".", "\\.")}`));
    assert.match(html, /September 14, 2026/);
    assert.match(html, /automintly@gmail\.com/);
  }
});

test("unsupported absolute claims and fabricated social proof are absent", () => {
  const html = publicPages.map(read).join("\n");
  const disallowedClaims = [
    "Every automation your business needs",
    "Everything we build reports on itself",
    "If it breaks, we pay for it",
    "You're never locked in",
    "Full transparency, always",
    "Everything is yours to take",
    "we're built to fire ourselves",
    "Enterprise-grade AI automation",
    "Every unanswered call is a customer who books with someone else instead",
    "Every missed call is a job your competitor just booked"
  ];
  for (const claim of disallowedClaims) {
    assert.equal(html.toLowerCase().includes(claim.toLowerCase()), false, `remove unsupported claim: ${claim}`);
  }
  assert.doesNotMatch(html, /class=["'][^"']*(?:testimonial|star-rating|customer-review)[^"']*["']/i);
  assert.doesNotMatch(html, /(?:★★★★★|5\.0\s*(?:out of 5|stars))/i);
});

test("critical text and control colors meet WCAG AA contrast", () => {
  assert.ok(contrast("#edf5f2", "#111816") >= 4.5, "legal body text contrast");
  assert.ok(contrast("#c7d5d0", "#111816") >= 4.5, "legal muted text contrast");
  assert.ok(contrast("#79e8bd", "#111816") >= 4.5, "legal link contrast");
  assert.ok(contrast("#09251c", "#6ee7b7") >= 4.5, "consent primary button contrast");
  assert.ok(contrast("#ffffff", "#247b68") >= 4.5, "primary site button contrast");
});
