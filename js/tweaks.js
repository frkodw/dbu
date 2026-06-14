/* Tweaks panel for DBU Klubmarked (vanilla, host-protocol aware).
   Knobs: active persona, primary brand color, cart state, reset demo.
   Persisted in localStorage so it survives across pages + reloads. */
(function () {
  var TKEY = "dbu_tweaks_v1";
  var COLORS = {
    red:   { name: "DBU Rød",    primary: "#D60A2E", hover: "#B4071F", dark: "#8E0014", accent: "#FBE7EB", accentFg: "#8E0014" },
    navy:  { name: "Midnat",     primary: "#1F3A5F", hover: "#162B47", dark: "#0F1F33", accent: "#E7ECF3", accentFg: "#1F3A5F" },
    green: { name: "Banegrøn",   primary: "#2F7D4F", hover: "#25653F", dark: "#1A4A2D", accent: "#E6F2EA", accentFg: "#1E5B34" }
  };

  function readT() {
    try { return Object.assign({ color: "red" }, JSON.parse(localStorage.getItem(TKEY) || "{}")); }
    catch (e) { return { color: "red" }; }
  }
  function writeT(t) { try { localStorage.setItem(TKEY, JSON.stringify(t)); } catch (e) {} }
  var tw = readT();

  function applyColor(key) {
    var c = COLORS[key] || COLORS.red;
    var r = document.documentElement.style;
    r.setProperty("--primary", c.primary);
    r.setProperty("--primary-hover", c.hover);
    r.setProperty("--primary-dark", c.dark);
    r.setProperty("--accent", c.accent);
    r.setProperty("--accent-foreground", c.accentFg);
  }
  applyColor(tw.color); // apply ASAP on load

  function persistKeys(edits) {
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: edits }, "*"); } catch (e) {}
  }

  /* ---- panel DOM ---- */
  var panel;
  function build() {
    if (panel) return panel;
    panel = document.createElement("div");
    panel.className = "tw";
    panel.hidden = true;
    panel.innerHTML =
      '<div class="tw__head" data-drag><b>Tweaks</b><button class="tw__close" aria-label="Luk"><i data-lucide="x" class="icon"></i></button></div>' +
      '<div class="tw__body">' +
        '<div class="tw__sec"><span class="tw__lab">Rolle / persona</span>' +
          '<div class="tw__seg" data-persona-seg>' +
            '<button data-p="torben">Torben</button><button data-p="pia">Pia</button><button data-p="simon">Simon</button>' +
          '</div><p class="tw__hint" data-persona-hint></p></div>' +
        '<div class="tw__sec"><span class="tw__lab">Primær farve</span>' +
          '<div class="tw__sw" data-color-sw>' +
            '<button data-c="red" style="background:#D60A2E" title="DBU Rød"></button>' +
            '<button data-c="navy" style="background:#1F3A5F" title="Midnat"></button>' +
            '<button data-c="green" style="background:#2F7D4F" title="Banegrøn"></button>' +
          '</div></div>' +
        '<div class="tw__sec"><span class="tw__lab">Indkøbskurv</span>' +
          '<div class="tw__seg" data-cart-seg>' +
            '<button data-cart="full">Fuld (demo)</button><button data-cart="empty">Tom</button>' +
          '</div></div>' +
        '<div class="tw__sec">' +
          '<button class="tw__reset" data-reset><i data-lucide="rotate-ccw" class="icon"></i> Nulstil demo-data</button>' +
          '<p class="tw__hint">Genskaber kurv, godkendelser og persona til udgangspunktet.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(panel);
    if (window.lucide) window.lucide.createIcons();
    wire();
    sync();
    return panel;
  }

  function sync() {
    if (!panel || !window.DBU) return;
    var pid = window.DBU.personaId();
    panel.querySelectorAll("[data-persona-seg] button").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-p") === pid);
    });
    var hint = panel.querySelector("[data-persona-hint]");
    var p = window.DBU.persona();
    if (hint) hint.textContent = p.acct + " · " + p.role;
    panel.querySelectorAll("[data-color-sw] button").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-c") === tw.color);
    });
    var hasCart = window.DBU.cartCount() > 0;
    panel.querySelectorAll("[data-cart-seg] button").forEach(function (b) {
      b.classList.toggle("is-on", (b.getAttribute("data-cart") === "full") === hasCart);
    });
  }

  function wire() {
    panel.querySelector(".tw__close").addEventListener("click", function () {
      hide();
      try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (e) {}
    });
    panel.querySelectorAll("[data-persona-seg] button").forEach(function (b) {
      b.addEventListener("click", function () { window.DBU.setPersona(b.getAttribute("data-p")); sync(); });
    });
    panel.querySelectorAll("[data-color-sw] button").forEach(function (b) {
      b.addEventListener("click", function () {
        tw.color = b.getAttribute("data-c"); writeT(tw); applyColor(tw.color); persistKeys({ color: tw.color }); sync();
      });
    });
    panel.querySelectorAll("[data-cart-seg] button").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("data-cart") === "full") window.DBU.resetCart(); else window.DBU.clearCart();
        sync();
      });
    });
    panel.querySelector("[data-reset]").addEventListener("click", function () {
      window.DBU.reset(); sync();
      window.dbuToast && window.dbuToast("Demo nulstillet", "ok");
    });

    // light drag
    var head = panel.querySelector("[data-drag]");
    var dragging = false, sx, sy, ox, oy;
    head.addEventListener("mousedown", function (e) {
      if (e.target.closest(".tw__close")) return;
      dragging = true; var r = panel.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top;
      panel.style.right = "auto"; panel.style.left = ox + "px"; panel.style.top = oy + "px";
      e.preventDefault();
    });
    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      panel.style.left = (ox + e.clientX - sx) + "px";
      panel.style.top = Math.max(8, oy + e.clientY - sy) + "px";
    });
    document.addEventListener("mouseup", function () { dragging = false; });
  }

  function show() { build().hidden = false; sync(); }
  function hide() { if (panel) panel.hidden = true; }

  // keep panel in sync with state changes
  if (window.DBU) window.DBU.on(sync);

  /* ---- host protocol: listener BEFORE availability ---- */
  window.addEventListener("message", function (e) {
    var t = e.data && e.data.type;
    if (t === "__activate_edit_mode") show();
    else if (t === "__deactivate_edit_mode") hide();
  });
  try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (e) {}
})();
