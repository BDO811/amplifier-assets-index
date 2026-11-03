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

  // Preload every slide into the browser cache up front so clicking next/prev
  // swaps an already-decoded image instead of firing a fresh network request
  // and waiting on it. This is what made click-through feel slow.
  var urls = [];
  for (var n = 1; n <= total; n++) urls.push(prefix + pad(n) + ".jpg");
  var preloaded = new Array(total + 1).fill(false);
  urls.forEach(function (url, idx) {
    var n = idx + 1;
    var pre = new Image();
    pre.onload = function () { preloaded[n] = true; };
    pre.src = url;
  });

  function show(n) {
    current = Math.max(1, Math.min(total, n));
    var url = prefix + pad(current) + ".jpg";
    if (img.src.indexOf(url) === -1) {
      img.src = url;
    }
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
