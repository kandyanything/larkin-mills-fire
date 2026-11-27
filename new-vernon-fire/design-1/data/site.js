/* ============================================================================
   SITE DATA — New Vernon Volunteer Fire Department (website concept)

   DESIGN 1 of two. Design 2, the firehouse you walk into, is one folder up.

   A CONCEPT, NOT THE DEPARTMENT'S SITE. It was built to show the department
   what a website of its own could do.

   WHERE THE CONTENT COMES FROM
   Real, from every page of nvvfd.com (read November 27, 2026, including the
   pages that are not in its menu): the three parts of the department (Fire
   Company, First Aid Squad, Auxiliary), the trucks by type, Chief Ward
   Connon, the history (chapters one and two, the sixteen founders, the 1967
   chiefs), Operation Santa 2026 with its routes and stops, Build-A-Truck,
   the retirement of the Country Auction and its questions and answers, the
   Steak & Lobster Dinner, the Auxiliary's fundraisers, the emails, phone and
   addresses.
   Build-A-Truck's phases, goals and amount raised are from the images on its
   page, read from the owner's screenshot.
   Placeholder, and tagged "Sample" on the page (see `concept.sample` below):
   the call breakdown by type, the joining steps, the safety advice, the partner program and its businesses, the Santa
   map's moving truck, the sketch map.
   Photos: images/photos/ holds the department's own photos, supplied by the
   owner from its banner, its social media and its First Aid Squad page
   (Engine 1 at the Tribute in Light, drafting at the pond, night drills, the
   squad at work, the Santa flyer). images/brand/emblem.png is the patch, cut
   from the 2026 Santa flyer. The rest load from the department's current
   site (images.squarespace-cdn.com); if one cannot load, a grey stand-in
   shows. images/firehouse-front-nv.jpg is the owner's rendering of the real
   firehouse. Three of the trucks are drawn.
   ========================================================================== */
