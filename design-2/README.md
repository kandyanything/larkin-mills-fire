# Design 2, "Bay Doors"

A second design for the same fire department website. It uses the same content file, photos and
features as design 1 (the folder above this one) and looks nothing like it.

| | Design 1 | Design 2 |
| --- | --- | --- |
| How it works | One long page you scroll | A firehouse you walk into: each door opens its own short page |
| First screen | A full photo with the headline over it | The front of the building. Point at a door and it lifts to show what is inside; click and you go in |
| Feel | Dark and dramatic: navy, maroon, gold, embers | Bright and clean: white, the department's red, black, reflective yellow |
| Lettering | Wide and heavy | Tall and condensed, like the numbers on a rig |
| Finding things | A grid of common requests | A search box that filters the common requests as you type |
| Rigs and officers | Tabs and photo tiles | Spec sheets and a roster |

## The front of the firehouse

`front` in `data/site.js` sets it up.

- **With a straight-on photograph** (`front.photo`, with its `width` and `height`): each door in
  `front.doors` gets `box: [left, top, width, height]` in percent of the picture, placed over a
  real opening, and `arch` to round its top. The real door lifts. Larkin Mills uses its four bays
  and the front entrance.
- **Without one:** leave `front.photo` empty and the building is drawn in brick in the
  department's color, with a numbered white door for each entry in `front.doors`.
- Each door names its `bay` (join, rigs, people, events or give), where a click lands (`href`),
  the `photo` behind the door and one `line` of text.
- A mouse lifts a door by pointing at it. A finger lifts it with the first tap and goes in with
  the second. The keyboard lifts it on focus and goes in with Enter.
- On a phone the photographed building is shown large and pans sideways.

## The bays

`render()` in `js/site.js` decides what is in each one:

| Bay | Sections |
| --- | --- |
| Front of the house | the building, the partner banner, the search box, the run log, safety, contact |
| Join | joining, the neighbors |
| Rigs | the spec sheets, the stations |
| People | command staff, the year in numbers, history |
| Events | events and news, Santa night, the feed |
| Give | the fund drive, partners, the gallery |

Every old link still works: an address ending in `#partners` opens the Give bay and scrolls to the
partners, and the browser's back button moves between bays.

The first version of this design, with five station doors that rolled up on arrival, is kept in
`design-2-doors-v1/` and on the branch `design-2-bay-doors-v1`.

## Colors and type

- `accent` in `data/site.js` sets the big fields of color (the hero, the giving section, buttons).
  Give it the department's own red, blue or green.
- The yellow is `--tape` at the top of `css/site.css`.
- Headings are Big Shoulders Display, drawn for the City of Chicago. Body text is Public Sans, made
  for the United States government. Both are open-licensed and served from `fonts/`.

## What is shared with design 1

`data/site.js` (same content, plus `otherDesign` and the search hints in `tasks`), `js/art.js`,
`js/welcome.js`, `js/plus.js`, `images/` and `media/` are copies of the ones in design 1. The page
builder `js/site.js` and the stylesheet `css/site.css` are this design's own.

A change to the content has to be made in both `data/site.js` files while the two designs sit
side by side.

## Its own address

This folder is complete on its own. To give it a separate address, copy it into a new repository
with a `wrangler.toml`, `_headers` and `robots.txt` like the ones above, and set
`otherDesign.href` in both designs to point at each other.
