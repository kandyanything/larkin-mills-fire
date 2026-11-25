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

## Sponsors

- `partners.top`: banner ads under the hero. Up to three rotate every `rotateSeconds`, with pause and dot controls. Set `active: false` to pause one.
- `partners.wall`: every partner, by tier.
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
js/site.js        builds the page from the data and handles clicks
css/site.css      design
css/fonts.css     self-hosted fonts (Archivo Black, Bitter, Source Sans 3; SIL Open Font License)
404.html          shown for a wrong address
wrangler.toml     Cloudflare settings (also _headers and .assetsignore)
build.py          optional: packs everything into one HTML file for emailing a preview
```
