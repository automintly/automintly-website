(function () {
  "use strict";

  var config = window.AUTOMINTLY_TRACKING_CONFIG || {};
  var enabled = config.enabled === true;
  var provider = String(config.provider || "none").toLowerCase();
  var consentCookie = "automintly_cookie_choice_v1";
  var providerLoaded = false;
  var allowedEvents = {
    estimate_cta_click: true,
    estimate_form_start: true,
    estimate_form_submit: true,
    estimate_form_submitted_unverified: true,
    estimate_form_success: true,
    estimate_form_error: true,
    industries_page_view: true,
    industry_selected: true,
    booking_call_click: true,
    flowmotic_link_click: true,
    website_trust_check_start: true,
    website_trust_check_complete: true,
    website_trust_offer_click: true,
    website_trust_scope_email_click: true,
    revenue_path_scope_click: true,
    vendorleak_offer_click: true
  };

  function cleanProperties(properties) {
    var input = properties || {};
    var output = {};
    ["page", "placement", "industry", "destination", "result_band"].forEach(function (key) {
      if (typeof input[key] === "string" && input[key].length <= 80) {
        output[key] = input[key];
      }
    });
    return output;
  }

  function track(name, properties) {
    if (!enabled || !hasAnalyticsConsent() || !providerLoaded || !allowedEvents[name]) return false;

    var safe = cleanProperties(properties);
    if (provider === "ga4" && typeof window.gtag === "function") {
      window.gtag("event", name, safe);
    } else if (provider === "plausible" && typeof window.plausible === "function") {
      window.plausible(name, { props: safe });
    } else {
      return false;
    }

    if (config.debug === true && window.console) {
      console.info("Automintly conversion event", name, safe);
    }
    return true;
  }

  function loadProvider() {
    if (!enabled || !hasAnalyticsConsent() || providerLoaded) return;

    var script;
    if (provider === "ga4" && /^G-[A-Z0-9]+$/.test(config.measurementId || "")) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", config.measurementId, { anonymize_ip: true });
      script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(config.measurementId);
      document.head.appendChild(script);
      providerLoaded = true;
    } else if (provider === "plausible" && /^[a-z0-9.-]+$/i.test(config.domain || "")) {
      window.plausible = window.plausible || function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
      script = document.createElement("script");
      script.defer = true;
      script.dataset.domain = config.domain;
      script.src = "https://plausible.io/js/script.js";
      document.head.appendChild(script);
      providerLoaded = true;
    }
  }

  function readConsent() {
    var match = document.cookie.match(new RegExp("(?:^|; )" + consentCookie + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : "";
  }

  function privacySignalBlocksAnalytics() {
    return navigator.globalPrivacyControl === true || navigator.doNotTrack === "1" || window.doNotTrack === "1";
  }

  function hasAnalyticsConsent() {
    return readConsent() === "analytics" && !privacySignalBlocksAnalytics();
  }

  function saveConsent(choice) {
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = consentCookie + "=" + encodeURIComponent(choice) + "; Max-Age=15552000; Path=/; SameSite=Lax" + secure;
  }

  function closeBanner() {
    var banner = document.getElementById("automintly-cookie-banner");
    if (banner) banner.remove();
  }

  function showConsentBanner() {
    if (!enabled || readConsent() || privacySignalBlocksAnalytics() || document.getElementById("automintly-cookie-banner")) return;
    var banner = document.createElement("section");
    banner.id = "automintly-cookie-banner";
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "false");
    banner.setAttribute("aria-labelledby", "cookie-banner-title");
    banner.innerHTML = '<h2 id="cookie-banner-title">Optional analytics choice</h2>' +
      '<p>We use necessary site technology. Optional, privacy-limited analytics will run only if you allow it. Read our <a href="cookie-policy.html">cookie policy</a>.</p>' +
      '<div class="cookie-actions"><button type="button" data-cookie-choice="analytics">Allow optional analytics</button>' +
      '<button type="button" class="cookie-decline" data-cookie-choice="necessary">Use necessary cookies only</button></div>';
    document.body.appendChild(banner);
    banner.querySelectorAll("button[data-cookie-choice]").forEach(function (button) {
      button.addEventListener("click", function () {
        var choice = button.getAttribute("data-cookie-choice") === "analytics" ? "analytics" : "necessary";
        saveConsent(choice);
        closeBanner();
        if (choice === "analytics") loadProvider();
        document.dispatchEvent(new CustomEvent("automintly:consent", { detail: { choice: choice } }));
      });
    });
  }

  window.AutomintlyConversions = Object.freeze({
    enabled: enabled && hasAnalyticsConsent(),
    track: track
  });

  loadProvider();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showConsentBanner);
  } else {
    showConsentBanner();
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a");
    if (!link) return;
    var href = link.getAttribute("href") || "";
    var namedEvent = link.getAttribute("data-conversion-event") || "";
    if (allowedEvents[namedEvent]) {
      track(namedEvent, {
        page: window.location.pathname,
        placement: link.getAttribute("data-placement") || "page",
        destination: link.protocol === "mailto:" ? "email" : "link"
      });
    } else if (href === "#cta" || /index\.html#cta$/.test(href)) {
      track("estimate_cta_click", {
        page: window.location.pathname,
        placement: link.closest("nav") ? "navigation" : "page"
      });
    } else if (/^https:\/\/calendar\.google\.com\/calendar\/.*\/appointments\/schedules\//i.test(link.href)) {
      track("booking_call_click", {
        page: window.location.pathname,
        placement: link.closest("footer") ? "footer" : "estimate_section",
        destination: "google_calendar"
      });
    } else if (/^https:\/\/(www\.)?flowmotic\.com/i.test(link.href)) {
      track("flowmotic_link_click", {
        page: window.location.pathname,
        destination: "flowmotic"
      });
    } else if (/website-trust-cleanup\.html$/.test(window.location.pathname) && /^mailto:automintly@gmail\.com/i.test(href)) {
      track("website_trust_scope_email_click", {
        page: window.location.pathname,
        placement: link.closest("footer") ? "footer" : "page"
      });
    }
  });

  var form = document.getElementById("contact-form");
  if (form) {
    var started = false;
    form.addEventListener("focusin", function () {
      if (started) return;
      started = true;
      track("estimate_form_start", { page: window.location.pathname });
    });
  }

  if (/industries\.html$/.test(window.location.pathname)) {
    track("industries_page_view", { page: window.location.pathname });
    document.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-key]");
      if (button) {
        track("industry_selected", {
          page: window.location.pathname,
          industry: button.getAttribute("data-key") || ""
        });
      }
    });
  }
})();
