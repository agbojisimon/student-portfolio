(function () {
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
})();