/* ============================================================
   SHOPCART PRO — PRODUCTS.JS (ENHANCED)
   SAFE MERGE: loadProducts() and addToCart() preserved.
   Same IDs: #products-grid, #searchInput, #categoryFilter, #filterBtn
   Same API: ${API_BASE}/products
   Added: skeleton loaders, premium card rendering, toast
   ============================================================ */

async function loadProducts(search, category) {
  search   = search   || "";
  category = category || "";

  var grid = document.getElementById("products-grid");
  if (!grid) return;

  // Skeleton
  if (window.spSkeletonCards) {
    grid.innerHTML = window.spSkeletonCards(6);
    grid.className = "product-grid";
  }

  try {
    var url = API_BASE + "/products";
    var params = new URLSearchParams();
    if (search)   params.append("search",   search);
    if (category) params.append("category", category);
    if (params.toString()) url += "?" + params.toString();

    var response = await fetch(url);
    var products = await response.json();

    if (!products || !products.length) {
      grid.innerHTML =
        '<div style="grid-column:1/-1;text-align:center;padding:60px 0;">' +
          '<div style="font-size:3rem;margin-bottom:16px;">🔍</div>' +
          '<p style="color:var(--text-2);font-size:1rem;">No products found. Try a different search.</p>' +
        '</div>';
      return;
    }

    var html = "";
    products.forEach(function (product) {
      if (window.spBuildProductCard) {
        html += window.spBuildProductCard(product);
      } else {
        // Fallback to original card structure
        html +=
          '<div class="product-card">' +
            '<div class="product-card-img-wrap">' +
              '<img src="' + (product.image || '') + '" alt="' + (product.name || '') + '">' +
            '</div>' +
            '<div class="product-card-body">' +
              '<div class="product-card-category">' + (product.category || '') + '</div>' +
              '<h3>' + (product.name || '') + '</h3>' +
              '<div class="product-card-rating"><span class="stars">⭐ ' + (product.rating || 4) + '</span></div>' +
              '<div class="product-card-footer">' +
                '<span class="price">PKR ' + (product.price || 0) + '</span>' +
                '<div class="card-actions">' +
                  '<button class="btn btn-sm" onclick="addToCart(\'' + product._id + '\',\'' + (product.name || '').replace(/'/g,"\\'") + '\',' + (product.price||0) + ')">Add to Cart</button>' +
                  '<a class="btn btn-sm secondary-btn" href="product.html?id=' + product._id + '">View</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
      }
    });

    grid.innerHTML = html;

    // Trigger reveal
    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); });
      }, { threshold: 0.1 });
      grid.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
    }

  } catch (error) {
    console.error("Products load error:", error);
    grid.innerHTML =
      '<div style="grid-column:1/-1;text-align:center;padding:60px 0;">' +
        '<p style="color:var(--text-2);">Failed to load products. Please try again.</p>' +
      '</div>';
  }
}

/* PRESERVED: exact same addToCart function */
function addToCart(id, name, price) {
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch(e) {}
  cart.push({ id: id, name: name, price: price });
  localStorage.setItem("cart", JSON.stringify(cart));

  // Enhanced: toast instead of alert
  if (window.spToast) {
    window.spToast('"' + name + '" added to cart ✓', 'success');
  } else {
    alert("Product added to cart");
  }

  // Update nav badge
  var badge = document.getElementById("nav-cart-badge");
  if (badge) {
    badge.textContent = cart.length;
    badge.style.display = "inline";
  }
}

/* PRESERVED: filter button listener */
var filterBtn = document.getElementById("filterBtn");
if (filterBtn) {
  filterBtn.addEventListener("click", function () {
    var search   = (document.getElementById("searchInput")   || {}).value || "";
    var category = (document.getElementById("categoryFilter")|| {}).value || "";
    loadProducts(search.trim(), category);
  });
}

/* PRESERVED: enter key on search */
var searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      var category = (document.getElementById("categoryFilter") || {}).value || "";
      loadProducts(searchInput.value.trim(), category);
    }
  });
}

/* Read URL param ?category=xxx on page load */
(function () {
  var params = new URLSearchParams(window.location.search);
  var cat = params.get("category") || "";
  if (cat) {
    var sel = document.getElementById("categoryFilter");
    if (sel) sel.value = cat;
  }
  loadProducts("", cat);
})();