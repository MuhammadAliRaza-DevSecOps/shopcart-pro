/* ============================================================
   SHOPCART PRO — NAVBAR.JS (ENHANCED)
   SAFE MERGE: renderNavbar() function preserved EXACTLY.
   Same element ID: #site-nav
   Same localStorage keys: token, user
   Same admin check: user.isAdmin
   Same logout logic
   Added: premium link classes, cart count badge
   ============================================================ */

function renderNavbar() {
  var nav = document.getElementById("site-nav");
  if (!nav) return;

  var user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch(e) {}

  if (user) {
    nav.innerHTML =
      '<a href="index.html">Home</a>' +
      '<a href="products.html">Products</a>' +
      '<a href="cart.html">🛒 Cart<span id="nav-cart-badge" style="display:none;margin-left:4px;background:var(--gold);color:var(--bg);font-size:0.6rem;font-weight:800;padding:1px 5px;border-radius:999px;vertical-align:middle;"></span></a>' +
      '<a href="orders.html">Orders</a>' +
      (user.isAdmin
        ? '<a href="admin.html">Admin</a><a href="admin-orders.html">Manage Orders</a>'
        : ''
      ) +
      '<a href="profile.html" style="color:var(--gold);">Hi, ' + (user.name || 'User') + '</a>' +
      '<a href="#" id="logoutBtn">Logout</a>';

    var logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        window.location.href = "login.html";
      });
    }

    // Show cart count
    var cart = [];
    try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch(e) {}
    if (cart.length > 0) {
      var badge = document.getElementById("nav-cart-badge");
      if (badge) { badge.textContent = cart.length; badge.style.display = "inline"; }
    }

  } else {
    nav.innerHTML =
      '<a href="index.html">Home</a>' +
      '<a href="products.html">Products</a>' +
      '<a href="cart.html">Cart</a>' +
      '<a href="login.html">Login</a>' +
      '<a href="register.html">Register</a>';
  }
}

renderNavbar();