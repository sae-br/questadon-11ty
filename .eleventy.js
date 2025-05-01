const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Filter to format the current year
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });

  // Passthrough copy for assets and favicon
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon-32.png");
  eleventyConfig.addPassthroughCopy("favicon-192.png");

  // Custom collection for Dev Garden posts, sorted newest first
  eleventyConfig.addCollection("devGarden", function(collection) {
    return collection.getFilteredByGlob("./dev-garden/**/*.md").sort((a, b) => b.date - a.date);
  });

  // Custom collection for Projects, sorted newest first
  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("./projects/**/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};