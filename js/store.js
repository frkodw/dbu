/* ============================================================
   DBU Klubmarked — shared client state
   Persists persona, cart, approval requests & favorites across
   pages via localStorage. Loaded BEFORE site.js on every page.
   Exposes window.DBU.
   ============================================================ */
(function () {
  var KEY = "dbu_state_v3";

  /* ---- Personas ------------------------------------------------ */
  var PERSONAS = {
    torben: {
      id: "torben", acct: "Torben Træner", group: "FC Duckwise", abbr: "TT",
      role: "Træner · U15-holdet", kind: "club",
      navLabel: "Min klub", navHref: "club-dashboard.html"
    },
    pia: {
      id: "pia", acct: "Penge Pia", group: "FC Duckwise", abbr: "PP",
      role: "Klubadministrator", kind: "admin",
      navLabel: "Godkendelser", navHref: "admin.html"
    },
    simon: {
      id: "simon", acct: "Simon Sponsor", group: "Salling Group", abbr: "SS",
      role: "Sponsoransvarlig", kind: "sponsor",
      navLabel: "Min side", navHref: "vendor-scouting.html"
    }
  };
  var PERSONA_ORDER = ["torben", "pia", "simon"];

  /* ---- Seed data ---------------------------------------------- */
  function seedCart() {
    return [{
      id: "line-hummel-home",
      sup: "Hummel",
      title: "Klub Hjemmebanetrøje 24/25",
      det: "Officiel klubtrøje · DBU × Hummel aftale",
      img: "assests/klubshirt1.png",
      fit: true,
      unit: 399,
      unitNote: "Klubpris (−25%)",
      dist: [
        { gender: "Herre", size: "S", qty: 2 },
        { gender: "Herre", size: "M", qty: 3 },
        { gender: "Herre", size: "L", qty: 3 },
        { gender: "Herre", size: "XL", qty: 2 },
        { gender: "Dame", size: "XS", qty: 1 },
        { gender: "Dame", size: "S", qty: 2 },
        { gender: "Dame", size: "M", qty: 2 },
        { gender: "Dame", size: "L", qty: 1 },
        { gender: "Ungdom", size: "140", qty: 1 },
        { gender: "Ungdom", size: "152", qty: 2 },
        { gender: "Ungdom", size: "164", qty: 1 }
      ]
    }];
  }

  // Pre-existing requests so the admin queue looks lived-in.
  function seedRequests() {
    return [
      {
        id: "req-1041", ref: "DBU-2026-0611",
        requester: { name: "Lone Pedersen", role: "Træner · U13", abbr: "LP", dark: false },
        title: "12 × Træningsoverdele + 8 shorts",
        items: [
          { sup: "Hummel", title: "Træningsoverdel Core", img: "assests/shirt3.webp", unit: 219, dist: [
            { gender: "Ungdom", size: "140", qty: 4 }, { gender: "Ungdom", size: "152", qty: 5 }, { gender: "Ungdom", size: "164", qty: 3 }
          ] },
          { sup: "Hummel", title: "Træningsshorts Core", img: "assests/shirt4.webp", unit: 179, dist: [
            { gender: "Ungdom", size: "140", qty: 3 }, { gender: "Ungdom", size: "152", qty: 3 }, { gender: "Ungdom", size: "164", qty: 2 }
          ] }
        ],
        note: "Til U13-drengene inden forårssæsonen. Størrelser afstemt med holdet.",
        by: "Lone, træner U13",
        createdAt: "I dag 11:05", status: "pending"
      },
      {
        id: "req-1040", ref: "DBU-2026-0609",
        requester: { name: "Kasper Holm", role: "Holdleder · Senior", abbr: "KH", dark: false },
        title: "6 × Matchbolde (Select Pro)",
        items: [
          { sup: "Select", title: "Matchbold Pro Edition", img: "assests/fodbold2.webp", fit: true, unit: 229, dist: [
            { gender: "—", size: "Str. 5", qty: 6 }
          ] }
        ],
        note: "Vi mangler kampbolde til seniorholdets hjemmekampe resten af sæsonen.",
        by: "Kasper, holdleder",
        createdAt: "I går 16:48", status: "pending"
      },
      {
        id: "req-1038", ref: "DBU-2026-0602",
        requester: { name: "Anne Berg", role: "Træner · U10", abbr: "AB", dark: false },
        title: "15 × Spillertrøjer (børn)",
        items: [
          { sup: "Hummel", title: "Børnetrøje 24/25", img: "assests/shirt1b.webp", unit: 219, dist: [
            { gender: "Ungdom", size: "128", qty: 6 }, { gender: "Ungdom", size: "140", qty: 6 }, { gender: "Ungdom", size: "152", qty: 3 }
          ] }
        ],
        note: "Nye trøjer til U10 — de gamle er slidt op.",
        by: "Anne, træner U10",
        createdAt: "2. jun 09:20", status: "approved",
        decision: "Godkendt — flot initiativ. Husk klublogo på ryggen.", decidedAt: "2. jun 13:40"
      },
      {
        id: "req-1035", ref: "DBU-2026-0531",
        requester: { name: "Thomas Møller", role: "Materialeansv.", abbr: "TM", dark: false },
        title: "4 × Målmandshandsker (premium)",
        items: [
          { sup: "Hummel", title: "Målmandshandsker Pro", img: "assests/sko.webp", fit: true, unit: 299, dist: [
            { gender: "—", size: "Str. 9", qty: 2 }, { gender: "—", size: "Str. 10", qty: 2 }
          ] }
        ],
        note: "Premium-handsker til seniormålmændene.",
        by: "Thomas, materialeansvarlig",
        createdAt: "31. maj 18:02", status: "rejected",
        decision: "Afvist — for dyrt lige nu. Vælg standardmodellen i stedet.", decidedAt: "31. maj 19:15"
      }
    ];
  }

  /* ---- Persistence -------------------------------------------- */
  function fresh() {
    return {
      persona: "torben",
      cart: seedCart(),
      requests: seedRequests(),
      favorites: {},
      lastOrder: null,
      // Monotonic request counter. Persisted in state (NOT a module-level
      // var) so it survives reloads — otherwise every page load reset it and
      // submitted orders collided on the same id (req-1043, req-1043, …),
      // which made the admin approve/select the wrong batch.
      seq: 1042
    };
  }

  // Highest req-NNNN number already present, so an upgraded state (saved
  // before `seq` existed) continues without ever re-minting an existing id.
  function maxReqSeq(requests) {
    return (requests || []).reduce(function (mx, r) {
      var m = /req-(\d+)/.exec(r && r.id || "");
      return m ? Math.max(mx, parseInt(m[1], 10)) : mx;
    }, 1042);
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return fresh();
      var s = JSON.parse(raw);
      if (!s || typeof s !== "object") return fresh();
      if (!PERSONAS[s.persona]) s.persona = "torben";
      if (!Array.isArray(s.cart)) s.cart = seedCart();
      if (!Array.isArray(s.requests)) s.requests = seedRequests();
      if (!s.favorites || typeof s.favorites !== "object") s.favorites = {};
      if (typeof s.seq !== "number") s.seq = maxReqSeq(s.requests);
      // Heal any duplicate ids left by the old reset-on-reload counter, so
      // the admin can target each batch unambiguously.
      var seen = {};
      s.requests.forEach(function (r) {
        if (!r || !r.id) return;
        if (seen[r.id]) { s.seq = maxReqSeq(s.requests) + 1; r.id = "req-" + s.seq; }
        seen[r.id] = true;
      });
      return s;
    } catch (e) {
      return fresh();
    }
  }

  var state = load();

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  function emit() {
    document.dispatchEvent(new CustomEvent("dbu:change", { detail: state }));
  }
  function commit() { persist(); emit(); }

  /* ---- Helpers ------------------------------------------------ */
  function lineQty(line) {
    return (line.dist || []).reduce(function (n, d) { return n + (d.qty || 0); }, 0);
  }
  function lineTotal(line) { return lineQty(line) * (line.unit || 0); }
  function cartCount() {
    return state.cart.reduce(function (n, l) { return n + lineQty(l); }, 0);
  }
  function cartSubtotal() {
    return state.cart.reduce(function (n, l) { return n + lineTotal(l); }, 0);
  }
  function reqTotal(req) {
    return (req.items || []).reduce(function (n, it) {
      var q = (it.dist || []).reduce(function (m, d) { return m + (d.qty || 0); }, 0);
      return n + q * (it.unit || 0);
    }, 0);
  }
  function reqQty(req) {
    return (req.items || []).reduce(function (n, it) {
      return n + (it.dist || []).reduce(function (m, d) { return m + (d.qty || 0); }, 0);
    }, 0);
  }

  /* Danish number formatting: 7980 -> "7.980" */
  function fmt(n) {
    return Math.round(n).toLocaleString("da-DK");
  }
  function kr(n) { return fmt(n) + " kr"; }

  /* ---- Public API --------------------------------------------- */
  window.DBU = {
    PERSONAS: PERSONAS,
    PERSONA_ORDER: PERSONA_ORDER,

    state: function () { return state; },
    persona: function () { return PERSONAS[state.persona]; },
    personaId: function () { return state.persona; },
    setPersona: function (id) {
      if (!PERSONAS[id]) return;
      state.persona = id;
      commit();
    },

    /* cart */
    cart: function () { return state.cart; },
    cartCount: cartCount,
    cartSubtotal: cartSubtotal,
    lineQty: lineQty,
    lineTotal: lineTotal,
    addToCart: function (line) {
      // merge identical product (same title+sup) by appending distribution
      var existing = state.cart.filter(function (l) {
        return l.title === line.title && l.sup === line.sup;
      })[0];
      if (existing) {
        line.dist.forEach(function (d) {
          var hit = existing.dist.filter(function (e) {
            return e.gender === d.gender && e.size === d.size;
          })[0];
          if (hit) hit.qty += d.qty; else existing.dist.push(Object.assign({}, d));
        });
      } else {
        line.id = line.id || ("line-" + Date.now());
        state.cart.push(line);
      }
      commit();
    },
    setLineDistQty: function (lineId, idx, qty) {
      var line = state.cart.filter(function (l) { return l.id === lineId; })[0];
      if (!line || !line.dist[idx]) return;
      line.dist[idx].qty = Math.max(0, qty);
      commit();
    },
    removeLine: function (lineId) {
      state.cart = state.cart.filter(function (l) { return l.id !== lineId; });
      commit();
    },
    clearCart: function () { state.cart = []; commit(); },
    resetCart: function () { state.cart = seedCart(); commit(); },

    /* requests / approvals */
    requests: function () { return state.requests; },
    requestsByStatus: function (status) {
      return state.requests.filter(function (r) { return r.status === status; });
    },
    reqTotal: reqTotal,
    reqQty: reqQty,
    submitCartForApproval: function (note) {
      var p = PERSONAS[state.persona];
      var n = (state.seq = maxReqSeq(state.requests) + 1);
      var id = "req-" + n;
      var ref = "DBU-2026-0" + (613 + (n - 1042));
      var req = {
        id: id, ref: ref,
        requester: { name: p.acct, role: p.role, abbr: p.abbr, dark: p.id === "torben" },
        title: cartCount() + " × " + (state.cart[0] ? state.cart[0].title : "varer"),
        items: JSON.parse(JSON.stringify(state.cart)),
        note: note || "Indsendt til godkendelse fra indkøbsvognen.",
        by: p.acct + ", " + p.role,
        createdAt: "I dag " + new Date().toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" }),
        status: "pending"
      };
      state.requests.unshift(req);
      state.lastOrder = { ref: ref, id: id, items: req.items, total: cartSubtotal() };
      state.cart = [];
      commit();
      return req;
    },
    decideRequest: function (id, status, comment) {
      var r = state.requests.filter(function (x) { return x.id === id; })[0];
      if (!r) return;
      r.status = status;
      r.decision = comment || (status === "approved" ? "Godkendt." : "Afvist.");
      r.decidedAt = "I dag " + new Date().toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" });
      commit();
    },
    lastOrder: function () { return state.lastOrder; },

    /* favorites */
    isFav: function (key) { return !!state.favorites[key]; },
    toggleFav: function (key) {
      if (state.favorites[key]) delete state.favorites[key];
      else state.favorites[key] = true;
      commit();
    },

    /* misc */
    reset: function () { state = fresh(); commit(); },
    fmt: fmt,
    kr: kr,
    on: function (fn) { document.addEventListener("dbu:change", fn); }
  };
})();
