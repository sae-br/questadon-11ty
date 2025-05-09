const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  // Log to confirm this config file is loaded
  console.log("✅ Loaded .eleventy.js, registering plugins and filters");

  // Register Eleventy Navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Filter to format the current year
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });

  // Passthrough copy for assets and favicons
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-96x96.png");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  // Custom collection for Dev Garden posts, sorted newest first
  eleventyConfig.addCollection("devGarden", (collection) => {
    return collection
      .getFilteredByGlob("./dev-garden/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Custom collection for Projects, sorted newest first
  eleventyConfig.addCollection("projects", (collection) => {
    return collection
      .getFilteredByGlob("./projects/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
