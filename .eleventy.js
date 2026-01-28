const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"); 
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  console.log("✅ Loaded .eleventy.js, registering plugins and filters");

  // ✅ RSS Feed Plugin
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "gardenandprojects", // must match collection name exactly, see Collections below
      limit: 20, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Questadon",
      subtitle: "Questions, experiments, and creations as Sarah Brown (that's me) adventures through a world of code.",
      base: "https://questadon.com/",
      author: {
        name: "Sarah Brown",
        email: "", // Optional
      }
    }
  });

  // ✅ Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight); // 

  // ✅ Custom filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("MMMM d, yyyy");
  });
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });
  eleventyConfig.addFilter("year", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });

  // ✅ Passthrough files
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-96x96.png");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  // ✅ Collections
  eleventyConfig.addCollection("devGarden", (collection) => {
    const items = collection
      .getFilteredByGlob("./dev-garden/**/*.md")
      .filter((item) => !item.data.eleventyExcludeFromCollections && !item.inputPath.endsWith("index.md"))
      .sort((a, b) => b.date - a.date);
    console.log(`📚 devGarden collection: ${items.length} items found`);
    items.forEach(item => console.log(`   - ${item.fileSlug}: ${item.data.title}`));
    return items;
  });

  eleventyConfig.addCollection("projects", (collection) => {
    const items = collection
      .getFilteredByGlob("./projects/**/*.md")
      .filter((item) => !item.data.eleventyExcludeFromCollections && !item.inputPath.endsWith("index.md"))
      .sort((a, b) => b.date - a.date);
    console.log(`📚 projects collection: ${items.length} items found`);
    items.forEach(item => console.log(`   - ${item.fileSlug}: ${item.data.title}`));
    return items;
  });

  eleventyConfig.addCollection("gardenandprojects", (collection) => {
    return [
      ...collection
        .getFilteredByGlob([
          "./dev-garden/**/*.md",
          "./projects/**/*.md",
        ])
        .filter((item) => !item.data.eleventyExcludeFromCollections && !item.inputPath.endsWith("index.md"))
        .sort((a, b) => b.date - a.date),
    ];
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};