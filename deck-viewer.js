(function () {
  var total = window.DECK_TOTAL_SLIDES;
  var prefix = window.DECK_SLIDE_PREFIX || "slides/slide-";
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  var current = 1;
  var img = document.getElementById("slide-img");
  var counter = document.getElementById("slide-counter");
  var prevBtn = document.getElementById("prev-btn");
  var nextBtn = document.getElementById("next-btn");
  var stage = document.getElementById("stage");

  function show(n) {
    current = Math.max(1, Math.min(total, n));
    img.src = prefix + pad(current) + ".jpg";
    img.alt = "Slide " + current + " of " + total;
    counter.textContent = current + " / " + total;
    prevBtn.classList.toggle("is-disabled", current === 1);
    nextBtn.classList.toggle("is-disabled", current === total);
  }

  prevBtn.addEventListener("click", function () { show(current - 1); });
  nextBtn.addEventListener("click", function () { show(current + 1); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  var touchStartX = null;
  stage.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 40) show(current - 1);
    else if (dx < -40) show(current + 1);
    touchStartX = null;
  }, { passive: true });

  show(1);
})();
