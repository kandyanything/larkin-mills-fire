# Design 2, "Bay Doors"

A second design for the same fire department website. It uses the same content file, photos and
features as design 1 (the folder above this one) and looks nothing like it.

| | Design 1 | Design 2 |
| --- | --- | --- |
| Feel | Dark and dramatic: navy, maroon, gold, embers | Bright and clean: white, the department's red, black, reflective yellow |
| First screen | A full photo with the headline over it | The front of the firehouse: one bay door per station, rolling up as you arrive |
| Lettering | Wide and heavy | Tall and condensed, like the numbers on a rig |
| Finding things | A grid of common requests | A search box that filters the common requests as you type |
| Calls | Light section | A dark run log, like a status board |

## The doors

- With more than one station, there is a door for each station (`stations.items`). Pointing at a
  door, tapping it or tabbing to it widens it and shows the address, the rigs housed there and a
  link down to that station.
- With one station, there is a door for each rig that has a photo (`apparatus.rigs`).
- The doors roll up when the page opens, or when the welcome popup is closed. Visitors whose device
  asks for reduced motion get them already open.
- The door that starts wide is the one whose photo matches `hero.photo`.

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
