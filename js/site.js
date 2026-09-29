// ---------------------------------------------------------------- helpers
// Shared by the features below.

// Run fn once now, then at most once per animation frame on scroll and resize.
function onScroll(fn) {
  var ticking = false;
  function request() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; fn(); });
  }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  fn();
}

// True when the page is scrolled to (within 2px of) the very bottom.
function atPageBottom() {
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
}

// Give a heading an id derived from its text (if it has none) and return it.
function ensureId(heading) {
  if (heading.id) return heading.id;
  var base = heading.textContent.trim().toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-') || 'section';
  var id = base, n = 2;
  while (document.getElementById(id)) id = base + '-' + n++;
  heading.id = id;
  return id;
}

// Clipboard support (a secure context is required).
var canCopy = !!(navigator.clipboard && window.isSecureContext);

// Copy text, then briefly mark el as copied: el gets the is-copied class and,
// if a label is given, shows it in place of its own text.
function copyWithFeedback(text, el, label) {
  return navigator.clipboard.writeText(text).then(function () {
    if (!el.hasAttribute('data-label')) el.setAttribute('data-label', el.textContent);
    if (label) el.textContent = label;
    el.classList.add('is-copied');
    clearTimeout(el.copiedTimer);
    el.copiedTimer = setTimeout(function () {
      if (label) el.textContent = el.getAttribute('data-label');
      el.classList.remove('is-copied');
    }, 1600);
  });
}

// ---------------------------------------------------------------- navigation

