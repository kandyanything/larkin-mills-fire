# Newark Fire Division, website concept

A pitch for the Newark Fire Division in two designs, with the same content. Neither is the
division's site: every page says so, search engines are kept out, and no form sends anything.

- **Design 2, the firehouse** (this folder): the five bay doors of the firehouse rendering open the
  parts of the site (Firehouses, People, History, Safety, Join), each a short page of its own.
- **Design 1, one long page** (`design-1/`): dark navy and gold with drifting sparks, the
  firehouse rendering beside the headline, and everything on one scrolling page.

Each design is self-contained, with its own `data/site.js`. A change to the content goes in both.

## A city department, not a volunteer company

Newark's is a career (paid) department run by the city, so the volunteer parts of the template are
off: no donations or fund drive, no volunteer hours, no members with day jobs, no juniors, no
events. Join is about hiring through the New Jersey Civil Service Commission. Sponsors stay in as
a clearly marked proposal: a city department's sponsorships need the city attorneys' approval.

Code changes made for this (in this folder's `js/site.js` and in `design-1/js/site.js` only):
`headerCta`, `mobileCta` and `mobileCall` replace the Donate buttons; `orgWord` names the
organization in the footer; donations, events and partners appear only when the data has them;
`bays` (design 2) and `sections` and `nav` (design 1) set the layout from the data; and many
firehouses show as a searchable list of cards, with a small picture where there is one.

## Where the content comes from

The division's pages on newarkpublicsafety.org (`/nfd/` and the pages under it), read on
November 26, 2026: the headquarters and 16 firehouses with their companies and neighborhoods, the
offices, the companies and special operations units, the leadership and their biographies, the
16,720 calls a year and 650 firefighters, the recruitment steps and the recruiters' email, the
fire safety advice, the Fire Prevention Bureau, Arson Squad and other units, the history (the
timeline, the chiefs and directors it names, and the firefighters it names as killed in the line of
duty), and the community programs (CERT, the Citizen Clergy Public Safety Academy, Nixle alerts).

Placeholders, each tagged "Sample" on the page (`concept.sample` in `data/site.js`): the call
breakdown by type, the fourth hiring step (the academy), the partner program, its prices and its
invented businesses, and the sketch map. The calls table holds famous fires from the history page
until it can be fed from dispatch. The honor roll lists only the names the history page gives.

## Pictures

- `images/firehouse-front-newark.jpg`: an artist's rendering supplied by the owner, not a
  photograph of a real Newark firehouse. Its lettering ("Station 36", "Engine 36" and so on, and
  "Newark Fire Department") does not match Newark's companies or the division's name. Design 2's
  door labels cover the awning lettering. In design 2 the five door positions are
  `front.doors[].box` in the data file, measured on this picture.
- `images/brand/emblem.png`: the division's emblem, cut out of the 220-pixel copy supplied. Ask
  for the original artwork.
- `images/photos/`: nine photos supplied by the owner (the rescue squad, Ladders 5 and 10,
  Fireboat 1, the Engine 13 firehouse, a crew, women of the division, an engine at its quarters,
  a street scene). Confirm the right to use each before anything goes live.
- The leadership portraits and eleven gallery photos load from newarkpublicsafety.org. If one
  cannot load, a plain stand-in shows instead.
- A twelfth supplied photo, of a three-bay "Station 36" with trucks numbered 31 and 34, was left
  out: it does not look like a Newark, New Jersey firehouse.

## To check with the division

- The About page counts eight ladder companies; the station list shows ten ladder units (eight
  ladders, two tower ladders) and Quint 1.
- Which firehouses house Rescue 1 and Rescue 2 (not on the station list).
- The history page gives the department's age as 225 years and as "over 200"; the site uses 1797.
- The history page stops in 2008, and its line-of-duty list is not a full honor roll.
- The current academy and hiring steps after the Civil Service exam.
- Phone numbers for the Fire Prevention Bureau and the firehouses (none are published).

## Before showing it

Set `tour.offer.price` and `tour.offer.contact` in `data/site.js` (both designs).
