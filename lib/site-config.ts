export type Service = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
  primaryCta: { label: string; href: string };
};

export type Stat = { value: string; label: string; context: string };

export type NavItem = {
  label: string;
  href: string;
  isDropdown?: boolean;
  subitems?: { label: string; href: string }[];
};

export const siteConfig = {
  brand: {
    name: "Canadian Car and Truck",
    nameFull: "Canadian Car and Truck Rentals, Sales & Leasing",
    tagline: "Rentals, used vehicles, and in-house financing in Langley, BC.",
  },

  seo: {
    siteUrl: "https://canadiancarandtruck.com",
    locale: "en_CA",
    titleSuffix: "Canadian Car and Truck — Langley, BC",
    defaultDescription:
      "Vehicle rentals, pre-owned vehicle sales, and in-house financing on Fraser Highway in Langley, BC. Cars, SUVs, vans, moving trucks, and trailers.",
  },

  contact: {
    email: "canadiancarandtruck@gmail.com",
    phone: "+1 604-532-8828",
    phoneDisplay: "(604) 532-8828",
    location: "Langley, BC, Canada",
    address: {
      street: "20026 Fraser Hwy",
      city: "Langley",
      region: "BC",
      postalCode: "V3A 1M8",
      country: "CA",
    },
    directionsUrl:
      "https://www.google.ca/maps/place/Canadian+Car+%26+Truck+Rentals,+Sales+%26+Leasing/@49.1318,-122.6747,15z",
  },

  nav: {
    primary: [
      {
        label: "Rentals",
        href: "/services",
        isDropdown: true,
        subitems: [
          { label: "Cars, SUVs & Vans", href: "/services/car-suv-van-rentals" },
          { label: "Moving Trucks", href: "/services/moving-truck-rentals" },
          { label: "Trailers", href: "/services/trailer-rentals" },
        ],
      },
      { label: "Vehicles", href: "/services/pre-owned-vehicle-sales" },
      { label: "Financing", href: "/services/in-house-financing" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ] as NavItem[],
    primaryCta: { label: "Reserve a vehicle", href: "/reserve" },
  },

  hero: {
    eyebrow: "LANGLEY · FRASER VALLEY · WORKING YARD",
    h1Lines: ["Rent it. Buy it.", "Drive it home today."],
    subhead:
      "Six rental categories, a yard full of pre-owned vehicles, and in-house financing — all on one Fraser Highway lot in Langley.",
    primaryCta: { label: "Reserve a vehicle", href: "/reserve" },
    secondaryCta: {
      label: "Browse vehicles for sale",
      href: "/services/pre-owned-vehicle-sales",
    },
  },

  servicesSection: {
    eyebrow: "WHAT WE RENT",
    h2: "Six categories. One yard. Pick what hauls what you need.",
    body:
      "Compact cars for the airport run. Vans for the band. Moving trucks for the apartment switch. Trailers for the lumber and the mower. The fleet is sized to get the job done — and parked in Langley, ready when you are.",
  },

  services: [
    {
      slug: "car-suv-van-rentals",
      name: "Car, SUV & Van Rentals",
      tagline: "Compact to full-size, parked and ready.",
      summary:
        "Short-term rentals of compact cars, SUVs, and vans for personal or business use. Insurance-friendly paperwork, daily and weekly rates, and a yard you can walk through before you sign.",
      highlights: [
        "Compact · mid · full-size cars",
        "5- and 7-passenger SUVs",
        "12- and 15-passenger vans",
        "Cash and credit-card holds accepted",
      ],
      primaryCta: { label: "Reserve a vehicle", href: "/reserve?class=car" },
    },
    {
      slug: "moving-truck-rentals",
      name: "Moving Truck Rentals",
      tagline: "Sized for the move, not for the showroom.",
      summary:
        "Truck rentals for local and regional moves — cube vans, 16-footers, and cargo trucks. We rent by the day or by the move; pick up in Langley, drop off when you’re unloaded.",
      highlights: [
        "Cargo vans · 16-foot cube trucks · larger straight trucks",
        "Same-day pickup when stock allows",
        "Pads and dollies on request",
        "Local and Fraser Valley one-way available",
      ],
      primaryCta: { label: "Check availability", href: "/reserve?class=moving-truck" },
    },
    {
      slug: "trailer-rentals",
      name: "Trailer Rentals",
      tagline: "Open, enclosed, utility — hooked up and ready.",
      summary:
        "Trailers for hauling cargo, equipment, or personal belongings. Open utility, enclosed cargo, and car haulers — hitch checked before you leave the yard.",
      highlights: [
        "Open utility · enclosed cargo · car haulers",
        "Hitch verified by yard staff",
        "Daily, weekend, and weekly rates",
        "Lumber-friendly and dirt-friendly",
      ],
      primaryCta: { label: "Reserve a trailer", href: "/reserve?class=trailer" },
    },
    {
      slug: "pre-owned-vehicle-sales",
      name: "Pre-Owned Vehicle Sales",
      tagline: "Used cars and trucks. On-lot. No theatre.",
      summary:
        "Used cars, trucks, vans, and SUVs — priced on the windshield, sold by the staff who park them. Browse the lot in Langley or check the inventory online.",
      highlights: [
        "Mixed inventory — daily drivers to work trucks",
        "Walk the lot anytime during open hours",
        "Vehicle history disclosed on request",
        "Trade-ins considered case by case",
      ],
      primaryCta: { label: "Browse vehicles", href: "/services/pre-owned-vehicle-sales" },
    },
    {
      slug: "in-house-financing",
      name: "In-House Financing",
      tagline: "Financing handled at the same desk that sells the truck.",
      summary:
        "On-site financing for used vehicle purchases. No third-party rep, no shuttle to the bank — the paperwork happens where you sign for the keys. Application takes a single visit.",
      highlights: [
        "Single-desk approval process",
        "Used vehicle purchases only",
        "Trade-ins applied at signing",
        "Bring two pieces of ID and a recent paystub or proof of income",
      ],
      primaryCta: { label: "Apply at the lot", href: "/contact" },
    },
    {
      slug: "leasing",
      name: "Leasing",
      tagline: "Listed in the business name. Ask the desk for current terms.",
      summary:
        "Leasing is part of what the lot has historically offered. Current terms and rates aren’t published online — walk in or call the Langley desk for what’s available right now.",
      highlights: [
        "Walk-in or phone inquiry only",
        "Terms not published online",
        "Inventory-dependent",
        "Same desk, same staff",
      ],
      primaryCta: { label: "Call the lot", href: "tel:+16045328828" },
    },
  ] as Service[],

  benefits: {
    eyebrow: "WHY THIS LOT",
    h2: "Built for people who came here to get a vehicle — not to be sold one.",
    items: [
      {
        icon: "yard",
        label: "Walk the yard",
        body: "Inventory is staged and labeled. What you see is what you can rent or drive home.",
      },
      {
        icon: "desk",
        label: "One desk",
        body: "Rentals, sales, and financing all happen at the same counter, with the same staff.",
      },
      {
        icon: "local",
        label: "Fraser Valley local",
        body: "Langley address, Surrey to Abbotsford working area. We know the route you’re taking.",
      },
      {
        icon: "ready",
        label: "Ready when you are",
        body: "Reserve online or walk in. Stock pulled, papers ready, hitch checked.",
      },
    ],
  },

  process: {
    eyebrow: "HOW IT WORKS",
    h2: "Reserve, sign, drive. That’s the whole process.",
    steps: [
      { n: "01", label: "Reserve", body: "Pick a class, dates, and pickup. Online or by phone — either works." },
      { n: "02", label: "Show up", body: "Bring ID, a credit card or deposit, and your driver’s license. Twenty minutes at the desk." },
      { n: "03", label: "Walk-around", body: "Yard staff does a vehicle walk-around with you, photos and notes. No surprise scratches." },
      { n: "04", label: "Drive", body: "Keys in hand. Return when your contract says, refuel, drop off." },
    ],
  },

  inventoryTeaser: {
    eyebrow: "ON THE LOT RIGHT NOW",
    h2: "A snapshot of what’s parked in Langley.",
    body:
      "The lot moves — vehicles come and go weekly. The list below is a recent snapshot, not the live inventory.",
    items: [
      { year: "2025", name: "Chevrolet Silverado 3500", type: "Heavy-duty pickup" },
      { year: "2024", name: "Ram ProMaster", type: "Cargo van" },
      { year: "2024", name: "Ford Transit Cargo Van", type: "Cargo van" },
      { year: "2023", name: "Ford F-150", type: "Light-duty pickup" },
      { year: "2023", name: "Chevrolet Traverse", type: "Three-row SUV" },
      { year: "2022", name: "Ford Super Duty F-350 SRW", type: "Heavy-duty pickup" },
    ],
    footnote: "Inventory turns weekly. Call ahead to confirm availability for any specific unit.",
  },

  stats: [
    { value: "187", label: "Google reviews", context: "Verified customer reviews on Google" },
    { value: "6", label: "Rental categories", context: "Cars, SUVs, vans, trucks, moving trucks, trailers" },
    { value: "1", label: "Langley yard", context: "20026 Fraser Hwy" },
  ] as Stat[],

  cta: {
    eyebrow: "READY TO BOOK",
    h2: "Pick the dates. We’ll have it pulled and ready.",
    body:
      "Send a reservation request and the desk will confirm availability, pricing, and pickup window. You can also call the yard directly during open hours.",
    primaryCta: { label: "Reserve a vehicle", href: "/reserve" },
    secondaryCta: { label: "Call (604) 532-8828", href: "tel:+16045328828" },
  },

  about: {
    eyebrow: "ABOUT THE LOT",
    h2: "A working Fraser Valley rental yard — with a used-vehicle desk attached.",
    bodyParagraphs: [
      "Canadian Car and Truck has been renting vehicles and selling pre-owned cars and trucks out of a single Langley address for years. The model is straightforward: a yard you can walk, a desk where the same staff handles rentals, sales, and financing, and stock that turns weekly.",
      "Customers come from across the Fraser Valley — Langley, Surrey, Abbotsford, Vancouver — because the lot does what dealers usually split across three departments: rent today, buy next week, finance at the same counter.",
      "There’s no concierge program. There’s no loyalty tier. There’s a yard, a desk, and a phone line that gets picked up. That’s the whole pitch.",
    ],
    values: [
      { label: "Show the price", body: "Daily rates, used-vehicle prices, and financing terms are quoted at the desk — not buried." },
      { label: "Show the vehicle", body: "Walk the yard, look it over, ask the staff who parked it. No back lot, no held-back stock." },
      { label: "Show the address", body: "20026 Fraser Hwy, Langley. One physical lot. Phone line answered during open hours." },
    ],
  },

  reservePage: {
    eyebrow: "RESERVATION REQUEST",
    h2: "Pick the class, dates, and pickup. We’ll confirm by phone or email.",
    body:
      "Submitted requests reach the Langley desk during open hours. Same-day pickups are stock-dependent — we’ll call back to confirm.",
  },

  contactPage: {
    eyebrow: "VISIT THE YARD",
    h2: "We’re on Fraser Highway in Langley. Drop in or call ahead.",
    formIntro: "For reservation requests, financing questions, or to ask about a specific vehicle on the lot.",
  },

  legal: {
    footerDisclaimer:
      "Inventory and rental availability are subject to change. Pricing, terms, and financing offers are confirmed at the time of booking or signing.",
    copyrightHolder: "Canadian Car and Truck Rentals, Sales & Leasing",
  },

  manifest: {
    archetype: "G",
    style: "S5",
    voice: "V6",
    cardVariant: "CV3",
    heroOverlay: "HO2",
    heroPattern: "H4",
    heroEntrance: "E3",
    headerVariant: "split-utility",
    footerVariant: "FT6",
    aboutVariant: "AB3",
    benefitsVariant: "BN1",
    contactVariant: "CT1",
    statsVariant: "ST1",
    ctaVariant: "CTA2",
  },
};

export type SiteConfig = typeof siteConfig;
