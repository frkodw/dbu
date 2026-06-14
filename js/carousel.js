/* Dynamic promo carousel — auto-rotating slides with dots + arrows.
   Markup contract:
   <div class="carousel" data-carousel data-interval="6000">
     <div class="carousel__slide is-active">…</div> …
     <button class="carousel__arrow carousel__arrow--prev">…</button>
     <button class="carousel__arrow carousel__arrow--next">…</button>
     <div class="carousel__dots"><button class="carousel__dot is-active"></button> …</div>
   </div>
*/
(function () {
  function initCarousel(root) {
    const slides = Array.from(root.querySelectorAll(".carousel__slide"));
    const dots = Array.from(root.querySelectorAll(".carousel__dot"));
    if (slides.length < 2) return;

    const interval = Number(root.dataset.interval) || 6000;
    let index = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
    let timer = null;

    function show(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === index));
      dots.forEach((d, k) => d.classList.toggle("is-active", k === index));
    }
    function next() { show(index + 1); }
    function prev() { show(index - 1); }
    function start() { stop(); timer = window.setInterval(next, interval); }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

    const nextBtn = root.querySelector(".carousel__arrow--next");
    const prevBtn = root.querySelector(".carousel__arrow--prev");
    if (nextBtn) nextBtn.addEventListener("click", () => { next(); start(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); start(); });
    dots.forEach((d, k) => d.addEventListener("click", () => { show(k); start(); }));

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

    show(index);
    start();
  }

  document.querySelectorAll("[data-carousel]").forEach(initCarousel);
})();
