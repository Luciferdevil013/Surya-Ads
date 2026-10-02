# Surya Sports Media — Telegram + WhatsApp Landing Page

A minimal, single-screen landing page that sends Meta ad traffic into a Telegram
or WhatsApp chat. No build step, no dependencies — plain HTML/CSS/JS.

```
index.html    the landing page
config.js     ← the only file you normally edit
app.js        link building, tracking, redirect
legal.css     styling for the two legal pages
privacy.html  privacy policy
terms.html    terms of service
robots.txt
assets/       logo, favicon, share image
```

## Run locally

```bash
npm run dev
```

Then open http://localhost:5173/?noredirect=1

## Configuration

All settings are in `config.js`:

- `telegramUsername` — Telegram username the Telegram button opens ("" hides it)
- `whatsappNumber` — WhatsApp number, digits only with country code ("" hides it)
- `prefillMessage` — Message pre-filled in Telegram / WhatsApp
- `autoRedirect` / `redirectChannel` — Optional automatic redirect to `"telegram"` or `"whatsapp"`
- `metaPixelId` / `pixelClickEvent` — Meta Pixel and the event fired on a chat tap
- `ga4Id` — Google Analytics 4 measurement ID
- `badge`, `headline`, `subheadline`, button labels, `stats` — Page copy

The Meta Pixel base code is in the `<head>` of `index.html` — if you change
pixels, update the ID there and in `config.js`.

## URL Parameters

- `?u=someusername` — Override Telegram username
- `?n=919999999999` — Override WhatsApp number
- `?m=Hello` — Override pre-filled message
- `?ref=campaign_name` — Campaign tracking
- `?noredirect=1` — Disable auto-redirect (for ad review)

## License

All rights reserved. Created for Surya Sports Media.
