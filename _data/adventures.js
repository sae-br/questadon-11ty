const fs = require("fs");
const path = require("path");

// The four Final Light adventure zines. Each one has its own QR code printed
// in the zine, pointing at /r/<token>/ (adventure-qr.njk), which forwards to
// that adventure's unlisted resources page (adventure-resources.njk).
//
// The token is random so nobody can guess the URLs. It is printed in the QR
// codes, so never change it once a zine has gone to print.
//
// Files: drop them in downloads/adventures/<label>-<token>/ and they appear
// on the page on the next build, in filename order. The filename becomes the
// title, so name them the way they should read: "01 Ferry Deck Map.pdf"
// shows as "Ferry Deck Map".
const adventures = [
  { label: "maid", title: "Maid of the Mist", token: "mqa2wurgfz" },
  { label: "walls", title: "The Walls Around Us", token: "syzne5fqbm" },
  { label: "terminal", title: "Terminal Departure", token: "779sewx5mr" },
  { label: "home", title: "No Place Like Home", token: "cuhrfghfnq" },
];

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  return Math.max(1, Math.round(bytes / 1024)) + " KB";
}

// Strip the extension and any leading "01 " / "01-" sort prefix, turn dashes
// and underscores into spaces, and capitalize each word: "map-chalet.png"
// shows as "Map Chalet".
function titleFromFilename(name) {
  return path
    .parse(name)
    .name.replace(/^\d+[\s._-]+/, "")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

module.exports = adventures.map((adventure) => {
  const folder = `${adventure.label}-${adventure.token}`;
  const dir = path.join(__dirname, "..", "downloads", "adventures", folder);
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((name) => !name.startsWith(".")).sort()
    : [];

  return {
    ...adventure,
    folder,
    shortUrl: `/r/${adventure.token}/`,
    pageUrl: `/final-light/adventures/${folder}/`,
    resources: files.map((name) => ({
      title: titleFromFilename(name),
      file: `/downloads/adventures/${folder}/${encodeURIComponent(name)}`,
      fileName: name,
      details: `${path.extname(name).slice(1).toUpperCase()} · ${formatSize(
        fs.statSync(path.join(dir, name)).size
      )}`,
    })),
  };
});
