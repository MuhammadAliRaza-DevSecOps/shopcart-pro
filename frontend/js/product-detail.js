async function loadProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    const product = await response.json();

    if (!product || product.message) {
      container.innerHTML = "<p>Product not found.</p>";
      return;
    }

    container.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="detail-content">
        <h2>${product.name}</h2>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Rating:</strong> ⭐ ${product.rating}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p class="price">PKR ${product.price}</p>
        <p>${product.description}</p>
        <button class="btn" onclick="addToCart('${product._id}', '${product.name.replace(/'/g, "\\'")}', ${product.price})">Add to Cart</button>
      </div>
    `;
  } catch (error) {
    console.error("Product detail error:", error);
    container.innerHTML = "<p>Failed to load product details.</p>";
  }
}

function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart");
}

loadProductDetail();