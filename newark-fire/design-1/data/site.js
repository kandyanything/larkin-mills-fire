/* ============================================================================
   SITE DATA — Newark Fire Division (website concept)

   DESIGN 1 of two. Design 2, the firehouse you walk into, is one folder up.

   A CONCEPT, NOT THE DIVISION'S SITE. It was built to show the Newark Fire
   Division what a website of its own could do.

   WHERE THE CONTENT COMES FROM
   Real, from the division's pages on newarkpublicsafety.org (November 2026):
   the headquarters, the 16 firehouses and the offices, the companies and
   special units, the leadership and their biographies, the 16,720 calls a
   year, the recruitment steps, the fire safety advice, the Fire Prevention
   Bureau, the Arson Squad and the history, the community programs and the
   phone numbers.
   Placeholder, and tagged "Sample" on the page (see `concept.sample` below):
   the call breakdown by type, the fourth hiring step, the partner program
   and its prices, the sketch map.
   Photos: the ones in images/photos/ were supplied by the owner for this
   concept (confirm the right to use each before the site goes live). The
   rest load from newarkpublicsafety.org; if one cannot load, a grey
   stand-in shows. The firehouse at the top is an artist's rendering supplied
   by the owner, not a photograph of a real Newark firehouse.
   The emblem is the division's own, supplied by the owner.

   THIS IS A CAREER (PAID) CITY DEPARTMENT, so the volunteer parts of the
   template are switched off: no donations, no volunteer hours, no members
   with day jobs, no juniors. `sections` below sets the order of the page.
   ========================================================================== */
