/* ============================================================================
   SITE DATA — Pequannock Township Engine Company #1 (website concept)

   DESIGN 1 of two. Design 2, the firehouse you walk into, is one folder up.

   A CONCEPT, NOT THE COMPANY'S SITE. It was built to show Pequannock Township
   Fire Department, Pompton Plains Engine Company #1 what a new website could do.

   WHERE THE CONTENT COMES FROM
   Real, from the company's own site (ptfdco1.org) in November 2026: the name,
   address and phone number, the officers and roster, the apparatus and their
   specifications, the history and the list of chiefs, the FAQ answers, the
   Junior Fire Department, the Turkey Trot, the 2025 Santa route, the recent
   calls and the Turkey Trot sponsors.
   Placeholder, and tagged "Sample" on the page (see `concept.sample` below):
   call breakdown, fund drive figures, volunteer hours, the members with day
   jobs, Santa's times, the partner program and its prices, safety advice.
   The firehouse picture is an artist's rendering made from a photo of the
   building. Photos marked static.wixstatic.com load from the company's own site.
   ========================================================================== */
window.SITE = {
  town: "Pequannock",
  state: "NJ",
  station: "1",
  founded: 1915,
  companyTemplate: "{town} Township Engine Company #1",
  shortTemplate: "{town} Twp. Engine Co. 1",
  tagline: "All volunteer since 1915",

  /* The company's own patch, cut out of the small copy supplied. Ask the company for the original artwork. */
  emblemImage: "images/brand/patch.png",
  emblemBottom: "Engine Co. No. 1",
  shieldMark: "PTFD",
  coatLine: "Engine Co. 1",
  mapPin: "1",
  parkName: " ",

  /* Paint for the drawn trucks. A guess, until photographs of the real trucks replace the drawings. */
  livery: { body: "#B3131B", upper: "#F5F3EC", stripe: "#E9B949", letter: "#E9B949" },
  /* The red of the ring on the company's patch; the navy and gold of this design echo the rest of it. */
  accent: "#A3151C",

  templateControls: false,
  otherDesign: { label: "See design 2", href: "../" },
  motion: { density: 1 },

  /* Concept mode: a label that stays on screen, and a "Sample" tag under the heading of every
     section that holds placeholder content. Remove `concept` and `sampleBanner` only when the
     company has bought the site and supplied its own content. */
  concept: {
    badge: "Website concept",
    badgeNote: "Not the official site of Pequannock Township Engine Company #1.",
    sample: {
      calls: "The 302-a-year average and the six calls listed are from the company's site. The breakdown by type is a placeholder.",
      apparatus: "The specifications are from the company's site. The drawings stand in for photographs of the real trucks.",
      join: "The answers come from the company's own FAQ page. The four steps are a typical outline, to be confirmed.",
      neighbors: "Invented people, to show the idea. The company's own members go here, with their say-so.",
      year: "The hours and the dollar figure are placeholders. The other numbers are from the company's site.",
      events: "The Turkey Trot and the news items are real. Santa's 2026 date is a placeholder.",
      santa: "The stops are from the company's 2025 route. The times and the moving engine are a demonstration.",
      feed: "Three posts from the company's own Fire Calls page. On a live site new posts arrive here by themselves.",
      support: "A placeholder goal and a sample sign offer. No payment is taken on this page.",
      partners: "The businesses are sponsors named on the company's Turkey Trot page. The partner levels, prices and report are a proposal.",
      safety: "General fire safety advice, to be reviewed by the company.",
      contact: "The map is a sketch that holds the place of a live map."
    }
  },
  sampleBanner: "Website concept for {company}. This is not the company's official site, and nothing here takes payments or delivers messages.",

  welcome: {
    on: true, id: "launch",
    title: "Welcome to our new site.",
    text: "Everything about {company} in one place: how to join, the rigs, what's coming up and ways to help.",
    links: [{ label: "Become a volunteer", href: "#join" }, { label: "See the rigs", href: "#apparatus" }, { label: "Support us", href: "#support" }],
    button: "Take a look around"
  },

  contact: {
    address: "30 Jackson Ave",
    cityLine: "Pompton Plains, NJ 07444",
    nonEmergency: "(973) 835-8878",
    email: "chief1@peqtwp.org",
    emailLabel: "Chief Bryan Daley",
    drill: "",
    meeting: "",
    extra: [
      ["Joining", "recruitment@ptfd1.com"],
      ["Fire inspections", "Pequannock Fire Safety Bureau, (973) 835-5700, ext. 194"],
      ["Staffing", "The firehouse is not staffed. Members are paged and drive in when a call comes."]
    ],
    mapStreets: ["Jackson Ave", "Newark Pompton Tpke", "Route 23", "Sunset Rd"],
    social: [{ label: "Santa on Facebook", url: "https://www.facebook.com/ptfd.santa" }, { label: "The company's current site", url: "https://www.ptfdco1.org/" }]
  },

  signLines: ["Volunteers needed", "All training provided"],

  /* Live weather alerts from the National Weather Service for the township: flood watches and
     warnings appear under the top strip by themselves. Add ?alert to the address to see one. */
  weather: { lat: 40.9682, lon: -74.2957, place: "Pequannock Township" },

  /* The guided tour, for showing the site to the company. Start it from the "Website concept"
     label or by adding ?tour to the address.
     SET `offer.price` (your yearly price) and `offer.contact` before you show it. */
  tour: {
    button: "Take the 60-second tour",
    seconds: 7,
    steps: [
      { at: "top", title: "Built for Engine Company #1", text: "Your firehouse, your rigs, your officers and your history. Here is what this site would do for the company, in about a minute.", action: "welcome", actionLabel: "Play the welcome" },
      { at: "feed", title: "It updates itself", text: "Keep posting your fire calls the way you do now. They show up here on their own, so nobody has to learn a website." },
      { at: "year", title: "Your year, added up", text: "Calls, members and volunteer hours turned into a dollar figure for the fund-drive letter and the budget meeting." },
      { at: "join", title: "It recruits", text: "A visitor types a last name and sees it on the coat. The interest form goes straight to the recruitment inbox.", action: "apply", actionLabel: "Open the form" },
      { at: "neighbors", title: "Faces, not just trucks", text: "People join people. Members shown with their day jobs is the best recruiting page a volunteer company can have." },
      { at: "santa", title: "The night everyone visits", text: "On Santa night the map follows the engine through all 26 stops, and the whole town opens the site to see when to come outside." },
      { at: "support", title: "It raises money", text: "A fund drive people can watch fill up, monthly giving, a code to print on the mailed letter, and house-number signs ordered online." },
      { at: "partners", title: "And it pays for itself", text: "Your Turkey Trot sponsors get a home here all year, and each one gets a monthly report showing what it got for the money.", action: "report", actionLabel: "See a sample report" },
      { end: true, title: "What it costs the company" }
    ],
    offer: {
      price: 1800,      /* PLACEHOLDER: your yearly price */
      lines: [
        "{count} local partners at the prices on this page bring in {total} a year.",
        "The site, hosting, updates and support cost {price} a year.",
        "That leaves {left} a year for the company before the first donation."
      ],
      note: "Example figures, to be agreed.",
      qrLabel: "Open it on your own phone",
      qrText: "Point the camera at the code.",
      contact: "",      /* PLACEHOLDER: "Your Name, 973-555-0100, you@example.com" */
      contactBlank: "Your name, phone and email go here."
    }
  },

  /* Site-wide notice under the header. Set active:false to hide it. */
  alert: { active: true, text: "Five-Alarm Turkey Trot: Thursday, November 26, 9 AM at Greenview Park, Lot A.", link: { label: "Details", href: "#events" } },

  /* The firehouse picture, shown whole beside the headline. (`slides` would put photos behind it instead.) */
  hero: {
    split: { src: "images/firehouse-front.jpg", width: 1448, height: 1046, alt: "The Engine Company #1 firehouse on Jackson Avenue at twilight, in an artist's rendering made from a photo of the building: a brick gable front with a round vent and a bell tower, and four white bay doors with lit windows" },
    title: "When the alarm sounds, your neighbors go.",
    text: "{company} has served Pompton Plains and the township since 1915. All volunteer, about 302 calls a year, and no bill.",
    primary: { label: "Become a volunteer", href: "#join" },
    secondary: { label: "Give to the fund drive", href: "#support" }
  },

  tasks: {
    title: "What do you need from us?",
    placeholder: "Try inspection, Santa or join",
    items: [
      { icon: "report", title: "Schedule a fire inspection", text: "Inspections and their paperwork are handled by the Pequannock Fire Safety Bureau.", action: "Call (973) 835-5700, ext. 194", href: "tel:+19738355700", words: "inspector permit certificate smoke detector sale home business" },
      { icon: "phone", title: "Medical emergency?", text: "The company does not run an ambulance. Medical calls go to Pequannock First Aid & Rescue Squad or Atlantic Health EMS.", action: "Always call 911", href: "tel:911", words: "ambulance ems first aid squad sick injured hurt" },
      { icon: "ladder", title: "Become a volunteer", text: "No experience needed. Training and gear are provided.", action: "See how joining works", href: "#join", words: "join member firefighter recruit sign up" },
      { icon: "key", title: "Junior Fire Department", text: "A leadership and training program for ages 14 to 17.", action: "Read about the juniors", href: "#juniors", words: "teen high school kids youth junior explorer" },
      { icon: "heart", title: "Give to the 2026 Fund Drive", text: "The drive is under way now.", action: "Ways to give", href: "#support", words: "donate donation money check zeffy" },
      { icon: "calendar", title: "Find Santa's route", text: "Twenty-six stops through Pompton Plains.", action: "See the stops", href: "#santa", words: "christmas december holiday truck" },
      { icon: "clock", title: "Run the Five-Alarm Turkey Trot", text: "A 5K run and walk on Thanksgiving morning. Every dollar goes to the company.", action: "Race details", href: "#events", words: "race 5k thanksgiving run walk greenview" },
      { icon: "mail", title: "Nominate a member for a Valor Award", text: "Medal of Valor, Life Saving Medal, Unit Citation and four more.", action: "Send a nomination", topic: "Valor Award nomination", words: "medal award hero recognition service" }
    ]
  },

  stations: { title: "", text: "", items: [] },

  /* The company's own posts. On a live site these arrive from its Fire Calls page and social
     media by themselves. The photos here load from the company's current site. */
  feed: {
    title: "Latest from the company",
    text: "Whatever the company posts shows up here on its own.",
    items: [
      { from: "Fire Calls", when: "December 27, 2025", photo: "https://static.wixstatic.com/media/3cf8c8_fdbf2d28a46c4bb2b0e55b2949044516~mv2.jpg/v1/fill/w_640,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cf8c8_fdbf2d28a46c4bb2b0e55b2949044516~mv2.jpg", alt: "Photo from the company's post about the Kinnelon fire", text: "Fully involved structure fire destroys a home in Kinnelon. Company 1 went on mutual aid and helped with the fire attack." },
      { from: "Fire Calls", when: "December 26, 2025", photo: "https://static.wixstatic.com/media/3cf8c8_57124597384a49018f6972e48c8c52e2~mv2.jpg/v1/fill/w_640,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cf8c8_57124597384a49018f6972e48c8c52e2~mv2.jpg", alt: "Photo from the company's post about the Pompton Lakes fire", text: "Christmastime house fire in Pompton Lakes. Engine 1-1 ran its aerial master stream, and the crew was on scene about three hours." },
      { from: "Fire Calls", when: "October 27, 2025", photo: "https://static.wixstatic.com/media/3cf8c8_0144d386f3e245c7bc057c3ae6203ffc~mv2.png/v1/fill/w_640,h_480,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cf8c8_0144d386f3e245c7bc057c3ae6203ffc~mv2.png", alt: "Photo from the company's post about the bus rescue", text: "Man rescued from underneath a coach bus on Newark Pompton Turnpike. Crews steadied the bus with heavy cribbing." }
    ],
    more: { label: "Read every call on the company's current site", href: "https://www.ptfdco1.org/blog" }
  },

  year: {
    title: "What a year of volunteering adds up to",
    text: "Nobody at the firehouse is paid, and nobody sleeps there. This is what the township gets anyway.",
    stats: [
      { n: 302, label: "calls a year, on average" },
      { n: 46, label: "members on the roster" },
      { n: 111, label: "years, all volunteer" },
      { n: 0, label: "paid firefighters" }
    ],
    worth: { hours: 9800, rate: 34, text: "{hours} volunteer hours at {rate} an hour: service the township's taxpayers did not have to pay for." }
  },

  neighbors: {
    title: "The people on the truck live down the street.",
    text: "They have day jobs, kids and lawns to mow, and a pager on the nightstand.",
    items: [
      { name: "Erin R.", job: "Middle-school science teacher", role: "senior member", since: 2019 },
      { name: "Marcus T.", job: "Electrician", role: "engineer", since: 2011 },
      { name: "Priya S.", job: "Hospital nurse", role: "senior member", since: 2021 },
      { name: "Tom B.", job: "Retired mail carrier", role: "engineer", since: 1994 },
      { name: "Jenna K.", job: "High-school junior", role: "junior member", since: 2026 },
      { name: "Luis M.", job: "Diesel mechanic", role: "senior member", since: 2015 }
    ],
    cta: { label: "Add your name to the list", href: "#join" }
  },

  calls: {
    year: 2026,
    total: 302,
    label: "calls in an average year",
    note: "Every one answered by a volunteer who was paged at home or at work.",
    byType: [
      { label: "Fire alarms", n: 96 }, { label: "Car accidents", n: 58 }, { label: "Gas leaks", n: 34 }, { label: "Carbon monoxide alarms", n: 31 },
      { label: "Mutual aid to neighbors", n: 29 }, { label: "Technical rescues", n: 21 }, { label: "Structure fires", n: 19 }, { label: "Vehicle fires", n: 14 }
    ],
    recentTitle: "From the company's Fire Calls page",
    recent: [
      { when: "Dec 27, 2025, 11:54", type: "Mutual aid, house fire", where: "Caitlin Court, Kinnelon", units: ["Co. 1"] },
      { when: "Dec 26, 2025, 23:35", type: "Mutual aid, house fire", where: "Central Avenue, Pompton Lakes", units: ["1-1"] },
      { when: "Oct 27, 2025, 12:29", type: "Man trapped under a coach bus", where: "Newark Pompton Turnpike", units: [] },
      { when: "Oct 4, 2025, 01:26", type: "Working structure fire", where: "Lyman Ave", units: [] },
      { when: "Sep 6, 2025, 15:08", type: "Mutual aid, house fire", where: "Pompton Lakes", units: ["Co. 1"] },
      { when: "Aug 12, 2025, 04:14", type: "Mutual aid, pump station fire", where: "Pompton Lakes", units: ["Co. 1"] }
    ],
    foot: "Locations are given by street, not house number."
  },

  join: {
    title: "There's a coat with your name on it.",
    text: "You don't need experience. All training is provided, your protective gear is issued to you, and the County Fire Academy costs you nothing.",
    coatLabel: "See it. Type your last name:",
    coatDefault: "Your name",
    cta: { label: "Ask a question first", topic: "I want to volunteer" },
    apply: {
      button: "Tell us you're interested",
      title: "Tell us you're interested",
      text: "It takes two minutes. A member gets back to you, and you can ask anything before you decide.",
      interests: ["Firefighter", "Junior Fire Department, ages 14 to 17", "Not sure yet"],
      submit: "Send it",
      done: "Demo only: nothing was sent. On a live site this goes straight to recruitment@ptfd1.com and to a member's phone."
    },
    perks: ["All training provided", "Protective gear issued to you", "County Fire Academy at no cost"],
    steps: [
      { title: "Get in touch", text: "Email recruitment@ptfd1.com or send the form on this page." },
      { title: "Meet the company", text: "Come by the firehouse on Jackson Avenue, see the rigs and ask anything." },
      { title: "Train", text: "The company sends you to the County Fire Academy and trains with you every week." },
      { title: "Answer calls", text: "Your pager goes off, you drive to the firehouse and you ride with the crew." }
    ],
    rolesTitle: "Four ways to wear the shield",
    roles: [
      { label: "Firefighter", color: "#2536BF", title: "Senior members", text: "Answer the fire and rescue calls in town." },
      { label: "Engineer", color: "#14161B", title: "Engineers", text: "Drive the rigs and run the pumps." },
      { label: "Officer", color: "#F4F4F0", title: "Line officers", text: "Chief, captain, two lieutenants and a training officer." },
      { label: "Junior", color: "#A3151C", title: "Junior Fire Department", text: "Ages 14 to 17. Training, drills and supervised calls." }
    ],
    faq: [
      { q: "What qualifications do I need?", a: "None. No prior experience is needed, and all training is provided." },
      { q: "What does it cost me?", a: "Nothing. All necessary protective equipment is provided, and members are sent to the County Fire Academy at no cost." },
      { q: "What kinds of emergencies would I go to?", a: "Fire and rescue calls in town: structure fires, vehicle fires, car accidents, gas leaks, technical rescues, fire alarms and carbon monoxide alarms. The company does not run EMS, so there are no medical calls." },
      { q: "How often would I be expected to turn out?", a: "Members are encouraged to attend all fire calls, the weekly trainings and the monthly meetings. Once your required training is done, the response percentage asked of you becomes much more flexible." },
      { q: "Do firefighters sleep at the station?", a: "No. The firehouse is not staffed overnight and there are no shifts. Members are paged and drive their own cars to the firehouse." },
      { q: "Is anyone paid?", a: "No. The company is entirely volunteer and has been for more than 100 years." },
      { q: "How do I join?", a: "Email recruitment@ptfd1.com, or send the form on this page." }
    ]
  },

  /* The Junior Fire Department, from the company's own page. */
  juniors: {
    title: "The Junior Fire Department",
    text: "A leadership and training program for young men and women who want to serve their town and see what the fire service is like.",
    facts: [
      ["Ages", "14 to 17"],
      ["What juniors do", "Hands-on training and drills, and emergency calls under the supervision of experienced firefighters"],
      ["What they learn", "Firefighting, rescue operations, fire prevention, teamwork, leadership and personal responsibility"],
      ["At 16", "Eligible members may attend the County Fire Academy and begin earning certifications"],
      ["Instructors", "Chief Instructor Ron Aiosa, Dave Reeves and Jack Longo"],
      ["The John Schenck Award", "For a member who came up through the juniors and finished all five sections of the program before turning 18"]
    ],
    cta: { label: "Ask about the juniors", topic: "Junior Fire Department" },
    photos: []
  },

  apparatus: {
    title: "The rigs",
    text: "Three front-line trucks, a command car and a 1929 Ford.",
    fleet: "Also in the fleet: Chief 1, a 2015 Ford Expedition that serves as a mobile incident command station, and a 1929 Ford Model A, retired from the line and kept for parades and special events.",
    rigs: [
      { type: "tower", code: "E", plate: "1-1", name: "Engine 1-1", tab: "Quint", kind: "2015 Pierce Impel 75-foot rear-mounted quint", text: "First due to structural incidents.", specs: [["Pump", "1,500 gallons a minute"], ["Water on board", "500 gallons"], ["Aerial", "75 feet, rear mounted"]] },
      { type: "engine", code: "E", plate: "1-4", name: "Engine 1-4", tab: "Pumper", kind: "2001 Saulsbury/E-One pumper", text: "First due to motor vehicle incidents.", specs: [["Pump", "1,750 gallons a minute"], ["Water on board", "750 gallons"]] },
      { type: "rescue", code: "R", plate: "R-1", name: "Rescue 1", tab: "Heavy rescue", kind: "2009 Pierce Impel heavy rescue", text: "First due to technical rescue incidents.", specs: [["Air", "On-board cascade system"], ["Tools", "Pre-piped pneumatic lines"], ["Winch", "Utility winch"]] }
    ]
  },

  officers: {
    portraits: "initials",
    title: "Who leads the company",
    text: "Five line officers run the calls. Six administrative officers run the company. Photos of each go in these tiles.",
    chief: {
      rank: "Chief", name: "Bryan Daley",
      portrait: "", uniform: "",
      placeholder: "The chief's message to the township goes here, in his own words.",
      facts: [["Chief", "2000 to 2005, and again since 2023"], ["Reach him", "chief1@peqtwp.org"]]
    },
    line: [
      { rank: "Captain", name: "Ed Ruggero" },
      { rank: "1st Lieutenant", name: "Michael Yaconis" },
      { rank: "2nd Lieutenant", name: "Matthew Iaccheo" },
      { rank: "Training Officer", name: "Ryan Fitzsimmons" }
    ],
    captains: [],
    adminTitle: "Administration",
    admin: [
      { rank: "President", name: "Gene McKeown" },
      { rank: "Vice President", name: "Christopher Bell" },
      { rank: "Recording Secretary", name: "Justin Siesta" },
      { rank: "Corresponding Secretary", name: "Ben Smith" },
      { rank: "Treasurer", name: "Patrick Moriarty" },
      { rank: "Assistant Treasurer", name: "Ron Aiosa" }
    ]
  },

  /* The roster, from the company's membership page (last updated there November 21, 2026). */
  roll: {
    title: "Members of Engine Company #1",
    text: "The company's own roster, as posted on November 21, 2026.",
    groups: [
      { title: "Line officers", names: ["Chief Bryan Daley", "Captain Ed Ruggero", "1st Lieutenant Michael Yaconis", "2nd Lieutenant Matthew Iaccheo", "Training Officer Ryan Fitzsimmons"] },
      { title: "Engineers", names: ["Head Engineer Ron Aiosa", "Christopher Bell", "Joseph Caropreso", "Jesse Cianciotto", "Robert Cook", "Will Fluck", "Michael Lewandowski", "Jack Longo", "Patrick Moriarty", "Anthony Polito", "Ed Quist"] },
      { title: "Senior members", names: ["Jared Acker", "Christopher Burlew", "Madison Dabice", "Russell Eddeh", "Ryan English", "Emily Fuentes", "Kyle Gilland", "Patrick Kenny", "William Kenny", "Anthony Knof", "Michael Ledwozyw", "Ben Lyon", "Holly Lyon", "Jacob Mangeri", "Gene McKeown", "Craig Munson", "Bobby Nasufi", "Jimmy Schneider", "Justin Siesta", "Ben Smith", "Michael Soriero"] }
    ],
    foot: "Nine junior members, ages 14 to 17, are also on the roster. Their names are left off this concept."
  },

  safety: {
    title: "Most of our calls are preventable.",
    seasonal: { label: "Heating season", text: "Keep anything that burns three feet from space heaters and wood stoves. Have the chimney cleaned once a year." },
    items: [
      { icon: "alarm", title: "Smoke alarms", text: "One on every level and in every bedroom. Test them monthly. Replace the whole alarm after 10 years." },
      { icon: "co", title: "Carbon monoxide", text: "If the CO alarm sounds, get outside and call 911. Leave the windows shut so we can find the source." },
      { icon: "door", title: "Bedroom doors", text: "Sleep with the door closed. It holds back heat and smoke for the minutes you need." },
      { icon: "pin", title: "When the river rises", text: "Much of the township is flood plain. Never drive into moving water, and leave early when you are told to." },
      { icon: "hydrant", title: "Hydrants", text: "After a storm, clear the snow three feet around the hydrant on your block." }
    ],
    cta: { label: "Ask the company a question", topic: "General question" }
  },

  events: {
    title: "At the firehouse",
    items: [
      { month: "Nov", day: "26", date: "2026-11-26T09:00", hours: 2, title: "Five-Alarm Turkey Trot", meta: "Thursday, 9 AM, Greenview Park, Lot A. A certified 5K run and walk with food trucks, and costumes are welcome. All proceeds go to the volunteers of Engine Company #1.", sponsor: "Handy Mike LLC, title sponsor" },
      { month: "Dec", day: "12", date: "2026-12-12T15:30", hours: 3, title: "Santa comes through Pompton Plains", meta: "Placeholder date. In 2025 Santa set off on Saturday, December 13, at 3:30 PM, with a rain date the next day. See the stops below." }
    ],
    news: [
      { date: "This week", title: "Sign-ups are open for the Five-Alarm Turkey Trot", text: "Register through RunSignup, or ask about sponsoring at fivealarmturkeytrot@gmail.com." },
      { date: "Under way", title: "The 2026 Fund Drive is in progress", text: "Every dollar helps the company be ready for the next emergency." },
      { date: "This fall", title: "Over $2,000 raised for Fighting Pretty", text: "From the company's Breast Cancer Awareness apparel sales." }
    ]
  },

  /* Santa night. The stops are ten of the 26 on the company's 2025 route, in order. On the real
     night the map follows a phone riding on the engine; here the engine runs a made-up loop. */
  santa: {
    title: "Santa rides with Engine Company #1.",
    text: "On the night, this map follows the truck, so you know when to bring the kids to the curb.",
    when: "2026 date to be announced. In 2025: Saturday, December 13, 3:30 PM",
    water: false,
    loopSeconds: 60,
    stops: [
      { name: "Winding Way & Greendale", time: "3:30" },
      { name: "Village Road", time: "3:45" },
      { name: "Kinney", time: "4:10" },
      { name: "Juniper", time: "4:35" },
      { name: "Elizabeth", time: "4:55" },
      { name: "Prospect", time: "5:15" },
      { name: "Crew change at the Company 1 firehouse", time: "5:35" },
      { name: "Franklin", time: "5:50" },
      { name: "Rochambeau", time: "6:10" },
      { name: "Manor Ave", time: "6:35" }
    ],
    mapAlt: "A sketch map with the engine's route and nine numbered stops",
    note: "Demonstration. Ten of the 26 stops on the 2025 route are shown, and the engine is following a made-up loop."
  },

  support: {
    title: "Every dollar gets us ready for the next call.",
    text: "{company} is all volunteer. The 2026 Fund Drive is under way.",
    fund: { name: "2026 Fund Drive", raised: 31500, goal: 60000, note: "Placeholder figures. The company sets the goal and the site keeps the bar up to date." },
    amounts: [25, 50, 100, 250],
    monthly: true,
    demoNote: "Demo only. On a live site this button opens the company's own donation form.",
    qr: { label: "Scan to give", text: "Print this code on the fund-drive letter. It opens this page on any phone." },
    signs: {
      title: "Help us find your house in the dark",
      text: "A reflective green number sign for the end of the driveway, readable from both directions at night.",
      label: "Your house number", sample: "30",
      cta: "Order a sign for $20",
      done: "Demo only. On a live site this takes the order and payment, and the company gets a list of signs to make."
    },
    other: ["Give through the company's 2026 Fund Drive form, which it runs on Zeffy today", "Run or walk the Five-Alarm Turkey Trot: every dollar goes to the company", "Sponsor the Turkey Trot: fivealarmturkeytrot@gmail.com"]
  },

  /* Sponsors. The businesses are the ones named on the company's 2026 Turkey Trot page, at the
     levels shown there. The partner levels and prices below are a proposal. */
  partners: {
    title: "Local businesses already back the company.",
    text: "The Turkey Trot's sponsors could have a home here all year, with a report that shows what they got for it.",
    disclosure: "A proposal: the sponsors are real, and the year-round program is not in place. A listing here is not an endorsement by {company}.",
    rotateSeconds: 7,
    utm: { source: "ptfdco1", medium: "partner" },
    tiers: [
      { name: "Engine partner", price: "$2,500 a year", items: ["Banner on the home page, shared among three partners", "Logo on the partner wall", "Sign at the Turkey Trot and on Santa night", "A thank-you post every quarter"] },
      { name: "Truck partner", price: "$1,000 a year", items: ["Logo on the partner wall", "Sign at the Turkey Trot", "One thank-you post"] },
      { name: "Hose partner", price: "$350 a year", items: ["Name on the partner wall", "A thank-you in the fund-drive letter"] }
    ],
    cta: { label: "Become a partner", topic: "Community partnership" },
    report: {
      button: "See a sample partner report", kicker: "Partner report", month: "October 2026",
      note: "Invented businesses and invented figures, to show what each partner would receive.",
      views: { Engine: 4000, Truck: 1700, Hose: 900 }, events: "2",
      allTitle: "Every partner this month",
      foot: "Each partner gets its own report by email on the first of the month.",
      partners: [
        { name: "Example Hardware", tier: "Engine" }, { name: "Example Auto Body", tier: "Engine" }, { name: "Example Bakery", tier: "Engine" },
        { name: "Example Insurance", tier: "Truck" }, { name: "Example Pizza", tier: "Truck" }, { name: "Example Veterinary", tier: "Truck" },
        { name: "Example Heating & Air", tier: "Hose" }, { name: "Example Lumber", tier: "Hose" }, { name: "Example Dental", tier: "Hose" }
      ]
    },
    top: [
      { id: "handy-mike", active: true, name: "Handy Mike LLC", mark: ["Handy Mike", "LLC"], headline: "Title sponsor of the 2026 Five-Alarm Turkey Trot", sub: "Thank you for backing Engine Company #1.", cta: "See every sponsor", url: "#partners", theme: { from: "#14161B", to: "#3A3D42", accent: "#FFD21F" } },
      { id: "farms-view", active: true, name: "Farms View", mark: ["Farms View", ""], headline: "Chief sponsor of the 2026 Five-Alarm Turkey Trot", sub: "Thank you for backing Engine Company #1.", cta: "See every sponsor", url: "#partners", theme: { from: "#12372A", to: "#1F6B4C", accent: "#F2C14E" } },
      { id: "wayne-subaru", active: true, name: "Wayne Subaru", mark: ["Wayne", "Subaru"], headline: "Captain sponsor of the 2026 Five-Alarm Turkey Trot", sub: "Thank you for backing Engine Company #1.", cta: "See every sponsor", url: "#partners", theme: { from: "#10233F", to: "#1F4E8C", accent: "#FFFFFF" } }
    ],
    wallTitle: "Sponsors of the 2026 Five-Alarm Turkey Trot",
    wall: [
      { name: "Handy Mike LLC", tier: "Engine", note: "Title sponsor" }, { name: "Farms View", tier: "Engine", note: "Chief sponsor" },
      { name: "Maschio's", tier: "Truck", note: "Captain sponsor" }, { name: "Wayne Subaru", tier: "Truck", note: "Captain sponsor" }, { name: "CLR Solutions", tier: "Truck", note: "Captain sponsor" },
      { name: "Columbia Bank", tier: "Hose", note: "Lieutenant sponsor" }, { name: "ServiceMaster", tier: "Hose", note: "Lieutenant sponsor" }, { name: "Pompton Sport Center", tier: "Hose", note: "Lieutenant sponsor" },
      { name: "JanFence", tier: "Hose", note: "Lieutenant sponsor" }, { name: "Rentals Unlimited", tier: "Hose", note: "Lieutenant sponsor" },
      { name: "The Omega Real Estate Group", tier: "Hose", note: "First Responder sponsor" }, { name: "Pompton Queen Diner", tier: "Hose", note: "First Responder sponsor" }
    ]
  },

  gallery: { title: "From the bay floor", items: [] },

  history: {
    title: "Since 1915",
    items: [
      { year: "1915", title: "A fire department is proposed", text: "On April 2, at the Mandeville Inn, the town's de facto hall. Weeks later, 13 men sign up." },
      { year: "1915", title: "Chowder, cards and a pig", text: "The company raises money with chowder parties, card games and $5 bonds. The bonds lead to a raffle, and first prize is a pig." },
      { year: "After", title: "The barn burns", text: "The money buys a barn for a headquarters. It catches fire and much of the equipment is lost. The volunteers rebuild on Jackson Avenue, where the company still is." },
      { year: "1937", title: "The First Reformed Church fire", text: "One of the nation's oldest churches, with no hydrants or water mains to draw on. The company saves its original walls." },
      { year: "1957", title: "A week at the rubber mill", text: "The company spends a week fighting the fire at the Pequannock Hard Rubber Co. complex in Butler." },
      { year: "1960", title: "The Pequannock train derailment", text: "Pictured in the company's archive." },
      { year: "Today", title: "Floods, rescues and more", text: "Pompton Plains and Pequannock lie in flood plains, so the company trains for flood rescue, evacuation and heavy rescue, and for chemical and biohazard incidents." }
    ],
    /* These four load from the company's current site. */
    photos: [
      { src: "https://static.wixstatic.com/media/3cf8c8_4a52ba8e2b3c4e679e481926ef574365~mv2.jpg/v1/fill/w_694,h_550,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cf8c8_4a52ba8e2b3c4e679e481926ef574365~mv2.jpg", alt: "The original Pequannock Company 1 firehouse", caption: "The original firehouse on Sherman Ave" },
      { src: "https://static.wixstatic.com/media/3cf8c8_97ec810fd3a348a3a95de0324415a1df~mv2.jpg/v1/fill/w_694,h_550,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cf8c8_97ec810fd3a348a3a95de0324415a1df~mv2.jpg", alt: "The 1937 First Reformed Church of Pompton Plains fire", caption: "1937, the First Reformed Church fire" },
      { src: "https://static.wixstatic.com/media/3cf8c8_1acee8a19d674aa4a71661ec609d3e69~mv2.jpg/v1/fill/w_694,h_550,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cf8c8_1acee8a19d674aa4a71661ec609d3e69~mv2.jpg", alt: "The 1957 Butler rubber mill fire", caption: "1957, the rubber recycling mill fire" },
      { src: "https://static.wixstatic.com/media/3cf8c8_4b267d90457543609d444d61fcfba9d7~mv2.jpg/v1/fill/w_694,h_550,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3cf8c8_4b267d90457543609d444d61fcfba9d7~mv2.jpg", alt: "The 1960 Pequannock train derailment", caption: "1960, the train derailment" }
    ],
    chiefsTitle: "Chiefs of the company",
    chiefs: [
      ["E.W. Stillman", "1915"], ["Nicholas Sweetman", ""], ["James Card", ""], ["Fred Sieling", ""], ["William Lewis Arthur", ""], ["J. Wise Well Gilland", ""], ["Henry Tintle Jr.", ""], ["George Dewilde", ""],
      ["Harry Henning", "1948 to 1949"], ["Egil M. Aalberg", "1950 to 1957"], ["William Colfax Gilland", "1958 to 1965"], ["Don Squire", "1966"], ["George Dewilde", "1967 to 1970"], ["William Dunlap", "1971"],
      ["Victor Becker", "1972 to 1973"], ["William Colfax Gilland", "1974 to 1975"], ["Victor Becker", "1976 to 1977"], ["Raymond Mara", "1978 to 1979"], ["Thomas Siemonsma", "1980 to 1981"], ["Robert Burlew", "1982 to 1983"],
      ["Raymond Mara", "1984 to 1985"], ["Robert Burlew", "1986 to 1987"], ["Eugene McKeown", "1988 to 1991"], ["James Schneider Jr.", "1992 to 1993"], ["Richard Huhn", "1994 to 1996"], ["Robert Jones", "1997 to 1999"],
      ["Bryan Daley", "2000 to 2005"], ["Dave Hollberg", "2006 to 2008"], ["David James", "2009 to 2011"], ["Christopher Bell", "2012 to 2014"], ["Chris Burlew", "2015 to 2017"], ["Christopher Bell", "2018 to 2022"], ["Bryan Daley", "2023 to today"]
    ]
  },

  contactForm: {
    title: "Stop by, or send a note.",
    stationLabel: "The firehouse",
    topics: ["General question", "I want to volunteer", "Junior Fire Department", "Valor Award nomination", "Five-Alarm Turkey Trot", "Community partnership"]
  },

  footer: {
    builtBy: "",
    status: "",
    followTitle: "Elsewhere",
    sample: "Website concept prepared for Pequannock Township Engine Company #1. This is not the company's official website. The officers, roster, apparatus, history and events come from the company's own site, ptfdco1.org; anything tagged Sample is a placeholder. The firehouse picture is an artist's rendering made from a photo of the building."
  }
};
