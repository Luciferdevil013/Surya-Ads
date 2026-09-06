# Surya Ads — WhatsApp Landing Page

A high-converting WhatsApp landing page for Surya Ads digital advertising services.

## Features

- **WhatsApp Integration** — Auto-redirect to WhatsApp with pre-filled message
- **Mobile-First Design** — Optimized for all devices
- **AI-Powered Branding** — Modern gradient theme with orange/amber colors
- **Configurable** — Edit only `config.js` to customize everything
- **SEO Optimized** — Meta tags, Open Graph, and structured content
- **Tracking Ready** — Meta Pixel and GA4 integration
- **Legal Pages** — Privacy Policy and Terms of Service included

## Quick Setup

1. Edit `config.js` with your WhatsApp number and business details
2. Add your logo files to the `assets/` folder
3. Open `index.html` in a browser to test

## Configuration

All settings are in `config.js`:

- `whatsappNumbers` — Your WhatsApp business number(s)
- `prefillMessage` — Message pre-filled in WhatsApp
- `autoRedirect` — Automatically redirect to WhatsApp
- `metaPixelId` — Facebook Pixel ID for tracking
- `ga4Id` — Google Analytics 4 measurement ID

## Customization

- **Brand Colors** — Edit CSS variables in `index.html`
- **Content** — All text is configurable in `config.js`
- **Logo** — Add `assets/surya-logo.png` and `assets/surya-mark.png`

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
└── assets/             # Images and logos
```

## WhatsApp URL Parameters

- `?n=919999999999` — Override phone number
- `?m=Hello` — Override pre-filled message
- `?ref=campaign_name` — Campaign tracking
- `?noredirect=1` — Disable auto-redirect (for ad review)

## License

All rights reserved. Created for Surya Ads.
