/* ============================================================================
   SITE DATA — the only file you edit to make this template a new department.
   Tokens {town} {company} {short} {station} are filled in everywhere.

   SAMPLE CONTENT: Larkin Mills is a fictional town. The photos are
   computer-generated, and every person, business, address and phone number
   below is invented.
   ========================================================================== */
window.SITE = {
  town: "Larkin Mills",
  state: "NJ",
  station: "5",                 /* headquarters station number */
  founded: 1856,
  companyTemplate: "{town} Fire Department",
  shortTemplate: "{town} Fire Dept.",
  tagline: "Five stations, all volunteer since 1856",

  /* Emblem: "wheel" is the roundel crest. Remove the line for the fire-service cross with the station number. */
  emblemStyle: "wheel",
  emblemBottom: "Fire Department",
  shieldMark: "LMFD",           /* lettering on the helmet shields */
  coatLine: "Fire Dept.",
  mapPin: "HQ",

  /* Rig paint. Drives the drawn artwork that shows wherever a photo is missing. */
  livery: { body: "#8A1B24", upper: "#F5F3EC", stripe: "#3A3D42", letter: "#E3B54A" },
  /* Site accent (buttons, links, bars). Usually the rig color. */
  accent: "#8A1B24",

  /* The sales-demo panel that renames the town and repaints the drawn rigs.
     Off here because the photos are lettered for one town. */
  templateControls: false,

  /* Moving background behind the dark sections: gold embers, platinum glints and a sheen
     on the gold. Visitors can pause it, and it stays still on devices set to reduce motion.
     Use `motion: false` to switch it off, or raise/lower `density` (1 is the default). */
  motion: { density: 1 },

/* The welcome: the badge burns, a hose stream puts it out, and this message appears.
     It opens on every visit until the visitor ticks "Don't show this again". `once: true` shows it
     a single time instead, `on: false` switches it off, and changing `id` brings it back for
     everyone who ticked the box. Add ?welcome to the address to play it on demand. */
  welcome: {
    on: true, id: "launch",
    title: "Welcome to our new site.",
    text: "Everything about {company} in one place: how to join, the rigs, what's coming up and ways to help.",
    links: [{ label: "Become a volunteer", href: "#join" }, { label: "See the rigs", href: "#apparatus" }, { label: "Support us", href: "#support" }],
    button: "Take a look around"
  },

  contact: {
    address: "47 Foundry Road",
    cityLine: "{town}, NJ",
    nonEmergency: "(973) 555-0147",
    email: "info@larkinmillsfire.example",
    drill: "Tuesdays, 7 PM, at every station",
    meeting: "First Monday of the month, 7:30 PM, Station 5",
    mapStreets: ["Foundry Rd", "Quarry St", "Route 9", "Mill Race"],
    social: [{ label: "Facebook", url: "#" }, { label: "Instagram", url: "#" }, { label: "YouTube", url: "#" }]
  },

  signLines: ["Volunteers needed", "Drill Tuesdays 7 PM"],

  /* Live weather alerts. Give a real department its coordinates and alerts from the National
     Weather Service's public feed appear under the top strip by themselves, for example:
     weather: { lat: 40.92, lon: -74.51, place: "Rockaway Township" }
     This sample town is fictional, so it has none. */

  /* The guided tour, for showing the site to a department. Start it from the label across the top
     or by adding ?tour to the address. `at` is the id of the section each step points at.
     SET `offer.price` (your yearly price) and `offer.contact` before you show it. */
  tour: {
    button: "Take the 60-second tour",
    seconds: 7,
    steps: [
      { at: "top", title: "Built to become yours", text: "This town is made up. Put in your patch, your rigs and your people and the whole site re-letters itself. Here is what it does for a department, in about a minute.", action: "welcome", actionLabel: "Play the welcome" },
      { at: "feed", title: "It updates itself", text: "Keep posting to Facebook and Instagram the way you do now. The posts show up here on their own, so nobody has to learn a website." },
      { at: "year", title: "Your year, added up", text: "Training and volunteer hours turned into a dollar figure for the fund-drive letter and the budget meeting." },
      { at: "join", title: "It recruits", text: "A visitor types a last name and sees it on the coat. The interest form goes straight to the membership chair's phone.", action: "apply", actionLabel: "Open the form" },
      { at: "neighbors", title: "Faces, not just trucks", text: "People join people. Members shown with their day jobs is the best recruiting page a volunteer department can have." },
      { at: "santa", title: "The night everyone visits", text: "On Santa night the map follows the engine, and the whole town opens the site to see when to come outside." },
      { at: "support", title: "It raises money", text: "A goal people can watch fill up, monthly giving, a code to print on the mailed letter, and house-number signs ordered online." },
      { at: "partners", title: "And it pays for itself", text: "Local businesses support the department through the site, and each one gets a monthly report showing what it got for the money.", action: "report", actionLabel: "See a sample report" },
      { end: true, title: "What it costs the department" }
    ],
    offer: {
      price: 1800,      /* PLACEHOLDER: your yearly price */
      lines: [
        "{count} local partners at the prices on this page bring in {total} a year.",
        "The site, hosting, updates and support cost {price} a year.",
        "That leaves {left} a year for the department before the first donation."
      ],
      note: "Example figures, to be agreed.",
      qrLabel: "Open it on your own phone",
      qrText: "Point the camera at the code.",
      contact: "",      /* PLACEHOLDER: "Your Name, 973-555-0100, you@example.com" */
      contactBlank: "Your name, phone and email go here."
    }
  },

  /* A thin label across the very top. Keep it on any demo that is shared; delete the line for a real department. */
  sampleBanner: "Sample site. {town} is a fictional town, and this is not a real fire department.",
  /* A link to the other design of this sample, shown beside the label above. */
  otherDesign: { label: "See design 1", href: "../" },

  /* Site-wide notice under the header. Set active:false to hide it. */
  alert: { active: true, text: "Red flag warning today. No outdoor burning in {town} until 8 PM.", link: { label: "Burn rules", href: "#safety" } },

  /* The front of the firehouse, and what is behind each bay door. Each door opens one part of the
     site: `bay` is join, rigs, people, events or give, and `href` is where a click lands.
     `photo` is what shows when the door lifts.
     To use a straight-on photograph of the real building instead of the drawn brick front, set
     `photo` here and give every door `box: [left, top, width, height]` in percent of that picture. */
  front: {
    sign: "{company}",
    est: "Volunteer since 1856",
    photo: "images/stations/headquarters-front-2.jpg", width: 1672, height: 881,
    photoAlt: "The {company} headquarters at sunset, seen straight on: four arched glass bay doors with an engine behind each, and the main entrance to the right",
    hint: "Point at a door to look inside.",
    hintTouch: "Tap a door to look inside. Swipe to see the whole building.",
    /* The doors run left to right across the building. `arch` rounds the top of a door, as a
       percent of its height, to match an arched opening. Without `photo` above, the boxes are
       ignored and the doors are drawn. */
    doors: [
      { bay: "rigs", label: "Rigs", href: "#apparatus", photo: "images/rigs/engine-1.jpg", pos: "60% 50%", line: "The trucks, and the five houses they run from.", box: [10.23, 41.09, 13.7, 32.12], arch: 13.5 },
      { bay: "people", label: "People", href: "#officers", photo: "images/officers/chief-carter.jpg", pos: "50% 18%", line: "168 volunteers and the officers they elect.", box: [26.97, 41.09, 12.98, 32.12], arch: 13.5 },
      { bay: "events", label: "Events", href: "#events", photo: "images/rigs/ladder-1.jpg", pos: "55% 50%", line: "Drill nights, breakfasts and Santa on Engine 1.", box: [42.88, 41.09, 13.28, 32.12], arch: 13.5 },
      { bay: "give", label: "Give", href: "#support", photo: "images/rigs/rescue-1.jpg", pos: "60% 50%", line: "Tax dollars buy the trucks. You buy the rest.", box: [59.15, 41.09, 12.56, 32.12], arch: 13.5 },
      { bay: "join", label: "Join", href: "#join", photo: "images/gear/turnout-gear.jpg", pos: "76% 30%", line: "The front door. There's a coat with your name on it.", box: [77.75, 50.51, 11.84, 22.7] }
    ]
  },

  hero: {
    photo: "images/stations/station-5.jpg",   /* leave empty to show the drawn firehouse instead */
    photoAlt: "Station 5, the {company} headquarters, at sunset",
    title: "When the alarm sounds, your neighbors go.",
    text: "{company} has answered every call since 1856. Five stations, 168 volunteers and no bill.",
    primary: { label: "Become a volunteer", href: "#join" },
    secondary: { label: "Give to the fund drive", href: "#support" }
  },

  tasks: {
    title: "What do you need from us?",
    placeholder: "Try smoke alarm, hall or hydrant",     /* the hint inside the search box */
    /* `words` are extra search terms that are not shown. */
    items: [
      { icon: "alarm", title: "Get a free smoke alarm", text: "We install them at no cost for any {town} resident.", action: "Request an alarm", topic: "Smoke alarm request", words: "detector battery beeping co carbon monoxide" },
      { icon: "burn", title: "Check the burn rules", text: "Campfires don't need a permit. Brush piles do.", action: "Read the rules", href: "#safety", words: "permit bonfire fire pit leaves campfire" },
      { icon: "hall", title: "Rent the hall", text: "Seats 180, with a full kitchen and plenty of parking.", action: "See the hall", href: "#support", words: "rental party wedding banquet room" },
      { icon: "report", title: "Get a fire report", text: "For insurance claims. Ready in five business days.", action: "Request a report", topic: "Fire report request", words: "incident insurance claim record" },
      { icon: "door", title: "Tour a station", text: "Scout troops, classes and birthday parties are welcome.", action: "Book a tour", topic: "Station tour", words: "visit kids school birthday firehouse truck" },
      { icon: "hydrant", title: "Report a hydrant problem", text: "Leaking, blocked or buried in snow? Tell us.", action: "Report it", topic: "Hydrant problem", words: "water leak snow blocked" }
    ]
  },

  stations: {
    title: "Five stations, one department.",
    text: "Wherever you are in {town}, a crew is about four minutes away.",
    items: [
      { number: "1", name: "Downtown", photo: "images/stations/station-1.jpg", address: "12 Main Street", units: ["E1", "L1"], text: "Built in 1891 and still the busiest house. It has stabled horses, steamers and every Engine 1 since." },
      { number: "2", name: "North End", photo: "images/stations/station-2.jpg", address: "410 Birch Lane", units: ["E2", "U2"], text: "Opened in 2016 to cover the new neighborhoods north of Route 9." },
      { number: "3", name: "The Falls", photo: "images/stations/station-3.jpg", address: "85 Mill Race Road", units: ["E3", "R1"], text: "Beside the old mill and the river. Home to Rescue 1 and the water rescue team." },
      { number: "4", name: "Orchard Road", photo: "images/stations/station-4.jpg", address: "2200 Orchard Road", units: ["E4", "K4", "B4"], text: "Covers the farms on the west side, where the tanker and brush truck earn their keep." },
      { number: "5", name: "Headquarters", photo: "images/stations/station-5.jpg", address: "47 Foundry Road", units: ["E5", "C5"], text: "Headquarters and training center. The offices, the drill tower and Foundry Hall are here." }
    ]
  },

  /* What the department posted lately. On a live site these come from its Facebook and Instagram
     pages by themselves. */
  feed: {
    title: "Latest from the stations",
    text: "Whatever the department posts on Facebook or Instagram shows up here on its own.",
    items: [
      { from: "Facebook", when: "Yesterday", photo: "images/rigs/engine-1.jpg", alt: "Engine 1", text: "Engine 1, washed and back in the bay after last night's alarm on Main Street." },
      { from: "Instagram", when: "3 days ago", photo: "images/rigs/ladder-1.jpg", alt: "Ladder 1", text: "Ladder 1 out for Tuesday's drill." },
      { from: "Facebook", when: "Last week", photo: "images/stations/station-3.jpg", alt: "Station 3, The Falls", text: "Station 3 at The Falls. Stop in any Tuesday, the coffee is on." }
    ],
    more: { label: "Follow the department on Facebook", href: "#contact" }
  },

  /* The year added up. `worth` multiplies the volunteer hours by a dollar value for an hour of
     volunteer time: use the current published figure. */
  year: {
    title: "What a year of volunteering adds up to",
    text: "Nobody at the five stations is paid. This is what {town} got anyway.",
    stats: [
      { n: 11480, label: "hours of training" },
      { n: 41200, label: "volunteer hours in all" },
      { n: 168, label: "volunteers" },
      { n: 365, label: "days a year someone is on call" }
    ],
    worth: { hours: 41200, rate: 34, text: "{hours} volunteer hours at {rate} an hour: service the town's taxpayers did not have to pay for." }
  },

  /* Members with their day jobs. Use real members only with their say-so; add `photo:` to any of
     them to replace the initials. */
  neighbors: {
    title: "The people on the truck live down the street.",
    text: "They have day jobs, kids and lawns to mow, and a pager on the nightstand.",
    items: [
      { name: "Erin R.", job: "Middle-school science teacher", role: "firefighter at Station 2", since: 2019 },
      { name: "Marcus T.", job: "Electrician", role: "engine driver", since: 2011 },
      { name: "Priya S.", job: "Hospital nurse", role: "medical responder", since: 2021 },
      { name: "Tom B.", job: "Retired mail carrier", role: "fire police", since: 1994 },
      { name: "Jenna K.", job: "High-school junior", role: "junior member", since: 2026 },
      { name: "Luis M.", job: "Diesel mechanic", role: "rescue company", since: 2015 }
    ],
    cta: { label: "Add your name to the list", href: "#join" }
  },

  calls: {
    year: 2026,
    through: "November 23",
    total: 1286,
    note: "Every one answered by a volunteer.",
    byType: [
      { label: "Fire alarms", n: 372 }, { label: "Vehicle crashes", n: 231 }, { label: "Medical assists", n: 208 },
      { label: "Mutual aid to neighbors", n: 147 }, { label: "Gas and CO", n: 104 }, { label: "Service calls", n: 96 },
      { label: "Brush and outdoor", n: 71 }, { label: "Structure fires", n: 57 }
    ],
    recent: [
      { when: "Nov 23, 9:14 PM", type: "Vehicle crash with entrapment", where: "Route 9 at Quarry St", units: ["E2", "R1"] },
      { when: "Nov 22, 3:02 AM", type: "Automatic fire alarm", where: "100 block of Main St", units: ["E1", "L1"] },
      { when: "Nov 20, 4:47 PM", type: "Mutual aid, house fire", where: "Hadley Township", units: ["L1"] },
      { when: "Nov 19, 11:25 AM", type: "CO alarm", where: "Birch Lane", units: ["E2"] },
      { when: "Nov 17, 6:09 PM", type: "Brush fire", where: "Orchard Road", units: ["B4", "K4"] },
      { when: "Nov 15, 7:31 AM", type: "Medical assist", where: "Mill Race Road", units: ["R1"] }
    ]
  },

  join: {
    title: "There's a coat with your name on it.",
    text: "You don't need experience. We supply the gear, the training and the people to learn from. About four hours a week is enough to matter.",
    coatLabel: "See it. Type your last name:",
    coatDefault: "Your name",
    /* The gear photo. Remove `gear` and the site draws a coat instead.
       `name` places the typed surname on the photo's name panel and `zoom` is the part of the
       photo the view moves in on. Both are measured in pixels on this one photo, so a different
       photo needs new numbers, or leave them out to show the photo with no typing. */
    gear: {
      photo: "images/gear/turnout-gear.jpg", width: 1448, height: 1086,
      alt: "Two sets of tan {town} turnout gear on stands in the apparatus bay, one seen from the front and one from the back. The back of the coat carries the department crest and a name panel.",
      caption: "Coat, pants, boots and helmet. Every member is issued a set, fitted to them.",
      namedCaption: "{name}, across the shoulders of a {town} coat.",
      name: { blank: "images/gear/name-panel.png", box: [882, 138, 220, 64], arc: "M880 187.6 Q990 157.4 1100 187.6", size: 29, max: 184, color: "#D5AB6D" },
      zoom: [670, 50, 640, 480]
    },
    cta: { label: "Ask a question first", topic: "I want to volunteer" },
    /* The interest form. On a live site it goes to the membership chair's phone and inbox. */
    apply: {
      button: "Tell us you're interested",
      title: "Tell us you're interested",
      text: "It takes two minutes. A member calls you back, and you can watch a drill before you decide anything.",
      interests: ["Engine company", "Truck company", "Rescue", "Medical response", "Fire police", "Junior member, 16 or 17"],
      visits: { label: "Want to come to a drill night?", none: "Not yet, call me first", options: ["Tuesday, December 1, 7 PM", "Tuesday, December 8, 7 PM", "Tuesday, December 15, 7 PM"] },
      submit: "Send it",
      done: "Demo only: nothing was sent. On a live site this goes straight to the membership chair's phone and inbox, and you get a text to confirm."
    },
    perks: ["Free training and gear", "Length-of-service retirement award", "Dinner on drill nights"],
    steps: [
      { title: "Come to a drill night", text: "Tuesdays at 7 PM, at the station nearest you. Meet the crew and ask anything." },
      { title: "Apply", text: "A short application, a background check and a physical. We cover the cost." },
      { title: "Train", text: "Firefighter I at our training center, on nights and weekends. Free to members." },
      { title: "Ride", text: "Your first calls are with a senior member beside you." }
    ],
    roles: [
      { label: "Engine", color: "#8A1B24", title: "Engine company", text: "Hose lines and search, inside the building." },
      { label: "Truck", color: "#14161B", title: "Truck company", text: "Ladders, ventilation and forcing doors." },
      { label: "Rescue", color: "#1D4E89", title: "Rescue company", text: "Car crashes, water and rope rescue." },
      { label: "EMS", color: "#F4F4F0", title: "Medical response", text: "First on scene for medical calls." },
      { label: "Fire Police", color: "#E9B949", title: "Fire police", text: "Traffic and scene safety. No fire gear needed." },
      { label: "Junior", color: "#2E7D4F", title: "Junior members", text: "Ages 16 and 17, with a parent's consent." }
    ],
    faq: [
      { q: "Do I need any experience?", a: "No. Most members walk in with none. Training starts at your first drill night." },
      { q: "How much time does it take?", a: "Plan on most Tuesday drills and the calls you can make. Many members give about four hours a week." },
      { q: "Is there an age limit?", a: "You can join as a junior at 16 and as a full member at 18. We have active members in their seventies." },
      { q: "What does it cost me?", a: "Nothing. The department pays for your gear, training, physical and background check." },
      { q: "I don't want to go inside burning buildings. Can I still help?", a: "Yes. Fire police, drivers, medical responders and the people who run the fund drives are all members." }
    ],
    film: { src: "media/station-film.mp4", poster: "media/station-film.jpg", caption: "Twenty seconds with the department. No sound." }
  },

  apparatus: {
    title: "The rigs",
    text: "Paid for by fund drives, grants and 170 years of pancake breakfasts.",
    fleet: "Also in the fleet: Engines 2 through 5, Tanker 4, Brush 4, two utility trucks and a rescue boat.",
    rigs: [
      { type: "engine", photo: "images/rigs/engine-1.jpg", code: "E", name: "Engine 1", kind: "2024 rescue pumper, Station 1", text: "First out the door on every downtown fire call.", specs: [["Pump", "1,500 gallons a minute"], ["Water on board", "750 gallons"], ["Seats", "6 firefighters"], ["Carries", "1,200 feet of supply hose and hydraulic rescue tools"]] },
      { type: "tower", photo: "images/rigs/ladder-1.jpg", code: "L", name: "Ladder 1", kind: "2021 aerial ladder, Station 1", text: "Reaches the roof of every building in town.", specs: [["Reach", "105 feet"], ["Tip flow", "1,000 gallons a minute"], ["Seats", "6 firefighters"], ["Carries", "163 feet of ground ladders"]] },
      { type: "rescue", photo: "images/rigs/rescue-1.jpg", code: "R", name: "Rescue 1", kind: "2021 heavy rescue, Station 3", text: "A rolling toolbox for crashes, collapses and water rescue.", specs: [["Seats", "8 firefighters"], ["Light tower", "30 feet"], ["Air", "Refills breathing bottles on scene"], ["Carries", "Cutters, spreaders, rope and a rescue boat"]] }
    ]
  },

  /* photo: a head-and-shoulders picture, 4:5. Leave it empty and add a `look`
     block (see README) to draw an illustrated portrait instead. */
  officers: {
    title: "Command staff",
    text: "Elected by the members every December.",
    /* The chief, set apart above the rest of the command staff.
       `portrait` is a photo of the chief, shown square; "" leaves it out.
       `uniform` is the dress uniform photo. With both, the portrait leads and the uniform sits beside
       the message. Remove `chief` to leave the block out. */
    chief: {
      rank: "Fire Chief", name: "Michael Carter",
      portrait: "images/officers/chief-carter.jpg",
      uniform: "images/officers/chief-dress-uniform.jpg",
      uniformAlt: "Navy dress uniform coat on a stand in the apparatus bay, with a gold chief's badge, the {town} shoulder patch, gold sleeve stripes and a name plate reading Chief M. Carter.",
      uniformCaption: "The chief's dress uniform, worn for parades, promotions and funerals.",
      message: [
        "Every one of our 168 members started where you are now: a neighbor who wanted to help.",
        "We answer about 1,300 calls a year from five stations, and not one of them comes with a bill. That only works because people here keep showing up. If you have four hours a week, come to a drill night and I will shake your hand myself."
      ],
      facts: [["Joined", "1994, at Station 1"], ["Elected chief", "2017"]]
    },
    line: [
      { rank: "Deputy Chief", name: "Dana Whitfield", note: "Operations", photo: "images/officers/deputy-chief.jpg" },
      { rank: "Assistant Chief", name: "Javier Alvarez", note: "Volunteer services", photo: "images/officers/alvarez.jpg" },
      { rank: "Battalion Chief", name: "Simone Brooks", note: "Stations 1, 2 and 3", photo: "images/officers/brooks.jpg" },
      { rank: "Fire Marshal", name: "Daniel Kim", note: "Prevention and inspections", photo: "images/officers/kim.jpg" },
      { rank: "Training Chief", name: "Arjun Patel", note: "Academy and drills", photo: "images/officers/patel.jpg" },
      { rank: "EMS Chief", name: "Rebecca O'Neil", note: "Medical response", photo: "images/officers/oneil.jpg" }
    ],
    captainsTitle: "Station captains",
    captains: [
      { station: "Station 1", name: "Capt. Luis Herrera" }, { station: "Station 2", name: "Capt. Katie Brandt" }, { station: "Station 3", name: "Capt. Marcus Bell" },
      { station: "Station 4", name: "Capt. Walt DeLuca" }, { station: "Station 5", name: "Capt. Hannah Lindqvist" }
    ],
    admin: []
  },

  safety: {
    title: "Most of our calls are preventable.",
    seasonal: { label: "Heating season", text: "Keep anything that burns three feet from space heaters and wood stoves. Have the chimney cleaned once a year." },
    items: [
      { icon: "alarm", title: "Smoke alarms", text: "One on every level and in every bedroom. Test them monthly. Replace the whole alarm after 10 years." },
      { icon: "co", title: "Carbon monoxide", text: "If the CO alarm sounds, get outside and call 911. Leave the windows shut so we can find the source." },
      { icon: "door", title: "Bedroom doors", text: "Sleep with the door closed. It holds back heat and smoke for the minutes you need." },
      { icon: "burn", title: "Outdoor fires", text: "Campfires under three feet wide need no permit. Burning brush or leaves does. Never burn on a windy day." },
      { icon: "hydrant", title: "Hydrants", text: "After a storm, clear the snow three feet around the hydrant on your block." }
    ],
    cta: { label: "Request a free smoke alarm", topic: "Smoke alarm request" }
  },

  events: {
    title: "At the stations",
    items: [
      /* `date` and `hours` put an "Add to calendar" button on the event. */
      { month: "Dec", day: "1", date: "2026-12-01T19:00", hours: 2, title: "Drill night: vehicle extrication", meta: "Tuesday, 7 PM, Station 5. Visitors welcome." },
      { month: "Dec", day: "6", date: "2026-12-06T08:00", hours: 4, title: "Pancake breakfast", meta: "Sunday, 8 AM to noon, Foundry Hall. $10, kids under 6 eat free.", sponsor: "Kettle & Crumb Bakery" },
      { month: "Dec", day: "19", date: "2026-12-19T17:00", hours: 2, title: "Santa rides Engine 1", meta: "Saturday from 5 PM. Follow the engine on the map below.", sponsor: "Three Forks Auto Body" },
      { month: "Jan", day: "9", date: "2027-01-09T10:00", hours: 2, title: "Junior firefighter open house", meta: "Saturday, 10 AM, Station 2. Bring a parent." },
      { month: "Jan", day: "16", date: "2027-01-16T09:00", hours: 3, title: "CPR and AED class", meta: "Saturday, 9 AM, Station 5. $25, free for members." }
    ],
    news: [
      { date: "November 18", title: "New air packs are on order", text: "The fund drive passed 70 percent. Twelve packs arrive in the spring." },
      { date: "November 9", title: "Nine members finish Firefighter I", text: "180 hours of nights and weekends at the training center." },
      { date: "October 27", title: "Thank you for 1,140 breakfasts", text: "October's pancake breakfast set a department record." }
    ]
  },

  /* Santa night. On the real night the map follows a phone riding on the engine; here the engine
     runs a made-up loop. Delete `santa` after the holidays and it disappears. */
  santa: {
    title: "Santa rides Engine 1.",
    text: "On the night, this map follows the truck, so you know when to bring the kids to the curb.",
    when: "Saturday, December 19, from 5 PM",
    water: "Mill Pond",
    loopSeconds: 52,
    stops: [
      { name: "Station 1, Main Street", time: "5:00" },
      { name: "North End", time: "5:25" },
      { name: "Orchard Road", time: "5:50" },
      { name: "The Falls", time: "6:15" },
      { name: "Foundry Road", time: "6:40" },
      { name: "Back at Station 1", time: "7:00" }
    ],
    sponsor: "Three Forks Auto Body",
    mapAlt: "A map of the town with the engine's route around the pond and five numbered stops",
    note: "Demonstration. The engine on this map is following a made-up loop."
  },

  support: {
    title: "Tax dollars buy the trucks. You buy the rest.",
    text: "{company} is a 501(c)(3) nonprofit. Your gift is tax deductible.",
    fund: { name: "2026 fund drive: 12 new air packs", raised: 61400, goal: 85000, note: "One air pack costs about $7,000 and lasts 15 years." },
    amounts: [25, 50, 100, 250],
    monthly: true,
    /* A code that opens this section on a phone. It is made in the browser, so it always points at
       wherever the site is hosted. */
    qr: { label: "Scan to give", text: "Print this code on the fund-drive letter. It opens this page on any phone." },
    signs: {
      title: "Help us find your house in the dark",
      text: "A reflective green number sign for the end of the driveway, readable from both directions at night.",
      label: "Your house number", sample: "27",
      cta: "Order a sign for $20",
      done: "Demo only. On a live site this takes the order and payment, and the department gets a list of signs to make."
    },
    other: ["Mail a check to 47 Foundry Road", "Ask your employer to match your gift", "Give in memory of a member"],
    hall: { name: "Foundry Hall", text: "The hall at Station 5 seats 180 and has a full kitchen, a bar and parking for 90 cars. Rentals start at $450.", cta: { label: "Ask about a date", topic: "Hall rental" } }
  },

  /* Sponsors. 'top' ads rotate in the banner under the hero (keep it to 3).
     'wall' lists every partner. Set active:false to pause one.
     logo: a square image file (SVG or PNG). Leave it out to show the name alone. */
  partners: {
    title: "Local businesses keep the bays open.",
    text: "Community partners fund training and equipment all year.",
    disclosure: "Partners are paid sponsors. A listing here is not an endorsement by {company}.",
    rotateSeconds: 7,
    utm: { source: "larkinmillsfire", medium: "partner" },
    tiers: [
      { name: "Engine partner", price: "$2,500 a year", items: ["Banner on the home page, shared among three partners", "Logo on the partner wall", "Sign at all four department events", "A thank-you post every quarter"] },
      { name: "Truck partner", price: "$1,000 a year", items: ["Logo on the partner wall", "Sign at two department events", "One thank-you post"] },
      { name: "Hose partner", price: "$350 a year", items: ["Name on the partner wall", "A thank-you in the annual mailer"] }
    ],
    cta: { label: "Become a partner", topic: "Community partnership" },
    /* The monthly report each partner gets. The numbers here are generated for show: `views` is
       roughly how often each level is seen in a month. */
    report: {
      button: "See a sample partner report", kicker: "Partner report", month: "October 2026",
      note: "Invented figures for an invented business.",
      views: { Engine: 4000, Truck: 1700, Hose: 900 }, events: "2",
      allTitle: "Every partner this month",
      foot: "Each partner gets its own report by email on the first of the month."
    },
    top: [
      { id: "foundry-road-hardware", active: true, name: "Foundry Road Hardware", logo: "images/partners/foundry-road-hardware.svg", mark: ["Foundry Road", "Hardware"], headline: "Everything for the house since 1961", sub: "Paint, plumbing, keys cut while you wait.", cta: "Visit the store", url: "#partners", theme: { from: "#12372A", to: "#1F6B4C", accent: "#F2C14E" } },
      { id: "three-forks-auto-body", active: true, name: "Three Forks Auto Body", logo: "images/partners/three-forks-auto-body.svg", mark: ["Three Forks", "Auto Body"], headline: "Collision repair, done right the first time", sub: "Free estimates. We work with every insurer.", cta: "Get an estimate", url: "#partners", theme: { from: "#10233F", to: "#1F4E8C", accent: "#FF8A3D" } },
      { id: "kettle-and-crumb", active: true, name: "Kettle & Crumb Bakery", logo: "images/partners/kettle-and-crumb.svg", mark: ["Kettle & Crumb", "Bakery"], headline: "The coffee is on at 5:30", sub: "First responders drink free, every day.", cta: "See the menu", url: "#partners", theme: { from: "#3B2314", to: "#8A4B22", accent: "#FFE1A8" } }
    ],
    wall: [
      { name: "Foundry Road Hardware", logo: "images/partners/foundry-road-hardware.svg", tier: "Engine" }, { name: "Three Forks Auto Body", logo: "images/partners/three-forks-auto-body.svg", tier: "Engine" }, { name: "Kettle & Crumb Bakery", logo: "images/partners/kettle-and-crumb.svg", tier: "Engine" },
      { name: "Birchline Insurance Agency", logo: "images/partners/birchline-insurance.svg", tier: "Truck" }, { name: "Quarry Street Pizza", logo: "images/partners/quarry-street-pizza.svg", tier: "Truck" }, { name: "Mill Race Veterinary", logo: "images/partners/mill-race-veterinary.svg", tier: "Truck" },
      { name: "North Fork Heating & Air", logo: "images/partners/north-fork-heating-air.svg", tier: "Hose" }, { name: "Larkin Mills Lumber", logo: "images/partners/larkin-mills-lumber.svg", tier: "Hose" }, { name: "Hadley Family Dental", logo: "images/partners/hadley-family-dental.svg", tier: "Hose" }
    ]
  },

  /* Extra photos. Leave items empty to hide the section.
     Each item: { src: "images/gallery/drill-night.jpg", alt: "What the photo shows", caption: "Optional" } */
  gallery: { title: "From the bay floor", items: [] },

  history: {
    title: "Since the mill fire",
    items: [
      { year: "1856", title: "The department is chartered", text: "Forty-one residents sign up in the back room of the general store, three weeks after the mill burns." },
      { year: "1891", title: "Station 1 opens on Main Street", text: "It has housed horses, steamers and every engine since." },
      { year: "1924", title: "First motor pumper", text: "It replaces the last horse-drawn steamer and cuts the trip to the mill in half." },
      { year: "1979", title: "The rescue squad forms", text: "The department takes on car crashes and water rescue at the falls." },
      { year: "2019", title: "Headquarters opens", text: "Station 5 brings the offices, the hall and a training center under one roof." },
      { year: "2024", title: "Engine 1 goes in service", text: "Paid for in part by 16 years of fund drives." }
    ]
  },

  contactForm: {
    title: "Stop by, or send a note.",
    stationLabel: "Headquarters, Station 5",
    topics: ["General question", "I want to volunteer", "Smoke alarm request", "Station tour", "Hall rental", "Fire report request", "Hydrant problem", "Community partnership"]
  },

  footer: {
    builtBy: "",
    sample: "Sample site. Larkin Mills is a fictional town. The photos are computer-generated, and every person, business and phone number here is invented."
  }
};
