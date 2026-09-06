(function () {
  "use strict";

  var config = window.AUTOMINTLY_TRACKING_CONFIG || {};
  var enabled = config.enabled === true;
  var provider = String(config.provider || "none").toLowerCase();
  var allowedEvents = {
    estimate_cta_click: true,
    estimate_form_start: true,
    estimate_form_submit: true,
    estimate_form_success: true,
    estimate_form_error: true,
    industries_page_view: true,
    industry_selected: true,
    booking_call_click: true,
    flowmotic_link_click: true
  };

  function cleanProperties(properties) {
    var input = properties || {};
    var output = {};
    ["page", "placement", "industry", "destination"].forEach(function (key) {
      if (typeof input[key] === "string" && input[key].length <= 80) {
        output[key] = input[key];
      }
    });
    return output;
  }

  function track(name, properties) {
    if (!enabled || !allowedEvents[name]) return false;

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
    if (!enabled) return;

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
    } else if (provider === "plausible" && /^[a-z0-9.-]+$/i.test(config.domain || "")) {
      window.plausible = window.plausible || function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
      script = document.createElement("script");
      script.defer = true;
      script.dataset.domain = config.domain;
      script.src = "https://plausible.io/js/script.js";
      document.head.appendChild(script);
    }
  }

  window.AutomintlyConversions = Object.freeze({
    enabled: enabled,
    track: track
  });

  loadProvider();

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a");
    if (!link) return;
    var href = link.getAttribute("href") || "";
    if (href === "#cta" || /index\.html#cta$/.test(href)) {
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
