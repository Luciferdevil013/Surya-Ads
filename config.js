/* ------------------------------------------------------------------
   Surya Sports Media — Telegram + WhatsApp Landing Page configuration
   This is the ONLY file you normally need to edit.
   ------------------------------------------------------------------ */
window.LP_CONFIG = {

  /* ============ BUSINESS ============ */

  brandName: "Surya Sports Media",
  tagline: "AI-Powered Digital Advertising Solutions",
  websiteUrl: "https://suryaads.com",
  websiteLabel: "suryaads.com",

  // Square logo mark used in the header and footer (SVG or PNG, in /assets).
  // Leave "" to fall back to the letter mark.
  logoMark: "assets/surya-mark.svg",

  // Telegram username every chat button opens (with or without the "@").
  // Leave "" to hide every Telegram button.
  telegramUsername: "suryasportsmedia",

  // WhatsApp number every WhatsApp button opens. Full international format,
  // digits only — India example: 91 + 9876543210 -> "919876543210".
  // Leave "" to hide every WhatsApp button.
  whatsappNumber: "919423576797",

  // Text pre-filled in the user's Telegram / WhatsApp compose box.
  prefillMessage: "Hi Surya Sports Media! I'm interested in your digital advertising services. Please share the details and a free consultation.",

  /* ============ REDIRECT BEHAVIOUR ============ */

  // Send the visitor to a chat automatically, without them tapping.
  // Set to false if you want a pure click-through page (safer for ad review).
  autoRedirect: false,

  // Which app the auto-redirect opens: "telegram" or "whatsapp".
  redirectChannel: "telegram",

  // How long the landing page is visible before the auto-redirect fires (ms).
  // 2500 = 2.5 seconds. Keep this >= 1200 so the page is genuinely seen —
  // instant redirects can be flagged as a "bridge page" during Meta ad review.
  redirectDelayMs: 2500,

  /* ============ TRACKING ============ */

  // Meta (Facebook) Pixel ID. The Pixel base code itself is pasted in the
  // <head> of index.html (Meta's domain check looks for it there) — if you
  // change pixels, update the ID in both places. Leave "" to stop the
  // chat-click event.
  metaPixelId: "4029597787337053",

  // Standard event fired when the visitor is sent to Telegram or WhatsApp.
  // Common choices: "Lead", "Contact", "InitiateCheckout".
  pixelClickEvent: "Lead",

  // Google Analytics 4 measurement ID (e.g. "G-XXXXXXX") — leave "" to disable.
  ga4Id: "",

  // Grace period (ms) given to the pixel to send its beacon before navigating.
  trackingFlushMs: 300,

  /* ============ URL OVERRIDES ============ */

  // Lets one page serve many ads:
  //   ?u=someusername   -> override the Telegram username
  //   ?n=919999999999   -> override the WhatsApp number
  //   ?m=Hello%20there  -> override the pre-filled message
  //   ?ref=summer_sale  -> campaign reference
  //   ?noredirect=1     -> disable auto-redirect (use this link for ad review)
  allowUrlOverrides: true,

  // Append the campaign reference to the chat message so you can tell
  // which ad each lead came from. Reads ?ref= then ?utm_campaign=.
  appendRefToMessage: false,
  refMessageFormat: "\n\n(Ref: {ref})",

  /* ============ COPY ============ */

  // Tip: wrap words in *asterisks* to give them the orange highlight.
  badge: "Free consultation · Replies in under 5 min",
  headline: "Ads that bring *real customers*, not just likes",
  subheadline: "Surya Sports Media plans, creates and manages your Google, Facebook & Instagram ads with AI-driven targeting — so every rupee you spend works harder.",
  buttonLabel: "Chat with us on Telegram",
  whatsappButtonLabel: "Chat with us on WhatsApp",
  buttonSub: "Free consultation · No obligation",   // small line under the button text; "" to hide
  reassurance: "Pick Telegram or WhatsApp · No spam, ever",
  onlineLabel: "Online now",

  redirectingText: "Opening {app}…",   // {app} becomes Telegram or WhatsApp
  fallbackText: "Didn't open automatically? Tap one of the buttons above.",

  // The three floating labels around the sun in the hero (desktop only).
  heroChips: ["More qualified leads", "Higher ROI on ad spend", "AI-optimized targeting"],

  /* ============ TRUST ROW ============ */

  showTrust: true,
  stats: [
    { value: "AI-powered", label: "Solutions" },
    { value: "< 5 min",    label: "Avg. reply" },
    { value: "100%",       label: "Client focus" }
  ],

  /* ============ CLIENTS ============ */

  // Shown as photo cards right after the hero, and as small round avatars
  // next to the main button ("Trusted by ...").
  //
  // Photos go in assets/clients/. Use lowercase file names that match the
  // "photo" path below — .jpg, .jpeg, .png and .webp all work. Portrait photos
  // look best (about 800 x 1000 px). Until a photo is added, the card shows the
  // person's initials instead, so nothing looks broken.
  //
  //   name      shown on the card
  //   place     optional — city or business type, e.g. "Mumbai"
  //   photo     path to the photo
  //   work      optional — tags for what you did for them
  //   quote     optional — a real testimonial, in their words
  //   position  optional — which part of the photo stays in frame, e.g. "50% 20%"
  clientsTitle: "Real clients. *Real work.*",
  clientsNote: "Some of the people we've worked with. Your business could be next.",
  clientsCtaLabel: "Want to be next? Chat with us",
  clientBadge: "Our client",
  proofPrefix: "Trusted by",
  clients: [
    { name: "Malik Mumbai",   place: "", photo: "assets/clients/malik-mumbai.jpeg",   position: "62% 30%", work: ["Digital marketing"], quote: "" },
    { name: "Anurag Dwivedi", place: "", photo: "assets/clients/anurag-dwivedi.jpeg", position: "50% 20%", work: ["Digital marketing"], quote: "" },
    { name: "Vipin Singh",    place: "", photo: "assets/clients/vipin-singh.jpeg",    position: "44% 25%", work: ["Digital marketing"], quote: "" }
  ],

  /* ============ PROBLEM vs SOLUTION ============ */

  compareTitle: "Running ads shouldn't feel like *burning money*",

  problemsTitle: "Sound familiar?",
  problems: [
    "Not getting enough leads from your online presence",
    "Wasting money on ads that don't convert",
    "Confused by complex digital marketing options",
    "No time to manage social media and ads",
    "No clear idea of what's actually working"
  ],

  benefitsTitle: "With Surya Sports Media, you get",
  benefits: [
    "More qualified leads and customers from digital channels",
    "Higher ROI on your advertising spend",
    "Better brand visibility across social media",
    "Data-driven decisions with clear performance metrics",
    "Time saved with automated marketing workflows",
    "Measurable growth with monthly reporting"
  ],

  /* ============ SERVICES ============ */

  servicesTitle: "Everything you need to *grow online*",
  aboutText: "Surya Sports Media is a full-service digital advertising agency powered by AI technology. We help businesses grow their online presence through targeted social media marketing, Google Ads management, WhatsApp marketing campaigns, and comprehensive digital strategies. Our data-driven approach ensures maximum ROI for your advertising budget.",
  servicesNote: "Not sure what you need? We'll recommend the right mix on a free Telegram or WhatsApp chat.",
  // featured: true makes a service a big card (the first two work best).
  services: [
    { icon: "search",  title: "Google Ads Management",       featured: true, text: "Expert management of Google Search, Display, and Shopping campaigns with AI-driven optimization for maximum conversions." },
    { icon: "pin",     title: "Social Media Marketing",      featured: true, text: "Strategic social media advertising across Facebook, Instagram, LinkedIn and more to reach your ideal customers." },
    { icon: "chat",    title: "WhatsApp Marketing",          text: "Automated WhatsApp campaigns, broadcast lists, and chatbot solutions for instant customer engagement." },
    { icon: "bot",     title: "AI Content Creation",         text: "AI-generated ad copy, social media posts, and marketing content optimized for your target audience." },
    { icon: "chart",   title: "Analytics & Reports",         text: "Detailed performance reports showing ROI, conversions, and campaign insights in easy-to-understand dashboards." },
    { icon: "profile", title: "Brand Strategy",              text: "Complete brand identity development, positioning strategy, and visual identity creation for market impact." },
    { icon: "star",    title: "Reputation Management",       text: "Monitor and manage your online reviews, ratings, and brand mentions across all platforms." },
    { icon: "versus",  title: "Competitor Analysis",         text: "Deep analysis of competitor strategies, ad spending, and positioning to find your competitive advantage." },
    { icon: "bell",    title: "Lead Generation",             text: "Targeted lead generation campaigns using LinkedIn, Google, and social media to fill your sales pipeline." },
    { icon: "pen",     title: "Email Marketing",             text: "Automated email sequences, newsletter campaigns, and drip marketing for customer nurturing and retention." }
  ],

  /* ============ HOW IT WORKS ============ */

  stepsTitle: "Get started in *3 simple steps*",
  steps: [
    { title: "Free consultation", text: "Message us on Telegram or WhatsApp. We analyze your current digital presence and show you exactly where growth opportunities exist." },
    { title: "Strategy & launch", text: "We create a custom marketing strategy, set up your campaigns, and launch with AI-optimized targeting." },
    { title: "Optimize & scale",  text: "We monitor performance, optimize campaigns daily, and scale what works while cutting what doesn't." }
  ],

  /* ============ WHO IT'S FOR ============ */

  industriesTitle: "Built for *every kind* of business",
  industries: [
    "E-commerce stores", "Local businesses", "Startups & SaaS", "Professional services",
    "Healthcare clinics", "Real estate", "Restaurants & hospitality", "Education & coaching",
    "Manufacturing", "Retail brands"
  ],

  /* ============ FAQ ============ */

  faqTitle: "Questions? *Answered.*",
  faqs: [
    { q: "How much does digital advertising cost?", a: "Our management fees start from ₹15,000/month depending on your goals and ad spend. The actual ad budget is separate and we'll help you set the right amount for your business size." },
    { q: "How long before I see results?",          a: "Most clients see initial results within 2-4 weeks of campaign launch. Significant growth typically happens over 2-3 months as our AI optimization learns and improves." },
    { q: "Do you work with small businesses?",      a: "Absolutely! We work with businesses of all sizes. Our AI-powered approach makes professional digital marketing accessible and affordable for small businesses." },
    { q: "What platforms do you advertise on?",     a: "We manage campaigns across Google Ads, Facebook, Instagram, LinkedIn, YouTube, and WhatsApp. We'll recommend the best mix based on where your customers spend their time." }
  ],

  /* ============ CLOSING CALL-TO-ACTION ============ */

  closingTitle: "Ready to *grow* your business?",
  closingText: "Send us one message on Telegram or WhatsApp. We'll analyze your current digital presence and show you exactly where growth opportunities exist — no obligation.",

  /* ============ FOOTER / LEGAL ============ */

  footerNote: "Chat with us on Telegram or WhatsApp",
  privacyUrl: "privacy.html",
  termsUrl: "terms.html",

  // Shown on privacy.html / terms.html. Meta's ad review looks for a real,
  // reachable contact — use an address you actually monitor.
  contactEmail: "hello@suryaads.com",
  // Leave "" to show today's date automatically.
  legalUpdated: "",

  /* ============ SEO / SHARING ============ */

  pageTitle: "Surya Sports Media — Ads That Bring Real Customers | Chat on Telegram or WhatsApp",
  pageDescription: "Surya Sports Media provides AI-powered digital marketing solutions. Google Ads, Social Media, WhatsApp Marketing. Message us on Telegram or WhatsApp for a free consultation.",
  // Absolute URL of a 1200x630 preview image, or "" for none.
  shareImage: "assets/og-image.png?v=2"
};
