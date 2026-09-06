/* ------------------------------------------------------------------
   WhatsApp Landing Page — runtime
   Builds the WhatsApp link, fires tracking, performs the redirect.
   Edit config.js, not this file.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var C = window.LP_CONFIG || {};
  var params = new URLSearchParams(window.location.search);

  function el(id) { return document.getElementById(id); }
  function digitsOnly(s) { return String(s == null ? '' : s).replace(/[^0-9]/g, ''); }
  function param(name) { return C.allowUrlOverrides ? (params.get(name) || '') : ''; }
  function setText(id, value) { var n = el(id); if (n && value != null) n.textContent = value; }

  /* ---------------- number selection ---------------- */

  var numbers = (C.whatsappNumbers || []).map(digitsOnly).filter(Boolean);

  function pickNumber() {
    var override = digitsOnly(param('n') || param('number'));
    if (override) return override;
    if (!numbers.length) return '';
    if (numbers.length === 1) return numbers[0];

    var mode = C.rotation || 'random';
    if (mode === 'off') return numbers[0];

    if (mode === 'sequential') {
      try {
        var key = 'lp_rotation_index';
        var i = parseInt(window.localStorage.getItem(key) || '0', 10);
        if (isNaN(i) || i < 0) i = 0;
        window.localStorage.setItem(key, String((i + 1) % numbers.length));
        return numbers[i % numbers.length];
      } catch (e) { /* storage blocked — fall through to random */ }
    }
    return numbers[Math.floor(Math.random() * numbers.length)];
  }

  var phone = pickNumber();

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

  var message = buildMessage();

  /* ---------------- link ---------------- */

  function isDesktop() {
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i
      .test(navigator.userAgent || '');
  }

  function buildLink() {
    if (!phone) return '';
    var text = message ? encodeURIComponent(message) : '';
    if (C.desktopUsesWebWhatsApp && isDesktop()) {
      return 'https://web.whatsapp.com/send?phone=' + phone + (text ? '&text=' + text : '');
    }
    return 'https://wa.me/' + phone + (text ? '?text=' + text : '');
  }

  var waLink = buildLink();

  /* ---------------- tracking ---------------- */

  var tracked = false;

  function fireTracking() {
    if (tracked) return;
    tracked = true;

    try {
      if (window.fbq && C.metaPixelId && C.pixelClickEvent) {
        window.fbq('track', C.pixelClickEvent, {
          content_name: C.brandName || 'WhatsApp lead',
          content_category: 'whatsapp_redirect'
        });
      }
    } catch (e) { /* never block the redirect on a tracking error */ }

    try {
      if (window.gtag) {
        window.gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: phone
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

  function goToWhatsApp(viaClick) {
    if (!waLink) return;

    fireTracking();

    var note = el('note');
    if (note) {
      note.textContent = C.redirectingText || 'Opening WhatsApp…';
      note.classList.add('is-active');
    }

    if (fallbackTimer) clearTimeout(fallbackTimer);
    fallbackTimer = setTimeout(showFallback, 3500);

    // A real click already navigates natively — don't fight it, that is the
    // most reliable path inside the Facebook / Instagram in-app browsers.
    if (viaClick) return;

    setTimeout(function () {
      window.location.href = waLink;
    }, Math.max(0, C.trackingFlushMs == null ? 300 : C.trackingFlushMs));
  }

  /* ---------------- render ---------------- */

  function render() {
    var brand = C.brandName || 'Your Business';
    var initial = (brand.trim()[0] || 'B').toUpperCase();

    renderBrandName(brand);
    setText('footerBrand', brand);
    setText('brandMark', initial);
    setText('footerTagline', C.tagline);
    setText('onlineLabel', C.onlineLabel);
    setText('badge', C.badge);
    setText('headline', C.headline);
    setText('subheadline', C.subheadline);
    setText('buttonLabel', C.buttonLabel);
    setText('note', C.reassurance);
    setText('fallback', C.fallbackText);
    setText('footerNote', C.footerNote);

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

    el('footerYear').textContent = new Date().getFullYear();

    // Logo — the header uses the square mark, the footer the full lockup.
    // If either image is missing, fall back to the gradient letter mark.
    [[el('brandLogo'), C.logoMark || C.logo, ''],
     [el('footerLogo'), C.logo, brand]].forEach(function (pair) {
      var img = pair[0], src = pair[1];
      if (!img) return;
      if (!src) {
        document.body.classList.add('no-logo');
        img.remove();
        return;
      }
      img.setAttribute('src', src);
      img.setAttribute('alt', pair[2]);
      img.addEventListener('error', function () {
        document.body.classList.add('no-logo');
        img.remove();
      });
    });

    // CTA — hero button and the closing button share the same link and tracking
    var ctas = [el('cta'), el('ctaAlt')].filter(Boolean);
    setText('ctaAltLabel', C.buttonLabel);

    ctas.forEach(function (cta) {
      if (waLink) {
        cta.setAttribute('href', waLink);
        cta.setAttribute('target', isDesktop() ? '_blank' : '_self');
        cta.setAttribute('aria-label', (C.buttonLabel || 'Chat on WhatsApp') + ' — opens WhatsApp');
      } else {
        cta.setAttribute('href', '#');
        cta.setAttribute('aria-disabled', 'true');
      }

      cta.addEventListener('click', function (e) {
        if (!waLink) { e.preventDefault(); return; }
        goToWhatsApp(true);
      });
    });

    if (!waLink) {
      setText('note', 'Setup needed: add your WhatsApp number in config.js');
      console.warn('[landing] No WhatsApp number configured — set whatsappNumbers in config.js');
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

    renderContent();
  }

  /* ---------------- RankReview information sections ---------------- */

  // Icon paths for the services grid, drawn with a 24x24 stroked viewBox.
  var ICONS = {
    star:    ['M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8L12 3z'],
    pin:     ['M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
    bot:     ['M12 3v3', 'M6 9h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z', 'M9 14h.01', 'M15 14h.01'],
    profile: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6'],
    search:  ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.3-4.3'],
    chart:   ['M4 20V10', 'M10 20V4', 'M16 20v-7', 'M22 20H2'],
    versus:  ['M5 21V9', 'M12 21V4', 'M19 21v-8', 'M3 21h18'],
    bell:    ['M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8z', 'M13.7 21a2 2 0 0 1-3.4 0'],
    camera:  ['M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z', 'M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
    pen:     ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
    mail:    ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 7l-10 6L2 7'],
    globe:   ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z'],
    chat:    ['M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-4-.9L3 21l1.9-4.9A8.5 8.5 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z']
  };

  function iconSvg(name) {
    var paths = ICONS[name] || ICONS.star;
    var svg = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">';
    paths.forEach(function (d) { svg += '<path d="' + d + '"></path>'; });
    return svg + '</svg>';
  }

  function show(id) { var n = el(id); if (n) n.hidden = false; }

  // Renders the wordmark, gradient-tinting the second half of a CamelCase
  // name ("RankReview" -> Rank + Review) the way the logo does.
  function renderBrandName(brand) {
    var node = el('brandName');
    if (!node) return;

    node.textContent = '';

    var split = /^([A-Z][a-z]+)([A-Z][A-Za-z]*)$/.exec(brand.replace(/\s+/g, ''));
    if (!split) { node.textContent = brand; return; }

    node.appendChild(document.createTextNode(split[1]));
    var tail = document.createElement('span');
    tail.className = 'rev';
    tail.textContent = split[2];
    node.appendChild(tail);
  }

  function renderContent() {
    // About
    if (C.aboutText) {
      setText('aboutTitle', C.aboutTitle);
      setText('aboutText', C.aboutText);
      show('aboutSection');
    }

    // Problems
    var problems = C.problems || [];
    if (problems.length) {
      setText('problemsTitle', C.problemsTitle);
      var pl = el('problemsList');
      problems.forEach(function (text) {
        var li = document.createElement('li');
        li.textContent = text;
        pl.appendChild(li);
      });
      show('problemsSection');
    }

    // Services
    var services = C.services || [];
    if (services.length) {
      setText('servicesTitle', C.servicesTitle);
      setText('servicesNote', C.servicesNote);
      var grid = el('servicesGrid');
      services.forEach(function (s) {
        var card = document.createElement('div');
        card.className = 'svc';

        var icon = document.createElement('div');
        icon.className = 'svc-icon';
        icon.innerHTML = iconSvg(s.icon);

        var h3 = document.createElement('h3');
        h3.textContent = s.title;

        var p = document.createElement('p');
        p.textContent = s.text;

        card.appendChild(icon);
        card.appendChild(h3);
        card.appendChild(p);
        grid.appendChild(card);
      });
      show('servicesSection');
    }

    // How it works
    var steps = C.steps || [];
    if (steps.length) {
      setText('stepsTitle', C.stepsTitle);
      var sl = el('stepsList');
      steps.forEach(function (s, i) {
        var row = document.createElement('div');
        row.className = 'step';

        var num = document.createElement('div');
        num.className = 'step-num';
        num.textContent = String(i + 1);

        var body = document.createElement('div');
        var h3 = document.createElement('h3');
        h3.textContent = s.title;
        var p = document.createElement('p');
        p.textContent = s.text;
        body.appendChild(h3);
        body.appendChild(p);

        row.appendChild(num);
        row.appendChild(body);
        sl.appendChild(row);
      });
      show('stepsSection');
    }

    // Benefits
    var benefits = C.benefits || [];
    if (benefits.length) {
      setText('benefitsTitle', C.benefitsTitle);
      var bl = el('benefitsList');
      benefits.forEach(function (text) {
        var li = document.createElement('li');
        li.textContent = text;
        bl.appendChild(li);
      });
      show('benefitsSection');
    }

    // Industries
    var industries = C.industries || [];
    if (industries.length) {
      setText('industriesTitle', C.industriesTitle);
      var il = el('industriesList');
      industries.forEach(function (text) {
        var chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = text;
        il.appendChild(chip);
      });
      show('industriesSection');
    }

    // FAQ
    var faqs = C.faqs || [];
    if (faqs.length) {
      setText('faqTitle', C.faqTitle);
      var fl = el('faqList');
      faqs.forEach(function (f) {
        var d = document.createElement('details');
        var s = document.createElement('summary');
        s.textContent = f.q;
        var p = document.createElement('p');
        p.textContent = f.a;
        d.appendChild(s);
        d.appendChild(p);
        fl.appendChild(d);
      });
      show('faqSection');
    }

    renderContact();
  }

  function renderContact() {
    var list = el('contactList');
    if (!list) return;

    var rows = [];

    if (waLink) {
      rows.push({
        icon: 'chat',
        label: 'WhatsApp',
        value: 'Message us — fastest reply',
        href: waLink,
        isCta: true
      });
    }
    if (C.contactEmail) {
      rows.push({
        icon: 'mail',
        label: 'Email',
        value: C.contactEmail,
        href: 'mailto:' + C.contactEmail
      });
    }
    if (C.websiteUrl) {
      rows.push({
        icon: 'globe',
        label: 'Website',
        value: C.websiteLabel || C.websiteUrl,
        href: C.websiteUrl,
        external: true
      });
    }

    if (!rows.length) { el('contactSection').hidden = true; return; }

    rows.forEach(function (r) {
      var a = document.createElement('a');
      a.className = 'contact-row';
      a.setAttribute('href', r.href);
      if (r.external) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      }
      if (r.isCta) {
        a.setAttribute('rel', 'noopener nofollow');
        a.addEventListener('click', function () { goToWhatsApp(true); });
      }

      var icon = document.createElement('span');
      icon.className = 'contact-icon';
      icon.innerHTML = iconSvg(r.icon);

      var body = document.createElement('span');
      var strong = document.createElement('strong');
      strong.textContent = r.label;
      body.appendChild(strong);
      body.appendChild(document.createTextNode(r.value));

      a.appendChild(icon);
      a.appendChild(body);
      list.appendChild(a);
    });
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

  /* ---------------- boot ---------------- */

  render();

  var redirectDisabled = params.get('noredirect') === '1' || params.get('preview') === '1';

  if (C.autoRedirect && waLink && !redirectDisabled) {
    setTimeout(function () { goToWhatsApp(false); },
      Math.max(0, C.redirectDelayMs == null ? 1800 : C.redirectDelayMs));
  }

  // If the visitor comes back (WhatsApp opened, then they hit back), reset the
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
