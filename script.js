/* J Gupta careers portal: small progressive enhancements only.
   The page works fully without this file. No data is collected here. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  var mobileQuery = window.matchMedia("(max-width: 960px)");

  function setOpen(open, returnFocus) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.querySelector(".nav-toggle-label").textContent = open ? "Close" : "Menu";
    nav.classList.toggle("is-open", open);
    if (open) {
      var first = nav.querySelector("a");
      if (first) first.focus();
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true", false);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && mobileQuery.matches) setOpen(false, false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false, true);
      }
    });

    document.addEventListener("click", function (event) {
      if (
        toggle.getAttribute("aria-expanded") === "true" &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setOpen(false, false);
      }
    });

    var onBreakpoint = function (event) {
      if (!event.matches) setOpen(false, false);
    };
    if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", onBreakpoint);
    else if (mobileQuery.addListener) mobileQuery.addListener(onBreakpoint);
  }

  /* ---------- Header border on scroll ---------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var ticking = false;
    var update = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ---------- Gentle reveal on scroll ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll("[data-reveal]");
  if (!reduceMotion && "IntersectionObserver" in window && items.length) {
    var viewport = window.innerHeight || root.clientHeight;
    var pending = [];
    Array.prototype.forEach.call(items, function (el) {
      // Anything already on screen stays visible, so there is no flash on load.
      if (el.getBoundingClientRect().top < viewport * 0.95) el.classList.add("is-visible");
      else pending.push(el);
    });
    root.classList.add("js-reveal");

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    pending.forEach(function (el) { observer.observe(el); });

    // Safety net: never leave content hidden, for example when printing or jumping to a link.
    window.addEventListener("beforeprint", function () {
      pending.forEach(function (el) { el.classList.add("is-visible"); });
    });
    window.addEventListener("hashchange", function () {
      pending.forEach(function (el) { el.classList.add("is-visible"); });
    });
  }
})();
