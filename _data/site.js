module.exports = {
    currentYear: new Date(),
    url: "https://questadon.com",
    name: "Questadon",
    defaultSocialImage: "/assets/social-share.jpg",

    // The Questadon Discord invite. Must be set to never expire. Site links
    // use it directly; the QR code in the books goes through /r/discord-fl/
    // (discord-fl.njk), which counts the scan and then forwards here.
    discordUrl: "https://discord.gg/tt3g2mkRZn",

    // Google Analytics 4 measurement ID. Blank it out to pull the tag from
    // every page at once.
    googleAnalyticsId: "G-M28KM46L5W",

    // Cloudflare Turnstile site key for the Final Light signup forms. Public by
    // design (it ships in the page). Set TURNSTILE_SITE_KEY in Netlify alongside
    // TURNSTILE_SECRET_KEY; while it's unset the widget simply isn't rendered.
    turnstileSiteKey: (process.env.TURNSTILE_SITE_KEY || "").trim(),

    // Netlify sets CONTEXT=production only when it builds the production
    // branch. Deploy previews, branch deploys and anything run locally all
    // fall through to false, which keeps our own traffic out of the reports.
    isProduction: process.env.CONTEXT === "production"
  };
