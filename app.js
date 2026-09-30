/* ------------------------------------------------------------------
   Telegram + WhatsApp Landing Page — runtime
   Builds the Telegram and WhatsApp links, fires tracking, renders the page from
   config.js and performs the (optional) redirect.
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

  /* ---------------- username ---------------- */

  function cleanUsername(s) { return String(s == null ? '' : s).trim().replace(/^@/, '').replace(/[^A-Za-z0-9_]/g, ''); }

  var username = cleanUsername(param('u') || param('user') || C.telegramUsername);

  /* ---------------- whatsapp number ---------------- */

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

  var message = buildMessage();

  /* ---------------- link ---------------- */

  function isDesktop() {
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i
      .test(navigator.userAgent || '');
  }

  var text = message ? encodeURIComponent(message) : '';

  // t.me/<username>?text=... opens a direct chat with the message pre-typed.
  var tgLink = username ? 'https://t.me/' + username + (text ? '?text=' + text : '') : '';

  // wa.me/<number>?text=... does the same on WhatsApp.
  var waLink = phone ? 'https://wa.me/' + phone + (text ? '?text=' + text : '') : '';

  var CHANNELS = {
    tg: { name: 'Telegram', link: tgLink, event: 'telegram_click', category: 'telegram_redirect', id: username },
    wa: { name: 'WhatsApp', link: waLink, event: 'whatsapp_click', category: 'whatsapp_redirect', id: phone }
  };

  /* ---------------- tracking ---------------- */

  var tracked = {};

  function fireTracking(ch) {
    if (tracked[ch.event]) return;
    tracked[ch.event] = true;

    try {
      if (window.fbq && C.metaPixelId && C.pixelClickEvent) {
        window.fbq('track', C.pixelClickEvent, {
          content_name: C.brandName || ch.name + ' lead',
          content_category: ch.category
        });
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

  function goToChat(key, viaClick) {
    var ch = CHANNELS[key];
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

  function all(selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)); }

  // Like setText, but words wrapped in *asterisks* get the highlight style:
  // "Ads that bring *real customers*" -> Ads that bring <span.accent>real customers</span>
  function setRich(id, value) {
    var node = el(id);
    if (!node || value == null) return;
    node.textContent = '';
    String(value).split('*').forEach(function (part, i) {
      if (!part) return;
      if (i % 2) {
        var span = document.createElement('span');
        span.className = 'accent';
        span.textContent = part;
        node.appendChild(span);
      } else {
        node.appendChild(document.createTextNode(part));
      }
    });
  }

  function render() {
    var brand = C.brandName || 'Your Business';
    var initial = (brand.trim()[0] || 'B').toUpperCase();

    renderBrandName('brandName', brand);
    renderBrandName('footerBrandName', brand);
    setText('footerBrand', brand);
    setText('brandMark', initial);
    setText('footerMark', initial);
    setText('footerTagline', C.tagline);
    setText('onlineLabel', C.onlineLabel);
    setText('badge', C.badge);
    setRich('headline', C.headline);
    setText('subheadline', C.subheadline);
    setText('note', C.reassurance);
    setText('closingNote', C.reassurance);
    setText('fallback', C.fallbackText);
    setText('footerNote', C.footerNote);
    setRich('closingTitle', C.closingTitle);
    setText('closingText', C.closingText);

    (C.heroChips || []).forEach(function (text, i) {
      var chip = document.querySelector('[data-chip="' + i + '"]');
      if (chip) chip.textContent = text;
    });

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

    // Logo mark in the header and footer. If the image is missing or not
    // configured, fall back to the gradient letter mark.
    var mark = C.logoMark || C.logo;
    [el('brandLogo'), el('footerLogo')].forEach(function (img) {
      if (!img) return;
      if (!mark) {
        document.body.classList.add('no-logo');
        img.remove();
        return;
      }
      img.addEventListener('error', function () {
        document.body.classList.add('no-logo');
        img.remove();
      });
      img.setAttribute('src', mark);
    });

    // Every Telegram button shares one link and tracking, and so does every
    // WhatsApp button. data-label="tg|wa" picks which configured label to use.
    var labels = { tg: C.buttonLabel, wa: C.whatsappButtonLabel };
    all('[data-label]').forEach(function (n) {
      var label = labels[n.getAttribute('data-label')];
      if (label) n.textContent = label;
    });
    all('[data-sub]').forEach(function (n) {
      if (C.buttonSub == null) return;
      if (C.buttonSub) n.textContent = C.buttonSub;
      else n.remove();
    });

    // A channel with nothing configured has its buttons removed entirely.
    Object.keys(CHANNELS).forEach(function (key) {
      var link = CHANNELS[key].link;
      all('[data-' + key + ']').forEach(function (cta) {
        if (!link) { cta.remove(); return; }
        cta.setAttribute('href', link);
        cta.setAttribute('target', isDesktop() ? '_blank' : '_self');
        cta.addEventListener('click', function () { goToChat(key, true); });
      });
    });

    if (!tgLink && !waLink) {
      setText('note', 'Setup needed: add your Telegram username or WhatsApp number in config.js');
      console.warn('[landing] No chat configured — set telegramUsername / whatsappNumber in config.js');
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
    initReveal();
    initSticky();
  }

  /* ---------------- information sections ---------------- */

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

  // Renders the wordmark with the last word gradient-tinted, the way the logo
  // does: "Surya Sports Media" -> Surya Sports <Media>, "RankReview" -> Rank<Review>.
  function renderBrandName(id, brand) {
    var node = el(id);
    if (!node) return;

    node.textContent = '';

    var split = /^(.*\S)(\s+)(\S+)$/.exec(brand.trim()) ||
                /^([A-Z][a-z]+)()([A-Z][A-Za-z]*)$/.exec(brand.trim());
    if (!split) { node.textContent = brand; return; }

    node.appendChild(document.createTextNode(split[1] + split[2]));
    var tail = document.createElement('span');
    tail.className = 'rev';
    tail.textContent = split[3];
    node.appendChild(tail);
  }

  function fillList(id, items) {
    var list = el(id);
    items.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
  }

  function renderContent() {
    renderClients();

    // Problems vs benefits
    var problems = C.problems || [];
    var benefits = C.benefits || [];
    if (problems.length || benefits.length) {
      setRich('compareTitle', C.compareTitle);
      setText('problemsTitle', C.problemsTitle);
      setText('benefitsTitle', C.benefitsTitle);
      fillList('problemsList', problems);
      fillList('benefitsList', benefits);
      if (!problems.length) el('problemsCard').hidden = true;
      if (!benefits.length) el('benefitsCard').hidden = true;
      if (!problems.length || !benefits.length) el('compare').classList.add('is-single');
      show('compareSection');
    }

    // Services
    var services = C.services || [];
    if (services.length) {
      setRich('servicesTitle', C.servicesTitle);
      setText('aboutText', C.aboutText);
      setText('servicesNote', C.servicesNote);
      if (!C.aboutText) el('aboutText').hidden = true;
      if (!C.servicesNote) el('servicesNote').hidden = true;

      var grid = el('servicesGrid');
      services.forEach(function (s, i) {
        var card = document.createElement('article');
        card.className = 'svc' + (s.featured ? ' svc-featured' : '');
        card.setAttribute('data-reveal', '');
        card.style.setProperty('--d', (i % 4) * 0.07 + 's');

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
      setRich('stepsTitle', C.stepsTitle);
      var sl = el('stepsList');
      steps.forEach(function (s, i) {
        var li = document.createElement('li');
        li.className = 'step';
        li.setAttribute('data-reveal', '');
        li.style.setProperty('--d', i * 0.1 + 's');

        var num = document.createElement('span');
        num.className = 'step-num';
        num.setAttribute('aria-hidden', 'true');
        num.textContent = (i < 9 ? '0' : '') + (i + 1);

        var h3 = document.createElement('h3');
        h3.textContent = s.title;
        var p = document.createElement('p');
        p.textContent = s.text;

        li.appendChild(num);
        li.appendChild(h3);
        li.appendChild(p);
        sl.appendChild(li);
      });
      show('stepsSection');
    }

    // Industries
    var industries = C.industries || [];
    if (industries.length) {
      setRich('industriesTitle', C.industriesTitle);
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
      setRich('faqTitle', C.faqTitle);
      var fl = el('faqList');
      faqs.forEach(function (f) {
        var d = document.createElement('details');
        d.setAttribute('name', 'faq');
        d.setAttribute('data-reveal', '');
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

  /* ---------------- clients ---------------- */

  var PHOTO_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];
  var photoCache = {};

  // Finds a client photo. If the exact file is missing it also tries the other
  // common extensions, so "malik-mumbai.png" works even when config.js says
  // ".jpg". Calls done(url) with the first file that loads, or done(null) when
  // none do — the card then keeps showing the initials.
  function resolvePhoto(src, done) {
    var entry = photoCache[src];
    if (entry) {
      if (entry.settled) done(entry.url); else entry.waiters.push(done);
      return;
    }
    entry = photoCache[src] = { settled: false, url: null, waiters: [done] };

    var base = src.replace(/\.(jpe?g|png|webp)$/i, '');
    var tries = [src].concat(PHOTO_EXTS.map(function (ext) { return base + ext; }))
      .filter(function (s, i, list) { return list.indexOf(s) === i; });

    function settle(url) {
      entry.settled = true;
      entry.url = url;
      entry.waiters.forEach(function (fn) { fn(url); });
      entry.waiters = [];
    }

    (function attempt(i) {
      if (i >= tries.length) { settle(null); return; }
      var probe = new Image();
      probe.onload = function () { settle(tries[i]); };
      probe.onerror = function () { attempt(i + 1); };
      probe.src = tries[i];
    })(0);
  }

  function initials(name) {
    return String(name || '').trim().split(/\s+/).slice(0, 2)
      .map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }

  // Lays the client's photo over the initials placeholder once it has loaded.
  function addPhoto(box, client, alt) {
    if (!client.photo) return;
    resolvePhoto(client.photo, function (url) {
      if (!url) return;
      var img = document.createElement('img');
      img.alt = alt;
      img.decoding = 'async';
      if (client.position) img.style.objectPosition = client.position;
      img.src = url;
      box.appendChild(img);
    });
  }

  function avatar(client) {
    var a = document.createElement('span');
    a.className = 'avatar';
    a.textContent = initials(client.name);
    addPhoto(a, client, '');
    return a;
  }

  function renderClients() {
    var clients = (C.clients || []).filter(function (c) { return c && c.name; });
    if (!clients.length) return;

    setRich('clientsTitle', C.clientsTitle);
    setText('clientsNote', C.clientsNote);
    setText('clientsCtaLabel', C.clientsCtaLabel);
    if (!C.clientsNote) el('clientsNote').hidden = true;

    var grid = el('clientGrid');
    clients.forEach(function (c, i) {
      var item = document.createElement('div');
      item.className = 'client-item';
      item.setAttribute('data-reveal', '');
      item.style.setProperty('--d', (i % 4) * 0.09 + 's');

      var card = document.createElement('article');
      card.className = 'client-card';

      var media = document.createElement('div');
      media.className = 'client-media';

      var ini = document.createElement('span');
      ini.className = 'client-initials';
      ini.setAttribute('aria-hidden', 'true');
      ini.textContent = initials(c.name);
      media.appendChild(ini);

      if (C.clientBadge) {
        var badge = document.createElement('span');
        badge.className = 'client-badge';
        badge.textContent = C.clientBadge;
        media.appendChild(badge);
      }

      var meta = document.createElement('div');
      meta.className = 'client-meta';

      var name = document.createElement('h3');
      name.className = 'client-name';
      name.textContent = c.name;
      meta.appendChild(name);

      if (c.place) {
        var place = document.createElement('p');
        place.className = 'client-place';
        place.textContent = c.place;
        meta.appendChild(place);
      }

      var work = (c.work || []).filter(Boolean);
      if (work.length) {
        var tags = document.createElement('div');
        tags.className = 'client-tags';
        work.forEach(function (w) {
          var t = document.createElement('span');
          t.textContent = w;
          tags.appendChild(t);
        });
        meta.appendChild(tags);
      }

      media.appendChild(meta);
      addPhoto(media, c, 'Photo of ' + c.name);
      card.appendChild(media);

      if (c.quote) {
        var q = document.createElement('blockquote');
        q.className = 'client-quote';
        q.textContent = '“' + c.quote + '”';
        card.appendChild(q);
      }

      item.appendChild(card);
      grid.appendChild(item);
    });

    // Avatars + "Trusted by ..." under the hero button and in the closing card
    var shown = clients.slice(0, 4);
    [el('heroAvatars'), el('closingAvatars')].forEach(function (box) {
      if (!box) return;
      shown.forEach(function (c) { box.appendChild(avatar(c)); });
      box.hidden = false;
    });

    var text = el('heroProofText');
    if (text) {
      var names = clients.map(function (c) { return c.name; });
      var extra = 0;
      if (names.length > 3) { extra = names.length - 2; names = names.slice(0, 2); }

      text.textContent = (C.proofPrefix || 'Trusted by') + ' ';
      names.forEach(function (n, i) {
        if (i > 0) text.appendChild(document.createTextNode(i === names.length - 1 && !extra ? ' & ' : ', '));
        var b = document.createElement('strong');
        b.textContent = n;
        text.appendChild(b);
      });
      if (extra) text.appendChild(document.createTextNode(' & ' + extra + ' more'));
      show('heroProof');
    }

    show('clientsSection');
  }

  function renderContact() {
    var list = el('contactList');
    if (!list) return;

    var rows = [];

    if (tgLink) {
      rows.push({
        icon: 'chat',
        label: 'Telegram',
        value: '@' + username + ' — fastest reply',
        href: tgLink,
        channel: 'tg'
      });
    }
    if (waLink) {
      rows.push({
        icon: 'chat',
        label: 'WhatsApp',
        value: '+' + phone + ' — message us',
        href: waLink,
        channel: 'wa'
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

    rows.forEach(function (r, i) {
      var a = document.createElement('a');
      a.className = 'contact-row' + (r.channel ? ' is-' + r.channel : '');
      a.setAttribute('href', r.href);
      a.setAttribute('data-reveal', '');
      a.style.setProperty('--d', i * 0.08 + 's');
      if (r.external) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
      }
      if (r.channel) {
        a.setAttribute('rel', 'noopener nofollow');
        a.setAttribute('target', isDesktop() ? '_blank' : '_self');
        a.addEventListener('click', function () { goToChat(r.channel, true); });
      }

      var icon = document.createElement('span');
      icon.className = 'contact-icon';
      icon.innerHTML = iconSvg(r.icon);

      var body = document.createElement('span');
      var strong = document.createElement('strong');
      strong.textContent = r.label;
      var value = document.createElement('span');
      value.className = 'contact-value';
      value.textContent = r.value;
      body.appendChild(strong);
      body.appendChild(value);

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

  /* ---------------- motion ---------------- */

  // Fades blocks in as they scroll into view. Only blocks that start below the
  // fold are hidden, so nothing visible on load ever blinks, and if this script
  // fails the whole page simply stays visible.
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    var fold = window.innerHeight || document.documentElement.clientHeight;
    all('[data-reveal]').forEach(function (n) {
      if (n.closest('[hidden]')) return;
      if (n.getBoundingClientRect().top < fold) return;
      n.classList.add('reveal');
      io.observe(n);
    });
  }

  // Shows the sticky chat buttons once the hero button has scrolled away,
  // and tucks it away again while the closing call-to-action is on screen.
  function initSticky() {
    var bar = el('stickyCta');
    var hero = el('cta');
    var closing = el('ctaAlt');
    if (!bar || !hero || !(tgLink || waLink) || !('IntersectionObserver' in window)) return;

    var heroGone = false;
    var closingVisible = false;

    function update() { bar.classList.toggle('is-visible', heroGone && !closingVisible); }

    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { heroGone = !e.isIntersecting && e.boundingClientRect.top < 0; });
      update();
    }).observe(hero);

    if (closing) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { closingVisible = e.isIntersecting; });
        update();
      }).observe(closing);
    }
  }

  /* ---------------- boot ---------------- */

  render();

  var redirectDisabled = params.get('noredirect') === '1' || params.get('preview') === '1';

  // Auto-redirect goes to redirectChannel ("telegram" or "whatsapp"), or to
  // whichever one is configured if that one isn't.
  var redirectKey = C.redirectChannel === 'whatsapp' ? 'wa' : 'tg';
  if (!CHANNELS[redirectKey].link) redirectKey = redirectKey === 'tg' ? 'wa' : 'tg';

  if (C.autoRedirect && CHANNELS[redirectKey].link && !redirectDisabled) {
    setTimeout(function () { goToChat(redirectKey, false); },
      Math.max(0, C.redirectDelayMs == null ? 1800 : C.redirectDelayMs));
  }

  // If the visitor comes back (the chat app opened, then they hit back), reset the
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
