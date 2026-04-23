async function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  try {
    const response = await fetch(`${API_BASE}/products`);
    const products = await response.json();

    if (!products.length) {
      container.innerHTML = "<p>No featured products found.</p>";
      return;
    }

    container.innerHTML = products.slice(0, 8).map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p class="price">PKR ${product.price}</p>
        <a class="btn" href="product.html?id=${product._id}">View Details</a>
      </div>
    `).join("");
  } catch (error) {
    console.error("Featured products error:", error);
    container.innerHTML = "<p>Failed to load featured products.</p>";
  }
}

loadFeaturedProducts();