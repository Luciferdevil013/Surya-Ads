/* ------------------------------------------------------------------
   Surya Sports Media — Telegram + WhatsApp Landing Page configuration
   This is the ONLY file you normally need to edit.
   ------------------------------------------------------------------ */
window.LP_CONFIG = {

  /* ============ BUSINESS ============ */

  brandName: "Surya Sports Media",

  // Square logo mark shown in the header (SVG or PNG, in /assets).
  // Leave "" to fall back to the letter mark.
  logoMark: "assets/surya-mark.svg",

  // Telegram username the Telegram button opens (with or without the "@").
  // Leave "" to hide the Telegram button.
  telegramUsername: "suryasportsmedia",

  // WhatsApp number the WhatsApp button opens. Full international format,
  // digits only — India example: 91 + 9876543210 -> "919876543210".
  // Leave "" to hide the WhatsApp button.
  whatsappNumber: "919423576797",

  // Text pre-filled in the user's Telegram / WhatsApp compose box.
  prefillMessage: "Hi Surya Sports Media! I saw your ad and I'm interested. Please share the details.",

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
  metaPixelId: "1076329191902827",

  // Standard event fired when the visitor taps a chat button.
  // Common choices: "Lead", "Contact", "Subscribe".
  pixelClickEvent: "Subscribe",

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

  badge: "Replies in minutes",
  headline: "Get more customers from your ads",
  subheadline: "Tap a button below to chat with us directly. No forms, no waiting — just a quick message and we'll take it from there.",
  telegramButtonLabel: "Chat with us on Telegram",
  whatsappButtonLabel: "Chat with us on WhatsApp",
  reassurance: "Free consultation · No spam, ever",
  onlineLabel: "Online now",

  redirectingText: "Opening {app}…",   // {app} becomes Telegram or WhatsApp
  fallbackText: "Didn't open automatically? Tap one of the buttons above.",

  /* ============ TRUST ROW ============ */

  showTrust: true,
  stats: [
    { value: "AI-powered", label: "Ads" },
    { value: "< 5 min",    label: "Avg. reply" },
    { value: "100%",       label: "Client focus" }
  ],

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

  pageTitle: "Surya Sports Media — Chat on Telegram or WhatsApp",
  pageDescription: "Message Surya Sports Media on Telegram or WhatsApp for a free consultation. No forms, no waiting.",
  // Absolute URL of a 1200x630 preview image, or "" for none.
  shareImage: "assets/og-image.png?v=2"
};
