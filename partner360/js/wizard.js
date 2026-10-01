/* ============================================================
   DBU Partner360 · wizard.js
   State pr. partner i sessionStorage, stepper, opsummering,
   generiske valg-interaktioner (option cards, chips, checkbokse).
   ============================================================ */
(function () {
  const D = window.P360;
  const { $, $$, esc, icon } = D;

  const W = {
    partner: null, state: null, step: 1, flow: 'kupon', listeners: [],

    key() { return `p360.wizard.${this.partner.id}`; },

    init(step) {
      this.step = step;
      this.partner = D.partner();
      this.flow = this.partner.flow || 'kupon';
      const defaults = D.wizardDefaults[this.partner.id] || D.wizardDefaults.salling;
      let saved = null;
      try { saved = JSON.parse(sessionStorage.getItem(this.key()) || 'null'); } catch (e) {}
      this.state = Object.assign(JSON.parse(JSON.stringify(defaults)), saved || {});
      this.defaults = defaults;
      D.renderTopbar({ variant: 'partner', crumb: 'Ny aktivering', partner: this.partner });
      D.renderSidebar('Aktiveringer', this.partner);
      this.renderHeader();
      this.renderStepper();
      this.renderSummary();
      this.renderFooter();
      this.bind();
      D.decorateLinks();
      return this;
    },

    save() { try { sessionStorage.setItem(this.key(), JSON.stringify(this.state)); } catch (e) {} },
    reset() { try { sessionStorage.removeItem(this.key()); } catch (e) {} location.reload(); },
    set(k, v) { this.state[k] = v; this.save(); this.renderSummary(); this.listeners.forEach((fn) => fn(k, v, this.state)); },
    onChange(fn) { this.listeners.push(fn); },

    stepNames() { return D.steps[this.flow]; },

    /* Gemmer aktiveringen som "afventer godkendelse" hos partneren (vises på partner.html) */
    sendForApproval() {
      const s = this.state, p = this.partner;
      const contact = (p.stamdata.find((r) => r[0] === 'Kontaktperson') || [])[1] || p.owner;
      const list = D.channels[this.flow].list.filter((c) => (s.channels || []).includes(c.id));
      const pending = {
        name: s.name, type: this.typeText(),
        channel: list.length ? list[0].short.replace(/^./, (c) => c.toUpperCase()) + (list.length > 1 ? ` +${list.length - 1}` : '') : '–',
        period: this.flow === 'event' ? `${s.periodStart} - ${s.periodEnd}` : (s.periodTouched ? `${s.periodStart} - ${s.periodEnd}` : s.periodSummary),
        price: this.priceText(), sentTo: contact.split(',')[0], sentAt: new Date().toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      try { sessionStorage.setItem(`p360.pending.${p.id}`, JSON.stringify(pending)); } catch (e) {}
    },

    renderHeader() {
      const sub = $('#step-subtitle');
      if (sub) sub.textContent = `Trin ${this.step} af 7  ·  ${D.stepSubtitles[this.flow][this.step - 1]}`;
      document.title = `DBU Partner360 — Opret ny aktivering · Trin ${this.step}`;
    },

    renderStepper() {
      const host = $('#stepper'); if (!host) return;
      const names = this.stepNames();
      host.innerHTML = names.map((n, i) => {
        const num = i + 1;
        const st = num < this.step ? 'done' : num === this.step ? 'current' : 'upcoming';
        const circle = st === 'done' ? icon('check') : num;
        const item = `<a class="step step--${st}" href="${D.href('aktivering-' + num + '.html', this.partner.id)}"><span class="step__circle">${circle}</span><span class="step__label">${esc(n)}</span></a>`;
        return (i ? '<span class="step__connector"></span>' : '') + item;
      }).join('');
    },

    goalText() {
      const s = this.state;
      const unit = s.goal === 'indlosninger' ? 'indløsninger' : (s.goalUnit || (D.goals.find((g) => g.id === s.goal) || {}).unit || '');
      return `${s.goalValue} ${unit}`.trim();
    },
    typeText() { return (D.activationTypes.find((t) => t.id === this.state.type) || {}).title || '–'; },
    audienceText() {
      const s = this.state;
      if (this.step <= 2 || s.audienceTouched) {
        const roles = D.audience.roles.filter((r) => (s.roles || []).includes(r.id)).map((r) => r.title);
        const club = String(s.clubSelect || 'klubber').replace(/\s*\(.*\)\s*$/, '').replace(/\.{3}$/, '').replace(/^Alle\s+/i, '').replace(/^./, (c) => c.toLowerCase());
        const geo = s.geo === 'Radius om klubber' ? `${s.radius} om ${club}` : s.geo;
        return `${roles.join(', ') || 'Ingen rolle valgt'}, ${geo}, ${s.ageMin} til ${s.ageMax} år`;
      }
      return s.audienceShort;
    },
    channelsText() {
      const list = D.channels[this.flow].list;
      const sel = list.filter((c) => (this.state.channels || []).includes(c.id)).map((c) => c.short);
      return sel.length ? sel.join(', ') : '–';
    },
    periodText() {
      const s = this.state;
      if (this.flow === 'event') return s.eventsTouched ? `${(s.events || []).length} valgte events  ·  ${s.periodStart} - ${s.periodEnd}` : s.periodSummary;
      if (!s.periodTouched) return s.periodSummary;
      return `${s.periodStart} - ${s.periodEnd}`;
    },
    materialText() {
      const m = D.materials[this.partner.id] || D.materials.salling;
      const kit = m.kits.find((k) => k.id === this.state.brandKit) || m.kits[0];
      return `${kit.name} branding  ·  3 tekster  ·  1 billede`;
    },
    priceTotal() {
      const p = D.pricing[this.partner.id] || D.pricing.salling;
      const list = D.channels[this.flow].list;
      const sel = list.filter((c) => (this.state.channels || []).includes(c.id));
      const isDefault = sel.length === (this.defaults.channels || []).length && sel.every((c) => (this.defaults.channels || []).includes(c.id));
      return isDefault ? p.total : sel.reduce((a, c) => a + c.priceNum, 0).toLocaleString('da-DK') + ' kr.';
    },
    priceText() {
      const p = D.pricing[this.partner.id] || D.pricing.salling;
      const model = p.models.find((m) => m.id === this.state.priceModel) || p.models[0];
      return `${this.priceTotal()} (${model.title.toLowerCase()})`;
    },

    summaryRows() {
      const names = this.stepNames();
      const rows = [
        ['Partner', this.partner.name, 0],
        ['Type', this.typeText(), 1],
        ['Mål', this.goalText(), 1],
        ['Målgruppe', this.audienceText(), 2],
        ['Kanaler', this.channelsText(), 3],
        [names[3], this.periodText(), 4],
        ['Materiale', this.materialText(), 5],
        ['Pris', this.priceText(), 6],
      ];
      return rows.map(([l, v, st]) => [l, st <= this.step ? v : '–']);
    },

    renderSummary() {
      const host = $('#summary'); if (!host) return;
      host.innerHTML = `<div class="summary__title">Opsummering</div>` +
        this.summaryRows().map(([l, v]) => `<div class="srow"><span class="srow__label">${esc(l)}</span><span class="srow__value">${esc(v)}</span></div>`).join('');
    },

    renderFooter() {
      const host = $('#wizard-footer'); if (!host) return;
      const names = this.stepNames();
      const back = this.step === 1
        ? `<a class="btn btn--ghost" href="${D.href('partner.html', this.partner.id)}">Annuller</a>`
        : `<a class="btn btn--ghost" href="${D.href('aktivering-' + (this.step - 1) + '.html', this.partner.id)}">Tilbage</a>`;
      let right;
      if (this.step < 7) {
        right = `<a class="btn btn--ghost" href="${D.href('partner.html', this.partner.id)}">Gem som kladde</a>
                 <a class="btn" href="${D.href('aktivering-' + (this.step + 1) + '.html', this.partner.id)}">Næste trin: ${esc(names[this.step])}</a>`;
      } else {
        right = `<a class="btn btn--ghost" href="${D.href('partner.html', this.partner.id)}">Gem som kladde</a>
                 <a class="btn btn--dark" href="${D.href('performance.html', this.partner.id)}">Publicer aktivering</a>
                 <a class="btn" data-send href="${D.href('partner.html', this.partner.id)}">${esc(this.state.sendLabel)}</a>`;
      }
      host.innerHTML = `<div class="wizard__footer-inner">${back}<div class="wizard__footer-right">${right}</div></div>`;
    },


    /* Generiske interaktioner.
       - [data-single="key"] + [data-value]: ét valg (option cards, chips som tabs, radios)
       - [data-multi="key"]  + [data-value]: flere valg (channel cards, chips)
       - [data-toggle="key"]: boolean (checkbokse) */
    bind() {
      const self = this;
      document.addEventListener('click', (e) => {
        const single = e.target.closest('[data-single]');
        if (single) {
          const key = single.getAttribute('data-single'), val = single.getAttribute('data-value');
          $$(`[data-single="${key}"]`).forEach((n) => self.mark(n, n === single));
          self.set(key, val); return;
        }
        const multi = e.target.closest('[data-multi]');
        if (multi) {
          const key = multi.getAttribute('data-multi'), val = multi.getAttribute('data-value');
          const arr = (self.state[key] || []).slice();
          const i = arr.indexOf(val);
          if (i >= 0) arr.splice(i, 1); else arr.push(val);
          self.mark(multi, i < 0);
          self.set(key, arr); return;
        }
        const tog = e.target.closest('[data-toggle]');
        if (tog) {
          const key = tog.getAttribute('data-toggle');
          const v = !self.state[key];
          self.mark(tog, v);
          self.set(key, v);
        }
      });
      document.addEventListener('input', (e) => {
        const f = e.target.closest('[data-field]');
        if (!f) return;
        const key = f.getAttribute('data-field');
        if (key === 'periodStart' || key === 'periodEnd') self.state.periodTouched = true;
        self.set(key, f.value);
      });
      $$('[data-reset]').forEach((b) => b.addEventListener('click', () => self.reset()));
      $$('[data-send]').forEach((b) => b.addEventListener('click', () => self.sendForApproval()));
    },

    mark(node, on) {
      node.classList.toggle('is-selected', on);
      node.classList.toggle('is-checked', on);
      const r = node.querySelector('.radio'); if (r) r.classList.toggle('is-selected', on);
      const c = node.querySelector('.checkbox'); if (c) c.classList.toggle('is-checked', on);
      if (node.classList.contains('checkbox')) node.classList.toggle('is-checked', on);
      if (node.classList.contains('radio')) node.classList.toggle('is-selected', on);
    },

    /* Sæt initial-markering ud fra state */
    sync() {
      const s = this.state;
      $$('[data-single]').forEach((n) => this.mark(n, s[n.getAttribute('data-single')] === n.getAttribute('data-value')));
      $$('[data-multi]').forEach((n) => this.mark(n, (s[n.getAttribute('data-multi')] || []).includes(n.getAttribute('data-value'))));
      $$('[data-toggle]').forEach((n) => this.mark(n, !!s[n.getAttribute('data-toggle')]));
      $$('[data-field]').forEach((n) => { if (s[n.getAttribute('data-field')] != null) n.value = s[n.getAttribute('data-field')]; });
      $$('[data-dropdown]').forEach((n) => { const k = n.getAttribute('data-dropdown'); if (s[k] != null) D.setDropdownText(n, s[k]); });
    },
  };

  D.wizard = W;
})();
