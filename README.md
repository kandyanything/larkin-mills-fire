# Fire department website template

A complete one-page site for a volunteer fire department or fire company. Open `index.html` in a browser to view it. No build step and no server are needed.

The sample content is fictional: Larkin Mills, its officers, its businesses and its phone numbers are invented, and the photos are computer-generated.

## Make it a new department

Edit one file: `data/site.js`.

| Change | Where |
|---|---|
| Town, headquarters station, founding year | `town`, `station`, `founded` |
| Department name pattern | `companyTemplate`, `shortTemplate` |
| Button and link color | `accent` |
| Emblem | `emblemStyle: "wheel"` is the roundel crest. Remove the line for the fire-service cross with the station number. |
| Address, phones, drill night | `contact` |
| Stations | `stations.items` (any number; delete the block to hide the section) |
| Every section's wording | the matching block (`hero`, `tasks`, `calls`, `join`, ...) |

Write `{town}`, `{company}`, `{short}` and `{station}` in any text and they are filled in.

## Photos and video

Photos live in `images/` and are named in `data/site.js`. Replace a file, or point the setting at a new one.

| Slot | Setting | Size |
|---|---|---|
| Hero | `hero.photo`, `hero.photoAlt` | 1600 x 900 or larger. The headline sits bottom left, so keep that corner calm. |
| Stations | `stations.items[].photo` | 1600 x 900 |
| Apparatus | `apparatus.rigs[].photo` | 1600 x 900 |
| Officers | `officers.line[].photo` | 800 x 1000, head and shoulders |
| Chief | `officers.chief.portrait`, `officers.chief.uniform` | 800 x 1000 each. The portrait leads; the dress uniform sits beside the chief's message. Either can be left out. |
| Turnout gear | `join.gear.photo` | 1448 x 1086 here; any 4:3 photo works. See "The gear photo" below. |
| Gallery | `gallery.items[]` | 1600 x 1200. Hidden while the list is empty. |
| Film | `join.film.src`, `join.film.poster` | 1280 x 720 MP4 and a JPG poster |

If computer-generated pictures are used in a sales demo, replace them with real photos before a real department goes live. Residents will assume the people shown are their firefighters.

### No photos yet? The site draws its own

Leave any `photo` empty and the site draws that picture in code (`js/art.js`), lettered with the town name:

- `hero.photo: ""` shows an illustrated firehouse whose bay doors roll up.
- A rig with `photo: ""` shows a side-view drawing chosen by `type`: `engine`, `tower`, `rescue`, `tanker` or `brush`, painted from `livery`.
- An officer with `photo: ""` and a `look` block gets an illustrated portrait:
  `look: { skin: 0-5, hair: "black|brown|blond|gray|white|red", style: "crop|part|fringe|bald|curly|long|bob|bun", cap: "white|navy", uniform: "classA|polo|job", mustache: true, beard: true, glasses: true }`

Set `templateControls: true` to show a panel that renames the town and repaints the drawn rigs live. It is a sales tool for the illustrated version; keep it off when photos are in place.

### The gear photo

The Join section shows `join.gear.photo`. When a visitor types a surname, the site letters it onto the coat's name panel and moves the view in on it. That part is fitted to one photo, by measuring in pixels:

- `gear.name.blank` is a small cut-out of the name panel with its lettering painted out, and `box` is where it sits on the photo.
- `gear.name.arc` is the curve the lettering follows, `size` its height, `max` the widest it may run and `color` the thread colour.
- `gear.zoom` is the part of the photo the view moves in on: left, top, width, height.

A new photo needs a new cut-out and new numbers. To skip that, delete `name` and `zoom`: the photo shows as it is and the typing box goes away.

Delete `gear` altogether and the site draws a turnout coat instead, lettered with the town name, `coatLine`, the department emblem and the typed surname. Add `coatShell: "#2B2B2E"` for a black shell.

## Motion

The dark sections have a moving background: gold embers that drift upward, platinum glints, and a slow light that crosses the gold buttons, the history years, the grey sections and the reflective trim on the coat. It is drawn by `js/fx.js` and the "background motion" block in `css/site.css`.

- `motion: { density: 1 }` in `data/site.js` sets how many embers there are. Try `0.6` for quieter, `1.5` for busier.
- `motion: false` switches all of it off.
- Visitors get a "Pause motion" button in the hero and the footer, and the choice is remembered on their device.
- Nothing moves for visitors whose device is set to reduce motion.

## Sponsors

- `partners.top`: banner ads under the hero. Up to three rotate every `rotateSeconds`, with pause and dot controls. Set `active: false` to pause one.
- `partners.wall`: every partner, by tier. Give a partner a `logo` (a square SVG or PNG in `images/partners/`) and it shows beside the name, in the wall and in the banner.
- `partners.tiers`: the price sheet.
- `events.items[].sponsor`: a "Sponsored by" credit on a single event.
- `partners.disclosure`: shown under the wall. Keep it.
- Partner links that start with `http` get `utm_source` and `utm_medium` added from `partners.utm`.

Sponsor money belongs on a volunteer organization's own site (a nonprofit). If the customer is a government department, have its attorney approve sponsor placements first.

## Wire these up before launch

These work as demos only and say so on screen:

- Contact form: point it at a form service or the department's mail handler.
- Donate button: link it to the department's payment page.
- Members' area: connect a sign-in, or link to the existing member system.
- Latest calls: `calls.recent` is typed by hand here. It can be fed from a dispatch export later.

Also remove the `sampleBanner` line and the sample text in `footer.sample`, and turn the notice bar on or off with `alert.active`.

## Deploy

- **Cloudflare Worker** named `larkin-mills-fire`, serving this folder as static files. There is no build step.
- Publish from this folder with `npx wrangler deploy`, or connect the repo to the Worker in the Cloudflare dashboard so every push to `main` publishes.
- Preview address: `https://larkin-mills-fire.kandyanything.workers.dev`. Add a custom domain in the Worker's settings when there is one.
- `wrangler.toml` holds the settings, `_headers` sets caching, and `.assetsignore` keeps the README and build script off the site.
- This sample is hidden from search engines three ways: the `robots` meta tag in `index.html`, `robots.txt`, and the `X-Robots-Tag` rule in `_headers`. Remove all three for a real department.
- Link previews use the full address in the `og:image` tag in `index.html`. Change it if the site moves to another address.

## Files

```
index.html        page shell
data/site.js      all content and settings (edit this)
images/           photos: stations, rigs, officers, gallery
media/            the 20-second film and its poster
js/art.js         drawings: emblem, coat, helmet shields, map, icons, and the fallback rigs, firehouse and portraits
js/fx.js          moving background: embers and glints behind the dark sections
js/site.js        builds the page from the data and handles clicks
css/site.css      design
css/fonts.css     self-hosted fonts (Archivo Black, Bitter, Source Sans 3; SIL Open Font License)
404.html          shown for a wrong address
wrangler.toml     Cloudflare settings (also _headers and .assetsignore)
build.py          optional: packs everything into one HTML file for emailing a preview
```
