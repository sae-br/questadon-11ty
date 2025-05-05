document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".site-nav__links");
  
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
      });
    }
  
    // === Theme toggle code starts here ===
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;
  
    const userTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    if (userTheme === "dark" || (!userTheme && systemDark)) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
  
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });
    }
    // === Theme toggle code ends here ===
  });