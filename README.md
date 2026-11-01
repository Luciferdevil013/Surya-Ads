# Surya Sports Media — WhatsApp Landing Page

A single-screen landing page that sends Meta ad traffic into a WhatsApp chat.
Built with the same stack and layout as a Lovable project:
Vite + React + TypeScript + Tailwind CSS + shadcn/ui.

```
index.html                    HTML shell — Meta Pixel + MetaTrack live in <head>
public/                       static files served as-is (assets/, robots.txt)
src/
  config/site.ts              ← the only file you normally edit
  main.tsx, App.tsx           entry + routes (/, /privacy, /terms)
  index.css                   Tailwind + design tokens
  pages/                      Index, Privacy, Terms, NotFound
  components/landing/         Header, Hero, TrustRow, Footer, WhatsAppIcon
  components/legal/           shared layout for the legal pages
  components/ui/              shadcn/ui components (button)
  lib/                        whatsapp link building, tracking, cn() util
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:8080/?noredirect=1

`npm run build` writes the production site to `dist/`.

## Configuration

All settings are in `src/config/site.ts`:

- `whatsappNumber` — WhatsApp number, digits only with country code ("" hides it)
- `prefillMessage` — Message pre-filled in WhatsApp
- `autoRedirect` — Optional automatic redirect to WhatsApp
- `ga4Id` — Google Analytics 4 measurement ID
- `badge`, `headline`, `subheadline`, button labels, `stats` — Page copy

The Meta Pixel (ID 2250453805519185) is in the `<head>` of `index.html` and
fires `PageView` on load. `Subscribe` fires when the visitor taps the WhatsApp
button (`src/lib/tracking.ts`).

## URL Parameters

- `?n=919999999999` — Override WhatsApp number
- `?m=Hello` — Override pre-filled message
- `?ref=campaign_name` — Campaign tracking
- `?noredirect=1` — Disable auto-redirect (for ad review)

## Hosting

It is a single-page app, so the host must serve `index.html` for every path.
`vercel.json` (Vercel) and `public/_redirects` (Netlify) already do this.
`netlify.toml` tells Netlify to run `npm run build` and publish `dist/`.
The old `/privacy.html` and `/terms.html` links still work.

## License

All rights reserved. Created for Surya Sports Media.
