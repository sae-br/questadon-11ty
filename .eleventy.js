const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"); 
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  console.log("✅ Loaded .eleventy.js, registering plugins and filters");

module.exports = function (eleventyConfig) { // RSS Feed Plugin
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "dev-garden", // iterate over `collections.posts`
			limit: 20,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Questadon",
			subtitle: "Questions, experiments, and creations as Sarah Brown (that's me) adventures through a world of code.",
			base: "https://www.questadon.com/",
			author: {
				name: "Sarah Brown",
				email: "", // Optional later
			}
		}
	});
};

  // ✅ Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight); // 

  // ✅ Custom filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("MMMM d, yyyy");
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
    return collection
      .getFilteredByGlob("./dev-garden/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

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