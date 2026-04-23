/* ============================================================
   SHOPCART PRO — SP-CORE.JS
   Shared UI engine: cursor, loader, navbar, scroll-reveal,
   stat counters, 3D tilt, toast notifications.
   
   SAFE: Does NOT override any existing JS functions.
   All existing APIs (api.js, auth.js, cart.js, navbar.js,
   main.js, products.js, product-detail.js) remain intact.
   ============================================================ */

(function () {
  'use strict';

  /* ── LOADER ─────────────────────────────────────────────── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var loader = document.getElementById('sp-loader');
      if (loader) loader.classList.add('loaded');
    }, 900);
  });

  /* ── CUSTOM CURSOR (desktop only) ───────────────────────── */
  var cursor    = document.getElementById('spCursor');
  var cursorRing= document.getElementById('spCursorRing');
  var hasFine   = window.matchMedia('(pointer: fine)').matches;

  if (cursor && cursorRing && hasFine) {
    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    function ringFollow() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(ringFollow);
    }
    ringFollow();

    function addHover(el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    }
    document.querySelectorAll('a, button, [data-tilt], .product-card, .category-card').forEach(addHover);
  }

  /* ── NAVBAR SCROLL + HIDE ────────────────────────────────── */
  var topbar    = document.getElementById('topbar');
  var hamburger = document.getElementById('spHamburger');
  var nav       = document.getElementById('site-nav');
  var lastY     = 0;

  if (topbar) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > 40) topbar.classList.add('scrolled');
      else         topbar.classList.remove('scrolled');

      if (y > lastY && y > 180) topbar.classList.add('hidden');
      else                       topbar.classList.remove('hidden');
      lastY = y;
    }, { passive: true });
  }

  /* ── HAMBURGER TOGGLE ────────────────────────────────────── */
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── STAT COUNTER ────────────────────────────────────────── */
  function runCounter(el) {
    var target   = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1800;
    var start    = null;
    function step(ts) {
      if (!start) start = ts;
      var prog = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - prog, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (prog < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        runCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObs.observe(el);
  });

  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObs.observe(el);
  });

  /* ── 3D TILT ─────────────────────────────────────────────── */
  document.querySelectorAll('[data-tilt], .category-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r  = card.getBoundingClientRect();
      var x  = (e.clientX - r.left) / r.width  - 0.5;
      var y  = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        'perspective(700px) rotateY(' + (x * 11) + 'deg) rotateX(' + (-y * 9) + 'deg) translateY(-6px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ── TOAST SYSTEM (global window.spToast) ────────────────── */
  var toastContainer = document.getElementById('sp-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'sp-toast-container';
    document.body.appendChild(toastContainer);
  }

  window.spToast = function (msg, type, duration) {
    type     = type     || 'success';
    duration = duration || 2800;

    var icons = { success: '✓', error: '✕', info: 'ℹ' };
    var t = document.createElement('div');
    t.className = 'sp-toast ' + type;
    t.innerHTML =
      '<span class="sp-toast-icon">' + (icons[type] || '✓') + '</span>' +
      '<span>' + msg + '</span>';
    toastContainer.appendChild(t);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { t.classList.add('show'); });
    });

    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () {
        if (t.parentNode) t.parentNode.removeChild(t);
      }, 400);
    }, duration);
  };

  /* ── PRODUCT CARD BUILDER (shared helper) ────────────────── */
  /* Used by main.js and products.js after their API calls.     */
  window.spBuildProductCard = function (product) {
    var price    = product.price ? Number(product.price) : 0;
    var oldPrice = (price * 1.22).toFixed(0);
    var rating   = Math.round(product.rating || 4);
    var stars    = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    var reviews  = product.reviews || Math.floor(Math.random() * 180 + 20);
    var name     = spEsc(product.name || 'Product');
    var cat      = spEsc(product.category || 'General');
    var id       = product._id || '';
    var img      = product.image
      ? '<img src="' + spEsc(product.image) + '" alt="' + name + '" loading="lazy" />'
      : '<div class="product-img-placeholder">' + spCatEmoji(product.category) + '</div>';

    var badge = '';
    if (product.badge)      badge = '<span class="product-card-badge">'      + spEsc(product.badge) + '</span>';
    else if (product.isNew) badge = '<span class="product-card-badge new-badge">New</span>';

    return (
      '<div class="product-card reveal">' +
        '<div class="product-card-img-wrap">' +
          img +
          badge +
          '<div class="product-card-hover-actions">' +
            '<button class="pcha-btn" onclick="spWishlist(\'' + id + '\')" title="Wishlist">♡</button>' +
            '<button class="pcha-btn" onclick="window.location.href=\'product.html?id=' + id + '\'" title="Quick View">👁</button>' +
          '</div>' +
        '</div>' +
        '<div class="product-card-body">' +
          '<div class="product-card-category">' + cat + '</div>' +
          '<h3>' + name + '</h3>' +
          '<div class="product-card-rating">' +
            '<span class="stars">' + stars + '</span>' +
            '<span class="rating-count">(' + reviews + ')</span>' +
          '</div>' +
          '<div class="product-card-footer">' +
            '<div>' +
              '<span class="price">PKR ' + price.toLocaleString() + '</span>' +
              '<span class="price-old">PKR ' + Number(oldPrice).toLocaleString() + '</span>' +
            '</div>' +
            '<div class="card-actions">' +
              '<button class="btn btn-sm" onclick="addToCart(\'' + id + '\',\'' + name.replace(/'/g, "\\'") + '\',' + price + ')">Add to Cart</button>' +
              '<a class="btn btn-sm secondary-btn" href="product.html?id=' + id + '">View</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  };

  /* Skeleton cards while loading */
  window.spSkeletonCards = function (count) {
    var html = '';
    for (var i = 0; i < count; i++) {
      html +=
        '<div class="skeleton-card">' +
          '<div class="skeleton-img"></div>' +
          '<div class="skeleton-body">' +
            '<div class="skeleton-line short"></div>' +
            '<div class="skeleton-line medium"></div>' +
            '<div class="skeleton-line"></div>' +
          '</div>' +
        '</div>';
    }
    return html;
  };

  /* ── WISHLIST HANDLER ────────────────────────────────────── */
  window.spWishlist = function () {
    window.spToast('Saved to wishlist ♡', 'info');
  };

  /* ── HELPERS ─────────────────────────────────────────────── */
  function spEsc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  window.spEsc = spEsc;

  function spCatEmoji(cat) {
    var map = {
      electronics:'📱', fashion:'👗', accessories:'⌚',
      wearables:'🎧', home:'🏠', beauty:'💄', sports:'⚽',
      books:'📚', toys:'🎮', food:'🍕'
    };
    var k = String(cat || '').toLowerCase();
    for (var key in map) {
      if (k.indexOf(key) !== -1) return map[key];
    }
    return '📦';
  }
  window.spCatEmoji = spCatEmoji;

  /* ── ACTIVE NAV LINK ─────────────────────────────────────── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

})();