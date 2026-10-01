/* ============================================================
   DBU Partner360 · app.js
   Partner-opløsning, topbar, sidebar, små helpers.
   ============================================================ */
(function () {
  const D = window.P360;
  const KEY_PARTNER = 'p360.partner';

  /* ---------- helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (name, cls) => `<i data-lucide="${name}" class="icon${cls ? ' ' + cls : ''}"></i>`;

  /* ---------- partner ---------- */
  function partnerId() {
    const q = new URLSearchParams(location.search).get('p');
    if (q) { try { sessionStorage.setItem(KEY_PARTNER, q); } catch (e) {} return q; }
    try { return sessionStorage.getItem(KEY_PARTNER) || 'salling'; } catch (e) { return 'salling'; }
  }

  function partner(id) {
    id = id || partnerId();
    const home = D.partnerHome[id];
    if (home) return Object.assign({ id }, home);
    // Andre partnere: Salling-data med eget navn og logo
    const row = D.partnerList.find((p) => p.id === id) || D.partnerList[3];
    const base = D.partnerHome.salling;
    const owner = D.owners[row.owner];
    return Object.assign({}, base, {
      id: row.id, name: row.name, shortUpper: row.name.toUpperCase(),
      logoSquare: row.logo, logoFit: 'contain', owner: owner.name,
      stamdata: base.stamdata.map(([k, v]) => k === 'Virksomhed' ? [k, row.name] : k === 'DBU-ansvarlig' ? [k, owner.name] : [k, v]),
      kpis: [[row.active, 'Aktive aktiveringer'], [row.reach, 'Samlet rækkevidde i år'], [String(Number(row.active) * 3 + 3), 'Aktiveringer i alt']],
    });
  }

  function href(page, pid) { return `${page}?p=${encodeURIComponent(pid || partnerId())}`; }

  /* ---------- topbar ---------- */
  function userHtml() {
    return `<div class="topbar__user">
      <div class="topbar__user-text"><b>${esc(D.user.name)}</b><span>${esc(D.user.role)}</span></div>
      <span class="avatar avatar--m">${esc(D.user.initials)}</span>
    </div>`;
  }

  function renderTopbar(opts) {
    const host = $('#topbar'); if (!host) return;
    opts = opts || {};
    if (opts.variant === 'partner') {
      const p = opts.partner || partner();
      const logoStyle = p.logoBg ? ` style="background:${p.logoBg}"` : '';
      host.className = 'topbar topbar--partner';
      host.innerHTML = `
        <div class="topbar__left">
          <a class="topbar__back" href="index.html">${icon('arrow-left')}<span>Alle partnere</span></a>
          <span class="topbar__divider"></span>
          <a class="topbar__logo${p.logoFit === 'contain' ? ' topbar__logo--contain' : ''}" href="${href('partner.html', p.id)}"${logoStyle}><img src="${p.logoSquare}" alt="${esc(p.name)}"></a>
          <div class="topbar__text">
            <div class="topbar__title"><b>${esc(p.name)}</b>${opts.crumb ? `<span class="sep">/</span><span class="sub">${esc(opts.crumb)}</span>` : ''}</div>
            <div class="topbar__meta">${esc(p.level)}  ·  ${esc(p.statusLabel)}  ·  Ansvarlig: ${esc(p.owner)}</div>
          </div>
        </div>${userHtml()}`;
    } else {
      const active = opts.active || 'Partnere';
      const nav = [['Partnere', 'index.html'], ['Aktiveringer', '#'], ['Kanaler', '#'], ['Rapporter', 'performance.html?p=salling']];
      host.className = 'topbar';
      host.innerHTML = `
        <div class="topbar__left">
          <a class="topbar__brand" href="index.html">DBU Partner360</a>
          <nav class="topbar__nav">${nav.map(([l, h]) => `<a href="${h}" class="${l === active ? 'is-active' : ''}">${l}</a>`).join('')}</nav>
        </div>${userHtml()}`;
    }
  }

  /* ---------- sidebar ---------- */
  function renderSidebar(active, p) {
    const host = $('#sidebar'); if (!host) return;
    p = p || partner();
    const items = [['Oversigt', href('partner.html', p.id)], ['Aktiveringer', href('aktivering-1.html', p.id)], ['Stamdata', '#'], ['Aftaler', '#']];
    host.className = 'sidebar';
    host.innerHTML = `
      <div class="sidebar__head">${esc(p.shortUpper)}</div>
      <div class="sidebar__divider"></div>
      <div class="sidebar__spacer"></div>
      ${items.map(([l, h]) => `<a class="sidebar__item${l === active ? ' is-active' : ''}" href="${h}">${l}</a>`).join('')}`;
  }

  /* ---------- links der skal bære partner-id ---------- */
  function decorateLinks() {
    $$('a[data-plink]').forEach((a) => { a.href = href(a.getAttribute('data-plink')); });
  }

  function icons() { if (window.lucide) window.lucide.createIcons(); }

  /* ---------- dropdown ----------
     <button data-dropdown="key" data-options="A|B|C"><span>A</span> <i chevron></i></button>
     Valg: sætter tekst, kalder D.wizard.set(key, v) hvis wizard findes, og
     udsender CustomEvent 'dropdown' ({key, value}) på elementet. */
  let openMenu = null;
  function closeMenu() {
    if (!openMenu) return;
    openMenu.menu.remove(); openMenu.btn.classList.remove('is-open'); openMenu = null;
  }
  function valueEl(btn) { return btn.querySelector('[data-dropdown-value], .select__value, span'); }
  function setDropdownText(btn, v) { const t = valueEl(btn); if (t) t.textContent = v; }
  function bindDropdowns() {
    if (bindDropdowns.done) return; bindDropdowns.done = true;
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-dropdown]');
      if (!btn) { if (!e.target.closest('.menu')) closeMenu(); return; }
      if (openMenu && openMenu.btn === btn) { closeMenu(); return; }
      closeMenu();
      const key = btn.getAttribute('data-dropdown');
      const opts = (btn.getAttribute('data-options') || '').split('|').filter(Boolean);
      const cur = (valueEl(btn) || {}).textContent || '';
      const menu = document.createElement('div');
      menu.className = 'menu';
      menu.innerHTML = opts.map((o) => `<button type="button" class="menu__item${o === cur ? ' is-selected' : ''}" data-opt="${esc(o)}"><span>${esc(o)}</span>${o === cur ? icon('check') : ''}</button>`).join('');
      const r = btn.getBoundingClientRect();
      menu.style.left = `${r.left + window.scrollX}px`;
      menu.style.top = `${r.bottom + window.scrollY + 4}px`;
      menu.style.minWidth = `${Math.max(180, r.width)}px`;
      document.body.appendChild(menu);
      btn.classList.add('is-open');
      openMenu = { btn, menu };
      icons();
      menu.addEventListener('click', (ev) => {
        const it = ev.target.closest('[data-opt]'); if (!it) return;
        const v = it.getAttribute('data-opt');
        setDropdownText(btn, v);
        closeMenu();
        if (D.wizard && D.wizard.state) D.wizard.set(key, v);
        btn.dispatchEvent(new CustomEvent('dropdown', { bubbles: true, detail: { key, value: v } }));
      });
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', closeMenu);
  }
  bindDropdowns();

  Object.assign(D, { $, $$, esc, icon, partnerId, partner, href, renderTopbar, renderSidebar, decorateLinks, icons, setDropdownText });
})();
