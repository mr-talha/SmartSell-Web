/* SmartSell marketing site — shared behaviour */

/*
 * Site configuration.
 * - formEndpoint: optional JSON form endpoint (e.g. Formspree). Leave empty to
 *                 fall back to opening the visitor's email client.
 */
const SITE = {
  email: 'talhahameed683@gmail.com',
  phoneDisplay: '0300 4570032',
  phoneIntl: '+92 300 4570032',
  phoneTel: '+923004570032',
  whatsappNumber: '923004570032',
  formEndpoint: '',
};

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.add('js');

function onVisible(el, callback, threshold = 0.25) {
  if (!el) return;
  if (!('IntersectionObserver' in window)) {
    callback();
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    callback();
  }, { threshold });
  observer.observe(el);
}

/* ---------- Icons (Lucide-style, 24px grid) ---------- */

const ICONS = {
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  minus: '<path d="M5 12h14"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  package: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.7 4.73a2 2 0 0 0 2 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'user-check': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  landmark: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M12 2 20 7H4z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  trending: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  sparkles: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  store: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-2-.8 2.7 2.7 0 0 1-2 .8 2.7 2.7 0 0 1-2-.8 2.7 2.7 0 0 1-2 .8 2.7 2.7 0 0 1-2-.8 2.7 2.7 0 0 1-2 .8 2.7 2.7 0 0 1-2-.8A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>',
  pin: '<path d="M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  key: '<path d="M2.59 17.41A2 2 0 0 0 2 18.83V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.17a2 2 0 0 0 1.42-.59l.81-.81a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  call: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  support: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/>',
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  send: '<path d="M14.54 21.69a.5.5 0 0 0 .94-.03l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.02.94l7.93 3.18a2 2 0 0 1 1.11 1.11z"/><path d="m21.85 2.15-10.94 10.94"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
};

function renderIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => {
    const paths = ICONS[el.dataset.icon];
    if (!paths || el.dataset.iconReady) return;
    el.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;
    el.dataset.iconReady = 'true';
  });
}

/* ---------- Config bindings ---------- */

function applyConfig() {
  document.querySelectorAll('[data-config]').forEach((el) => {
    const value = SITE[el.dataset.config];
    if (value) el.textContent = value;
  });
  document.querySelectorAll('[data-mailto]').forEach((a) => { a.href = `mailto:${SITE.email}`; });
  document.querySelectorAll('[data-tel]').forEach((a) => { a.href = `tel:${SITE.phoneTel}`; });
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    const text = a.dataset.whatsapp ? `?text=${encodeURIComponent(a.dataset.whatsapp)}` : '';
    a.href = `https://wa.me/${SITE.whatsappNumber}${text}`;
  });
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
}

/* ---------- Header ---------- */

function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  header.append(progress);

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.setProperty('--progress', max > 0 ? String(Math.min(window.scrollY / max, 1)) : '0');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = header.querySelector('.nav-toggle');
  const menu = header.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    const icon = toggle.querySelector('[data-icon]');
    icon.dataset.icon = open ? 'x' : 'menu';
    delete icon.dataset.iconReady;
    renderIcons(toggle);
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 960) setOpen(false); });
}

/* ---------- Scroll reveal ---------- */

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el) => observer.observe(el));
}

/* ---------- Order lifecycle tabs ---------- */

function initFlow() {
  const flow = document.querySelector('[data-flow]');
  if (!flow) return;
  const tabs = [...flow.querySelectorAll('[role="tab"]')];
  const panels = [...flow.querySelectorAll('[role="tabpanel"]')];

  const select = (index, focus = false) => {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
    });
    if (focus) tabs[index].focus();
  };

  // Steps advance on their own until the visitor picks one.
  const stopAuto = () => flow.classList.remove('is-auto');

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => { stopAuto(); select(i); });
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { stopAuto(); select((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { stopAuto(); select((i - 1 + tabs.length) % tabs.length, true); }
    });
    tab.addEventListener('animationend', (e) => {
      if (e.animationName !== 'flow-progress' || !flow.classList.contains('is-auto')) return;
      select((i + 1) % tabs.length);
    });
  });

  if (!REDUCED_MOTION) onVisible(flow, () => flow.classList.add('is-auto'), 0.4);
}

/* ---------- Hero: scroll tilt + live activity toasts ---------- */

