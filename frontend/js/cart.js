function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!cartItems.length) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "Total: PKR 0";
    return;
  }

  let total = 0;

  container.innerHTML = cartItems.map((item, index) => {
    total += item.price;
    return `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>PKR ${item.price}</p>
        </div>
        <button class="btn" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  }).join("");

  totalEl.textContent = `Total: PKR ${total}`;
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();