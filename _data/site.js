module.exports = {
    currentYear: new Date(),
    url: "https://questadon.com",
    name: "Questadon",
    defaultSocialImage: "/assets/social-share.jpg",

    // Google Analytics 4 measurement ID. Blank it out to pull the tag from
    // every page at once.
    googleAnalyticsId: "G-M28KM46L5W",

    // Netlify sets CONTEXT=production only when it builds the production
    // branch. Deploy previews, branch deploys and anything run locally all
    // fall through to false, which keeps our own traffic out of the reports.
    isProduction: process.env.CONTEXT === "production"
  };
