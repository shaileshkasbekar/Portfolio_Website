/* =========================================================
   PROFILE LINKS: edit these values
   ---------------------------------------------------------
   Paste your full URLs between the quotes. Any link left
   empty ("") stays hidden on the site, so nothing is broken.
   ========================================================= */
const PROFILE_LINKS = {
  linkedin: "https://www.linkedin.com/in/shailesh-kasbekar-2306862a0/",
  github: "https://github.com/shaileshkasbekar",
  leetcode: "https://leetcode.com/u/shailesh888/",
  gfg: "https://www.geeksforgeeks.org/profile/shaileshka40b9?tab=activity",
  hackerrank: "",    // optional: HackerRank profile URL
  atsRepo: "https://github.com/shaileshkasbekar/ATS-Resume-Analyzer",
  // Repo is private for now. Once it's public, paste the URL below:
  // https://github.com/shaileshkasbekar/MiniDBMS
  minidbmsRepo: ""
};

(function () {
  "use strict";

  /* ---------- Apply profile links ---------- */
  document.querySelectorAll("[data-link]").forEach(function (el) {
    const url = (PROFILE_LINKS[el.dataset.link] || "").trim();
    if (/^https:\/\//i.test(url)) {
      el.href = url;
      el.hidden = false;
    }
  });

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Navbar: scrolled state ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = function () {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  const setMenu = function (open) {
    menu.classList.toggle("open", open);
    navbar.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", function () {
    setMenu(!menu.classList.contains("open"));
  });
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
  document.addEventListener("click", function (e) {
    if (menu.classList.contains("open") && !navbar.contains(e.target)) setMenu(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 880) setMenu(false);
  });

  /* ---------- Active section highlight ---------- */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) {
      // Stagger siblings inside grids for a smoother cascade
      const siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
      const index = Array.prototype.indexOf.call(siblings, el);
      if (index > 0) el.style.transitionDelay = Math.min(index * 80, 400) + "ms";
      revealer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Copy email ---------- */
  const toast = document.getElementById("toast");
  let toastTimer;
  const showToast = function (msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  };

  const copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const email = copyBtn.dataset.email;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
          .then(function () { showToast("Email copied to clipboard"); })
          .catch(function () { showToast(email); });
      } else {
        showToast(email);
      }
    });
  }
})();
