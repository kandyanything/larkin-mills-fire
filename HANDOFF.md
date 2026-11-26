# Handoff notes: fire department websites

Last updated November 26, 2026 (afternoon: Newark added). Read this first in a new session. It covers every site, where the
code is, how it is published, what is real and what is a placeholder, and what comes next.

---

## 1. Start here (for a new Claude session)

**GitHub** (owner `kandyanything`, both repos public):

| Repo | What it holds |
| --- | --- |
| `kandyanything/larkin-mills-fire` | Larkin Mills sample (design 1 and design 2), the saved first version of design 2, both Pequannock concepts and both Newark concepts. **This file lives here.** |
| `kandyanything/white-meadow-lake-fire-concept` | White Meadow Lake Fire Company 5 concept (design 1) |

Branch `design-2-bay-doors-v1` in `larkin-mills-fire` keeps the first version of design 2.

**Get set up:**

    git clone https://github.com/kandyanything/larkin-mills-fire.git /home/claude/larkin-mills-fire
    git clone https://github.com/kandyanything/white-meadow-lake-fire-concept.git /home/claude/white-meadow-lake-fire
    cd /home/claude/larkin-mills-fire && python3 -m http.server 8765      # then open http://localhost:8765/

To push, attach each repo to the session with push access (the add_repo tool, access "push").

**Publishing.** Both repos are connected to Cloudflare Workers Builds. A push to `main` goes live in
about three minutes. No build step; `wrangler.toml` serves the repo folder as static files.
Check a build:

    gh api repos/kandyanything/larkin-mills-fire/commits/<sha>/check-runs \
      --jq '.check_runs[] | "\(.name): \(.status) \(.conclusion)"'

The owner hosts on **Cloudflare, not Netlify**.

**Commits:** `git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit ...`, ending
the message with that session's attribution lines, then `git -c push.negotiate=true push origin main`.

**Checks:** browser test scripts are in `tools/tests/` (see its README). `tools/` and this file are
listed in `.assetsignore`, so they are not published.

---

## 2. The business, and how the owner likes to work

- Builds stand-alone websites for volunteer fire companies (and later police PBAs) to sell to them.
  Money comes from the company paying for the site and from local sponsors ("partners") shown on it.
- Samples first, then pitch sites ("concepts") for real companies, copied from a template.
- **Concept sites must never pass for the real thing:** a bar at the top and a label in the corner
  say "Website concept, not the official site", search engines are kept out, forms send nothing,
  and every section with invented content carries a "Sample" tag saying what is real.
