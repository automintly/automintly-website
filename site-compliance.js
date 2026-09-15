(function () {
  "use strict";

  function addSkipLink() {
    var main = document.querySelector("main");
    if (!main || document.querySelector(".skip-link")) return;
    if (!main.id) main.id = "main-content";
    var link = document.createElement("a");
    link.className = "skip-link";
    link.href = "#" + main.id;
    link.textContent = "Skip to main content";
    document.body.insertBefore(link, document.body.firstChild);
  }

  function addLegalLinks() {
    var footer = document.querySelector("footer");
    if (!footer || footer.querySelector(".legal-links")) return;
    var container = footer.querySelector(".wrap, .legal-footer, .footer-inner, .foot") || footer;
    var list = document.createElement("ul");
    list.className = "legal-links";
    list.setAttribute("aria-label", "Legal and accessibility");
    [
      ["Privacy", "privacy.html"],
      ["Terms", "terms.html"],
      ["Cookies", "cookie-policy.html"],
      ["Refunds", "refund-policy.html"],
      ["Accessibility", "accessibility.html"]
    ].forEach(function (item) {
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.href = item[1];
      link.textContent = item[0];
      li.appendChild(link);
      list.appendChild(li);
    });
    container.appendChild(list);
  }

  function improveExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
      var rel = (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      ["noopener", "noreferrer"].forEach(function (value) {
        if (rel.indexOf(value) === -1) rel.push(value);
      });
      link.setAttribute("rel", rel.join(" "));
    });
  }

  function init() {
    addSkipLink();
    addLegalLinks();
    improveExternalLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
