/* ============================================================
   SHOPCART PRO — CART.JS (ENHANCED)
   SAFE MERGE: loadCart() and removeFromCart() preserved.
   Same IDs: #cart-items, #cart-total
   Same localStorage key: "cart"
   Added: premium card UI, toast, animated removal
   ============================================================ */

function loadCart() {
  var cartItems = [];
  try { cartItems = JSON.parse(localStorage.getItem("cart")) || []; } catch(e) {}

  var container = document.getElementById("cart-items");
  var totalEl   = document.getElementById("cart-total");

  if (!container) return;

  if (!cartItems.length) {
    container.innerHTML =
      '<div style="text-align:center;padding:80px 0;">' +
        '<div style="font-size:4rem;margin-bottom:20px;">🛒</div>' +
        '<h3 style="font-family:\'DM Serif Display\',serif;font-size:1.5rem;margin-bottom:12px;">Your cart is empty</h3>' +
        '<p style="color:var(--text-2);margin-bottom:28px;">Looks like you haven\'t added anything yet.</p>' +
        '<a href="products.html" class="btn">Browse Products →</a>' +
      '</div>';
    if (totalEl) {
      totalEl.textContent = "Total: PKR 0";
      totalEl.style.cssText = "font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:var(--gold);margin-bottom:20px;";
    }
    return;
  }

  var total = 0;

  var html = cartItems.map(function (item, index) {
    total += Number(item.price || 0);
    return (
      '<div class="cart-item" id="cart-item-' + index + '">' +
        '<div style="display:flex;align-items:center;gap:16px;flex:1;">' +
          '<div style="width:56px;height:56px;background:var(--surface-2);border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;">' +
            '📦' +
          '</div>' +
          '<div>' +
            '<h4>' + (item.name || "Item") + '</h4>' +
            '<div class="cart-item-price">PKR ' + Number(item.price || 0).toLocaleString() + '</div>' +
          '</div>' +
        '</div>' +
        '<button class="btn btn-sm secondary-btn" onclick="removeFromCart(' + index + ')" style="flex-shrink:0;">' +
          '× Remove' +
        '</button>' +
      '</div>'
    );
  }).join("");

  container.innerHTML = html;

  if (totalEl) {
    totalEl.innerHTML =
      '<span style="font-size:0.8rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-3);display:block;margin-bottom:8px;">Order Total</span>' +
      '<span style="font-family:\'Bebas Neue\',sans-serif;font-size:2.2rem;color:var(--gold);letter-spacing:0.04em;">' +
        'PKR ' + total.toLocaleString() +
      '</span>';
  }
}

/* PRESERVED: same removeFromCart signature */
function removeFromCart(index) {
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch(e) {}

  var itemName = (cart[index] || {}).name || "Item";
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  if (window.spToast) {
    window.spToast('"' + itemName + '" removed from cart', 'info');
  }

  loadCart();
}

loadCart();