function initHeroMockup() {
  const wrap = document.querySelector('.mockup-wrap');
  const tilt = wrap?.querySelector('.mockup-tilt');
  if (!wrap || !tilt) return;

  if (!REDUCED_MOTION) {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth <= 960) {
        tilt.style.setProperty('--tilt', '0deg');
        tilt.style.setProperty('--scale', '1');
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh - rect.top) / (vh * 0.85), 0), 1);
      tilt.style.setProperty('--tilt', `${(16 * (1 - p)).toFixed(2)}deg`);
      tilt.style.setProperty('--scale', (0.94 + 0.06 * p).toFixed(3));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
  }

  const events = [
    { icon: 'wallet', tone: 'gold', title: 'Payment received', sub: 'Rs 50,000 · Order #ORD-1048' },
    { icon: 'message', tone: 'green', title: 'WhatsApp sent to Sana', sub: '“Your order is out for delivery”' },
    { icon: 'truck', tone: '', title: 'Order #ORD-1045 delivered', sub: 'Sale & journal posted automatically' },
    { icon: 'alert', tone: 'rose', title: 'Low stock: Oak dining set', sub: 'Only 6 left at DHA branch' },
    { icon: 'user-check', tone: '', title: 'Commission earned', sub: 'Bilal · Rs 3,700 on delivery' },
    { icon: 'sparkles', tone: 'gold', title: 'Advisor tip', sub: 'Collect Rs 312k overdue this week' },
  ];

  const toasts = ['side-l', 'side-r'].map((side) => {
    const el = document.createElement('div');
    el.className = `toast ${side}`;
    el.setAttribute('aria-hidden', 'true');
    wrap.append(el);
    return el;
  });

  const show = (el, event) => {
    el.innerHTML = `<span class="toast-icon ${event.tone}" data-icon="${event.icon}"></span><div><b>${event.title}</b><small>${event.sub}</small></div>`;
    renderIcons(el);
    el.classList.add('is-shown');
  };

  let index = 0;
  const tick = () => {
    const narrow = window.innerWidth <= 960;
    const el = narrow ? toasts[0] : toasts[index % 2];
    if (narrow) toasts[1].classList.remove('is-shown');
    el.classList.remove('is-shown');
    const event = events[index % events.length];
    index += 1;
    window.setTimeout(() => show(el, event), 350);
  };

  onVisible(wrap, () => {
    window.setTimeout(() => {
      tick();
      window.setTimeout(tick, 1300);
      if (!REDUCED_MOTION) window.setInterval(() => { if (!document.hidden) tick(); }, 2900);
    }, 900);
  }, 0.2);
}

/* ---------- Count-up numbers ---------- */

function initCountUp() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const format = (n) => prefix + n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (REDUCED_MOTION) {
      el.textContent = format(target);
      return;
    }
    el.textContent = format(0);
    onVisible(el, () => {
      const start = performance.now();
      const duration = 1500;
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = format(target * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 0.6);
  });
}

/* ---------- Advisor score ring ---------- */

function initScoreRing() {
  document.querySelectorAll('.score-ring[data-score]').forEach((ring) => {
    const score = ring.dataset.score;
    ring.style.setProperty('--val', REDUCED_MOTION ? score : '0');
    onVisible(ring, () => ring.style.setProperty('--val', score), 0.6);
  });
}

/* ---------- WhatsApp chat playback ---------- */

function initChat() {
  const chat = document.querySelector('[data-chat]');
  if (!chat || REDUCED_MOTION) return;

  const bubbles = [...chat.querySelectorAll('.bubble')];
  chat.style.minHeight = `${chat.offsetHeight}px`;
  chat.classList.add('is-playing');

  const typing = document.createElement('div');
  typing.className = 'typing';
  typing.innerHTML = '<i></i><i></i><i></i>';
  chat.append(typing);

  const wait = (ms) => new Promise((resolve) => { window.setTimeout(resolve, ms); });

  onVisible(chat, async () => {
    await wait(500);
    for (const bubble of bubbles) {
      if (bubble.classList.contains('out')) {
        await wait(900);
      } else {
        chat.insertBefore(typing, bubble);
        typing.classList.add('is-in');
        await wait(1100);
        typing.classList.remove('is-in');
      }
      bubble.classList.add('is-in');
      await wait(500);
    }
  }, 0.45);
}

/* ---------- Cursor spotlight on cards ---------- */

function initSpotlight() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest?.('.spotlight');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, { passive: true });
}

/* ---------- Pricing ---------- */

const ANNUAL_MONTHS_CHARGED = 10; // annual billing = 2 months free

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

