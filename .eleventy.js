const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

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
      subtitle: "Questions, experiments, and creations as Sarah Brown (that's me) adventures through code and dice rolls.",
      base: "https://questadon.com/",
      author: {
        name: "Sarah Brown",
        email: "", // Optional
      }
    }
  });

  // ✅ Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // ✅ Markdown with anchor IDs
  const md = markdownIt({ html: true }).use(markdownItAnchor);
  eleventyConfig.setLibrary("md", md); 

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

  // ✅ Image shortcode
  eleventyConfig.addShortcode("image", async function(src, alt, sizes = "900px") {
    let metadata = await Image(src, {
      widths: [450, 900, 1800],
      formats: ["webp", "png"],
      outputDir: "./_site/img/",
      urlPath: "/img/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // ✅ Passthrough files
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-96x96.png");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  // ✅ Collections
  eleventyConfig.addCollection("digitalGarden", (collection) => {
    return collection
      .getFilteredByGlob("./digital-garden/**/*.md")
      .filter((item) => !item.data.eleventyExcludeFromCollections && !item.inputPath.endsWith("index.md"))
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("projects", (collection) => {
    return collection
      .getFilteredByGlob("./projects/**/*.md")
      .filter((item) => !item.data.eleventyExcludeFromCollections && !item.inputPath.endsWith("index.md"))
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("gardenandprojects", (collection) => {
    return [
      ...collection
        .getFilteredByGlob([
          "./digital-garden/**/*.md",
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