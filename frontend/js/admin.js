const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user || !user.isAdmin) {
  window.location.href = "login.html";
}

const form = document.getElementById("adminProductForm");
const message = document.getElementById("adminMessage");
const submitBtn = document.getElementById("adminSubmitBtn");
const editProductIdInput = document.getElementById("editProductId");

async function loadAdminProducts() {
  const grid = document.getElementById("admin-products-grid");
  if (!grid) return;

  try {
    const response = await fetch(`${API_BASE}/products`);
    const products = await response.json();

    if (!Array.isArray(products) || !products.length) {
      grid.innerHTML = "<p>No products found.</p>";
      return;
    }

    grid.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p class="price">PKR ${product.price}</p>
        <div class="card-actions">
          <button class="btn" onclick="editProduct('${product._id}')">Edit</button>
          <button class="btn" onclick="deleteProduct('${product._id}')">Delete</button>
        </div>
      </div>
    `).join("");
  } catch (error) {
    grid.innerHTML = "<p>Failed to load admin products.</p>";
  }
}

async function editProduct(id) {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    const product = await response.json();

    if (!response.ok) {
      alert(product.message || "Failed to fetch product");
      return;
    }

    document.getElementById("productName").value = product.name || "";
    document.getElementById("productPrice").value = product.price || "";
    document.getElementById("productCategory").value = product.category || "";
    document.getElementById("productRating").value = product.rating || "";
    document.getElementById("productStock").value = product.stock || "";
    document.getElementById("productImage").value = product.image || "";
    document.getElementById("productDescription").value = product.description || "";

    editProductIdInput.value = product._id;
    submitBtn.textContent = "Update Product";
    message.textContent = "Edit mode enabled";
    message.style.color = "#0369a1";

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    alert("Something went wrong");
  }
}

async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Delete failed");
      return;
    }

    loadAdminProducts();
  } catch (error) {
    alert("Something went wrong");
  }
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const editId = editProductIdInput.value.trim();

  const payload = {
    name: document.getElementById("productName").value.trim(),
    price: Number(document.getElementById("productPrice").value),
    category: document.getElementById("productCategory").value.trim(),
    rating: Number(document.getElementById("productRating").value || 4),
    stock: Number(document.getElementById("productStock").value || 0),
    image: document.getElementById("productImage").value.trim(),
    description: document.getElementById("productDescription").value.trim()
  };

  try {
    let response;
    let data;

    if (editId) {
      response = await fetch(`${API_BASE}/products/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    } else {
      response = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    }

    data = await response.json();

    if (!response.ok) {
      message.textContent = data.message || "Operation failed";
      message.style.color = "#b91c1c";
      return;
    }

    message.textContent = editId
      ? "Product updated successfully"
      : "Product added successfully";
    message.style.color = "#15803d";

    form.reset();
    editProductIdInput.value = "";
    submitBtn.textContent = "Add Product";
    loadAdminProducts();
  } catch (error) {
    message.textContent = "Something went wrong";
    message.style.color = "#b91c1c";
  }
});

loadAdminProducts();