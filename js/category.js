/* Category filtering + sorting controller for DBU Klubmarked.
   Wires sidebar links (data-filter), a sort dropdown ([data-cat-sort]),
   a price dropdown ([data-cat-price]) and a live count ([data-cat-count]).
   Renders into the grid via renderCards(). */
function initCategory(cfg) {
  var gridSel = cfg.grid;
  var items = cfg.items.map(function (it) {
    var num = parseInt(String(it.price).replace(/[^\d]/g, ""), 10);
    if (isNaN(num)) num = 0;
    var club = "";
    if (it.cat && it.cat.indexOf("·") !== -1) club = it.cat.split("·").pop().trim();
    return Object.assign({}, it, {
      _price: num,
      _text: ((it.cat || "") + " " + (it.title || "") + " " + (it.meta || []).join(" ")).toLowerCase(),
      _club: club
    });
  });

  var state = { keyword: null, sort: "rel", price: null };
  var grid = document.querySelector(gridSel);
  var countEls = document.querySelectorAll("[data-cat-count]");

  var SORTS = [
    { k: "rel", label: "Relevans" },
    { k: "asc", label: "Pris: lav til høj" },
    { k: "desc", label: "Pris: høj til lav" },
    { k: "az", label: "Navn: A–Å" }
  ];
  var PRICES = [
    { k: null, label: "Alle priser" },
    { k: "u350", label: "Under 350 kr", test: function (p) { return p < 350; } },
    { k: "350-500", label: "350–500 kr", test: function (p) { return p >= 350 && p <= 500; } },
    { k: "o500", label: "Over 500 kr", test: function (p) { return p > 500; } }
  ];

  function current() {
    var list = items.slice();
    if (state.keyword) {
      var kw = state.keyword.toLowerCase();
      list = list.filter(function (it) { return it._text.indexOf(kw) !== -1; });
    }
    if (state.price) {
      var pf = PRICES.filter(function (x) { return x.k === state.price; })[0];
      if (pf && pf.test) list = list.filter(function (it) { return pf.test(it._price); });
    }
    if (state.sort === "asc") list.sort(function (a, b) { return a._price - b._price; });
    else if (state.sort === "desc") list.sort(function (a, b) { return b._price - a._price; });
    else if (state.sort === "az") list.sort(function (a, b) { return a.title.localeCompare(b.title, "da"); });
    return list;
  }

  function render() {
    var list = current();
    if (list.length === 0) {
      grid.innerHTML = '<div class="cat-empty"><i data-lucide="search-x" class="icon"></i>' +
        '<p>Ingen varer matcher dine filtre.</p>' +
        '<button class="btn btn--ghost btn--sm" data-cat-reset>Nulstil filtre</button></div>';
      if (window.lucide) window.lucide.createIcons();
      var rb = grid.querySelector("[data-cat-reset]");
      if (rb) rb.addEventListener("click", reset);
    } else {
      renderCards(gridSel, list);
    }
    countEls.forEach(function (el) {
      el.textContent = list.length + (cfg.countSuffix || " varer");
    });
  }

  function reset() {
    state.keyword = null; state.price = null; state.sort = "rel";
    document.querySelectorAll("[data-filter]").forEach(function (a) { a.classList.remove("is-active"); });
    var all = document.querySelector('[data-filter=""]');
    if (all) all.classList.add("is-active");
    syncPillLabels();
    render();
  }

  /* ---- generic pill dropdown ---- */
  function attachDD(pill, options, getLabel, onPick) {
    if (!pill) return;
    function close() { var m = pill.parentNode.querySelector(".dd__menu"); if (m) m.remove(); pill.classList.remove("is-open"); }
    pill.addEventListener("click", function (e) {
      e.stopPropagation();
      if (pill.parentNode.querySelector(".dd__menu")) { close(); return; }
      var menu = document.createElement("div");
      menu.className = "dd__menu";
      menu.innerHTML = options.map(function (o, i) {
        return '<button class="dd__opt" data-i="' + i + '">' + o.label + "</button>";
      }).join("");
      pill.parentNode.style.position = "relative";
      pill.parentNode.appendChild(menu);
      menu.querySelectorAll(".dd__opt").forEach(function (b) {
        b.addEventListener("click", function (ev) {
          ev.stopPropagation();
          onPick(options[parseInt(b.getAttribute("data-i"), 10)]);
          close();
        });
      });
      pill.classList.add("is-open");
    });
    document.addEventListener("click", close);
  }

  function syncPillLabels() {
    var sp = document.querySelector("[data-cat-sort]");
    if (sp) {
      var s = SORTS.filter(function (x) { return x.k === state.sort; })[0];
      sp.querySelector("[data-lbl]").textContent = state.sort === "rel" ? "Sortér efter" : s.label;
      sp.classList.toggle("filter-pill--active", state.sort !== "rel");
    }
    var pp = document.querySelector("[data-cat-price]");
    if (pp) {
      var p = PRICES.filter(function (x) { return x.k === state.price; })[0];
      pp.querySelector("[data-lbl]").textContent = state.price ? p.label : "Pris";
      pp.classList.toggle("filter-pill--active", !!state.price);
    }
  }

  attachDD(document.querySelector("[data-cat-sort]"), SORTS, null, function (o) { state.sort = o.k; syncPillLabels(); render(); });
  attachDD(document.querySelector("[data-cat-price]"), PRICES, null, function (o) { state.price = o.k; syncPillLabels(); render(); });

  /* ---- sidebar links ---- */
  document.querySelectorAll("[data-filter]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var kw = a.getAttribute("data-filter");
      state.keyword = kw || null;
      document.querySelectorAll("[data-filter]").forEach(function (x) { x.classList.remove("is-active"); });
      a.classList.add("is-active");
      render();
    });
  });

  syncPillLabels();
  render();
}
