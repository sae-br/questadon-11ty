# QR codes

Every QR code printed on something physical, where it leads, and how it's tracked.

Every code points at a short URL on questadon.com that we control, never straight at the final destination. Printed copies can't change, but the page behind the short URL can. To send scans somewhere new, edit the file in the **Change it in** column and redeploy. Never reprint.

Each short URL page logs a GA4 event, then forwards the visitor after half a second.

## The codes

| Image file | Printed URL | Leads to | Printed in | Change it in |
|---|---|---|---|---|
| `tshirt-questadon-qr` | `https://questadon.com/r` | `/projects/final-light-ttrpg/` | Final Light t-shirt | [`r.njk`](../../r.njk) |
| `final-light-book-qr` | `https://questadon.com/fl/` | `/final-light/resources/` (character sheets) | Final Light core book | [`fl.njk`](../../fl.njk) |
| `discord-fl-qr` | `https://questadon.com/r/discord-fl` | `https://discord.gg/tt3g2mkRZn` | Core book and Quick Start GM guide, from the next printing | [`discord-fl.njk`](../../discord-fl.njk) |
| `adventure-maid-qr` | `https://questadon.com/r/mqa2wurgfz/` | `/final-light/adventures/maid-mqa2wurgfz/` | *Maid of the Mist* zine | [`_data/adventures.js`](../../_data/adventures.js) |
| `adventure-walls-qr` | `https://questadon.com/r/syzne5fqbm/` | `/final-light/adventures/walls-syzne5fqbm/` | *The Walls Around Us* zine | [`_data/adventures.js`](../../_data/adventures.js) |
| `adventure-terminal-qr` | `https://questadon.com/r/779sewx5mr/` | `/final-light/adventures/terminal-779sewx5mr/` | *Terminal Departure* zine | [`_data/adventures.js`](../../_data/adventures.js) |
| `adventure-home-qr` | `https://questadon.com/r/cuhrfghfnq/` | `/final-light/adventures/home-cuhrfghfnq/` | *No Place Like Home* zine | [`_data/adventures.js`](../../_data/adventures.js) |

The adventure short URLs come from [`adventure-qr.njk`](../../adventure-qr.njk) and the pages from [`adventure-resources.njk`](../../adventure-resources.njk), one of each per entry in `_data/adventures.js`. The random codes in those URLs are printed, so never change them once a zine has gone to print.

**Retired:** the first release of the core book (p.20) and the Quick Start GM guide had a Discord QR that linked straight to `discord.gg/qA95JkSBB`. That invite expired; thankfully only digital copies went out but if it had been printed it would have been unfixable. This is why every code now goes through a short URL.

## Hidden pages

The resources pages are unlisted. Nothing on the site links to them, they're marked `noindex`, and they're left out of collections. The adventure pages also have a random code in the URL so they can't be guessed. Anyone who has the link can still open it, though: there are no logins.

| Page | Files live in |
|---|---|
| `/final-light/resources/` | `downloads/` (listed by hand in [`final-light-resources.njk`](../../final-light-resources.njk)) |
| Each adventure page | `downloads/adventures/<label>-<code>/` (listed automatically from the folder) |

Adventure files: drop them in the folder and they appear on the next build, sorted by filename. The "Download all maps" zip is rebuilt from the folder on every build, so don't add a zip to the folder yourself. The filename becomes the title, without the extension or a leading number: `01 Ferry Deck Map.pdf` shows as "Ferry Deck Map".

## Tracking (GA4)

Analytics only runs on production builds. Local builds and deploy previews send nothing. The measurement ID is in [`_data/site.js`](../../_data/site.js).

### Scans

Every short URL page sends a `qr_code_scan` event. Tell the codes apart with the `qr_code` parameter:

| Code | `qr_code` | UTM tags on the page it forwards to |
|---|---|---|
| T-shirt | *(none)* | `utm_source=tshirt&utm_medium=qr&utm_campaign=prelaunch` |
| Core book | `book` | `utm_source=book&utm_medium=qr&utm_campaign=final-light` |
| Discord | `discord-fl` | none (Discord ignores them, so the event is the only record) |
| Adventures | `adventure-maid`, `adventure-walls`, `adventure-terminal`, `adventure-home` | `utm_source=adventure&utm_medium=qr&utm_campaign=<label>` |

### Downloads

Download buttons on the resources pages send a `resource_download` event:

| Page | Parameters |
|---|---|
| Final Light resources | `file_name` |
| Adventure pages | `file_name`, `adventure` (`maid`, `walls`, `terminal`, `home`) |

On adventure pages, the "Download all maps" button also sends `resource_download`, with the zip's name (e.g. `maid-of-the-mist-maps.zip`) as `file_name`. The View buttons send `resource_view` with the same parameters, so opening a map in the browser isn't counted as a download.

GA4's built-in `file_download` event also fires on these clicks. Use `resource_download` for counts.

### GA4 setup

Event parameters only show up in reports once they're registered as custom dimensions (event scope) under **Admin → Custom definitions**:

- `qr_code`
- `file_name`
- `adventure`

## Adding a new QR code

1. Make the short URL page: copy [`discord-fl.njk`](../../discord-fl.njk) (or [`fl.njk`](../../fl.njk) for a page on this site) and set its `permalink`, `destination`, and `qr_code` value. For another adventure, add an entry to `_data/adventures.js` instead.
2. Generate the image with the [`qrcode`](https://www.npmjs.com/package/qrcode) npm package (error correction M, margin 4, PNG at 2400px wide, plus SVG). Name it `<name>-qr.png` / `.svg` in this folder.
3. Scan it with a phone to check the URL before it goes to print.
4. Add a row to the tables above.
