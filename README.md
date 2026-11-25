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
| Chief | `officers.chief.portrait`, `officers.chief.uniform` | Portrait 1000 x 1000 (shown square), uniform 800 x 1000. The portrait leads; the dress uniform sits beside the chief's message. Either can be left out. |
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

## The welcome

When someone opens the site, the department's badge is on fire. A hose stream comes in from the corner and knocks the fire down, steam comes off the badge, and the welcome message opens. Visitors can aim the hose with the mouse or a finger; left alone it finds the fire by itself in about five seconds. It is drawn by `js/welcome.js` and the "welcome popup" block in `css/site.css`.

- The flames are computed in the browser from the outline of whichever badge the site uses, so a new department's patch burns in its own shape. There is no video or picture file to make.
- `welcome` in `data/site.js` holds the title, the text, the three links and the button label.
- It opens on every visit until the visitor ticks "Don't show this again" in the popup; closing it any other way leaves it on for next time. `once: true` shows it a single time instead, and `on: false` switches it off.
- Change `id` (say from `"launch"` to `"spring-drive"`) to bring it back for everyone who ticked the box, for a new message.
- Add `?welcome` to the address to play it on demand, or use "Play the welcome again" in the footer.
- "Skip the fire", the close button, the Esc key and a click outside all get past it.
- Visitors whose device is set to reduce motion, or who pressed "Pause motion", get the badge and the message with no fire.

## More sections and tools

All of these live in `js/plus.js` and the two "more:" blocks in `css/site.css`. Each is switched on by its entry in `data/site.js`; delete the entry and the block disappears.

| Entry in `data/site.js` | What visitors get | What it needs before it is real |
| --- | --- | --- |
| `feed` | The department's latest social posts, with photos | A connection to its Facebook and Instagram pages. Until then the posts are typed into the data file. |
| `year` | Training and volunteer hours, and their dollar value to taxpayers | The department's own figures, and the current value of a volunteer hour in `worth.rate` |
| `neighbors` | Members shown with their day jobs | Real members, with their say-so. Add `photo:` to replace the initials. |
| `lake` | A status sign, an ice-thickness guide and what to do if someone goes through | The department's review of the wording. `status.level` is `off`, `caution` or `ok`. |
| `weather` | Live alerts from the National Weather Service under the top strip | Only the coordinates. Add `?alert` to the address to see a sample on a quiet day. |
| `santa` | A map that follows the engine on Santa night | A phone on the engine sharing its position. Until then the engine runs a made-up loop. |
| `support.monthly`, `support.qr` | Monthly giving and a scan-to-give code for the mailed letter | A payment page. The code is made in the browser and always points at wherever the site is hosted. |
| `support.signs` | Reflective house-number signs with a live preview | Order taking and payment |
| `join.apply` | The "tell us you're interested" form | Delivery to the membership chair by email and text |
| `partners.report` | A sample of the monthly report each partner gets | Counting of views and clicks. The numbers shown are generated for show. |
| `date` on an event | An "Add to calendar" button | Nothing. It works now. |
| `tour` | A guided tour of the site for showing it to a department | Your price in `tour.offer.price` and your details in `tour.offer.contact` |

The tour starts from the label across the top of the page, or by adding `?tour` to the address. It moves on by itself every `tour.seconds`, waits while the mouse is on the card, and ends on a panel that adds up the partner wall (`partners.wall` at the `partners.tiers` prices) against your price.

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
js/welcome.js     the welcome popup: the burning badge and the hose
js/plus.js        the feed, the year, neighbors, lake and ice, Santa night, giving extras, forms, the partner report and the tour
js/site.js        builds the page from the data and handles clicks
css/site.css      design
css/fonts.css     self-hosted fonts (Archivo Black, Bitter, Source Sans 3; SIL Open Font License)
404.html          shown for a wrong address
wrangler.toml     Cloudflare settings (also _headers and .assetsignore)
build.py          optional: packs everything into one HTML file for emailing a preview
```
