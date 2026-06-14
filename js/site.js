/* Shared header + footer injection for DBU Klubmarked.
   Header is persona-aware and reactive: it reads window.DBU (see store.js),
   renders a persona switcher + live cart badge, and re-renders on dbu:change. */
(function () {
  var hasStore = !!window.DBU;
  var body = document.body;
  var d = body.dataset;

  // Landing view per persona (used when switching persona)
  var LANDING = { torben: "index.html", pia: "admin.html", simon: "vendor-scouting.html" };

  function currentFile() {
    var p = location.pathname.split("/").pop();
    return p || "index.html";
  }

  function persona() {
    if (hasStore) return window.DBU.persona();
    // fallback to data-attrs for any page without the store
    return {
      id: "torben", acct: d.acct || "Torben Træner", group: d.group || "FC Duckwise",
      abbr: d.abbr || "TT", role: "Træner", kind: "club",
      navLabel: d.navLabel || "Min klub", navHref: "club-dashboard.html"
    };
  }

  function navItems(p) {
    var file = currentFile();
    var second = p.navHref;
    var items = [
      { href: "index.html", label: "Udforsk", match: ["index.html", "category-shirts.html", "category-sportstech.html", "category-sponsor.html", "product.html", "cart.html", "checkout.html"] },
      { href: second, label: p.navLabel, match: [second, "club-dashboard.html", "admin.html", "vendor-scouting.html"] }
    ];
    return items.map(function (it) {
      var active = it.match.indexOf(file) !== -1 && (it.href === "index.html" ? it.match.indexOf(file) !== -1 : true);
      // explorer wins for shop pages; persona link wins for its own pages
      var isPersonaPage = ["club-dashboard.html", "admin.html", "vendor-scouting.html"].indexOf(file) !== -1;
      if (it.href === "index.html") active = !isPersonaPage;
      else active = isPersonaPage;
      return '<a class="' + (active ? "is-active" : "") + '" href="' + it.href + '">' + it.label + "</a>";
    }).join("");
  }

  function personaMenu(p) {
    if (!hasStore) return "";
    var rows = window.DBU.PERSONA_ORDER.map(function (id) {
      var x = window.DBU.PERSONAS[id];
      var on = id === p.id;
      return '<button class="pm__item' + (on ? " is-on" : "") + '" data-persona="' + id + '">' +
        '<span class="pm__av pm__av--' + id + '">' + x.abbr + "</span>" +
        '<span class="pm__txt"><b>' + x.acct + "</b><span>" + x.role + " · " + x.group + "</span></span>" +
        (on ? '<i data-lucide="check" class="icon pm__check"></i>' : "") +
        "</button>";
    }).join("");
    return '<div class="pm" data-persona-menu hidden>' +
      '<div class="pm__head">SKIFT ROLLE · DEMO</div>' + rows + "</div>";
  }

  function cartBadge() {
    if (!hasStore) return "";
    var n = window.DBU.cartCount();
    return n > 0 ? '<span class="hdr__count">' + n + "</span>" : "";
  }

  function headerHTML(p) {
    return '' +
    '<header class="hdr">' +
      '<a class="hdr__brand" href="index.html">' +
        '<span class="hdr__mark" style="background-image:url(\'assests/Dansk_boldspil_union_logo.png\')"></span>' +
        '<span class="hdr__wordmark"><b>DBU MARKEDSPLADS</b><span>En del af noget større</span></span>' +
      '</a>' +
      '<nav class="hdr__nav">' + navItems(p) + '</nav>' +
      '<div class="search">' +
        '<span class="search__scope">Alle <i data-lucide="chevron-down" class="icon"></i></span>' +
        '<input class="search__input" placeholder="Søg" aria-label="Søg" />' +
        '<button class="search__btn" aria-label="Søg"><i data-lucide="search" class="icon"></i></button>' +
      '</div>' +
      '<div class="hdr__actions">' +
        '<a class="hdr__icon-btn" href="#" aria-label="Notifikationer"><i data-lucide="bell" class="icon"></i><span class="hdr__dot"></span></a>' +
        '<a class="hdr__icon-btn" href="cart.html" aria-label="Indkøbsvogn"><i data-lucide="shopping-cart" class="icon"></i>' + cartBadge() + '</a>' +
        '<div class="hdr__acctwrap">' +
          '<button class="hdr__chip" data-persona-toggle aria-haspopup="true">' +
            '<span class="hdr__crest">' + p.abbr + '</span>' +
            '<span class="hdr__acct"><b>' + p.acct + '</b><span>' + p.group + '</span></span>' +
            '<i data-lucide="chevron-down" class="icon" style="width:18px;height:18px"></i>' +
          '</button>' +
          personaMenu(p) +
        '</div>' +
      '</div>' +
    '</header>';
  }

  var SI = {
    ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71C3.21 8.5 3.2 8.85 3.2 12s.01 3.5.07 4.74c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.39-.32-1.71-.17-.43-.37-.74-.69-1.06-.32-.32-.63-.52-1.06-.69-.32-.13-.81-.28-1.71-.32C15.5 4.01 15.15 4 12 4zm0 3.05A4.95 4.95 0 1 1 12 17a4.95 4.95 0 0 1 0-9.9zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3zM17.15 6.7a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.7c-.3-.04-1.3-.13-2.45-.13-2.42 0-4.08 1.48-4.08 4.2v2.23H7.5V13h2.67v8h3.33z"/></svg>',
    x:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.3 3h3.3l-7.2 8.24L21.8 21h-6.6l-5.18-6.78L4.1 21H.8l7.7-8.8L2.2 3h6.77l4.68 6.2L17.3 3zm-1.16 16h1.83L7.94 4.9H5.97L16.14 19z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23 7.5c-.26-1-.99-1.78-1.96-2.04C19.27 5 12 5 12 5s-7.27 0-9.04.46C1.99 5.72 1.26 6.5 1 7.5.55 9.28.55 12 .55 12s0 2.72.45 4.5c.26 1 .99 1.78 1.96 2.04C4.73 19 12 19 12 19s7.27 0 9.04-.46c.97-.26 1.7-1.04 1.96-2.04.45-1.78.45-4.5.45-4.5s0-2.72-.45-4.5zM9.75 15.5v-7l6 3.5-6 3.5z"/></svg>'
  };
  var socialRow = '<div class="ftr__sicons">' +
    '<a href="#" aria-label="Instagram">' + SI.ig + '</a>' +
    '<a href="#" aria-label="Facebook">' + SI.fb + '</a>' +
    '<a href="#" aria-label="X">' + SI.x + '</a>' +
    '<a href="#" aria-label="YouTube">' + SI.yt + '</a>' +
  '</div>';

  var footerHTML =
  '<footer class="ftr">' +
    '<div class="ftr__partners">' +
      '<span class="ftr__eyebrow">OFFICIEL PARTNER</span>' +
      '<div class="ftr__logos">' +
        '<span class="plogo plogo--low">hummel</span>' +
        '<span class="plogo">Salling</span>' +
        '<span class="plogo">STARK</span>' +
        '<span class="plogo">Unisport</span>' +
      '</div>' +
    '</div>' +
    '<div class="ftr__main">' +
      '<div class="ftr__brandcol">' +
        '<span class="ftr__crest" style="background-image:url(\'assests/Dansk_boldspil_union_logo.png\')"></span>' +
        '<span class="ftr__bname"><b>DANSK BOLDSPIL-UNION</b><span>EN DEL AF NOGET STØRRE</span></span>' +
      '</div>' +
      '<div class="ftr__col"><h4>Markedsplads</h4>' +
        '<a href="index.html">Udforsk</a><a href="category-shirts.html">Kategorier</a><a href="club-dashboard.html">Klubber</a><a href="vendor-scouting.html">Sælg på markedet</a></div>' +
      '<div class="ftr__col"><h4>For klubber</h4>' +
        '<a href="club-dashboard.html">Min klub</a><a href="admin.html">Godkendelser</a><a href="club-dashboard.html">Aftaler</a><a href="cart.html">Indkøbsvogn</a></div>' +
      '<div class="ftr__col ftr__col--addr"><h4>Dansk Boldspil-Union</h4>' +
        '<span>DBU Allé 1</span><span>2605 Brøndby</span>' +
        '<div class="ftr__legal"><a href="#">Privatlivspolitik</a><a href="#">Vilkår &amp; ordensreglement</a><a href="#">Cookiepolitik</a></div></div>' +
      '<div class="ftr__col ftr__social"><h4>Følg DBU Klubmarked</h4>' + socialRow +
        '<a class="ftr__contact" href="#">Kundeservice</a></div>' +
    '</div>' +
    '<div class="ftr__divider"></div>' +
    '<div class="ftr__bottom">' +
      '<p class="ftr__owner">DBU Klubmarked ejes og drives af Dansk Boldspil-Union · © 2026 DBU. Alle rettigheder forbeholdes.</p>' +
    '</div>' +
  '</footer>';

  function wireHeader(root) {
    var toggle = root.querySelector("[data-persona-toggle]");
    var menu = root.querySelector("[data-persona-menu]");
    if (toggle && menu) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.hidden = !menu.hidden;
        toggle.classList.toggle("is-open", !menu.hidden);
      });
      menu.querySelectorAll("[data-persona]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-persona");
          window.DBU.setPersona(id);
          var dest = LANDING[id] || "index.html";
          if (currentFile() !== dest) location.href = dest;
        });
      });
      document.addEventListener("click", function () {
        if (!menu.hidden) { menu.hidden = true; toggle.classList.remove("is-open"); }
      });
    }
  }

  function renderHeader() {
    var p = persona();
    var nodes = document.querySelectorAll("[data-include='header'], header.hdr");
    nodes.forEach(function (el) {
      var wrap = document.createElement("div");
      wrap.innerHTML = headerHTML(p);
      var newEl = wrap.firstChild;
      el.replaceWith(newEl);
      wireHeader(newEl);
    });
    document.querySelectorAll("[data-include='footer']").forEach(function (el) { el.outerHTML = footerHTML; });
    // Simplify the category strip's "Alle kategorier" chip -> menu icon + "Alle"
    document.querySelectorAll(".strip__pill").forEach(function (el) {
      el.innerHTML = '<i data-lucide="menu" class="icon"></i> Alle';
    });
    if (window.lucide) window.lucide.createIcons();
  }

  renderHeader();

  // Re-render header on any state change (cart badge, persona)
  if (hasStore) {
    window.DBU.on(function () { renderHeader(); });
  }

  /* ---- Shared toast ------------------------------------------- */
  window.dbuToast = function (msg, kind, href) {
    var el = document.querySelector(".dbu-toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "dbu-toast";
      document.body.appendChild(el);
    }
    el.className = "dbu-toast" + (kind === "ok" ? " dbu-toast--ok" : "");
    var icon = kind === "ok" ? "circle-check" : (kind === "alert" ? "alert-circle" : "info");
    el.innerHTML = '<i data-lucide="' + icon + '" class="icon"></i><span>' + msg + "</span>" +
      (href ? ' <a href="' + href + '" style="color:var(--yellow);margin-left:6px">Se kurv →</a>' : "");
    if (window.lucide) window.lucide.createIcons();
    requestAnimationFrame(function () { el.classList.add("is-on"); });
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove("is-on"); }, href ? 3600 : 2400);
  };
})();
