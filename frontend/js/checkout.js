function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderCheckoutSummary() {
  const itemsContainer = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");
  const cart = getCartItems();

  if (!cart.length) {
    itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "Total: PKR 0";
    return;
  }

  let total = 0;

  itemsContainer.innerHTML = cart.map(item => {
    total += item.price;
    return `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>PKR ${item.price}</p>
        </div>
      </div>
    `;
  }).join("");

  totalEl.textContent = `Total: PKR ${total}`;
}

document.getElementById("checkoutForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const cart = getCartItems();
  const message = document.getElementById("checkoutMessage");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  if (!cart.length) {
    message.textContent = "Your cart is empty";
    message.style.color = "#b91c1c";
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const items = cart.map(item => ({
    productId: item.id || item.productId || item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity || 1
  }));

  const invalidItem = items.find(item => !item.productId);
  if (invalidItem) {
    message.textContent = "Cart contains invalid old items. Please clear cart and add products again.";
    message.style.color = "#b91c1c";
    return;
  }

  const shippingAddress = {
    fullName: document.getElementById("fullName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    city: document.getElementById("city").value.trim(),
    address: document.getElementById("address").value.trim()
  };

  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        items,
        shippingAddress,
        totalAmount
      })
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message || "Order failed";
      message.style.color = "#b91c1c";
      return;
    }

    localStorage.removeItem("cart");
    message.textContent = "Order placed successfully";
    message.style.color = "#15803d";

    setTimeout(() => {
      window.location.href = "orders.html";
    }, 1000);
  } catch (error) {
    message.textContent = "Something went wrong";
    message.style.color = "#b91c1c";
  }
});

renderCheckoutSummary();