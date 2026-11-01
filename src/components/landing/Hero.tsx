import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { trackWhatsAppClick } from "@/lib/tracking";
import { getParams, getWhatsAppLink, isDesktop } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import TrustRow from "./TrustRow";
import WhatsAppIcon from "./WhatsAppIcon";

const Hero = () => {
  const [{ phone, link }] = useState(() => getWhatsAppLink());
  const [opening, setOpening] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const fallbackTimer = useRef<number>();

  const label = siteConfig.whatsappButtonLabel;

  function goToChat(viaClick: boolean) {
    if (!link) return;

    trackWhatsAppClick(phone);
    setOpening(true);

    window.clearTimeout(fallbackTimer.current);
    fallbackTimer.current = window.setTimeout(() => setShowFallback(true), 3500);

    // A real click already navigates natively — don't fight it, that is the
    // most reliable path inside the Facebook / Instagram in-app browsers.
    if (viaClick) return;

    window.setTimeout(() => {
      window.location.href = link;
    }, Math.max(0, siteConfig.trackingFlushMs ?? 300));
  }

  // Optional auto-redirect (?noredirect=1 or ?preview=1 turns it off).
  useEffect(() => {
    const params = getParams();
    const disabled = params.get("noredirect") === "1" || params.get("preview") === "1";
    if (!siteConfig.autoRedirect || !link || disabled) return;

    const t = window.setTimeout(() => goToChat(false), Math.max(0, siteConfig.redirectDelayMs ?? 1800));
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the visitor comes back (chat opened, then they hit back), reset the
  // page instead of leaving the "Opening…" state behind.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setOpening(false);
      setShowFallback(false);
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  useEffect(() => {
    if (!link) console.warn("[landing] No chat configured — set whatsappNumber in src/config/site.ts");
  }, [link]);

  const note = !link
    ? "Setup needed: add your WhatsApp number in src/config/site.ts"
    : opening
      ? (siteConfig.redirectingText || "Opening {app}…").replace("{app}", "WhatsApp")
      : siteConfig.reassurance;

  return (
    <main className="w-full max-w-[520px] animate-float-up text-center">
      <div className="mb-6 inline-flex items-center gap-[7px] rounded-full border bg-white px-3.5 py-[7px] text-[13px] font-semibold text-accent-foreground shadow-[0_4px_16px_rgba(236,106,44,0.08)]">
        <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-whatsapp" />
        <span>{siteConfig.badge}</span>
      </div>

      <h1 className="mb-4 text-balance text-[32px] font-extrabold leading-[1.12] tracking-[-0.02em] min-[381px]:text-[38px]">
        {siteConfig.headline}
      </h1>

      <p className="mx-auto mb-8 max-w-[420px] text-pretty text-base leading-[1.55] text-muted-foreground min-[381px]:text-[17px]">
        {siteConfig.subheadline}
      </p>

      {link && (
        <div className="flex flex-col items-center gap-3">
          <Button asChild variant="whatsapp" size="xl" className="w-full max-w-[400px] gap-3 whitespace-normal">
            <a
              id="waCta"
              href={link}
              target={isDesktop() ? "_blank" : "_self"}
              rel="noopener nofollow"
              aria-label={`${label} — opens WhatsApp`}
              onClick={() => goToChat(true)}
            >
              <WhatsAppIcon />
              <span>{label}</span>
            </a>
          </Button>
        </div>
      )}

      <p
        role="status"
        aria-live="polite"
        className={cn("mt-4 min-h-5 text-[13px] text-[#8E8697]", opening && "font-semibold text-primary-deep")}
      >
        {note}
      </p>
      {showFallback && (
        <p className="mt-2.5 animate-float-up text-[13px] font-semibold text-muted-foreground">
          {siteConfig.fallbackText}
        </p>
      )}

      <TrustRow />
    </main>
  );
};

export default Hero;
