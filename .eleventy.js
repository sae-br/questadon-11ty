const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const { default: Image, generateHTML } = require("@11ty/eleventy-img");
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
      subtitle: "Games, adventures, and behind-the-scenes notes from Sarah Brown (that's me), who plays, runs, and designs tabletop role-playing games.",
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

    return generateHTML(metadata, imageAttributes);
  });

  // ✅ Hero picture: a wide plate plus an optional tall crop swapped in on
  //    narrow screens, so hero art stays a usable size in portrait.
  eleventyConfig.addShortcode("heroPicture", async function(src, tallSrc, alt, opts) {
    opts = opts || {};
    const sizes = opts.sizes || "100vw";
    const breakpoint = opts.breakpoint || "860px";
    const common = { formats: ["webp", "jpeg"], outputDir: "./_site/img/", urlPath: "/img/" };

    const wide = await Image(src, { widths: [800, 1200, 1800, 2400], ...common });
    const tall = tallSrc ? await Image(tallSrc, { widths: [500, 800, 1200], ...common }) : null;

    const sources = [];
    if (tall) {
      for (const fmt of Object.keys(tall)) {
        const entries = tall[fmt];
        sources.push(`<source media="(max-width: ${breakpoint})" type="${entries[0].sourceType}" srcset="${entries.map(e => e.srcset).join(", ")}" sizes="${sizes}">`);
      }
    }
    const formats = Object.keys(wide);
    for (const fmt of formats.slice(0, -1)) {
      const entries = wide[fmt];
      sources.push(`<source type="${entries[0].sourceType}" srcset="${entries.map(e => e.srcset).join(", ")}" sizes="${sizes}">`);
    }

    const fallback = wide[formats[formats.length - 1]];
    const last = fallback[fallback.length - 1];
    const attrs = [
      `src="${last.url}"`,
      `alt="${(alt || "").replace(/"/g, "&quot;")}"`,
      `width="${last.width}"`,
      `height="${last.height}"`,
      `srcset="${fallback.map(e => e.srcset).join(", ")}"`,
      `sizes="${sizes}"`,
      `loading="${opts.eager ? "eager" : "lazy"}"`,
      `decoding="async"`,
    ];
    if (opts.eager) attrs.push(`fetchpriority="high"`);

    return `<picture>${sources.join("")}<img ${attrs.join(" ")}></picture>`;
  });

  // ✅ Passthrough files
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-96x96.png");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  // ✅ Collections
  eleventyConfig.addCollection("posts", (collection) => {
    return collection
      .getFilteredByGlob("./posts/**/*.md")
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
          "./posts/**/*.md",
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