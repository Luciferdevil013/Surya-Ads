/* ------------------------------------------------------------------
   Surya Ads — WhatsApp Landing Page configuration
   This is the ONLY file you normally need to edit.
   ------------------------------------------------------------------ */
window.LP_CONFIG = {

  /* ============ BUSINESS ============ */

  brandName: "Surya Ads",
  tagline: "AI-Powered Digital Advertising Solutions",
  websiteUrl: "https://suryaads.com",
  websiteLabel: "suryaads.com",

  // Logo files live in /assets. Leave "" to fall back to the letter mark.
  logo: "assets/surya-logo.png",   // full lockup (mark + wordmark)
  logoMark: "assets/surya-mark.png", // icon only, used in the header

  // Full international format, digits only. NO "+", no spaces, no dashes.
  // India example: 91 + 9876543210  ->  "919876543210"
  whatsappNumbers: [
    "919423576797"
  ],

  // How to pick a number when more than one is listed:
  //   "random"     - pick at random on every visit (best for spreading load)
  //   "sequential" - round-robin per browser
  //   "off"        - always use the first number
  rotation: "random",

  // Text pre-filled in the user's WhatsApp compose box.
  prefillMessage: "Hi Surya Ads! I'm interested in your digital advertising services. Please share the details and a free consultation.",

  /* ============ REDIRECT BEHAVIOUR ============ */

  // Send the visitor to WhatsApp automatically, without them tapping.
  // Set to false if you want a pure click-through page (safer for ad review).
  autoRedirect: false,

  // How long the landing page is visible before the auto-redirect fires (ms).
  // 2500 = 2.5 seconds. Keep this >= 1200 so the page is genuinely seen —
  // instant redirects can be flagged as a "bridge page" during Meta ad review.
  redirectDelayMs: 2500,

  // On desktop, open web.whatsapp.com instead of the wa.me interstitial.
  desktopUsesWebWhatsApp: false,

  /* ============ TRACKING ============ */

  // Meta (Facebook) Pixel ID — leave "" to disable.
  metaPixelId: "1009421638807007",

  // Standard event fired when the visitor is sent to WhatsApp.
  // Common choices: "Lead", "Contact", "InitiateCheckout".
  pixelClickEvent: "Lead",

  // Google Analytics 4 measurement ID (e.g. "G-XXXXXXX") — leave "" to disable.
  ga4Id: "",

  // Grace period (ms) given to the pixel to send its beacon before navigating.
  trackingFlushMs: 300,

  /* ============ URL OVERRIDES ============ */

  // Lets one page serve many ads:
  //   ?n=919999999999   -> override the number
  //   ?m=Hello%20there  -> override the pre-filled message
  //   ?ref=summer_sale  -> campaign reference
  //   ?noredirect=1     -> disable auto-redirect (use this link for ad review)
  allowUrlOverrides: true,

  // Append the campaign reference to the WhatsApp message so you can tell
  // which ad each lead came from. Reads ?ref= then ?utm_campaign=.
  appendRefToMessage: false,
  refMessageFormat: "\n\n(Ref: {ref})",

  /* ============ COPY ============ */

  badge: "Free consultation · Quick response guaranteed",
  headline: "Grow your business with smart digital advertising",
  subheadline: "Surya Ads provides AI-powered digital marketing solutions for businesses of all sizes. Message us on WhatsApp for a free consultation — no forms, no waiting.",
  buttonLabel: "Chat with us on WhatsApp",
  reassurance: "Opens WhatsApp instantly · No spam, ever",
  onlineLabel: "Online now",

  redirectingText: "Opening WhatsApp…",
  fallbackText: "Didn't open automatically? Tap the green button above.",

  /* ============ TRUST ROW ============ */

  showTrust: true,
  stats: [
    { value: "AI-powered", label: "Solutions" },
    { value: "< 5 min",    label: "Avg. reply" },
    { value: "100%",       label: "Client focus" }
  ],

  /* ============ ABOUT ============ */

  aboutTitle: "What is Surya Ads?",
  aboutText: "Surya Ads is a full-service digital advertising agency powered by AI technology. We help businesses grow their online presence through targeted social media marketing, Google Ads management, WhatsApp marketing campaigns, and comprehensive digital strategies. Our data-driven approach ensures maximum ROI for your advertising budget.",

  /* ============ PROBLEMS WE SOLVE ============ */

  problemsTitle: "Sound familiar?",
  problems: [
    "Not getting enough leads from your online presence",
    "Wasting money on ads that don't convert",
    "Confused by complex digital marketing options",
    "No time to manage social media and ads",
    "No clear idea of what's actually working"
  ],

  /* ============ SERVICES ============ */

  servicesTitle: "What we do",
  servicesNote: "Everything below is included in a Surya Ads engagement.",
  services: [
    { icon: "search",  title: "Google Ads Management",       text: "Expert management of Google Search, Display, and Shopping campaigns with AI-driven optimization for maximum conversions." },
    { icon: "pin",     title: "Social Media Marketing",      text: "Strategic social media advertising across Facebook, Instagram, LinkedIn and more to reach your ideal customers." },
    { icon: "chat",    title: "WhatsApp Marketing",          text: "Automated WhatsApp campaigns, broadcast lists, and chatbot solutions for instant customer engagement." },
    { icon: "bot",     title: "AI Content Creation",         text: "AI-generated ad copy, social media posts, and marketing content optimized for your target audience." },
    { icon: "chart",   title: "Analytics & Reports",         text: "Detailed performance reports showing ROI, conversions, and campaign insights in easy-to-understand dashboards." },
    { icon: "profile", title: "Brand Strategy",              text: "Complete brand identity development, positioning strategy, and visual identity creation for market impact." },
    { icon: "star",    title: "Reputation Management",       text: "Monitor and manage your online reviews, ratings, and brand mentions across all platforms." },
    { icon: "versus",  title: "Competitor Analysis",         text: "Deep analysis of competitor strategies, ad spending, and positioning to find your competitive advantage." },
    { icon: "bell",    title: "Lead Generation",             text: "Targeted lead generation campaigns using LinkedIn, Google, and social media to fill your sales pipeline." },
    { icon: "pen",     title: "Email Marketing",             text: "Automated email sequences, newsletter campaigns, and drip marketing for customer nurturing and retention." }
  ],

  /* ============ BENEFITS ============ */

  benefitsTitle: "What you get out of it",
  benefits: [
    "More qualified leads and customers from digital channels",
    "Higher ROI on your advertising spend",
    "Better brand visibility across social media",
    "Data-driven decisions with clear performance metrics",
    "Time saved with automated marketing workflows",
    "Measurable growth with monthly reporting"
  ],

  /* ============ HOW IT WORKS ============ */

  stepsTitle: "How it works",
  steps: [
    { title: "Free consultation",     text: "Message us on WhatsApp. We analyze your current digital presence and show you exactly where growth opportunities exist." },
    { title: "Strategy & launch",      text: "We create a custom marketing strategy, set up your campaigns, and launch with AI-optimized targeting." },
    { title: "Optimize & scale",  text: "We monitor performance, optimize campaigns daily, and scale what works while cutting what doesn't." }
  ],

  /* ============ WHO IT'S FOR ============ */

  industriesTitle: "Built for all businesses",
  industries: [
    "E-commerce stores", "Local businesses", "Startups & SaaS", "Professional services",
    "Healthcare clinics", "Real estate", "Restaurants & hospitality", "Education & coaching",
    "Manufacturing", "Retail brands"
  ],

  /* ============ FAQ ============ */

  faqTitle: "Common questions",
  faqs: [
    { q: "How much does digital advertising cost?",              a: "Our management fees start from ₹15,000/month depending on your goals and ad spend. The actual ad budget is separate and we'll help you set the right amount for your business size." },
    { q: "How long before I see results?",         a: "Most clients see initial results within 2-4 weeks of campaign launch. Significant growth typically happens over 2-3 months as our AI optimization learns and improves." },
    { q: "Do you work with small businesses?", a: "Absolutely! We work with businesses of all sizes. Our AI-powered approach makes professional digital marketing accessible and affordable for small businesses." },
    { q: "What platforms do you advertise on?",                     a: "We manage campaigns across Google Ads, Facebook, Instagram, LinkedIn, YouTube, and WhatsApp. We'll recommend the best mix based on where your customers spend their time." }
  ],

  /* ============ FOOTER / LEGAL ============ */

  footerNote: "Powered by WhatsApp Business",
  privacyUrl: "privacy.html",
  termsUrl: "terms.html",

  // Shown on privacy.html / terms.html. Meta's ad review looks for a real,
  // reachable contact — use an address you actually monitor.
  contactEmail: "hello@suryaads.com",
  // Leave "" to show today's date automatically.
  legalUpdated: "",

  /* ============ SEO / SHARING ============ */

  pageTitle: "Surya Ads — AI-Powered Digital Advertising | Chat on WhatsApp",
  pageDescription: "Surya Ads provides AI-powered digital marketing solutions. Google Ads, Social Media, WhatsApp Marketing. Message us on WhatsApp for a free consultation.",
  // Absolute URL of a 1200x630 preview image, or "" for none.
  shareImage: "assets/og-image.png"
};
