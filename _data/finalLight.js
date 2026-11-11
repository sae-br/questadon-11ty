// Structured content for the Final Light product page
// (projects/final-light-ttrpg.md). Anything that repeats, or that needs filling
// in later (prices, store URLs, images), lives here so the page template never
// has to change.
//
// Copy is final: keep curly quotes (’ “ ”), en dashes in ranges (2–4) and
// unspaced em dashes (word—word) exactly as they are.
//
// Fields that hold HTML (`html`, `answerHtml`) may use <em> for titles.

const site = require("./site.js");

// Book spreads. `src` is a path for the image pipeline, e.g.
// "./assets/post-images/final-light/spread-14-15.jpg". Until a file is set,
// the page shows a marked placeholder on local builds and deploy previews and
// nothing at all in production.
const spreads = {
  opener: {
    src: "./assets/post-images/final-light/spread-14-15-just-humans-wearing-backpacks.jpg",
    label: "Spread pp. 14–15",
    alt: "Core Book spread: “Just Humans Wearing Backpacks” with an illustrated survivor holding a flashlight, and “Narrative Play and Encounters”",
  },
  scavenging: {
    src: "./assets/post-images/final-light/spread-24-25-health-and-scavenging.jpg",
    label: "Spread pp. 24–25",
    alt: "Core Book spread: Health Levels and Scavenging rules, with a worked example showing a d20 and four d4s",
  },
  encounters: {
    src: "./assets/post-images/final-light/spread-50-51-areas-and-visibility.jpg",
    label: "Spread pp. 50–51",
    alt: "Core Book spread: Areas & Movement and Visibility & Line of Sight, with an encounter map of a store",
  },
  stakes: {
    src: "./assets/post-images/final-light/spread-16-17-characters-and-personal-stakes.jpg",
    label: "Spread pp. 16–17",
    alt: "Core Book spread: Characters & Personal Stakes, with a partly filled character sheet and its Personal Stakes section covered by a note reading “Secret Stuff”",
  },
};

// The Local Anaesthetic actual play. The ID is the part after "v=" in the
// YouTube URL (youtube.com/watch?v=HE4DHv3toXA).
const video = {
  youtubeId: "HE4DHv3toXA",
  title: "Final Light: Local Anaesthetic actual play",
};

// Zine covers are optional: set `cover` to an image path and the card shows it.
const adventures = [
  {
    title: "Maid of the Mist",
    place: "Niagara Falls, Canada",
    blurb: "Winter is coming, and the hydro grid the settlement’s medical centre relies on has gone down. What went wrong? You’ll have to travel to New Falls to find out—and you’ll find far more than you bargained for.",
    cover: "",
  },
  {
    title: "No Place Like Home",
    place: "Jasper National Park, Canada",
    blurb: "Far from the cities, far from the people, there might be somewhere safe. But deep in the Rockies the world has changed too. Will you find what you’re looking for—or will something else find you?",
    cover: "",
  },
  {
    title: "Terminal Departure",
    place: "Kansas City, United States",
    blurb: "A mid-America transportation hub is now the front line of a faction war. Precious cargo came in on the train. Now it’s a race to survive, through the dead and the living.",
    cover: "",
  },
  {
    title: "The Walls Around Us",
    place: "Castillo de Ponferrada, Spain",
    blurb: "An old Templar castle, and the faction that turned it into the last safe place for miles. Getting inside requires rigorous search and vetting... but that might be the easy part. These walls keep a lot of things in.",
    cover: "",
  },
];

// The buy table: the Core Book, then each adventure by name, in the same
// order as the adventure cards. A product with no price shows "Coming soon";
// once `url` is set, the product name links to where it's sold.
// TODO(sarah): prices for all five products.
// TODO(sarah): buy URLs for all five products.
// TODO(sarah): "Start here" recommendation above the buy table.
const products = [
  {
    name: "Final Light Core Book",
    html: "PDF or A4 hardback",
    price: "",
    url: "",
  },
  ...adventures.map((adventure) => ({
    name: `${adventure.title}: A Final Light Adventure`,
    html: "PDF or printed zine",
    price: "",
    url: "",
  })),
];

// One source for the visible FAQ and its FAQPage JSON-LD, so they can't drift.
const faq = [
  {
    question: "Who’s it for?",
    answerHtml: "Groups who want tense, nerve-wracking survival over heroic power fantasy: fast encounters that burn through inventory, not hit points; roleplay that matters mechanically; short campaigns with emotional weight.",
  },
  {
    question: "How many people, and how long?",
    answerHtml: "<em>Final Light</em> runs in 3–5 sessions with 2–4 players plus a GM. It’s built to be short and sharp.",
  },
  {
    question: "What do I need to bring?",
    answerHtml: "Two d20s, four d4s, six d6s, a coin, pencil and eraser.",
  },
  {
    question: "Is it hard to learn?",
    answerHtml: "<em>Final Light</em> will feel familiar to play for anyone who has played <em>Dungeons &amp; Dragons</em>, <em>Pathfinder</em>, or other d20-based games.",
  },
  {
    question: "Is this a rules-light game?",
    answerHtml: "Nope. This game is built with medium crunch. The mechanics are there to make the world feel dangerous and believable and personal.",
  },
  {
    question: "Can I run a long campaign?",
    answerHtml: "I created <em>Final Light</em> specifically to be played in short-form adventures. But I do think it could be fun to link some together, and give some suggestions about that in the Core Book.",
  },
  {
    question: "Can I write my own adventures?",
    answerHtml: "You can! A guide for game masters is included.",
  },
  {
    question: "How dark does it get?",
    answerHtml: "<em>Final Light</em> deals with death and grief, body horror, amputation, infection and pandemic, violence between humans, anxiety and panic, chronic and terminal illness, and other sensitive topics. It might not be for everyone, or might not be for people in every season. Each table should discuss what they do and don't want to see in the story they tell.",
  },
];

// Structured data. Product has no `offers` until real prices exist - never
// emit placeholder prices. The image matches the page's social share image
// (`image` in projects/final-light-ttrpg.md front matter).
const productImage = "/assets/post-images/final-light/final-light-core-book-quote.jpg";

function plainText(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Final Light",
      description: "A survival-horror TTRPG for telling short, high-stakes zombie stories like The Last of Us, Train to Busan, 28 Days Later, and more.",
      brand: { "@type": "Brand", name: "Questadon" },
      image: site.url + productImage,
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: plainText(item.answerHtml) },
      })),
    },
  ],
};

module.exports = { spreads, video, adventures, products, faq, jsonLd };
