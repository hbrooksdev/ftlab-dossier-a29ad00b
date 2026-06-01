// FTLAB Dossier — interactions
(function () {
  // theme
  var saved = localStorage.getItem('ftlab-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ftlab-theme', next);
    var b = document.getElementById('themeBtn'); if (b) b.textContent = next === 'dark' ? '☀ Light' : '☾ Dark';
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('#themeBtn')) toggleTheme();
    if (e.target.closest('#menuBtn')) { var s = document.querySelector('.sidebar'); if (s) s.classList.toggle('open'); }
    var a = e.target.closest('.nav a, .toc a'); if (a && window.innerWidth < 1000) { var s = document.querySelector('.sidebar'); if (s) s.classList.remove('open'); }
  });
  // set theme button label on load
  document.addEventListener('DOMContentLoaded', function(){
    var b = document.getElementById('themeBtn');
    if (b) b.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀ Light' : '☾ Dark';
  });

  // progress bar
  var bar = document.getElementById('progress');
  function onScroll() {
    if (bar) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    }
    spy();
  }
  // scrollspy
  var heads = [].slice.call(document.querySelectorAll('.article h2[id], .article h3[id]'));
  var links = {};
  [].slice.call(document.querySelectorAll('.toc a')).forEach(function (l) {
    var id = l.getAttribute('href'); if (id && id[0] === '#') links[id.slice(1)] = l;
  });
  function spy() {
    if (!heads.length) return;
    var top = window.scrollY + 90, cur = heads[0];
    for (var i = 0; i < heads.length; i++) { if (heads[i].offsetTop <= top) cur = heads[i]; }
    Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === cur.id); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
