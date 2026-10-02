/* ------------------------------------------------------------------
   Telegram + WhatsApp Landing Page — runtime
   Builds the chat links, fires tracking, performs the (optional) redirect.
   Edit config.js, not this file.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var C = window.LP_CONFIG || {};
  var params = new URLSearchParams(window.location.search);

  function el(id) { return document.getElementById(id); }
  function digitsOnly(s) { return String(s == null ? '' : s).replace(/[^0-9]/g, ''); }
  function cleanUsername(s) { return String(s == null ? '' : s).trim().replace(/^@/, '').replace(/[^A-Za-z0-9_]/g, ''); }
  function param(name) { return C.allowUrlOverrides ? (params.get(name) || '') : ''; }
  function setText(id, value) { var n = el(id); if (n && value != null) n.textContent = value; }

  /* ---------------- contacts ---------------- */

  var username = cleanUsername(param('u') || param('user') || C.telegramUsername);
  var phone = digitsOnly(param('n') || param('number') || C.whatsappNumber);

  /* ---------------- message ---------------- */

  function buildMessage() {
    var msg = param('m') || param('text') || C.prefillMessage || '';
    if (C.appendRefToMessage) {
      var ref = param('ref') || param('utm_campaign');
      if (ref) {
        var fmt = C.refMessageFormat || '\n\n(Ref: {ref})';
        msg += fmt.replace('{ref}', ref);
      }
    }
    return msg;
  }

  var text = encodeURIComponent(buildMessage());

  /* ---------------- links ---------------- */

  function isDesktop() {
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i
      .test(navigator.userAgent || '');
  }

  // t.me/<username>?text=... and wa.me/<number>?text=... both open a direct
  // chat with the message pre-typed.
  var CHANNELS = {
    telegram: {
      name: 'Telegram',
      button: 'tgCta',
      label: C.telegramButtonLabel,
      link: username ? 'https://t.me/' + username + (text ? '?text=' + text : '') : '',
      event: 'telegram_click',
      id: username
    },
    whatsapp: {
      name: 'WhatsApp',
      button: 'waCta',
      label: C.whatsappButtonLabel,
      link: phone ? 'https://wa.me/' + phone + (text ? '?text=' + text : '') : '',
      event: 'whatsapp_click',
      id: phone
    }
  };

  /* ---------------- tracking ---------------- */

  var tracked = false;

  function fireTracking(ch) {
    if (tracked) return;
    tracked = true;

    try {
      if (window.fbq && C.metaPixelId && C.pixelClickEvent) {
        window.fbq('track', C.pixelClickEvent);
      }
    } catch (e) { /* never block the redirect on a tracking error */ }

    try {
      if (window.gtag) {
        window.gtag('event', ch.event, {
          event_category: 'engagement',
          event_label: ch.id
        });
      }
    } catch (e) { /* no-op */ }
  }

  /* ---------------- redirect ---------------- */

  var fallbackTimer = null;

  function showFallback() {
    var f = el('fallback');
    if (f) f.classList.add('is-visible');
  }

  function goToChat(ch, viaClick) {
    if (!ch || !ch.link) return;

    fireTracking(ch);

    var note = el('note');
    if (note) {
      note.textContent = (C.redirectingText || 'Opening {app}…').replace('{app}', ch.name);
      note.classList.add('is-active');
    }

    if (fallbackTimer) clearTimeout(fallbackTimer);
    fallbackTimer = setTimeout(showFallback, 3500);

    // A real click already navigates natively — don't fight it, that is the
    // most reliable path inside the Facebook / Instagram in-app browsers.
    if (viaClick) return;

    setTimeout(function () {
      window.location.href = ch.link;
    }, Math.max(0, C.trackingFlushMs == null ? 300 : C.trackingFlushMs));
  }

  /* ---------------- render ---------------- */

  function render() {
    var brand = C.brandName || 'Your Business';

    setText('brandName', brand);
    setText('footerBrand', brand);
    setText('onlineLabel', C.onlineLabel);
    setText('badge', C.badge);
    setText('headline', C.headline);
    setText('subheadline', C.subheadline);
    setText('note', C.reassurance);
    setText('fallback', C.fallbackText);
    setText('footerNote', C.footerNote);

    var mark = el('brandMark');
    if (C.logoMark) {
      var img = document.createElement('img');
      img.src = C.logoMark;
      img.alt = '';
      mark.textContent = '';
      mark.classList.add('has-logo');
      mark.appendChild(img);
    } else {
      mark.textContent = (brand.trim()[0] || 'B').toUpperCase();
    }

    if (C.pageTitle) {
      document.title = C.pageTitle;
      setMeta('property', 'og:title', C.pageTitle);
    }
    if (C.pageDescription) {
      setMeta('name', 'description', C.pageDescription);
      setMeta('property', 'og:description', C.pageDescription);
    }
    if (C.shareImage) {
      setMeta('property', 'og:image', C.shareImage);
      setMeta('name', 'twitter:image', C.shareImage);
    }
    setMeta('property', 'og:url', window.location.origin + window.location.pathname);

    if (C.privacyUrl) el('privacyLink').setAttribute('href', C.privacyUrl);
    if (C.termsUrl) el('termsLink').setAttribute('href', C.termsUrl);

    // Chat buttons — a channel without a username / number is hidden.
    var shown = 0;
    Object.keys(CHANNELS).forEach(function (key) {
      var ch = CHANNELS[key];
      var btn = el(ch.button);
      if (!btn) return;
      if (!ch.link) { btn.hidden = true; return; }
      shown++;
      if (ch.label) setText(ch.button + 'Label', ch.label);
      btn.setAttribute('href', ch.link);
      btn.setAttribute('target', isDesktop() ? '_blank' : '_self');
      btn.setAttribute('aria-label', (ch.label || 'Chat on ' + ch.name) + ' — opens ' + ch.name);
      btn.addEventListener('click', function () { goToChat(ch, true); });
    });

    if (!shown) {
      setText('note', 'Setup needed: add your Telegram username or WhatsApp number in config.js');
      console.warn('[landing] No chat configured — set telegramUsername or whatsappNumber in config.js');
    }

    // Trust row
    var trust = el('trust');
    var stats = C.stats || [];
    if (C.showTrust && stats.length) {
      trust.hidden = false;
      stats.forEach(function (s) {
        var wrap = document.createElement('div');
        var v = document.createElement('div');
        var l = document.createElement('div');
        v.className = 'stat-value';
        l.className = 'stat-label';
        v.textContent = s.value;
        l.textContent = s.label;
        wrap.appendChild(v);
        wrap.appendChild(l);
        trust.appendChild(wrap);
      });
    }
  }

  function setMeta(attr, key, value) {
    var tag = document.head.querySelector('meta[' + attr + '="' + key + '"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', value);
  }

  /* ---------------- GA4 ---------------- */

  if (C.ga4Id) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(C.ga4Id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', C.ga4Id);
  }

  /* ---------------- boot ---------------- */

  render();

  var redirectDisabled = params.get('noredirect') === '1' || params.get('preview') === '1';
  var redirectTo = CHANNELS[C.redirectChannel] || CHANNELS.telegram;

  if (C.autoRedirect && redirectTo.link && !redirectDisabled) {
    setTimeout(function () { goToChat(redirectTo, false); },
      Math.max(0, C.redirectDelayMs == null ? 1800 : C.redirectDelayMs));
  }

  // If the visitor comes back (chat opened, then they hit back), reset the
  // page instead of instantly bouncing them out again.
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    var note = el('note');
    if (note) {
      note.textContent = C.reassurance || '';
      note.classList.remove('is-active');
    }
    var f = el('fallback');
    if (f) f.classList.remove('is-visible');
  });
})();
