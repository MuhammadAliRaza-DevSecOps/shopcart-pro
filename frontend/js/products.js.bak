async function loadProducts(search = "", category = "") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  try {
    let url = `${API_BASE}/products`;
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category) params.append("category", category);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const products = await response.json();

    if (!products.length) {
      grid.innerHTML = "<p>No products found.</p>";
      return;
    }

    grid.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p>⭐ ${product.rating}</p>
        <p class="price">PKR ${product.price}</p>
        <div class="card-actions">
          <button class="btn" onclick="addToCart('${product._id}', '${product.name.replace(/'/g, "\\'")}', ${product.price})">Add to Cart</button>
          <a class="btn secondary-btn" href="product.html?id=${product._id}">View</a>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Products load error:", error);
    grid.innerHTML = "<p>Failed to load products.</p>";
  }
}

function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart");
}

document.getElementById("filterBtn")?.addEventListener("click", () => {
  const search = document.getElementById("searchInput").value.trim();
  const category = document.getElementById("categoryFilter").value;
  loadProducts(search, category);
});

loadProducts();