window.SITE = {
  town: "Newark",
  state: "NJ",
  station: "NFD",
  founded: 1797,
  companyTemplate: "{town} Fire Division",
  shortTemplate: "{town} Fire Division",
  tagline: "Protecting Newark since 1797",
  orgWord: "division",

  /* The division's emblem, cut out of the 220-pixel copy supplied. Ask the division for the original artwork. */
  emblemImage: "images/brand/emblem.png",
  emblemBottom: "Fire Division",
  shieldMark: "NFD",
  coatTown: "Newark",
  coatPanel: "shoulders",
  coatLine: "Fire Division",
  mapPin: "HQ",
  parkName: " ",

  /* Paint for anything still drawn (the coat, the firehouse): red, as on the real rigs. */
  livery: { body: "#B3131B", upper: "#F5F3EC", stripe: "#E9B949", letter: "#E9B949" },
  accent: "#B3131B",

  templateControls: false,
  otherDesign: { label: "See design 2", href: "../" },
  /* Light or dark. "dark" puts every section on dark navy; ?theme=dark or ?theme=light in the
     address overrides this, and `themeSwitch` shows a link to the other theme in the concept bar. */
  theme: "light",
  themeSwitch: true,
  motion: { density: 1 },

  /* A city department takes no donations, so the header button and the phone bar point elsewhere. */
  headerCta: { label: "Find your firehouse", href: "#stations" },
  mobileCta: { label: "Firehouses", href: "#stations", icon: "pin" },
  mobileCall: "Non-emergency",

  /* Concept mode: a label that stays on screen, and a "Sample" tag under the heading of every
     section that holds placeholder content. Remove `concept` and `sampleBanner` only when the
     division has bought the site and supplied its own content. */
  concept: {
    badge: "Website concept",
    badgeNote: "Not the official site of the Newark Fire Division.",
    sample: {
      calls: "The 16,720 calls a year is from the division's site. The breakdown by type is a placeholder. The table holds famous fires from the division's history until it can be fed from dispatch.",
      apparatus: "The companies and special units are from the division's pages. The photos were supplied for this concept; the division can swap in its own.",
      join: "The first three steps and the answers come from the division's recruitment page. The fourth step is a typical outline, to be confirmed.",
      photos: "Photos supplied for this concept, and from the division's own photo page. The captions describe what each picture shows, so the division can caption them properly.",
      members: "Only the firefighters named on the division's history page, which stops in 2008. The division's full honor roll goes here.",
      partners: "A proposal. The businesses are invented, and a city department's sponsorships need the city's legal approval first.",
      contact: "The map is a sketch that holds the place of a live map."
    }
  },
  sampleBanner: "Website concept for the {company}. This is not the division's official site, and nothing here takes payments or delivers messages.",

  welcome: {
    on: true, id: "launch",
    title: "Welcome to our new site.",
    text: "Everything about the {company} in one place: the 16 firehouses, how to become a firefighter, fire safety at home and 229 years of history.",
    links: [{ label: "Become a firefighter", href: "#join" }, { label: "Find your firehouse", href: "#stations" }, { label: "Fire safety", href: "#safety" }],
    button: "Take a look around"
  },

  contact: {
    address: "480 Clinton Ave",
    cityLine: "Newark, NJ 07108",
    nonEmergency: "(973) 733-6000",
    email: "candidate@ci.newark.nj.us",
    emailLabel: "Recruitment questions",
    drill: "",
    meeting: "",
    extra: [
      ["Fire Division Headquarters", "(973) 733-6007"],
      ["Administration Office", "1010 18th Ave."],
      ["Special Operations Facility", "191 Orange St."],
      ["Special Services Division", "56 Prospect St."]
    ],
    mapStreets: ["Clinton Ave", "Broad St", "Route 78", "Bergen St"],
    social: [
      { label: "The division's current pages", url: "https://www.newarkpublicsafety.org/nfd/" },
      { label: "Newark Public Safety on X", url: "https://twitter.com/PublicSafetyNWK" },
      { label: "Nixle alerts for Newark", url: "https://local.nixle.com/city/nj/newark/" }
    ]
  },

  signLines: ["Now hiring", "Apply through Civil Service"],

  /* Live weather alerts from the National Weather Service for the city: they appear under the
     top strip by themselves. Add ?alert to the address to see one. */
  weather: { lat: 40.7357, lon: -74.1724, place: "Newark" },

  /* The guided tour, for showing the site to the division. Start it from the "Website concept"
     label or by adding ?tour to the address.
     SET `offer.price` (your yearly price) and `offer.contact` before you show it. */
  tour: {
    button: "Take the 60-second tour",
    seconds: 7,
    steps: [
      { at: "top", title: "Built for the Newark Fire Division", text: "Sixteen firehouses, 650 firefighters and 229 years of history, in a site of the division's own. Here is what it would do, in about a minute.", action: "welcome", actionLabel: "Play the welcome" },
      { at: "help", title: "Residents find what they need", text: "Type a word and the right answer comes up: smoke alarms, fire code, alerts, jobs." },
      { at: "stations", title: "Every neighborhood's firehouse", text: "All 16 firehouses with their companies and addresses, from the North Ironbound to Vailsburg." },
      { at: "join", title: "It recruits", text: "A visitor types a last name and sees it on the coat, then learns exactly how hiring works through Civil Service.", action: "apply", actionLabel: "Open the interest form" },
      { at: "officers", title: "The people who lead", text: "The chief and his staff, with their careers, in place of a page of names." },
      { at: "history", title: "History, told properly", text: "From the bucket brigade of the 1700s to the fireboats, with the firefighters who gave their lives." },
      { at: "safety", title: "Fewer fires", text: "The division's own fire safety advice, the Fire Prevention Bureau and the Arson Squad, written for residents." },
      { at: "partners", title: "And partners can help pay for it", text: "If the city allows it, local businesses could sponsor fire-safety outreach, and each would get a monthly report.", action: "report", actionLabel: "See a sample report" },
      { end: true, title: "What it costs the division" }
    ],
    offer: {
      price: 1800,      /* PLACEHOLDER: your yearly price */
      lines: [
        "{count} community partners at the prices on this page would bring in {total} a year, with the city's approval.",
        "The site, hosting, updates and support cost {price} a year.",
        "That leaves {left} a year for recruiting and fire-safety outreach."
      ],
      note: "Example figures, to be agreed.",
      qrLabel: "Open it on your own phone",
      qrText: "Point the camera at the code.",
      contact: "",      /* PLACEHOLDER: "Your Name, 973-555-0100, you@example.com" */
      contactBlank: "Your name, phone and email go here."
    }
  },

  /* Site-wide notice under the header. Set active:false to hide it. */
  alert: { active: true, text: "Want to be a Newark firefighter? Applications go through the New Jersey Civil Service Commission.", link: { label: "How hiring works", href: "#join" } },

  /* The menu across the top. */
  nav: [["Firehouses", "#stations"], ["Careers", "#join"], ["Companies", "#apparatus"], ["Leadership", "#officers"], ["Safety", "#safety"], ["History", "#history"], ["Contact", "#contact"]],

  /* The order of the page. Names are the section builders in js/site.js. */
  sections: ["hero", "partnerBanner", "tasks", "stations", "calls", "year", "join", "apparatus", "officers", "safety", "prevention", "community", "partners", "gallery", "history", "roll", "contact"],

  /* The firehouse rendering, shown whole beside the headline. (`slides` would put photos behind it instead;
     an empty `photo` with no `split` brings back the drawn firehouse.) */
  hero: {
    photo: "",
    split: { src: "images/firehouse-front-newark.jpg", width: 1448, height: 1086, alt: "A Newark firehouse at twilight, in an artist's rendering: red brick with a clock tower, five red bay doors under red awnings, and the words Newark Fire Department" },
    title: "Sixteen firehouses. One city. Since 1797.",
    text: "The {company} answers more than 16,720 calls a year: fires, rescues, medical emergencies and dangerous conditions, from the Ironbound to Vailsburg.",
    primary: { label: "Become a firefighter", href: "#join" },
    secondary: { label: "Find your firehouse", href: "#stations" }
  },

  tasks: {
    title: "What do you need from us?",
    placeholder: "Try smoke alarm, firehouse or exam",
    items: [
      { icon: "phone", title: "Emergency?", text: "Fire, smoke, a medical emergency or a dangerous condition: call 911 first.", action: "Call 911", href: "tel:911", words: "fire smoke ambulance gas leak emergency hurt" },
      { icon: "ladder", title: "Become a Newark firefighter", text: "Applications go through the New Jersey Civil Service Commission, not the division.", action: "How hiring works", href: "#join", words: "job career hire hiring apply exam test civil service recruit salary" },
      { icon: "pin", title: "Find your firehouse", text: "Sixteen firehouses, from Forest Hill to the airport.", action: "See all 16", href: "#stations", words: "station firehouse engine ladder company address neighborhood ward" },
      { icon: "alarm", title: "Smoke and CO alarms", text: "Where they go, when to test them and when to replace them.", action: "Fire safety at home", href: "#safety", words: "smoke detector carbon monoxide co battery alarm" },
      { icon: "report", title: "A fire code question", text: "The Fire Prevention Bureau enforces the New Jersey Uniform Fire Code.", action: "About the bureau", href: "#prevention", words: "inspection inspector permit code violation business landlord certificate" },
      { icon: "key", title: "Train for emergencies", text: "Free Community Emergency Response Team (CERT) training for Newark residents.", action: "Ways to help", href: "#community", words: "volunteer cert training prepare oem clergy academy" },
      { icon: "mail", title: "Get emergency alerts", text: "Text and email alerts from Newark Public Safety, through Nixle.", action: "Sign up on Nixle", href: "https://local.nixle.com/city/nj/newark/", words: "text alert weather notification nixle storm" },
      { icon: "clock", title: "The division's history", text: "From the 1797 fire association to the fireboats.", action: "See the timeline", href: "#history", words: "history museum past old chiefs memorial fallen" }
    ]
  },

  /* The firehouses, from the division's Station Information page. Shown as a list of cards. */
  stations: {
    title: "Sixteen firehouses",
    text: "Every neighborhood has one. Find yours.",
    items: [
      { number: "5", units: ["E5", "Q1"], name: "Engine 5 and Quint 1", address: "65 Congress St.", area: "North Ironbound" },
      { number: "6", units: ["E6"], name: "Engine 6", address: "344 Springfield Ave.", area: "Springfield/Belmont" },
      { number: "7", units: ["E7"], name: "Engine 7", address: "241 W. Market St.", area: "University Heights" },
      { number: "9", units: ["E9"], name: "Engine 9", address: "197 Summer Ave.", area: "Mount Pleasant" },
      { number: "10", units: ["E10", "L5"], photo: "images/photos/ladder-5.jpg", photoAlt: "Ladder 5", name: "Engine 10 and Ladder 5", address: "360 Clinton Ave.", area: "South Broad Valley" },
      { number: "11", units: ["E11", "L11"], name: "Engine 11 and Ladder 11", address: "345 S. 9th St.", area: "Fairmount" },
      { number: "13", units: ["E13", "TL6"], photo: "images/photos/engine-13-house.jpg", photoAlt: "The Engine 13 firehouse, with Engine 13 out front", name: "Engine 13 and Tower Ladder 6", address: "718 Mt. Prospect Ave.", area: "Forest Hill" },
      { number: "14", units: ["E14"], name: "Engine 14", address: "71 Vesey St.", area: "South Ironbound" },
      { number: "15", units: ["E15", "L7"], name: "Engine 15 and Ladder 7", address: "271 Park Ave.", area: "Lower Roseville" },
      { number: "16", units: ["E16", "L8"], name: "Engine 16 and Ladder 8", address: "473 Ferry St.", area: "North Ironbound" },
      { number: "18", units: ["E18", "TL9"], name: "Engine 18 and Tower Ladder 9", address: "395 Avon Ave.", area: "West Side" },
      { number: "19", units: ["E19"], name: "Engine 19", address: "528 Frelinghuysen Ave.", area: "Newark Liberty International Airport" },
      { number: "26", units: ["E26", "L12"], name: "Engine 26 and Ladder 12", address: "420 Sanford Ave.", area: "Vailsburg" },
      { number: "27", units: ["E27", "L4"], name: "Engine 27 and Ladder 4", address: "89 Elm Rd.", area: "South Ironbound" },
      { number: "28", units: ["E28"], name: "Engine 28", address: "691 N. 6th St.", area: "Upper Roseville" },
      { number: "29", units: ["E29", "L10"], photo: "images/photos/ladder-10.jpg", photoAlt: "Ladder 10", name: "Engine 29 and Ladder 10", address: "1028 Bergen St.", area: "Weequahic" }
    ],
    officesTitle: "Headquarters and offices",
    offices: [
      ["Fire Division Headquarters", "480 Clinton Ave., (973) 733-6007"],
      ["Administration Office", "1010 18th Ave."],
      ["Special Operations Facility", "191 Orange St."],
      ["Special Services Division", "56 Prospect St."]
    ],
    foot: "The 16 firehouses are grouped into four battalions, each led by a tour commander."
  },

  year: {
    title: "The division, by the numbers",
    text: "What it takes to protect a city of more than 300,000 people around the clock.",
    stats: [
      { n: 16720, label: "calls for service a year" },
      { n: 650, label: "firefighters" },
      { n: 16, label: "firehouses in four battalions" },
      { n: 2, label: "fireboats in the Marine Division" }
    ]
  },

  calls: {
    year: 2026,
    total: 16720,
    label: "calls for service a year",
    note: "Fires, rescues, medical emergencies and dangerous conditions, natural or man-made.",
    byType: [
      { label: "Medical emergencies", n: 7050 }, { label: "Fire alarms", n: 3380 }, { label: "Hazardous conditions", n: 1920 }, { label: "Car accidents", n: 1210 },
      { label: "Building fires", n: 1140 }, { label: "Vehicle and outside fires", n: 980 }, { label: "Rescues", n: 640 }, { label: "Other", n: 400 }
    ],
    recentTitle: "Big nights in the division's history",
    recent: [
      { when: "Oct 27, 1836", type: "The Great Fire", where: "Market, Mulberry, Mechanic and Broad", units: [] },
      { when: "Jul 7, 1951", type: "First five-alarm fire", where: "Port Newark", units: [] },
      { when: "Apr 20, 1968", type: "\"The Big One\": up to 36 buildings", where: "Bergen St. and Avon Ave.", units: [] },
      { when: "Dec 10, 1988", type: "First-ever General Alarm", where: "South 11th St.", units: [] },
      { when: "Jul 31, 1997", type: "Cargo jet crash and fire", where: "Newark Airport", units: [] },
      { when: "Dec 3, 1997", type: "\"The Miracle on Pulaski Street\"", where: "St. Casimir's Church", units: ["E12", "E14"] }
    ],
    foot: "From the division's history page. On a live site this table shows the latest calls, fed from dispatch."
  },

  join: {
    title: "There's a coat with your name on it.",
    text: "Newark hires its firefighters through the New Jersey Civil Service Commission. The division offers a competitive salary, a full benefits package and ongoing training in urban fire and rescue.",
    coatLabel: "See it. Type your last name:",
    coatDefault: "Your name",
    cta: { label: "Ask a recruitment question", topic: "Becoming a firefighter" },
    apply: {
      button: "Tell us you're interested",
      title: "Tell us you're interested",
      text: "This lets the division's recruiters know you're coming. It is not an application: that goes through the Civil Service Commission.",
      interests: ["I have applied for the Civil Service firefighter exam", "I have a date for the written exam", "Not yet: tell me when the next exam opens"],
      submit: "Send it",
      done: "Demo only: nothing was sent. On a live site this goes straight to the division's recruiters at candidate@ci.newark.nj.us."
    },
    perks: ["Competitive salary", "Full benefits package", "Ongoing training in urban fire and rescue"],
    steps: [
      { title: "Apply for the exam", text: "File for the firefighter entrance exam with the New Jersey Civil Service Commission. It is the only way to apply." },
      { title: "Tell Newark you're interested", text: "Send the interest form on this page so the division's recruiters know you." },
      { title: "Watch your email", text: "The Commission emails the test scheduling links. Check its website for updates and instructions." },
      { title: "Train at the academy", text: "Candidates hired from the list train at the academy, then join a company." }
    ],
    rolesTitle: "Where a Newark career can go",
    roles: [
      { label: "Firefighter", color: "#B3131B", title: "Engine and ladder companies", text: "Fire suppression, rescue and medical calls, in one of 16 firehouses." },
      { label: "Special Ops", color: "#14161B", title: "Special operations", text: "Haz-Mat, Urban Search and Rescue, high-angle rope, confined space and the fireboats." },
      { label: "Officer", color: "#F4F4F0", title: "Fire officers", text: "Captain, Battalion Chief and up, by promotion." },
      { label: "Arson", color: "#1D4E89", title: "Investigation and prevention", text: "The Arson Squad and the Fire Prevention Bureau." }
    ],
    faq: [
      { q: "How do I apply?", a: "Through the New Jersey Civil Service Commission only. The form on this page tells the division you're interested, but it does not apply for you." },
      { q: "Where do I find out about the test?", a: "On the Civil Service Commission's firefighter page (nj.gov/csc). Test scheduling links arrive by email, and applicants are responsible for checking the Commission's website for updates." },
      { q: "Who can answer my questions?", a: "The division's recruiters, at candidate@ci.newark.nj.us." },
      { q: "What does a Newark firefighter do?", a: "Fights fires, makes rescues and answers medical emergencies and dangerous conditions, natural or man-made: more than 16,720 calls a year from 16 firehouses." },
      { q: "Are there special teams?", a: "Yes: hazardous materials, decontamination, a mobile lab, a medical ambulance bus, Urban Search and Rescue, high-angle rope and confined-space rescue, and a Marine Division with two fireboats. Each has its own ongoing training." },
      { q: "What does it pay?", a: "The division describes the salary as competitive, with a full benefits package. Ask the recruiters for the current figures." }
    ]
  },

  apparatus: {
    title: "The companies",
    text: "Engine companies in all 16 firehouses, the ladder companies, two rescue companies and the fireboats, backed by the special operations units.",
    fleet: "Also in the division: QRV-1, a quick attack vehicle; a second fireboat; a Cascade Unit for air and rehab; decontamination units, a mobile lab and a medical ambulance bus; Urban Search and Rescue, and high-angle rope and confined-space rescue teams; a Foam Tender with 4,000 gallons of concentrate; and a restored 1958 Mack-B pumper, the Official State Caisson Unit since 2005.",
    rigs: [
      { type: "engine", code: "E", plate: "E", photo: "images/photos/engine-at-quarters.jpg", name: "Engine companies", tab: "Engines", kind: "16 engine companies, one in every firehouse", text: "From Engine 5 in the North Ironbound to Engine 29 in Weequahic.", specs: [["Companies", "16"], ["Busiest year on record", "1981, when Engine 6 alone answered more than 5,000 alarms"]] },
      { type: "tower", code: "L", plate: "L", photo: "images/photos/ladder-5.jpg", name: "Ladder companies", tab: "Ladders", kind: "Ladders, Tower Ladders 6 and 9, and Quint 1", text: "Search, forcible entry, ventilation and the aerials.", specs: [["Tower ladders", "6 in Forest Hill and 9 on the West Side"], ["Quint", "Quint 1, with Engine 5 on Congress Street"], ["First elevated platform", "1965, Truck 1 at Mulberry and Lafayette"]] },
      { type: "rescue", code: "R", plate: "R", photo: "images/photos/rescue-squad-1.jpg", name: "Rescue companies", tab: "Rescues", kind: "Rescue 1 and Rescue 2", text: "Heavy rescue, building collapse and hazardous materials.", specs: [["Rescue 2", "Heavy rescue and collapse unit"], ["Rescue 1", "Haz-Mat Division, with Ladder 11, the Decon/Spill Unit and Haz-Mat 2"], ["Haz-Mat", "In service since March 21, 1988"]] },
      { type: "tanker", code: "FB", plate: "FB1", photo: "images/photos/fireboat-1.jpg", name: "Fireboat 1", tab: "Fireboat", kind: "The Marine Division", text: "Fire protection on the water. The division runs two fireboats.", specs: [["Fireboat 1", "\"The Guardian\", based on Corbin Street"], ["The first fireboat", "The Newarker, bought in 1921"]] }
    ]
  },

  officers: {
    portraits: "initials",
    title: "Who leads the division",
    text: "The Fire Chief and his staff, under the city's Public Safety Director.",
    chief: {
      rank: "Fire Chief", name: "Del Ortiz",
      portrait: "https://www.newarkpublicsafety.org/wp-content/uploads/2023/10/Ortiz_Delfino.jpg", uniform: "",
      placeholder: "The chief's message to the city goes here, in his own words.",
      facts: [["Fire Chief", "Since October 1, 2023"], ["Joined the division", "2002"], ["From", "Newark; Sacred Heart High School, class of 1989"], ["Came up through", "Engine 11 and Ladder 11, then Engine 10, Ladder 5 and Rescue 1"], ["Also", "Hazardous Materials Technician"]]
    },
    line: [
      { rank: "Public Safety Director", name: "Emanuel Miranda, Sr.", photo: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/Emanuel-Miranda.jpg", note: "Appointed by Mayor Ras J. Baraka in 2024; oversees police, fire and civilian staff" },
      { rank: "Battalion Chief, Chief of Operations", name: "Mark Furka", photo: "https://www.newarkpublicsafety.org/wp-content/uploads/2024/03/mark-furka.jpg", note: "Joined 2007; manages New Jersey Task Force One, the federal Urban Search & Rescue team" },
      { rank: "Captain, Chief of Staff", name: "Philip Alfano IV", photo: "https://www.newarkpublicsafety.org/wp-content/uploads/2024/03/philip-alfano.jpg", note: "Joined 2007; oversees communications; Coast Guard credentialed for the fireboats" },
      { rank: "Captain, Chief Executive Officer", name: "Kenya E. Dunham", photo: "https://www.newarkpublicsafety.org/wp-content/uploads/2024/03/kanye-dunham.jpg", note: "Joined 2006; oversees the division's software systems; Urban Search & Rescue certified" }
    ],
    captains: [],
    admin: []
  },

  /* The firefighters named on the division's history page as having died in the line of duty.
     It is not the full honor roll: ask the division for it. */
  roll: {
    title: "We remember",
    text: "Newark firefighters who died in the line of duty, as named in the division's history.",
    groups: [
      { title: "1857 to 1904", names: ["Foreman Jacob Allen, Engine 4, 1857", "William B. Crane, Engine 3, 1904", "Jacob Bleyhle, Truck 3, 1904", "Leo Ross, Truck 3, 1904"] },
      { title: "1967 to 1986", names: ["Captain Michael Moran, Engine 11, 1967", "Captain Dominic La Torre, Engine 12, 1972", "Captain Vic Lardiere, Truck 4, 1972", "Firefighter Russel Schoemer, Truck 5, 1972", "Firefighter Harry Halpin, 1980", "Firefighter James Murray, Truck 10, 1984", "Firefighter Marcus Reddick, 1986"] },
      { title: "1991 to 2001", names: ["Captain Joe McCarthy, 1991", "Firefighter Michael Delane, 1994", "Firefighter Lawrence Webb, Engine 13, 2001"] }
    ],
    foot: "Names and units as the division's history gives them."
  },

  safety: {
    title: "Most fires are preventable.",
    seasonal: { label: "Heating season", text: "Keep anything that can burn at least three feet from space heaters and other heat sources. Never run a generator, grill or other fuel-burning device indoors." },
    items: [
      { icon: "alarm", title: "Smoke alarms", text: "On every level, inside every bedroom and outside sleeping areas. Test them monthly, replace them every 10 years, and never disable one." },
      { icon: "co", title: "Carbon monoxide", text: "CO alarms on every level and outside sleeping areas. If one sounds, get to fresh air and call 911." },
      { icon: "door", title: "Two ways out", text: "Know two exits from every room and a meeting place outside. Practice twice a year, at different times of day." },
      { icon: "burn", title: "In the kitchen", text: "Stay in the kitchen when you fry, grill or broil, and keep anything that burns away from the stove. No smoking in bed." },
      { icon: "hydrant", title: "Fire extinguishers", text: "Only for a small, contained fire, once everyone is out and 911 has been called: Pull, Aim, Squeeze, Sweep." },
      { icon: "check", title: "After a fire", text: "Get injuries treated, and check with the fire department before you go back inside." }
    ],
    cta: { label: "Ask a fire safety question", topic: "Fire safety question" }
  },

  /* From the division's About page. */
  prevention: {
    title: "Prevention and investigation",
    text: "Behind the engine companies are the units that keep fires from starting and find out why they did.",
    facts: [
      ["Fire Prevention Bureau", "Enforces the New Jersey Uniform Fire Code to protect lives and property."],
      ["Arson Squad", "Investigates the origin and cause of fires around the clock, and responds to every building fire and every suspicious fire."],
      ["Community Relations Division", "Teaches fire safety to the public."],
      ["Special Services Division", "Supplies firefighters with their equipment and gear, from 56 Prospect Street."]
    ],
    cta: { label: "Ask about the fire code", topic: "Fire code question" }
  },

  /* From Newark Public Safety's volunteer and training page. */
  community: {
    title: "Ways to help",
    text: "Residents can train for emergencies and learn how the city's public safety divisions work.",
    facts: [
      ["Community Emergency Response Team", "CERT training prepares Newark residents to serve as volunteers in emergencies."],
      ["Citizen Clergy Public Safety Academy", "A free 10-week workshop on how the Police and Fire Divisions, the Office of Emergency Management and Homeland Security work. Ages 18 and up."],
      ["Nixle alerts", "Emergency and weather alerts from Newark Public Safety, by text and email."]
    ],
    cta: { label: "Ask about CERT", topic: "CERT and community training" }
  },

  /* Sponsors. A PROPOSAL with invented businesses: a city department's sponsorships need the
     approval of the city's attorneys before anything like this goes live. */
  partners: {
    title: "Local businesses could back Newark's firefighters.",
    text: "Partners could sponsor fire-safety outreach and recruiting, and see exactly what they got for it.",
    disclosure: "A proposal: these businesses are invented, and no partner program is in place. A city department's sponsorships need the approval of the city's attorneys first. A listing here would not be an endorsement by the {company}.",
    rotateSeconds: 7,
    utm: { source: "newarkfire", medium: "partner" },
    tiers: [
      { name: "Engine partner", price: "$2,500 a year", items: ["Banner on the home page, shared among three partners", "Logo on the partner wall", "Named on a fire-safety campaign", "A thank-you post every quarter"] },
      { name: "Truck partner", price: "$1,000 a year", items: ["Logo on the partner wall", "Named on a fire-safety campaign", "One thank-you post"] },
      { name: "Hose partner", price: "$350 a year", items: ["Name on the partner wall"] }
    ],
    cta: { label: "Ask about partnering", topic: "Community partnership" },
    report: {
      button: "See a sample partner report", kicker: "Partner report", month: "October 2026",
      note: "Invented businesses and invented figures, to show what each partner would receive.",
      views: { Engine: 9000, Truck: 4000, Hose: 2000 }, events: "2",
      allTitle: "Every partner this month",
      foot: "Each partner gets its own report by email on the first of the month."
    },
    top: [
      { id: "example-hardware", active: true, name: "Example Hardware", mark: ["Example", "Hardware"], headline: "A free smoke alarm check for every customer this month", sub: "Proud partner of Newark fire safety.", cta: "See the partner program", url: "#partners", theme: { from: "#14161B", to: "#3A3D42", accent: "#FFD21F" } },
      { id: "example-bank", active: true, name: "Example Bank", mark: ["Example", "Bank"], headline: "Backing the next class of Newark firefighters", sub: "Proud partner of Newark fire safety.", cta: "See the partner program", url: "#partners", theme: { from: "#10233F", to: "#1F4E8C", accent: "#FFFFFF" } },
      { id: "example-market", active: true, name: "Example Market", mark: ["Example", "Market"], headline: "Fire Prevention Week starts at our checkout", sub: "Proud partner of Newark fire safety.", cta: "See the partner program", url: "#partners", theme: { from: "#12372A", to: "#1F6B4C", accent: "#F2C14E" } }
    ],
    wallTitle: "What the partner wall would look like",
    wall: [
      { name: "Example Hardware", tier: "Engine" }, { name: "Example Bank", tier: "Engine" }, { name: "Example Market", tier: "Engine" },
      { name: "Example Insurance", tier: "Truck" }, { name: "Example Auto Body", tier: "Truck" }, { name: "Example Bakery", tier: "Truck" },
      { name: "Example Pizza", tier: "Hose" }, { name: "Example Dental", tier: "Hose" }, { name: "Example Heating & Air", tier: "Hose" }
    ]
  },

  /* The first four were supplied for this concept; the rest load from the division's "NFD In Photos" page. */
  gallery: {
    title: "Newark firefighters",
    items: [
      { src: "images/photos/crew.jpg", alt: "Six Newark firefighters in turnout gear", caption: "A Newark crew" },
      { src: "images/photos/women-of-the-division.jpg", alt: "Four women of the Newark Fire Division beside an antique engine lettered N.F.D. Engine Co. No. 4", caption: "Women of the division" },
      { src: "images/photos/ladder-10.jpg", alt: "Newark Ladder 10 on the street, lights on", caption: "Ladder 10" },
      { src: "images/photos/street-firehouse.jpg", alt: "A Newark Fire Division pickup in front of a firehouse with red bay doors", caption: "On the street in Newark" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/2017-Class_46-1-scaled.jpeg", alt: "Class 46 of the Newark Fire Division, 2017", caption: "Class 46, 2017" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/Promotions-Ceremony4_092418-1-scaled.jpeg", alt: "A Newark Fire Division promotions ceremony, September 2018", caption: "Promotions ceremony, September 2018" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/Bolden_at-Engine-10_2021-1-scaled.jpg", alt: "At Engine 10, 2021", caption: "At Engine 10, 2021" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/IMG_7467-scaled.jpeg", alt: "Photo from the division's photo page" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/IMG_7416-scaled.jpeg", alt: "Photo from the division's photo page" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/IMG_6818-scaled.jpeg", alt: "Photo from the division's photo page" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/IMG_4361-1-scaled.jpeg", alt: "Photo from the division's photo page" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/Promotions-Ceremony2_092418-scaled.jpeg", alt: "A Newark Fire Division promotions ceremony, September 2018", caption: "Promotions ceremony, September 2018" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/20161221_153225-1-scaled.jpeg", alt: "Photo from the division's photo page, December 2016", caption: "December 2016" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/18701-1-scaled.jpeg", alt: "Photo from the division's photo page" },
      { src: "https://www.newarkpublicsafety.org/wp-content/uploads/2022/08/014-1-scaled.jpeg", alt: "Photo from the division's photo page" }
    ]
  },

  /* From the division's history page. */
  history: {
    title: "Since 1797",
    items: [
      { year: "1797", title: "A fire association", text: "Organized at the Court House in February, with two engines ordered from Philadelphia. John A. Buckley becomes the first Chief Engineer the next year." },
      { year: "1819", title: "Newark builds its own engine", text: "Stephen Dodd and Caleb S. Ward build the city's first local fire engine. A penny toss decides which company gets it." },
      { year: "1836", title: "The Great Fire", text: "On October 27, fire wipes out the blocks between Market, Mulberry, Mechanic and Broad Streets: $125,000 in losses." },
      { year: "1857", title: "The first line-of-duty death", text: "Foreman Jacob Allen of Engine 4 is killed by a falling wall on May 28." },
      { year: "1861", title: "To war", text: "The department passes 500 members, and about a third of them enlist in the Union Army." },
      { year: "1889", title: "Fully paid", text: "Paid units with ranks and salaries arrive in 1863. By 1889 the whole department is paid." },
      { year: "1910", title: "The High Street factory fire", text: "Twenty-six workers die on November 26. Chief Astley arrives in the department's first automobile." },
      { year: "1923", title: "The last horses", text: "Engine 13 is the last horse-drawn company to convert, and the department is fully motorized." },
      { year: "1951", title: "The first five-alarm fire", text: "Warren Maritime Petroleum at Port Newark, on July 7. No lives are lost." },
      { year: "1967", title: "Five days in July", text: "Firefighters fight 227 fires during the July riots. Thirty-six are injured, and Captain Michael Moran of Engine 11 is killed by a sniper." },
      { year: "1968", title: "\"The Big One\"", text: "On April 20, fire races through a row of frame houses at Bergen Street and Avon Avenue and destroys as many as 36 buildings." },
      { year: "1981", title: "The busiest year", text: "Engine 6 answers more than 5,000 alarms, and Engines 7 and 11 more than 4,000 each." },
      { year: "1988", title: "Firsts", text: "The Haz-Mat Unit goes into service. Captain Lowell Jones becomes interim Fire Chief, the first African-American to hold the post. In December comes the first-ever General Alarm, on South 11th Street." },
      { year: "1997", title: "The Miracle on Pulaski Street", text: "On December 3, Engines 12 and 14 save St. Casimir's Church." },
      { year: "2001", title: "September 11", text: "Newark firefighters respond to the World Trade Center." },
      { year: "2006", title: "Special Operations", text: "The Special Operations Division is formed, and the Mulberry Street firehouse comes down for the Prudential Center." },
      { year: "2007", title: "Red again", text: "Red returns to the apparatus." },
      { year: "2023", title: "Chief Del Ortiz", text: "A Newark native who joined in 2002 is named Fire Chief on October 1." }
    ],
    photos: [],
    chiefsTitle: "Chiefs and directors named in the division's history",
    chiefs: [
      ["John A. Buckley", "First Chief Engineer, 1798"], ["Chief Astley", "1910"], ["John P. Caufield", "Fire Director, 1962 to 1986"],
      ["Stanley J. Kossup", "29th Fire Chief, from 1979; Director from 1988"], ["Claude Coleman", "Fire Director, 1986 to 1988"], ["Lowell Jones", "Interim Chief 1988, later Chief and Director"],
      ["David Giordano", "Director from 2006"], ["Michael J. Lalor", "Fire Chief from 2007"], ["Del Ortiz", "Fire Chief since 2023"]
    ]
  },

  contactForm: {
    title: "Reach the division.",
    stationLabel: "Headquarters",
    topics: ["General question", "Becoming a firefighter", "Fire safety question", "Fire code question", "CERT and community training", "Community partnership"]
  },

  footer: {
    builtBy: "",
    status: "",
    followTitle: "Elsewhere",
    sample: "Website concept prepared for the Newark Fire Division. This is not the division's official website. The leadership, firehouses, history, safety advice and recruitment steps come from the division's pages on newarkpublicsafety.org. Some photos load from that site and others were supplied for this concept; anything tagged Sample is a placeholder. The firehouse at the top is an artist's rendering, not a photograph of a real Newark firehouse."
  }
};
