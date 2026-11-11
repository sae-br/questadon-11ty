// Product page "On this page" list: marks the section you're reading.
// The current section is the last heading that has scrolled past the top
// third of the screen. Without JS the links still jump; they just don't
// highlight.
document.addEventListener("DOMContentLoaded", function () {
  var links = Array.prototype.slice.call(
    document.querySelectorAll(".product__toc a[href^='#']")
  );
  var targets = links
    .map(function (link) { return document.getElementById(link.hash.slice(1)); })
    .filter(Boolean);
  if (!targets.length) return;

  var ticking = false;

  function update() {
    ticking = false;
    var line = window.innerHeight * 0.33;
    var current = null;
    targets.forEach(function (target) {
      if (target.getBoundingClientRect().top < line) current = target.id;
    });
    links.forEach(function (link) {
      if (current && link.hash === "#" + current) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
});
