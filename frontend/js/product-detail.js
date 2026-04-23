/* ============================================================
   SHOPCART PRO — PRODUCT-DETAIL.JS (ENHANCED)
   SAFE MERGE: loadProductDetail() and addToCart() preserved.
   Same ID: #product-detail
   Same API: ${API_BASE}/products/:id
   Added: premium layout, toast, rating stars
   ============================================================ */

async function loadProductDetail() {
  var container = document.getElementById("product-detail");
  if (!container) return;

  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");

  if (!id) {
    container.innerHTML = renderDetailError("Product ID not found.");
    return;
  }

  // Show skeleton
  container.innerHTML =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;">' +
      '<div style="height:460px;background:var(--surface);border-radius:var(--r-lg);animation:shimmer 1.6s infinite;background-size:200% 100%;background-image:linear-gradient(90deg,var(--surface) 25%,var(--surface-2) 50%,var(--surface) 75%);"></div>' +
      '<div style="padding:20px 0;display:flex;flex-direction:column;gap:14px;">' +
        '<div style="height:14px;width:40%;background:var(--surface-2);border-radius:6px;animation:shimmer 1.6s infinite;background-size:200% 100%;background-image:linear-gradient(90deg,var(--surface) 25%,var(--surface-2) 50%,var(--surface) 75%);"></div>' +
        '<div style="height:36px;width:80%;background:var(--surface-2);border-radius:6px;animation:shimmer 1.6s infinite;background-size:200% 100%;background-image:linear-gradient(90deg,var(--surface) 25%,var(--surface-2) 50%,var(--surface) 75%);"></div>' +
        '<div style="height:12px;width:60%;background:var(--surface-2);border-radius:6px;animation:shimmer 1.6s infinite;background-size:200% 100%;background-image:linear-gradient(90deg,var(--surface) 25%,var(--surface-2) 50%,var(--surface) 75%);"></div>' +
      '</div>' +
    '</div>';

  try {
    var response = await fetch(API_BASE + "/products/" + id);
    var product  = await response.json();

    if (!product || product.message) {
      container.innerHTML = renderDetailError("Product not found.");
      return;
    }

    // Update page title
    document.title = (product.name || "Product") + " — ShopCart Pro";

    var rating  = Math.round(product.rating || 4);
    var stars   = "★".repeat(rating) + "☆".repeat(5 - rating);
    var inStock = (product.stock || 0) > 0;
    var safeName = (product.name || "").replace(/'/g, "\\'");

    container.innerHTML =
      '<img src="' + (product.image || '') + '" alt="' + (window.spEsc ? window.spEsc(product.name) : product.name) + '">' +
      '<div class="detail-content">' +
        '<div style="font-size:0.68rem;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);background:var(--gold-dim);border:1px solid var(--border-gold);padding:3px 12px;border-radius:999px;display:inline-block;margin-bottom:16px;">' +
          (product.category || "General") +
        '</div>' +
        '<h2>' + (product.name || "") + '</h2>' +
        '<div style="display:flex;align-items:center;gap:10px;margin:12px 0 18px;">' +
          '<span style="color:var(--gold);letter-spacing:2px;">' + stars + '</span>' +
          '<span style="font-size:0.8rem;color:var(--text-3);">' + (product.rating || 4) + ' / 5</span>' +
        '</div>' +
        '<p><strong>Category:</strong> ' + (product.category || "—") + '</p>' +
        '<p><strong>In Stock:</strong> ' +
          (inStock
            ? '<span style="color:var(--success);font-weight:700;">✓ ' + product.stock + ' available</span>'
            : '<span style="color:var(--danger);font-weight:700;">✕ Out of stock</span>'
          ) +
        '</p>' +
        '<span class="price" style="display:block;margin:20px 0 8px;">PKR ' + (product.price || 0) + '</span>' +
        '<p style="margin-bottom:24px;">' + (product.description || "") + '</p>' +
        (inStock
          ? '<button class="btn" style="width:100%;justify-content:center;" onclick="addToCart(\'' + product._id + '\',\'' + safeName + '\',' + (product.price || 0) + ')">Add to Cart</button>'
          : '<button class="btn" style="width:100%;opacity:0.5;cursor:not-allowed;" disabled>Out of Stock</button>'
        ) +
      '</div>';

  } catch (error) {
    console.error("Product detail error:", error);
    container.innerHTML = renderDetailError("Failed to load product details.");
  }
}

/* PRESERVED: exact same addToCart */
function addToCart(id, name, price) {
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch(e) {}
  cart.push({ id: id, name: name, price: price });
  localStorage.setItem("cart", JSON.stringify(cart));

  if (window.spToast) {
    window.spToast('"' + name + '" added to cart ✓', 'success');
  } else {
    alert("Product added to cart");
  }
}

function renderDetailError(msg) {
  return (
    '<div style="grid-column:1/-1;text-align:center;padding:80px 0;">' +
      '<div style="font-size:3rem;margin-bottom:16px;">😕</div>' +
      '<p style="color:var(--text-2);">' + msg + '</p>' +
      '<a href="products.html" class="btn btn-ghost" style="display:inline-flex;margin-top:20px;">← Back to Products</a>' +
    '</div>'
  );
}

loadProductDetail();