window.SITE = {
  town: "New Vernon",
  state: "NJ",
  station: "NV",
  founded: 1921,
  companyTemplate: "{town} Volunteer Fire Department",
  shortTemplate: "NVVFD",
  tagline: "Neighbors helping neighbors since 1921",
  orgWord: "department",

  /* The department's patch, cut from its 2026 Operation Santa flyer. Ask for the original artwork. */
  emblemImage: "images/brand/emblem.png",
  emblemBottom: "Est. 1921",
  shieldMark: "NV",
  coatTown: "New Vernon",
  coatPanel: "shoulders",
  coatLine: "Vol. Fire Dept.",
  mapPin: "NV",
  parkName: " ",

  /* Red with a white stripe and gold lettering, as on Engine 1. */
  livery: { body: "#B5121B", upper: "#B5121B", stripe: "#F4F2EA", letter: "#E2B44C" },
  accent: "#B5121B",

  templateControls: false,
  otherDesign: { label: "See design 2", href: "../" },
  motion: { density: 1 },

  headerCta: { label: "Donate", href: "#support" },
  mobileCall: "Call",

  /* Concept mode: a label that stays on screen, and a "Sample" tag under the heading of every
     section that holds placeholder content. Remove `concept` and `sampleBanner` only when the
     department has bought the site and supplied its own content. */
  concept: {
    badge: "Website concept",
    badgeNote: "Not the official site of the New Vernon Volunteer Fire Department.",
    sample: {
      calls: "\"Nearly 700 calls a year\" is from the department's own letter of January 2026. The breakdown by type is a placeholder.",
      apparatus: "The trucks are listed by type on the department's site, and Build-A-Truck gives the tender's age. Engine 1's photo is from its banner; the other trucks are drawings, and their details are to come.",
      join: "The training, the three ways to serve and the answers come from the department's pages. The four steps are a typical outline, to be confirmed.",
      officers: "The department's site names only the chief. The other officers' names go here.",
      safety: "General fire safety advice, to be replaced with the department's own.",
      santa: "The dates, routes and central stops are the department's own. The moving truck is a demonstration on a sketch map.",
      partners: "A proposal. The businesses are invented; the level names follow the department's own sponsorship levels.",
      photos: "The department's own photos, from its site and social media. The department can caption them properly.",
      contact: "The map is a sketch that holds the place of a live map."
    }
  },
  sampleBanner: "Website concept for the New Vernon VFD. This is not the department's official site, and nothing here takes payments or delivers messages.",

  welcome: {
    on: true, id: "launch",
    title: "Welcome to our new site.",
    text: "The Fire Company, the First Aid Squad and the Auxiliary, in one place: how to volunteer, Operation Santa, Build-A-Truck and 105 years of neighbors helping neighbors.",
    links: [{ label: "Volunteer", href: "#join" }, { label: "First Aid Squad", href: "#squad" }, { label: "Operation Santa", href: "#santa" }],
    button: "Take a look around"
  },

  contact: {
    address: "PO Box 143, Village Road",
    cityLine: "New Vernon, NJ 07976-0143",
    nonEmergency: "(973) 538-1277",
    email: "admin@nvvfd.org",
    emailLabel: "General questions",
    drill: "",
    meeting: "",
    extra: [
      ["Fire Company", "firecompany@nvvfd.org"],
      ["First Aid Squad", "firstaidsquad@nvvfd.org, PO Box 13, Village Road"],
      ["Auxiliary", "auxiliary@nvvfd.org"]
    ],
    mapStreets: ["Village Rd", "Millbrook Rd", "Glen Alpin Rd", "Blue Mill Rd"],
    social: [
      { label: "Facebook", url: "https://www.facebook.com/NVVFD" },
      { label: "Instagram", url: "https://www.instagram.com/new_vernon_fire_department/" },
      { label: "The department's current site", url: "https://www.nvvfd.com/" }
    ]
  },

  signLines: ["Volunteers wanted", "No experience needed"],

  /* Live weather alerts from the National Weather Service: they appear under the top strip by
     themselves. Add ?alert to the address to see one. */
  weather: { lat: 40.7337, lon: -74.4882, place: "Harding Township" },

  /* The guided tour, for showing the site to the department. Start it from the "Website concept"
     label or by adding ?tour to the address.
     SET `offer.price` (your yearly price) and `offer.contact` before you show it. */
  tour: {
    button: "Take the 60-second tour",
    seconds: 7,
    steps: [
      { at: "top", title: "Built for the New Vernon Volunteer Fire Department", text: "The Fire Company, the First Aid Squad and the Auxiliary, in a site of their own. Here is what it would do, in about a minute.", action: "welcome", actionLabel: "Play the welcome" },
      { at: "help", title: "Neighbors find what they need", text: "Type a word and the right answer comes up: Santa, donate, EMT, the auction." },
      { at: "join", title: "It recruits", text: "A visitor types a last name and sees it on the coat, then picks fire, first aid or the Auxiliary.", action: "apply", actionLabel: "Open the sign-up form" },
      { at: "squad", title: "The First Aid Squad gets its own page", text: "Free EMT training, and a place for neighbors who would rather drive." },
      { at: "santa", title: "Operation Santa, live", text: "On the night, the map follows the truck, so families know when to come to the end of the driveway." },
      { at: "history", title: "105 years, told properly", text: "The sixteen men who met at Haley's store in 1920, and everything since." },
      { at: "support", title: "It raises money", text: "Build-A-Truck's $800,000 of $1.5 million, up to date on the bar, with a donate button that works on any phone." },
      { at: "partners", title: "And partners help pay for it", text: "Local businesses get a place on the site all year, and a monthly report.", action: "report", actionLabel: "See a sample report" },
      { end: true, title: "What it costs the department" }
    ],
    offer: {
      price: 1800,      /* PLACEHOLDER: your yearly price */
      lines: [
        "{count} partners at the prices on this page would bring in {total} a year.",
        "The site, hosting, updates and support cost {price} a year.",
        "That leaves {left} a year toward the new truck."
      ],
      note: "Example figures, to be agreed.",
      qrLabel: "Open it on your own phone",
      qrText: "Point the camera at the code.",
      contact: "",      /* PLACEHOLDER: "Your Name, 973-555-0100, you@example.com" */
      contactBlank: "Your name, phone and email go here."
    }
  },

  /* Site-wide notice under the header. Set active:false to hide it. */
  alert: { active: true, text: "This weekend: buy your Christmas tree at Country Mile Gardens and $10 goes to Build-A-Truck.", link: { label: "Details", href: "#events" } },

  /* The menu across the top, and the order of the page. Section names are the builders in
     js/site.js; a name that matches a data block with `facts` (squad, auxiliary) becomes a panel. */
  nav: [["Volunteer", "#join"], ["First Aid Squad", "#squad"], ["Trucks", "#apparatus"], ["Santa", "#santa"], ["History", "#history"], ["Donate", "#support"], ["Contact", "#contact"]],
  sections: ["hero", "tribute", "partnerBanner", "tasks", "events", "santa", "squad", "calls", "year", "join", "auxiliary", "apparatus", "officers", "safety", "support", "partners", "gallery", "history", "roll", "contact"],

  /* The owner's rendering of the real firehouse, shown whole beside the headline. */
  hero: {
    photo: "",
    split: { src: "images/firehouse-front-nv.jpg", width: 1448, height: 1086, alt: "The New Vernon firehouse at dusk, in an artist's rendering: white clapboard with three bay doors, a cupola and the words New Vernon Volunteer Fire Department" },
    title: "Our people. Our community. That's our commitment.",
    text: "Volunteer firefighters and EMTs, answering nearly 700 calls a year across Harding Township's 20 square miles, without a dollar of tax money.",
    primary: { label: "Volunteer with us", href: "#join" },
    secondary: { label: "Help build a truck", href: "#support" }
  },

  tasks: {
    title: "What do you need from us?",
    placeholder: "Try Santa, donate or EMT",
    items: [
      { icon: "phone", title: "Emergency?", text: "Fire, a medical emergency or a car accident: call 911 first.", action: "Call 911", href: "tel:911", words: "fire ambulance accident emergency hurt smoke" },
      { icon: "calendar", title: "A visit from Santa", text: "Saturday, December 5 and Sunday, December 6, 5 to 8 PM, on a fire truck.", action: "Routes and stops", href: "#santa", words: "santa christmas operation toys tots december truck" },
      { icon: "ladder", title: "Volunteer", text: "Fire Company, First Aid Squad or Auxiliary. No experience needed.", action: "Three ways to serve", href: "#join", words: "join volunteer firefighter member sign up help" },
      { icon: "heart", title: "Donate", text: "The department receives no tax dollars. Build-A-Truck is under way.", action: "Ways to give", href: "#support", words: "donate give money fund drive truck gift tax" },
      { icon: "key", title: "Become an EMT", text: "The First Aid Squad trains you for free: more than 200 hours to start.", action: "About the squad", href: "#squad", words: "emt ambulance first aid squad medical cpr training driver" },
      { icon: "clock", title: "Buy a tree, build a truck", text: "Saturday and Sunday, November 28 and 29: Country Mile Gardens gives $10 for every tree.", action: "Details", href: "#events", words: "christmas tree country mile gardens weekend auxiliary" },
      { icon: "report", title: "Furniture or household goods?", text: "The department no longer accepts or picks up auction items. Local charities and thrift shops can help.", action: "Why the auction ended", href: "#events", words: "auction donate furniture pickup drop off items flea market" },
      { icon: "mail", title: "Honor Roll of Donors", text: "Everyone who gave in 2026, on the department's current site.", action: "See the honor roll", href: "https://www.nvvfd.com/new-page", words: "honor roll donors thank list" }
    ]
  },

  stations: { title: "", text: "", items: [] },

  /* Engine 1 beneath the Tribute in Light. */
  tribute: {
    photo: "images/photos/tribute-in-light.jpg", width: 2000, height: 1500,
    alt: "New Vernon's Engine 1 at night before the Lower Manhattan skyline, with the twin blue beams of the Tribute in Light",
    title: "We remember.",
    text: "Engine 1 beneath the Tribute in Light, for the 343 firefighters and everyone else lost on September 11, 2001."
  },

  year: {
    title: "What volunteers give Harding Township",
    text: "Nobody here is paid, and not a dollar comes from taxes.",
    stats: [
      { n: 700, label: "calls a year, nearly" },
      { n: 105, label: "years of volunteer service" },
      { n: 20, label: "square miles covered" },
      { n: 0, label: "tax dollars received" }
    ]
  },

  calls: {
    year: 2026,
    total: 700,
    label: "calls a year, nearly",
    note: "Fire, rescue and emergency medical calls across Harding Township, every one answered by a volunteer.",
    byType: [
      { label: "Medical emergencies", n: 340 }, { label: "Fire alarms", n: 110 }, { label: "Car accidents", n: 75 }, { label: "Mutual aid", n: 55 },
      { label: "Carbon monoxide alarms", n: 40 }, { label: "Wires and trees down", n: 35 }, { label: "Fires", n: 25 }, { label: "Other", n: 20 }
    ],
    recent: [],
    side: {
      title: "How the calls have grown",
      items: [
        ["1921", "8 alarms in the department's first year"],
        ["When the auction began", "Fewer than 50 calls a year"],
        ["Today", "Nearly 700 calls a year"],
        ["Ahead", "More expected: bigger homes and new developments, brush fires, storms, flooding rescues, and downed trees and wires"]
      ]
    }
  },

  join: {
    title: "There's a coat with your name on it.",
    text: "You don't need any previous experience, just a willingness to learn and serve. The department needs firefighters, EMTs, drivers and Auxiliary members.",
    coatLabel: "See it. Type your last name:",
    coatDefault: "Your name",
    cta: { label: "Ask a question first", topic: "I want to volunteer" },
    apply: {
      button: "Tell us you're interested",
      title: "Tell us you're interested",
      text: "It takes two minutes. A member gets back to you, and you can ask anything before you decide.",
      interests: ["Fire Company", "First Aid Squad: EMT", "First Aid Squad: driver", "Auxiliary", "Not sure yet"],
      submit: "Send it",
      done: "Demo only: nothing was sent. On a live site this goes to firecompany@nvvfd.org, firstaidsquad@nvvfd.org or auxiliary@nvvfd.org, depending on what you picked."
    },
    perks: ["No experience needed", "Free EMT training", "Fire, first aid or the Auxiliary"],
    steps: [
      { title: "Get in touch", text: "Send the form on this page, or email the Fire Company, the First Aid Squad or the Auxiliary." },
      { title: "Visit the firehouse", text: "Come by on Village Road, meet the members and see the trucks." },
      { title: "Train", text: "Firefighting for the Fire Company; more than 200 free hours of EMT training for the First Aid Squad." },
      { title: "Answer calls", text: "Your pager goes off, and you go help a neighbor." }
    ],
    rolesTitle: "Four ways to serve",
    roles: [
      { label: "Firefighter", color: "#B5121B", title: "The Fire Company", text: "Fire, rescue and vehicle rescue across the township." },
      { label: "EMT", color: "#14161B", title: "The First Aid Squad", text: "Basic life support, with free training." },
      { label: "Driver", color: "#F4F4F0", title: "Squad drivers", text: "For members who don't want to train in medicine." },
      { label: "Auxiliary", color: "#E2B44C", title: "The Auxiliary", text: "Fundraisers, Santa's elves and support at big emergencies." }
    ],
    faq: [
      { q: "Do I need experience?", a: "No. You don't need any previous experience, just a willingness to learn and serve." },
      { q: "What does EMT training cost?", a: "Nothing. The First Aid Squad's training is free: more than 200 hours to start, then continuing education every year." },
      { q: "What if medicine isn't for me?", a: "The First Aid Squad has driving roles for members who don't pursue medical training, and the Auxiliary needs people too." },
      { q: "Who directs the squad's medical care?", a: "Atlantic Health's Morristown Medical Center." },
      { q: "Will the department become a paid department?", a: "No. It intends to stay volunteer-led, and to make volunteering more manageable." },
      { q: "How do I start?", a: "Send the form on this page, or email firecompany@nvvfd.org, firstaidsquad@nvvfd.org or auxiliary@nvvfd.org." }
    ]
  },

  /* From the First Aid Squad page, with the squad's own photos. It has a section (and on design 2 a
     door) of its own, as on the department's current site. */
  squad: {
    title: "The First Aid Squad",
    text: "Neighbors trained in basic life support, answering the township's medical calls alongside the Fire Company and the other emergency services. EMT work is rewarding, and the training is free.",
    facts: [
      ["Licensed", "In New Jersey for basic life support, wound care, CPR and other first aid"],
      ["Training", "More than 200 hours to start, then yearly continuing education from the Red Cross, local emergency services and other licensed providers. Free to members."],
      ["Medical direction", "Atlantic Health's Morristown Medical Center"],
      ["Not into medicine?", "Members can drive instead"],
      ["Reach the squad", "firstaidsquad@nvvfd.org"]
    ],
    cta: { label: "Ask about the squad", topic: "First Aid Squad" },
    photos: [
      { src: "images/photos/squad-team.jpg", alt: "Members of the First Aid Squad and the Fire Company outside the building", caption: "The squad" },
      { src: "images/photos/squad-patient-care.jpg", alt: "Squad members giving oxygen to a patient on a stretcher", caption: "Patient care" },
      { src: "images/photos/squad-ambulance.jpg", alt: "Squad members loading a stretcher into the ambulance", caption: "To the ambulance" }
    ]
  },

  /* From the Auxiliary page and the department's history. */
  auxiliary: {
    title: "The Auxiliary",
    text: "Founded in May 1921, when thirty-five women answered the department's call. It still backs the Fire Company and the First Aid Squad.",
    facts: [
      ["At big emergencies", "On-scene support for the crews"],
      ["Helps run", "The Steak & Lobster Dinner, the wine tasting, Operation Santa's stockings and elves, and the Memorial Day Parade"],
      ["Its own fundraisers", "Election Day bake sales, an all-you-can-eat BBQ and Sip N Shop"],
      ["What it has paid for", "Jackets; CO2 monitors for the First Aid Squad; thermal imaging cameras, and life preservers and flippers for ice water rescue, for the Fire Company"],
      ["Reach it", "auxiliary@nvvfd.org"]
    ],
    cta: { label: "Join the Auxiliary", topic: "The Auxiliary" }
  },

  apparatus: {
    title: "The trucks",
    text: "Two Class A pumper engines, a heavy rescue, a tanker, a mini pumper and the chief's vehicle.",
    fleet: "Two of them are getting old. Build-A-Truck replaces the 32-year-old fire truck with a Pierce pumper ($1.5 million, needed by 2028), then the 31-year-old tender ($1 million, needed by 2031).",
    rigs: [
      { type: "engine", code: "E", plate: "E-1", photo: "images/photos/engine-1.jpg", name: "Engine 1", tab: "Engines", kind: "One of two Class A pumper engines", text: "Lettered Fire & Rescue, outside the firehouse.", specs: [["Engines in service", "Two Class A pumpers"]] },
      { type: "rescue", code: "R", plate: "R", name: "Heavy rescue", tab: "Rescue", kind: "Heavy rescue truck", text: "Vehicle rescue and the heavy tools.", specs: [["Details", "To come from the department"]] },
      { type: "tanker", code: "T", plate: "T", name: "Tanker", tab: "Tanker", kind: "Water tanker (tender)", text: "Hauls water where there is no hydrant. Many homes in Harding Township and the semi-rural towns around it rely on private wells, with no hydrant nearby.", specs: [["Age", "31 years"], ["Replacement", "Build-A-Truck Phase 2: $1,000,000, needed by 2031"]] },
      { type: "brush", code: "MP", plate: "MP", name: "Mini pumper", tab: "Mini pumper", kind: "Mini pumper", text: "A smaller pumper.", specs: [["Details", "To come from the department"]] }
    ]
  },

  officers: {
    portraits: "initials",
    title: "Who leads the department",
    text: "Officers are elected every year at the annual meeting in December.",
    chief: {
      rank: "Chief", name: "Ward Connon",
      portrait: "", uniform: "", emblem: true,
      placeholder: "The chief's message to the township goes here, in his own words.",
      facts: [["Chief", "Today"], ["On training", "Ongoing training \"helps us to reinforce our existing knowledge and skills base.\""]]
    },
    line: [],
    captains: [],
    admin: []
  },

  /* From the department's history, chapter one. */
  roll: {
    title: "Where it started",
    text: "On Tuesday, December 28, 1920, sixteen men met at Wilbur Haley's store and each put in a dollar.",
    groups: [
      { title: "The sixteen founders", names: ["Garrett Byrnes", "Garrett Byrnes, Jr.", "Jacob B. Corbin", "N. D. Goble", "John A. Green", "Marcellus H. Haley", "Wilbur B. Haley", "Harry W. Hardt", "Michael Hughes", "Fred L. Mullen", "Reginald C. Oliver", "John Quinn", "Rev. Alfred E. Thistleton", "Edward S. Walling", "John T. Walling", "Eugene G. Wear"] },
      { title: "The first officers, January 1921", names: ["President N. D. Goble", "Vice-President Harry Hardt", "Recording Secretary Rev. A. E. Thistleton", "Treasurer Reginald Oliver", "Chief Garrett Byrnes Sr.", "Assistant Chief Herbert Ortman", "Foreman Fred L. Mullen", "Sergeant-at-Arms Eugene Wear"] }
    ],
    foot: "Forty men signed the constitution on January 5, 1921."
  },

  safety: {
    title: "Most of our calls are preventable.",
    seasonal: { label: "Heating season", text: "Keep anything that burns three feet from space heaters and wood stoves, and have the chimney cleaned once a year." },
    items: [
      { icon: "alarm", title: "Smoke alarms", text: "One on every level and in every bedroom. Test them monthly, and replace each alarm after 10 years." },
      { icon: "co", title: "Carbon monoxide", text: "If the CO alarm sounds, get everyone outside and call 911." },
      { icon: "door", title: "Bedroom doors", text: "Sleep with the door closed. It holds back heat and smoke for the minutes you need." },
      { icon: "pin", title: "Can we find you?", text: "Put your house number where it can be read from the road at night, at the end of a long driveway too." },
      { icon: "check", title: "Pond ice", text: "Stay off ponds and lakes unless the ice has been checked. If someone falls through, call 911: don't go in after them." }
    ],
    cta: { label: "Ask the department a question", topic: "General question" }
  },

  events: {
    title: "At the firehouse",
    items: [
      { month: "Nov", day: "28", date: "2026-11-28T09:00", hours: 8, title: "Buy a tree, build a truck", meta: "Saturday and Sunday, November 28 and 29, 9 AM to 5 PM. For every Christmas tree sold, Country Mile Gardens, 1108 Mt. Kemble Road, Morristown, gives $10 to Build-A-Truck.", sponsor: "Country Mile Gardens" },
      { month: "Dec", day: "5", date: "2026-12-05T17:00", hours: 3, title: "Operation Santa, night one", meta: "Saturday, 5 to 8 PM. Routes 1 to 4. Santa rides a fire truck; bring a new, unwrapped toy for Toys for Tots." },
      { month: "Dec", day: "6", date: "2026-12-06T17:00", hours: 3, title: "Operation Santa, night two", meta: "Sunday, 5 to 8 PM. Routes 5 to 8. In severe rain or snow, Santa meets the children at the firehouse the next weekend." }
    ],
    news: [
      { date: "Under way", title: "Build-A-Truck", text: "$800,000 raised toward Phase 1, a $1.5 million Pierce pumper needed by 2028. Phase 2, a $1 million tender, is needed by 2031. The department receives no state, local or federal funding." },
      { date: "January 2026", title: "The Country Auction is retired", text: "After more than 70 years. When it began the department answered fewer than 50 calls a year; now it answers nearly 700, and the auction took more than 6,000 volunteer hours." },
      { date: "2026", title: "The Honor Roll of Donors is posted", text: "Thank you to every family, business and foundation that gave this year." }
    ]
  },

  /* Operation Santa, from the department's Santa page. The stops are Route 1's central stops on
     Saturday, in order. On the real night the map follows a phone riding on the truck; here the
     truck runs a made-up loop. */
  santa: {
    title: "Santa rides a New Vernon fire truck.",
    text: "Eight routes over two nights. On the night, this map follows the truck, so families know when to meet Santa at the end of the driveway.",
    when: "Saturday, December 5 and Sunday, December 6, 2026, 5 to 8 PM",
    water: false,
    loopSeconds: 60,
    stops: [
      { name: "Post House Rd., at the pond", time: "5:30" },
      { name: "Colonial Drive, at the cul-de-sac", time: "5:45" },
      { name: "Baxter Farm Rd., at the cul-de-sac", time: "6:00" },
      { name: "Shadow Brook, at Cypress Circle", time: "6:15" },
      { name: "Harding Green Dr. and Hickory La.", time: "6:45" }
    ],
    mapAlt: "A sketch map with the truck's route and five numbered stops",
    note: "Only houses that returned a card or sent the online form are visited. Times are approximate. Shown: Route 1's central stops on Saturday."
  },

  support: {
    title: "We receive $0 in tax dollars.",
    text: "The {company} is 100% independent and relies only on private funding, as decided in 1921 to ease the tax burden on residents. Build-A-Truck is replacing a 32-year-old fire truck and a 31-year-old tender.",
    fund: { name: "Build-A-Truck, Phase 1: a new fire truck", raised: 800000, goal: 1500000, note: "A Pierce pumper, needed by 2028. Phase 2, a $1,000,000 tender, is needed by 2031." },
    amounts: [50, 100, 250, 500],
    monthly: true,
    demoNote: "Demo only. On a live site this button opens the department's own giving page.",
    qr: { label: "Scan to give", text: "Print this code on the Fund Drive letter. It opens this page on any phone." },
    other: ["Phase 2: a new tender, $1,000,000, needed by 2031", "The annual NVVFD Giving Day", "Answer the Annual Fund Drive letter", "\"Fill the Tank\": a blended gift to the Reinvestment Fund and the day-to-day costs", "Build-A-Truck questions: Tom Heyl, 973-479-1898"]
  },

  /* Sponsors. A PROPOSAL with invented businesses, using the department's own level names. */
  partners: {
    title: "Local businesses could back the department all year.",
    text: "Country Mile Gardens is giving $10 for every Christmas tree sold this weekend, and the Steak & Lobster Dinner draws more than 700 guests. Businesses like these could have a home here all year, with a report that shows what they got for it.",
    disclosure: "A proposal: apart from Country Mile Gardens and its tree sale, these businesses are invented, and no year-round program is in place. A listing here would not be an endorsement by the {company}.",
    rotateSeconds: 7,
    utm: { source: "nvvfd", medium: "partner" },
    tiers: [
      { name: "Chief partner", price: "$2,500 a year", items: ["Banner on the home page, shared among three partners", "Logo on the partner wall", "Named at the Steak & Lobster Dinner", "A thank-you post every quarter"] },
      { name: "Captain partner", price: "$1,000 a year", items: ["Logo on the partner wall", "Named at the Steak & Lobster Dinner", "One thank-you post"] },
      { name: "Volunteer partner", price: "$350 a year", items: ["Name on the partner wall", "A thank-you in the Fund Drive letter"] }
    ],
    cta: { label: "Become a partner", topic: "Community partnership" },
    report: {
      button: "See a sample partner report", kicker: "Partner report", month: "October 2026",
      note: "Invented businesses and invented figures, to show what each partner would receive.",
      views: { Chief: 3000, Captain: 1400, Volunteer: 700 }, events: "2",
      allTitle: "Every partner this month",
      foot: "Each partner gets its own report by email on the first of the month."
    },
    top: [
      { id: "country-mile-gardens", active: true, name: "Country Mile Gardens", mark: ["Country Mile", "Gardens"], headline: "$10 to Build-A-Truck for every Christmas tree, November 28 and 29", sub: "1108 Mt. Kemble Road, Morristown. Saturday and Sunday, 9 to 5.", cta: "See the details", url: "#events", theme: { from: "#12372A", to: "#1F6B4C", accent: "#F2C14E" } },
      { id: "example-hardware", active: true, name: "Example Hardware", mark: ["Example", "Hardware"], headline: "Proud to back the New Vernon volunteers", sub: "Chief partner of the NVVFD.", cta: "See the partner program", url: "#partners", theme: { from: "#14161B", to: "#3A3D42", accent: "#E2B44C" } },
      { id: "example-bank", active: true, name: "Example Bank", mark: ["Example", "Bank"], headline: "Helping Build-A-Truck", sub: "Chief partner of the NVVFD.", cta: "See the partner program", url: "#partners", theme: { from: "#10233F", to: "#1F4E8C", accent: "#FFFFFF" } }
    ],
    wallTitle: "What the partner wall would look like",
    wall: [
      { name: "Example Hardware", tier: "Chief" }, { name: "Example Farm Market", tier: "Chief" }, { name: "Example Bank", tier: "Chief" },
      { name: "Example Insurance", tier: "Captain" }, { name: "Example Landscaping", tier: "Captain" }, { name: "Example Deli", tier: "Captain" },
      { name: "Example Pizza", tier: "Volunteer" }, { name: "Example Dental", tier: "Volunteer" }, { name: "Example Heating & Air", tier: "Volunteer" }
    ]
  },

  /* Photos from the department's current site, by the page they appear on. They load from
     images.squarespace-cdn.com. */
  gallery: {
    title: "On the job",
    items: [
      { src: "images/photos/drafting-at-the-pond.jpg", alt: "Engine 1 drafting from a pond and throwing a master stream", caption: "Drafting from the pond" },
      { src: "images/photos/portable-tank-night.jpg", alt: "Engine 1 at night beside a yellow portable water tank set up on the road", caption: "A portable water tank on the road, at night" },
      { src: "images/photos/on-the-engine-night.jpg", alt: "Members on top of Engine 1 at night", caption: "On top of Engine 1" },
      { src: "images/photos/e1-rear-night.jpg", alt: "The back of Engine 1 at night, with a master stream arcing over the pond", caption: "E-1 at night" },
      { src: "images/photos/pump-panel.jpg", alt: "Members at Engine 1's pump panel at night", caption: "At the pump panel" },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/2ffcfb2f-7709-4783-9d1e-3f6ec383e566/Fire+School+Burn+Bldg+Group.jpg?format=1000w", alt: "A group of New Vernon members at the fire school's burn building", caption: "At fire school" },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/0efd0ad3-5f1c-48f8-b3a6-65e8c93d8504/gallery+images_0000_IMG_1807.jpg?format=1000w", alt: "Photo from the Fire Company page", caption: "The Fire Company" },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/b7ef9331-db7a-4934-86f6-162837b99709/gallery+images_0001_IMG_1765.jpg?format=1000w", alt: "Photo from the Fire Company page", caption: "The Fire Company" },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/aa283943-5d96-40ba-a834-12a3afba748e/gallery+images_0005_IMG_0146.jpg?format=1000w", alt: "Photo from the Fire Company page", caption: "The Fire Company" },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/c3675f66-3b61-46f9-b35b-a60db102197b/gallery+images_0006_IMG_0097.jpg?format=1000w", alt: "Photo from the Fire Company page", caption: "The Fire Company" },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/b416ca24-4c24-4584-b582-41c54fedf035/Aux.jpg?format=1000w", alt: "Photo from the Auxiliary page", caption: "The Auxiliary" },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/120c4bd5-d5cd-446e-bf6c-73d76c425d28/SANTA.jpg?format=1000w", alt: "Photo from the Operation Santa page", caption: "Operation Santa" },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/9fe1bdaf-33f1-4730-b8ad-ecaccd51ac67/IMG_8758.jpg?format=1000w", alt: "Photo from the department's home page, beside A Century of Service", caption: "A century of service" },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/7a7962c7-928d-4750-b297-39970ebdeeb0/IMG_0118.JPG?format=1000w", alt: "Photo from the department's Make a Difference page" }
    ]
  },

  /* From the department's history, chapters one and two (written by Selena Dudley for the 75th
     anniversary). */
  history: {
    title: "Since 1921",
    items: [
      { year: "1920", title: "A dollar each", text: "New Vernon has about 300 homes, no water supply and a bucket line. On December 28, sixteen men meet at Wilbur Haley's store to form a volunteer fire department." },
      { year: "1921", title: "Forty signatures", text: "On January 5, at the New Vernon Field Club, forty men sign the constitution. Garrett Byrnes Sr. is the first chief." },
      { year: "1921", title: "A clock that's still there", text: "Parker and Van Cleve, Morristown jewelers, give a clock for the meeting room. It still hangs there." },
      { year: "1921", title: "The first engine comes home", text: "A LaFrance chemical engine on a Ford Model T chassis, $2,550. On May 15 Chief Byrnes, his ten-year-old son Charles and Assistant Chief Ortman take the train to New York and drive it home." },
      { year: "1921", title: "The Auxiliary", text: "On May 23 the department invites women to form an auxiliary. Thirty-five join, and in June they help run the first Carnival." },
      { year: "1921", title: "A firehouse", text: "The Field Club building, at Village and Millbrook Roads, becomes the firehouse. By year's end: 73 members, 8 alarms, and $267 in the treasury." },
      { year: "1922", title: "Harding Township", text: "The township is formed and named for President Warren Harding." },
      { year: "1932", title: "Neighbors in need", text: "Through the Depression, the Relief Committee helps township residents with food and fuel." },
      { year: "1950s", title: "From carnival to dog show to auction", text: "The Dog Show becomes the big fundraiser. In the 1960s the Country Auction takes over, and runs for more than 70 years." },
      { year: "1967", title: "The chiefs honored", text: "A party for the department's past chiefs." },
      { year: "2026", title: "The auction retires", text: "Calls have grown from fewer than 50 a year to nearly 700. The department retires the auction to put its volunteer hours into answering them." }
    ],
    /* These load from the department's current site. */
    photos: [
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/f46c7120-7653-4c3b-afbf-1290d1bb9574/NVVFD-2.jpg?format=1000w", alt: "Eight past chiefs of the department at a party in their honor, 1967", caption: "Fire chiefs at a party in their honor, 1967. Rear: H. VanHorn, H. Page, J. Ballentyne, J. Barrett. Front: L. Mullen, E. Barrett, H. Ballentyne, H. Ortman." },
      { src: "https://images.squarespace-cdn.com/content/v1/63e2bf1739c73468ea02c217/b784633c-d767-4926-8c8e-27d908f21dde/History.jpg?format=1000w", alt: "The picture at the top of the department's history page", caption: "From the department's history page" }
    ],
    chiefsTitle: "Chiefs named in the department's history",
    chiefs: [
      ["Garrett Byrnes Sr.", "First chief, 1921"], ["H. VanHorn", "Honored 1967"], ["H. Page", "Honored 1967"], ["J. Ballentyne", "Honored 1967"], ["J. Barrett", "Honored 1967"],
      ["L. Mullen", "Honored 1967"], ["E. Barrett", "Honored 1967"], ["H. Ballentyne", "Honored 1967"], ["H. Ortman", "Honored 1967"], ["Ward Connon", "Chief today"]
    ]
  },

  contactForm: {
    title: "Stop by, or send a note.",
    stationLabel: "The firehouse",
    topics: ["General question", "I want to volunteer", "First Aid Squad", "The Auxiliary", "Operation Santa", "Donations and Build-A-Truck", "Community partnership"]
  },

  footer: {
    builtBy: "",
    status: "",
    followTitle: "Follow",
    sample: "Website concept prepared for the New Vernon Volunteer Fire Department. This is not the department's official website. The content comes from the department's own site, nvvfd.com, and its photos load from there; the other photos are the department's own. Anything tagged Sample is a placeholder. The firehouse at the top is an artist's rendering; three of the trucks are drawings."
  }
};
