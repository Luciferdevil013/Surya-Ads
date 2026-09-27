# Surya Sports Media — WhatsApp Landing Page

A high-converting WhatsApp landing page for Surya Sports Media digital advertising services.

## Features

- **WhatsApp Integration** — Auto-redirect to WhatsApp with pre-filled message
- **Mobile-First Design** — Optimized for all devices
- **Sunrise Design** — Dark hero with a rising sun and orbiting ad-platform icons
- **Client Showcase** — Photo cards of clients you've worked with, plus "Trusted by" avatars
- **Sticky WhatsApp Button** — Appears once the main button scrolls away
- **Configurable** — Edit only `config.js` to customize everything
- **SEO Optimized** — Meta tags, Open Graph, and structured content
- **Tracking Ready** — Meta Pixel and GA4 integration
- **Legal Pages** — Privacy Policy and Terms of Service included

## Quick Setup

1. Edit `config.js` with your WhatsApp number and business details
2. Add client photos to `assets/clients/` (see below)
3. Open `index.html` in a browser to test (add `?noredirect=1` while testing)

## Client photos

The clients section reads the `clients` list in `config.js`. For each client,
save a photo in `assets/clients/` with the file name from its `photo` path, e.g.
`assets/clients/malik-mumbai.jpg`. Lowercase names, `.jpg` / `.jpeg` / `.png` /
`.webp` all work, portrait (about 800 x 1000 px) looks best. Until a photo is
added the card shows the client's initials.

Only use photos you have permission to use (ideally ones the client gave you) —
Meta may reject ads whose landing page shows public figures or other people's
photos without consent.

## Configuration

All settings are in `config.js`:

- `whatsappNumbers` — Your WhatsApp business number(s)
- `prefillMessage` — Message pre-filled in WhatsApp
- `autoRedirect` — Automatically redirect to WhatsApp
- `metaPixelId` — Facebook Pixel ID for tracking
- `ga4Id` — Google Analytics 4 measurement ID

## Customization

- **Brand Colors** — Edit CSS variables in `index.html`
- **Content** — All text is configurable in `config.js`; wrap words in `*asterisks*` to highlight them
- **Logo** — `assets/surya-mark.svg` (set `logoMark` in `config.js` to use another file)

## File Structure

```
Surya-Ads/
├── index.html          # Main landing page
├── config.js           # All configuration (edit this!)
├── app.js              # JavaScript runtime
├── privacy.html        # Privacy Policy page
├── terms.html          # Terms of Service page
├── legal.css           # Legal page styles
├── robots.txt          # Search engine directives
└── assets/             # Logo, favicon, share image
    └── clients/        # Client photos
```

## WhatsApp URL Parameters

- `?n=919999999999` — Override phone number
- `?m=Hello` — Override pre-filled message
- `?ref=campaign_name` — Campaign tracking
- `?noredirect=1` — Disable auto-redirect (for ad review)

## License

All rights reserved. Created for Surya Sports Media.