// Mobile menu and light/dark theme toggle.
(function () {
  var header = document.querySelector('[data-header]');
  var menuButton = document.querySelector('[data-menu-toggle]');
  if (header && menuButton) {
    menuButton.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  var themeButton = document.querySelector('[data-theme-toggle]');
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
})();

// Dropdown groups in the main navigation ("More").
(function () {
  var groups = document.querySelectorAll('[data-nav-group]');
  function closeAll(except) {
    groups.forEach(function (g) {
      if (g === except) return;
      g.classList.remove('is-open');
      var b = g.querySelector('[data-nav-group-toggle]');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  groups.forEach(function (group) {
    var button = group.querySelector('[data-nav-group-toggle]');
    if (!button) return;
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !group.classList.contains('is-open');
      closeAll(group);
      group.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    groups.forEach(function (g) { if (!g.contains(e.target)) closeAll(); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });
})();

// Homepage: reveal the header name once the large hero name has scrolled
// under the sticky header, so the name never appears twice on screen.
(function () {
  var title = document.querySelector('.site-title--hero');
  var hero = document.querySelector('.hero__title');
  if (!title) return;
  if (!hero) { title.classList.add('is-shown'); return; }
  var header = document.querySelector('[data-header]');
  onScroll(function () {
    var offset = header ? header.getBoundingClientRect().bottom : 0;
    title.classList.toggle('is-shown', hero.getBoundingClientRect().bottom < offset);
  });
})();

// "Back to top" button, shown once the reader is well down a long page.
(function () {
  var button = document.querySelector('[data-back-to-top]');
  if (!button) return;
  button.addEventListener('click', function () {
    var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  });
  button.hidden = false;
  onScroll(function () {
    button.classList.toggle('is-shown', window.scrollY > window.innerHeight * 1.5);
  });
})();

// ---------------------------------------------------------------- posts

// Table of contents for long posts: built from the post's section headings
// (h2, or h1 where a post uses those as sections) when there are at least 3.
// The section being read (the last heading that has scrolled past the sticky
// header) is highlighted.
(function () {
  var nav = document.querySelector('[data-toc]');
  var source = document.querySelector('[data-toc-source]');
  if (!nav || !source) return;
  var headings = source.querySelectorAll('h2');
  if (headings.length < 3) headings = source.querySelectorAll('h1');
  if (headings.length < 3) return;
  var list = nav.querySelector('ol');
  headings.forEach(function (h) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + ensureId(h);
    a.textContent = h.textContent.trim();
    a.title = a.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });
  if (window.matchMedia('(max-width: 720px)').matches) {
    nav.querySelector('details').removeAttribute('open');
  }
  nav.hidden = false;

  var links = list.querySelectorAll('a');
  var header = document.querySelector('[data-header]');
  onScroll(function () {
    var line = (header ? header.getBoundingClientRect().bottom : 0) + 24;
    var current = -1;
    headings.forEach(function (h, i) { if (h.getBoundingClientRect().top <= line) current = i; });
    // At the very bottom, the last section is the one being read even if
    // its heading cannot scroll up as far as the header.
    if (atPageBottom()) current = headings.length - 1;
    links.forEach(function (a, i) {
      a.classList.toggle('is-active', i === current);
      if (i === current) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  });
})();

// Reading progress bar on posts.
(function () {
  var bar = document.querySelector('[data-reading-progress]');
  var body = document.querySelector('[data-toc-source]');
  if (!bar || !body) return;
  bar.hidden = false;
  onScroll(function () {
    var rect = body.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    var progress = total > 0 ? -rect.top / total : (rect.top < 0 ? 1 : 0);
    bar.style.setProperty('--progress', Math.min(1, Math.max(0, progress)).toFixed(4));
  });
})();

// "Copy" button on code blocks.
(function () {
  if (!canCopy) return;
  document.querySelectorAll('.prose figure.highlight, .prose div.highlight').forEach(function (block) {
    var pre = block.querySelector('pre');
    if (!pre) return;
    var wrap = document.createElement('div');
    wrap.className = 'code-block';
    block.parentNode.insertBefore(wrap, block);
    wrap.appendChild(block);
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'pill code-copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code');
    button.addEventListener('click', function () {
      copyWithFeedback(pre.innerText.replace(/\n+$/, ''), button, 'Copied!');
    });
    wrap.appendChild(button);
  });
})();

// Image lightbox: select a figure or photo to view it full-screen; Esc, a
// click anywhere or the close button closes it.
(function () {
  if (typeof HTMLDialogElement !== 'function') return;
  var images = Array.prototype.filter.call(document.querySelectorAll('.prose img'), function (img) {
    return !img.closest('a, .about-photo');
  });
  if (!images.length) return;
  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML = '<button class="lightbox__close" type="button" aria-label="Close">&times;</button>' +
    '<figure class="lightbox__figure"><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(dialog);
  var big = dialog.querySelector('img');
  var caption = dialog.querySelector('figcaption');
  images.forEach(function (img) {
    img.classList.add('is-zoomable');
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge image' + (img.alt ? ': ' + img.alt : ''));
    function open() {
      var fig = img.closest('figure');
      var fc = fig && fig.querySelector('figcaption');
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      caption.textContent = fc ? fc.textContent.trim() : '';
      caption.hidden = !caption.textContent;
      dialog.showModal();
    }
    img.addEventListener('click', open);
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
  dialog.addEventListener('click', function () { dialog.close(); });
})();

// Teaching syllabi: each section folds under its heading. The headings stay
// visible (so the table of contents still works), and links to a section
// open it.
(function () {
  var root = document.querySelector('[data-collapsible]');
  if (!root) return;
  var headings = root.querySelectorAll(':scope > h2');
  if (headings.length < 2) return;
  var sections = [];
  headings.forEach(function (h) {
    var details = document.createElement('details');
    details.className = 'collapsible';
    var summary = document.createElement('summary');
    h.parentNode.insertBefore(details, h);
    summary.appendChild(h);
    details.appendChild(summary);
    var body = document.createElement('div');
    body.className = 'collapsible__body';
    while (details.nextSibling && !(details.nextSibling.nodeType === 1 && details.nextSibling.tagName === 'H2')) {
      body.appendChild(details.nextSibling);
    }
    details.appendChild(body);
    sections.push(details);
  });

  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'pill collapsible-toggle';
  function allOpen() { return sections.every(function (d) { return d.open; }); }
  function label() { toggle.textContent = allOpen() ? 'Collapse all' : 'Expand all'; }
  toggle.addEventListener('click', function () {
    var open = !allOpen();
    sections.forEach(function (d) { d.open = open; });
    label();
  });
  sections.forEach(function (d) { d.addEventListener('toggle', label); });
  root.insertBefore(toggle, sections[0]);
  label();

  function openTarget(id) {
    var el = id && document.getElementById(id);
    var d = el && el.closest('details.collapsible');
    if (d) d.open = true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (a) openTarget(decodeURIComponent(a.getAttribute('href').slice(1)));
  });
  openTarget(decodeURIComponent(location.hash.slice(1)));
  window.addEventListener('beforeprint', function () { sections.forEach(function (d) { d.open = true; }); });
})();

// ---------------------------------------------------------------- lists

// Search and filter chips for lists (Blog, Publications, Books, Papers).
// Items carry data-filter-item and data-filter-tags; headings that label a
// run of items (data-filter-divider) and lists (data-filter-group) hide when
// nothing in them matches. The query and chip are kept in the URL
// (?q=…&tag=…) so a view can be shared.
(function () {
  var bar = document.querySelector('[data-filter-bar]');
  if (!bar) return;
  var scope = bar.closest('.prose') || document;
  var search = bar.querySelector('[data-filter-search]');
  var chipBox = bar.querySelector('[data-filter-chips]');
  var status = bar.querySelector('[data-filter-status]');
  var noun = bar.getAttribute('data-filter-noun') || 'items';

  // Lower case, with accents removed, so "poreč" matches "Porec".
  function fold(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

  var items = Array.prototype.slice.call(scope.querySelectorAll('[data-filter-item]'));
  if (!items.length) return;
  var text = items.map(function (el) { return fold(el.textContent + ' ' + (el.getAttribute('data-filter-text') || '')); });
  var tags = items.map(function (el) { return (el.getAttribute('data-filter-tags') || '').split(/\s+/); });
  var chips = chipBox.querySelectorAll('[data-filter-chip]');
  var dividers = scope.querySelectorAll('[data-filter-divider]');
  var groups = scope.querySelectorAll('[data-filter-group]');
  var active = '';

  function visibleItemIn(el) {
    return el.matches('[data-filter-item]:not(.is-filtered-out)') ||
      !!el.querySelector('[data-filter-item]:not(.is-filtered-out)');
  }

  function apply() {
    var query = search.value.trim();
    var terms = fold(query).split(/\s+/).filter(Boolean);
    var shown = 0;
    items.forEach(function (el, i) {
      var match = (!active || tags[i].indexOf(active) !== -1) &&
        terms.every(function (t) { return text[i].indexOf(t) !== -1; });
      el.classList.toggle('is-filtered-out', !match);
      if (match) shown++;
    });
    groups.forEach(function (g) { g.classList.toggle('is-filtered-out', !visibleItemIn(g)); });
    dividers.forEach(function (d) {
      var any = false;
      for (var n = d.nextElementSibling; n && !n.hasAttribute('data-filter-divider'); n = n.nextElementSibling) {
        if (visibleItemIn(n)) { any = true; break; }
      }
      d.classList.toggle('is-filtered-out', !any);
    });
    status.textContent = !(terms.length || active) ? '' :
      shown ? 'Showing ' + shown + ' of ' + items.length + ' ' + noun + '.' :
      'No ' + noun + ' match your search.';

    var params = new URLSearchParams(location.search);
    if (query) params.set('q', query); else params.delete('q');
    if (active) params.set('tag', active); else params.delete('tag');
    var qs = params.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
  }

  function setChip(value) {
    active = value;
    chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-filter-chip') === value)); });
  }

  chipBox.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-filter-chip]');
    if (!chip) return;
    setChip(chip.getAttribute('data-filter-chip'));
    apply();
  });
  search.addEventListener('input', apply);

  var params = new URLSearchParams(location.search);
  var tag = params.get('tag') || '';
  var known = Array.prototype.some.call(chips, function (c) { return c.getAttribute('data-filter-chip') === tag; });
  setChip(known ? tag : '');
  search.value = params.get('q') || '';
  bar.hidden = false;
  if (active || search.value) apply();
})();

// "BibTeX" buttons on publications: copy the citation to the clipboard, or
// reveal it for manual copying where copying is unavailable.
(function () {
  document.querySelectorAll('[data-copy-bibtex]').forEach(function (button) {
    var pre = button.closest('.pub').querySelector('.pub__bibtex');
    if (!pre) return;
    button.addEventListener('click', function () {
      if (!canCopy) { pre.hidden = !pre.hidden; return; }
      copyWithFeedback(pre.textContent, button, 'Copied!').catch(function () { pre.hidden = !pre.hidden; });
    });
  });
})();

// Footer "Copy" button beside the email address (shown only where copying
// is available; the address itself stays a mailto link).
(function () {
  var button = document.querySelector('[data-copy-email]');
  if (!button || !canCopy) return;
  button.addEventListener('click', function () {
    copyWithFeedback(button.getAttribute('data-copy-email'), button, 'Copied!');
  });
  button.hidden = false;
})();

// ---------------------------------------------------------------- motion
// Both effects below are opt-in: the head script only adds .js-reveal when
// motion is welcome and IntersectionObserver exists, so nothing is hidden
// otherwise.

// Gentle fade-in as sections scroll into view.
(function () {
  if (!document.documentElement.classList.contains('js-reveal')) return;
  var items = document.querySelectorAll('.section, .affiliations, .prose .role, .pub, .post-list__item');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  items.forEach(function (el) { el.classList.add('reveal'); observer.observe(el); });
  // Safety net: never leave anything hidden (e.g. when printing).
  window.addEventListener('beforeprint', function () {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  });
})();

// About page timelines: the rule fills with the accent colour, and each dot
// is filled, as the reader scrolls past it.
(function () {
  if (!document.documentElement.classList.contains('js-reveal')) return;
  var timelines = document.querySelectorAll('.prose .timeline');
  if (!timelines.length) return;
  onScroll(function () {
    // At the bottom of the page, everything has been passed.
    var mark = atPageBottom() ? Infinity : window.innerHeight * 0.6;
    timelines.forEach(function (tl) {
      var rect = tl.getBoundingClientRect();
      var progress = Math.min(1, Math.max(0, (mark - rect.top) / rect.height));
      tl.style.setProperty('--tl-progress', progress.toFixed(4));
      tl.querySelectorAll('.role').forEach(function (role) {
        role.classList.toggle('is-passed', role.getBoundingClientRect().top + 8 < mark);
      });
    });
  });
})();

// ---------------------------------------------------------------- page load

// Re-apply #section links once the page (and its lazy images) have loaded,
// so links such as /workshops/#europe land on the right heading.
window.addEventListener('load', function () {
  if (!location.hash) return;
  var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
});
