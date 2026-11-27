# New Vernon Volunteer Fire Department, website concept

A pitch for the New Vernon Volunteer Fire Department (Harding Township, NJ) in two designs, with
the same content. Neither is the department's site: every page says so, search engines are kept
out, and no form sends anything.

- **Design 2, the firehouse** (this folder): the owner's rendering of the real firehouse. Its three
  bay doors open the Fire Company, the First Aid Squad and the Auxiliary; its three dormer windows
  open History, Santa and Give. Join is the button beside the headline.
- **Design 1, one long page** (`design-1/`): dark navy and gold with drifting sparks, the
  firehouse rendering beside the headline, and everything on one scrolling page.

Both open with the firehouse and then "We remember": Engine 1 beneath the Tribute in Light.

Each design is self-contained, with its own `data/site.js`. A change to the content goes in both.

## Three parts, as on the department's own site

The department is the Fire Company, the First Aid Squad and the Auxiliary. The First Aid Squad and
the Auxiliary each have a section of their own (`squad` and `auxiliary` in the data; on design 2
a bay door each), as they have pages of their own today.

Code added for this build (in this folder's `js/site.js` and `design-1/js/site.js` only):
any data block with `facts` can be placed by name in `bays` or `sections` and becomes a panel, and
a panel can carry `photos` (design 1 gained the photo row); `tribute` (a big photo with a short
dedication); `calls.side` (a short "then and now" list when there is no call log); the officer list
hides when only the chief is named; `lintel: "inside"` on a door puts its name inside the top of
the door. The Newark switches (`bays`, `sections`, `nav`, `headerCta`, `orgWord` and the rest) are
all here too.

## Where the content comes from

Every page of nvvfd.com, read on November 27, 2026, including the pages that are not in its menu
(found through its sitemap): the Fire Company, First Aid Squad and Auxiliary pages, Chief Ward
Connon, the trucks by type, the history (chapters one and two: the sixteen founders, the first
officers, the 1967 chiefs), Operation Santa 2026 with its eight routes and central stops,
Build-A-Truck, the January 2026 letter retiring the Country Auction and its answers, the Steak &
Lobster Dinner, the Auxiliary's fundraisers, the contact emails, phone and post office boxes.
The Country Mile Gardens tree sale (November 28 and 29, 2026) is from the department's social
media, supplied by the owner.

Placeholders, each tagged "Sample" on the page (`concept.sample` in `data/site.js`): the call
breakdown by type, the Build-A-Truck goal and amount raised, the joining steps, the safety advice,
the other officers, the partner program (its businesses are invented, apart from Country Mile
Gardens), the Santa map's moving truck, the sketch map.

## Pictures

- `images/firehouse-front-nv.jpg`: the owner's rendering of the real firehouse. In design 2 the six
  door and window positions are `front.doors[].box` in the data file, measured on this picture.
- `images/brand/emblem.png`: the department patch, cut out of the 2026 Operation Santa flyer. Ask
  for the original artwork.
- `images/photos/`: the department's own photos, supplied by the owner: Engine 1 beneath the
  Tribute in Light, the banner (Engine 1 at the firehouse), drafting at the pond, night drills, the
  pump panel, the First Aid Squad's three photos, the firehouse sign (from the Giving Day graphic)
  and the Santa flyer.
- The rest of the gallery, the Auxiliary door and the 1967 chiefs photo load from the department's
  current site (images.squarespace-cdn.com). If one cannot load, a plain stand-in shows instead.
- Three trucks (heavy rescue, tanker, mini pumper) are drawings until photographs replace them.

## To check with the department

- The officers' names (the site names only the chief) and the chief's message, in his own words.
- Truck details: makes, years, pumps and tanks; which two trucks Build-A-Truck replaces.
- The Build-A-Truck goal and the amount raised so far.
- The firehouse street address (the site gives only PO Box 143, Village Road).
- Drill and meeting nights, and the date of the next Giving Day.
- Whether the Steak & Lobster Dinner continues, now that the auction is retired.

## Before showing it

Set `tour.offer.price` and `tour.offer.contact` in `data/site.js` (both designs).
