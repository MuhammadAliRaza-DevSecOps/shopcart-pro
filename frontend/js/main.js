/* ============================================================
   SHOPCART PRO — MAIN.JS (ENHANCED)
   SAFE MERGE: Same function signature loadFeaturedProducts()
   Same container ID: #featured-products
   Same API call: ${API_BASE}/products
   Added: skeleton loaders, premium card builder, scroll reveal
   ============================================================ */

async function loadFeaturedProducts() {
  var container = document.getElementById("featured-products");
  if (!container) return;

  // Show skeletons while loading
  if (window.spSkeletonCards) {
    container.innerHTML = window.spSkeletonCards(8);
    container.className = "product-grid";
  }

  try {
    var response = await fetch(API_BASE + "/products");
    var products = await response.json();

    if (!products || !products.length) {
      container.innerHTML = '<p class="text-muted" style="padding:24px 0;">No featured products found.</p>';
      return;
    }

    var html = "";
    products.slice(0, 8).forEach(function (product) {
      if (window.spBuildProductCard) {
        html += window.spBuildProductCard(product);
      } else {
        // Fallback to original style if sp-core not loaded yet
        html +=
          '<div class="product-card">' +
            '<div class="product-card-img-wrap">' +
              '<img src="' + (product.image || '') + '" alt="' + (product.name || '') + '">' +
            '</div>' +
            '<div class="product-card-body">' +
              '<h3>' + (product.name || '') + '</h3>' +
              '<div class="product-card-category">' + (product.category || '') + '</div>' +
              '<div class="product-card-footer">' +
                '<span class="price">PKR ' + (product.price || 0) + '</span>' +
                '<div class="card-actions">' +
                  '<a class="btn btn-sm" href="product.html?id=' + product._id + '">View Details</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
      }
    });

    container.innerHTML = html;

    // Trigger reveal on newly added cards
    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); });
      }, { threshold: 0.1 });
      container.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
    }

  } catch (error) {
    console.error("Featured products error:", error);
    container.innerHTML = '<p class="text-muted" style="padding:24px 0;">Failed to load featured products.</p>';
  }
}

loadFeaturedProducts();