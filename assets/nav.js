// Mobile navigation: the hamburger opens the links as a dropdown under the
// header. Escape or a click outside closes it again.
document.addEventListener("DOMContentLoaded", function () {
  // Rebuild email addresses written with the {% email %} shortcode (kept out
  // of the HTML so address-harvesting bots don't find them).
  document.querySelectorAll(".js-email[data-user]").forEach(function (el) {
    var address = el.dataset.user + "@" + el.dataset.domain;
    var link = document.createElement("a");
    link.href = "mailto:" + address;
    link.textContent = address;
    el.replaceWith(link);
  });

  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".site-nav__links");
  if (!navToggle || !navLinks) return;

  function setOpen(isOpen) {
    navLinks.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  }

  navToggle.addEventListener("click", function () {
    setOpen(!navLinks.classList.contains("open"));
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      setOpen(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!navLinks.classList.contains("open")) return;
    if (navLinks.contains(event.target) || navToggle.contains(event.target)) return;
    setOpen(false);
  });
});
