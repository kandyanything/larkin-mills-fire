# Pequannock Engine Company #1, website concept

A pitch built on the firehouse template (design 2). It is not the company's site: every page says
so, search engines are kept out, and no form sends anything.

## Where the content comes from

From the company's own site, ptfdco1.org, read on November 25, 2026: name, address and phone,
officers and roster, apparatus and specifications, history and the list of chiefs, FAQ answers,
the Junior Fire Department, the Turkey Trot and its sponsors, the 2025 Santa route, recent calls.

Placeholders, each tagged "Sample" on the page (`concept.sample` in `data/site.js`): the call
breakdown by type, fund drive figures, volunteer hours, the members with day jobs, Santa's times
and 2026 date, the partner levels and prices, the safety advice.

## Pictures

- `images/firehouse-front.jpg`: an artist's rendering made from a photo of the real firehouse.
  The four door positions are `front.doors[].box` in the data file.
- `images/bays/`: what shows behind each lifted door, made from that bay's own windows.
- `images/brand/patch.png`: the company patch, cut out of a small copy. Ask for the original.
- The history and Fire Calls photos load from the company's current site. If one cannot load, a
  plain stand-in shows instead.
- The trucks are drawings until photographs replace them (`apparatus.rigs[].photo`).

## To check with the company

- The treasurer's surname is spelled Moriarity on the home page and Moriarty on the roster.
- The church fire is given as both 1937 and 1938.
- Engine 1-4's builder is written here as Saulsbury/E-One.
- Truck paint colours, drill night, meeting night, and whether the company is a 501(c)(3).

## Before showing it

Set `tour.offer.price` and `tour.offer.contact` in `data/site.js`.
