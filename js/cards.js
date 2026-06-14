/* Product card renderer — shared across listing pages */
function productCard(p) {
  var favKey = "product:" + p.title;
  var faved = window.DBU && window.DBU.isFav(favKey);
  const fav = p.fav === false ? "" : '<button class="card__fav' + (faved ? " is-faved" : "") + '" data-fav="' + favKey + '" aria-label="Gem"><i data-lucide="heart" class="icon"></i></button>';
  const statusKind = p.statusKind ? `badge--${p.statusKind}` : "badge--success";
  const status = p.status ? `<span class="card__status badge ${statusKind}">${p.status}</span>` : "";
  const meta = (p.meta || []).map((m) => `<span class="chip">${m}</span>`).join("");
  const fit = p.fit ? ' style="object-fit:contain"' : (p.cover ? ' style="object-fit:cover"' : "");
  // Contain-fit products (equipment, tech, balls) sit on a plain card background — the accent tint is for apparel.
  const mediaCls = (p.fit || p.cover) ? "card__media card__media--plain" : "card__media";
  // Non-deal product cards open the product detail page by default; deal/partner cards opt in via explicit href.
  const detail = p.href || (p.deal ? "#" : "product.html");
  const btn = p.deal
    ? `<a class="btn btn--sm" href="${detail}">Se aftale</a>`
    : `<a class="btn btn--sm" href="${detail}"><i data-lucide="shopping-cart" class="icon"></i> Køb</a>`;
  return `
  <article class="card">
    <div class="${mediaCls}">
      <img src="${p.img}" alt="${p.title}"${fit} />
      ${status}${fav}
    </div>
    <div class="card__body">
      <div class="card__cat"><i data-lucide="shield" class="icon"></i><span>${p.cat}</span></div>
      <h3 class="card__title"><a href="${detail}">${p.title}</a></h3>
      <div class="card__meta">${meta}</div>
      <div class="card__divider"></div>
      <div class="card__footer">
        <div>
          <div class="card__price-label">${p.priceLabel || "Pris inkl. gebyr"}</div>
          <div class="card__price">${p.price}</div>
        </div>
        ${btn}
      </div>
    </div>
  </article>`;
}

function renderCards(selector, items) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = items.map(productCard).join("");
  el.querySelectorAll("[data-fav]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      if (!window.DBU) return;
      var key = btn.getAttribute("data-fav");
      window.DBU.toggleFav(key);
      btn.classList.toggle("is-faved", window.DBU.isFav(key));
    });
  });
  if (window.lucide) window.lucide.createIcons();
}
