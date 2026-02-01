document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".site-nav__links");
  
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      });
    }
  
    // === Theme toggle code starts here ===
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    const userTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Helper to update button accessibility attributes
    function updateToggleAccessibility(theme) {
      if (!themeToggle) return;
      const isDark = theme === "dark";
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      themeToggle.setAttribute("aria-pressed", isDark ? "false" : "true");
    }

    // Set initial theme
    const initialTheme = userTheme === "dark" || (!userTheme && systemDark) ? "dark" : "light";
    root.setAttribute("data-theme", initialTheme);
    updateToggleAccessibility(initialTheme);

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateToggleAccessibility(next);
      });
    }
    // === Theme toggle code ends here ===

    // === Floating back-to-top button ===
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
      // Show/hide button based on scroll position
      window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      });

      // Smooth scroll to top on click
      backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
    // === Floating back-to-top ends here ===
  });