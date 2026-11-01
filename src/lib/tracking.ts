import { siteConfig } from "@/config/site";

// One event per page view — repeat taps don't inflate the numbers.
let subscribed = false;

/** Meta Pixel "Subscribe" + GA4 "whatsapp_click", fired on a WhatsApp tap. */
export function trackWhatsAppClick(phone: string) {
  if (subscribed) return;
  subscribed = true;

  try {
    window.fbq?.("track", "Subscribe");
  } catch {
    /* no-op */
  }

  try {
    window.gtag?.("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: phone,
    });
  } catch {
    /* no-op */
  }
}

/** Loads GA4 when a measurement ID is configured. */
export function initAnalytics() {
  const id = siteConfig.ga4Id;
  if (!id || window.gtag) return;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);
}
