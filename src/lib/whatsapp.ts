import { siteConfig } from "@/config/site";

const digitsOnly = (s: string | null | undefined) => String(s ?? "").replace(/[^0-9]/g, "");

export function getParams() {
  return new URLSearchParams(window.location.search);
}

function param(params: URLSearchParams, name: string) {
  return siteConfig.allowUrlOverrides ? params.get(name) || "" : "";
}

function buildMessage(params: URLSearchParams) {
  let msg = param(params, "m") || param(params, "text") || siteConfig.prefillMessage || "";
  if (siteConfig.appendRefToMessage) {
    const ref = param(params, "ref") || param(params, "utm_campaign");
    if (ref) msg += (siteConfig.refMessageFormat || "\n\n(Ref: {ref})").replace("{ref}", ref);
  }
  return msg;
}

export function isDesktop() {
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent || "");
}

/** wa.me/<number>?text=... opens a direct chat with the message pre-typed. */
export function getWhatsAppLink(params = getParams()) {
  const phone = digitsOnly(param(params, "n") || param(params, "number") || siteConfig.whatsappNumber);
  const text = encodeURIComponent(buildMessage(params));
  const link = phone ? "https://wa.me/" + phone + (text ? "?text=" + text : "") : "";
  return { phone, link };
}