- Use as much real content as can be found (the company's own site and posts). Placeholder
  numbers and text are fine, as long as they are tagged Sample.
- The owner makes photos in ChatGPT (firehouse renders, gear, uniforms) and sends them. Claude
  does design, content and code.
- The owner confirms when a template is "done" before the next build starts.
- Writes short messages; expects the work to be done and checked without a lot of questions.

---

## 3. Every site

| Site | Folder | Live address | Design |
| --- | --- | --- | --- |
| Larkin Mills Fire Department (fictional sample) | `larkin-mills-fire/` root | https://larkin-mills-fire.kandyanything.workers.dev/ | 1 |
| Larkin Mills, design 2 | `design-2/` | https://larkin-mills-fire.kandyanything.workers.dev/design-2/ | 2 |
| Larkin Mills, design 2 first version (five rolling station doors) | `design-2-doors-v1/` (and branch `design-2-bay-doors-v1`) | https://larkin-mills-fire.kandyanything.workers.dev/design-2-doors-v1/ | 2, old top |
| **Pequannock Township Engine Company #1**, design 2 | `pequannock-engine-1/` | https://larkin-mills-fire.kandyanything.workers.dev/pequannock-engine-1/ | 2 |
| **Pequannock Township Engine Company #1**, design 1 | `pequannock-engine-1/design-1/` | https://larkin-mills-fire.kandyanything.workers.dev/pequannock-engine-1/design-1/ | 1 |
| **White Meadow Lake Fire Company 5** (Rockaway Township) | `white-meadow-lake-fire-concept` repo root | https://white-meadow-lake-fire-concept.kandyanything.workers.dev/ | 1 |
| **Newark Fire Division** (career city department), design 2 | `newark-fire/` | https://larkin-mills-fire.kandyanything.workers.dev/newark-fire/ | 2 |
| **Newark Fire Division**, design 1 | `newark-fire/design-1/` | https://larkin-mills-fire.kandyanything.workers.dev/newark-fire/design-1/ | 1 |

Each design links to the other one from the bar at the top ("See design 1" / "See design 2").

Last commits: `larkin-mills-fire` `1e6bfa4`, `white-meadow-lake-fire-concept` `de067ca`.

---

## 4. The two templates

Every site folder is **self-contained**: its own `index.html`, `css/`, `js/`, `fonts/`, `images/`
and `data/site.js`. Code is copied per site, so a fix in one copy does not reach the others.

| | Design 1 | Design 2 |
| --- | --- | --- |
| How it works | One long page you scroll | A firehouse you walk into: each bay door opens its own short page ("bay") |
| First screen | Big photo with the headline (Pequannock: the whole building beside the headline) | The front of the firehouse; pointing at a door lifts it to show what's inside, a click goes in |
| Feel | Dark navy, gold, red accent, drifting gold and platinum sparks (`js/fx.js`) | White, black, reflective yellow, the department's colour |
| Type | Archivo Black, Source Sans 3, Bitter | Big Shoulders Display ("Bay Display"), Public Sans |
| Rigs / officers | Tabs with drawings or photos; officer tiles | Spec sheets; a roster |
| Finding things | Grid of common requests | Search box that filters the requests |

**Newest code for each design** (start new builds from these):
- Design 1: `newark-fire/design-1/` (Pequannock design 1 plus: `sections` and `nav` set the page
  from the data, `headerCta`/`mobileCta`/`mobileCall` replace Donate, donations/events/partners
  optional, many firehouses as searchable cards). For a volunteer company, the Pequannock copy
  `pequannock-engine-1/design-1/` needs fewer switches turned back on. The Larkin Mills root copy has
  no concept mode.
- Design 2: `newark-fire/` (Pequannock design 2 plus: `bays` sets which sections sit behind which
  door, the same switches as above, five doors on the rendering). `pequannock-engine-1/` is the
  volunteer-company version. `design-2/` is the plain sample.
- Without `bays`, `sections`, `nav`, `headerCta` and the rest, the Newark code behaves like the
  Pequannock code, so either can start a volunteer build.

**Files in each folder:**
- `data/site.js`: all content, `window.SITE`. Tokens `{town} {company} {short} {station}`.
- `js/site.js`: builds the page from the data (design 2 also has the bay router `go()` and
  `window.FireBays.show(id)`).
- `js/art.js`: `window.FireArt`, drawn emblem, trucks, station, portraits, coat, shields, map, icons.
- `js/welcome.js`: `window.FireWelcome`, the burning-badge welcome popup (WebGL fire from the
  badge's outline, hose, steam; still picture for reduced motion).
- `js/plus.js`: `window.FirePlus`, the extras (QR code generator, feed, year in numbers, neighbors,
  lake and ice, live National Weather Service alerts, Santa map, giving, house-number signs,
  partner report, calendar files, interest form, guided tour).
- `js/fx.js`: design 1 only, the background sparks.

**Useful data switches:**
- `concept` (badge, badgeNote, `sample` tags by section id) and `sampleBanner`: concept mode.
- `otherDesign: { label, href }`: the link to the other design.
- `welcome`: popup text; shows every visit until "Don't show this again"; `?welcome` forces it;
  change `id` to show it to everyone again.
- `tour`: the 60-second sales tour (`?tour` starts it). `tour.offer.price` and `tour.offer.contact`
  are **placeholders on every site** (1800 and empty).
- `weather: { lat, lon, place }`: live alerts; `?alert` shows a sample one.
- Design 2 `front`: the firehouse photo, `width`/`height`, `layout: "side"` for a tall photo,
  `phoneWidth`, and `doors[]` with `bay`, `label`, `href`, `photo` (what shows behind the door),
  `line`, and `box: [left, top, width, height]` in percent of the photo (`arch` rounds the top).
- Design 1 `hero`: `photo`, `slides` (cross-fading), `framed`, or `split` (whole photo beside the words).
- `emblemImage`: the company's real patch instead of the drawn emblem.
- `coatTown`, `coatLine`, `coatPanel: "shoulders"`: lettering on the drawn coat, and the visitor's
  name on a black panel across the shoulders. With `join.gear` set, a coat **photo** is used instead,
  with the name drawn onto it (Larkin Mills and White Meadow Lake work this way).
- `officers.portraits: "initials"`: initials tiles for real people without photos.
- `roll`, `juniors`, `history.photos`, `history.chiefs`: the Pequannock additions.
- Newark additions (newark-fire code only): `bays` (design 2), `sections` and `nav` (design 1),
  `headerCta`, `mobileCta`, `mobileCall`, `orgWord`, `prevention` and `community` (fact panels),
  `stations.offices`, `stations.foot`, and `photo`/`photoAlt` on a station card.

---

## 5. Site by site

### Larkin Mills Fire Department (sample)
- Fictional town and people, ChatGPT photos (hero, rigs, Chief Michael Carter, dress uniform,
  turnout gear with the name panel, film). Partners are invented sample businesses.
- Template controls are off (`templateControls: false`).
- Tour price and contact are placeholders.

### White Meadow Lake Fire Company 5 (concept, design 1)
- Real: company name, parent department, 2027 officers, the patch (cut from a flyer), photos from the
  company's posts, Engine 51, three calls and news from WRNJ, how to join, lake history.
- Placeholder: call totals, events, fund drive, partner program and prices, drill and meeting
  nights, the founding history entry, the chief's message. Partners are invented.
- Extras: lake status and ice guidance, live weather alerts for Rockaway Township.
- To fix: the gear picture says "White Meadow Lake Fire Dept." with a borrowed patch (the truck says
  "Co. 5"); the firehouse photo shows older trucks; specs needed for Engine 52, the water and ice
  rescue unit and the boat; confirm address and phone.
- Full source table in that repo's `README.md`.

### Pequannock Township Engine Company #1 (concept, both designs)
- Company: Pequannock Township Fire Department, Pompton Plains Engine Company #1, 30 Jackson Ave,
  Pompton Plains, NJ 07444, (973) 835-8878. Current site: https://www.ptfdco1.org/ (readable with
  WebFetch). Chief Bryan Daley, chief1@peqtwp.org; recruitment@ptfd1.com.
- Real (from ptfdco1.org, Nov 2026): officers and administration, the roster (37 adults; the nine
  juniors' names are deliberately left off), Engine 1-1, Engine 1-4, Rescue 1, Chief 1, the 1929
  Model A, history and 33 chiefs, FAQ answers, the Junior Fire Department, the Five-Alarm Turkey
  Trot and its sponsors, ten of the 26 stops of the 2025 Santa route, six recent calls.
- Pictures: `images/firehouse-front.jpg` is the owner's ChatGPT twilight render of the real
  firehouse (four bay doors). The patch is cut from a 220-pixel copy (ask for the original). Design 2's
  door interiors (`images/bays/`) are made from each door's own windows. Four history photos and three
  Fire Calls photos load from the company's site (static.wixstatic.com); a grey stand-in shows if one
  fails. Trucks are drawings (paint is a guess).
- Design 2 doors: Rigs, People, Events, Give; Join is a button and a menu item. Accent is the patch
  blue `#2536BF`. Design 1 accent is the patch's red ring `#A3151C`.
- Placeholder (tagged Sample): call breakdown by type, fund drive figures, volunteer hours and dollar
  value, the "neighbors" with day jobs, Santa's times and 2026 date, the partner levels and prices,
  the sample partner report (invented "Example ..." businesses), safety advice, the sketch map.
- The chief has an empty "in his own words" box on purpose; do not write quotes for real people.
- To confirm with the company: treasurer spelled Moriarity and Moriarty (site uses Moriarty); church
  fire 1937 or 1938 (site uses 1937); Engine 1-4 builder (their page says "Salusbury"; site says
  Saulsbury/E-One); Handy Mike LLC and Maschio's names were taken from the Turkey Trot page's links;
  truck paint, drill and meeting nights, 501(c)(3) status.
- Notes for the company in `pequannock-engine-1/README.md`.

---

### Newark Fire Division (concept, both designs)
- A **career city department** (about 650 firefighters, 16 firehouses), part of Newark Public
  Safety. Volunteer parts are off: no donations, volunteer hours, day jobs, juniors or events. Join
  is hiring through the NJ Civil Service Commission. Sponsors are a marked proposal (a city
  department needs its attorneys' approval).
- Real (from newarkpublicsafety.org/nfd/, Nov 2026): headquarters 480 Clinton Ave, (973) 733-6000
  and HQ (973) 733-6007, the 16 firehouses with companies and neighborhoods, the offices, the
  companies and special units, Chief Del Ortiz, Director Emanuel Miranda Sr., BC Mark Furka, Capt.
  Philip Alfano IV, Capt. Kenya E. Dunham (bios and portraits), 16,720 calls a year, the history
  (timeline, chiefs, line-of-duty deaths it names), safety advice, prevention units, CERT and
  community programs, recruiter email candidate@ci.newark.nj.us.
- Pictures: the top of both designs is the owner's rendering `images/firehouse-front-newark.jpg`
  (five doors; it says "Station 36" and "Newark Fire Department", not real Newark lettering). The
  emblem `images/brand/emblem.png` is cut from a 220-pixel copy. `images/photos/` holds nine owner
  photos (confirm rights before live use). Leadership portraits and eleven gallery photos load from
  newarkpublicsafety.org with the grey stand-in as fallback. A supplied "Station 36" photo with
  trucks 31/34 was left out as not Newark NJ.
- Placeholder (tagged Sample): call breakdown, the academy step, partner program and its invented
  businesses, the sketch map. The calls table shows famous historic fires until dispatch feeds it.
- The chief has an empty "in his own words" box on purpose. Notes and questions for the division:
  `newark-fire/README.md`.
- Checks: `tools/tests/nwk_b.py` (design 2, 41 checks) and `tools/tests/nwk1_b.py` (design 1 and
  the links between designs, 28 checks).

## 6. What comes next

1. **Pequannock gets its own repo and address.** The owner creates an empty GitHub repo (suggested
   name `pequannock-engine-1-concept`) and connects it to Cloudflare Workers Builds. Then move the
   folder: design 2 to the repo root, design 1 to `/design-1/`, copy `wrangler.toml` (name matching
   the Worker), `_headers`, `robots.txt`, `404.html` and `.assetsignore`, and keep "concept" in
   the Worker name, as White Meadow Lake does. Fix the two "See design" links (design 2 at `/`,
   design 1 at `/design-1/`). Remove the folder from `larkin-mills-fire` only after the new
   address works.
2. Owner to fill in the tour price and contact line on each pitch site before showing it.
3. Pequannock upgrades when the owner has them: photos of the real trucks, the original patch file,
   a ChatGPT turnout-gear picture for Pequannock (back of the coat, blank name panel across the
   shoulders) to replace the drawn coat, the chief's photo and message.
4. **Riverdale NJ PBA** police sample site, using facebook.com/RiverdalePolice for real content;
   waiting on the owner to start it. (Facebook cannot be read with WebFetch; ask for screenshots or
   text.)
5. Any new prospect: copy the newest folder for the chosen design (section 4), replace
   `data/site.js` and `images/`, keep concept mode on.
6. Newark: the owner confirms it is done, then decide whether it gets its own repo (as planned for
   Pequannock). Better pictures would help: a rendering lettered with real Newark companies (for
   example Engine 10 and Ladder 5 on Clinton Avenue), the emblem's original file, larger copies of
   the supplied photos, and the chief's message in his own words.

---

## 7. Things a Claude session cannot do here (and the workaround)

- Cannot create GitHub repos: the owner creates an empty one, then Claude pushes.
- Cannot open `*.workers.dev` addresses: check locally with Playwright; confirm the Cloudflare build
  with the `gh api ... check-runs` command; tell the owner to click through.
- Pushing git tags fails through the proxy: push a branch instead.
- WebFetch cannot read Facebook, Instagram or api.weather.gov (live weather is untested from the
  workspace).
- Package installs may be blocked; Playwright, Chrome (`/usr/bin/google-chrome`), PIL, numpy and
  OpenCV were available.
- Browsers cache images for a week (`_headers`); when a picture changes, give it a new file name.

---

## 8. Short history

- Larkin Mills sample built (design 1): coat and jacket art, sparks, gear photo with typed name,
  uniform and chief portrait, welcome popup with the burning badge and hose.
- White Meadow Lake concept built from it, with the real patch, photos and officers; then the
  premium extras (feed, year in numbers, neighbors, lake and ice, weather alerts, Santa map, QR
  giving, signs, partner report, calendar files, interest form, 60-second tour, concept label with X).
- Headline changed to "When the alarm sounds, your neighbors go."
- Design 2 built for Larkin Mills; first top (rolling station doors) saved; rebuilt as the firehouse
  you walk into, with the owner's straight-on headquarters render (four arched bays and the entrance).
- Pequannock built on design 2 (Nov 25), renamed "Pequannock Township Engine Company #1" and built
  again on design 1 (Nov 26); the coat now reads "Pequannock Twp / Engine Company #1" with the
  visitor's name across the shoulders and the real patch on the back.
- Newark Fire Division built on both designs (Nov 26), the first career city department: the
  template gained data switches to turn off the volunteer and donation parts, a searchable list of
  16 firehouses, and a five-door front on the owner's rendering.