function initPricing() {
  const root = document.querySelector('[data-pricing]');
  if (!root) return;

  const state = { billing: 'monthly', currency: 'PKR' };
  const prefix = () => (state.currency === 'PKR' ? 'Rs ' : '$');

  const render = () => {
    const currencyKey = state.currency.toLowerCase();
    document.querySelectorAll('[data-price]').forEach((el) => {
      const monthly = Number(el.dataset[currencyKey]);
      if (!monthly) return;
      const perMonth = state.billing === 'annual'
        ? Math.round((monthly * ANNUAL_MONTHS_CHARGED) / 12)
        : monthly;
      el.querySelector('.amount').textContent = formatMoney(perMonth);
      el.querySelector('.cur').textContent = state.currency === 'PKR' ? 'Rs' : '$';

      const billing = el.parentElement.querySelector('.plan-billing');
      if (billing) {
        billing.textContent = state.billing === 'annual'
          ? `${prefix()}${formatMoney(monthly * ANNUAL_MONTHS_CHARGED)} billed yearly`
          : 'Billed monthly';
      }
    });
    document.querySelectorAll('[data-addon-price]').forEach((el) => {
      const value = Number(el.dataset[currencyKey]);
      el.firstChild.textContent = `${prefix()}${formatMoney(value)} `;
    });
    root.querySelectorAll('[data-billing]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.billing === state.billing)));
    root.querySelectorAll('[data-currency]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.currency === state.currency)));
  };

  root.addEventListener('click', (e) => {
    const billing = e.target.closest('[data-billing]');
    const currency = e.target.closest('[data-currency]');
    if (billing) state.billing = billing.dataset.billing;
    if (currency) state.currency = currency.dataset.currency;
    if (billing || currency) render();
  });

  render();
}

/* ---------- Contact form ---------- */

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const plan = params.get('plan');
  const topic = params.get('topic');
  if (plan && form.plan.querySelector(`option[value="${CSS.escape(plan)}"]`)) form.plan.value = plan;
  if (topic && form.topic.querySelector(`option[value="${CSS.escape(topic)}"]`)) form.topic.value = topic;

  const status = form.querySelector('.form-status');
  const success = document.querySelector('[data-form-success]');
  const submit = form.querySelector('button[type="submit"]');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.',
    phone: (v) => !v.trim() || /^[+\d][\d\s()-]{6,}$/.test(v.trim()) || 'Please enter a valid phone number.',
    business: (v) => v.trim().length >= 2 || 'Please enter your business name.',
    message: (v) => v.trim().length >= 10 || 'Tell us a little more (at least 10 characters).',
  };

  const validateField = (name) => {
    const input = form.elements[name];
    const field = input.closest('.field');
    const result = validators[name](input.value);
    const ok = result === true;
    field.classList.toggle('has-error', !ok);
    input.setAttribute('aria-invalid', String(!ok));
    field.querySelector('.field-error').textContent = ok ? '' : result;
    return ok;
  };

  Object.keys(validators).forEach((name) => {
    form.elements[name].addEventListener('blur', () => validateField(name));
    form.elements[name].addEventListener('input', () => {
      if (form.elements[name].closest('.field').classList.contains('has-error')) validateField(name);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    const results = Object.keys(validators).map(validateField);
    if (results.includes(false)) {
      form.querySelector('.has-error input, .has-error textarea, .has-error select')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    if (data.company_website) return; // honeypot: silently ignore bots

    submit.disabled = true;
    submit.querySelector('span').textContent = 'Sending…';

    try {
      if (SITE.formEndpoint) {
        const response = await fetch(SITE.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
      } else {
        const subject = `[${data.topic}] ${data.business} — ${data.name}`;
        const body = [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone / WhatsApp: ${data.phone || '—'}`,
          `Business: ${data.business}`,
          `Plan of interest: ${data.plan}`,
          `Locations: ${data.locations}`,
          '',
          data.message,
        ].join('\n');
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
      success.querySelector('[data-success-text]').textContent = SITE.formEndpoint
        ? 'Your message is on its way. Our team will get back to you within one business day.'
        : 'Your email app should now open with your message ready — just press send. Our team replies within one business day.';
      form.hidden = true;
      success.hidden = false;
      success.querySelector('[data-success-name]').textContent = data.name.split(' ')[0];
      success.focus();
    } catch {
      status.className = 'form-status is-error';
      status.textContent = `We couldn't send your message. Please try again, or email us at ${SITE.email}.`;
    } finally {
      submit.disabled = false;
      submit.querySelector('span').textContent = 'Send message';
    }
  });

  success?.querySelector('[data-form-reset]')?.addEventListener('click', () => {
    form.reset();
    success.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
}

renderIcons();
applyConfig();
initHeader();
initReveal();
initFlow();
initPricing();
initContactForm();
initHeroMockup();
initCountUp();
initScoreRing();
initChat();
initSpotlight();
