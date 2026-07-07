/**
 * SIFF Digital Hub — shared behaviour for every page.
 * Reads links.json once and applies any real (non-placeholder) URLs to
 * elements marked with data-link-key="path.to.value". Every element already
 * carries a working hardcoded href in the HTML, so the site works even if
 * this script or the fetch fails — this only overrides hrefs when
 * links.json has been edited.
 */
(function () {
  "use strict";

  function resolvePath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  function isPlaceholder(value) {
    return typeof value === "string" && value.trim().toUpperCase().startsWith("PLACEHOLDER");
  }

  function applyLinks(data) {
    document.querySelectorAll("[data-link-key]").forEach(function (el) {
      var key = el.getAttribute("data-link-key");
      var value = resolvePath(data, key);

      if (typeof value !== "string" || !value) return;

      if (isPlaceholder(value)) {
        el.classList.add("is-placeholder");
        el.setAttribute("aria-disabled", "true");
        el.setAttribute("title", "This link has not been set yet. Add it in links.json.");
        return;
      }

      if (el.tagName === "A") {
        el.setAttribute("href", value);
      }
    });

    document.querySelectorAll("[data-text-key]").forEach(function (el) {
      var key = el.getAttribute("data-text-key");
      var value = resolvePath(data, key);
      if (typeof value === "string" && value) {
        el.textContent = value;
      }
    });
  }

  function setCopyrightYear() {
    var yearEl = document.getElementById("copyYear");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    setCopyrightYear();

    fetch("links.json")
      .then(function (res) {
        if (!res.ok) throw new Error("links.json not found");
        return res.json();
      })
      .then(applyLinks)
      .catch(function () {
        /* Silently keep the hardcoded fallback hrefs already in the HTML. */
      });
  });
})();
