function renderNavbar() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="products.html">Products</a>
      <a href="cart.html">Cart</a>
      <a href="orders.html">Orders</a>
      ${user.isAdmin ? '<a href="admin.html">Admin</a><a href="admin-orders.html">Manage Orders</a>' : ""}
      <a href="profile.html">Hi, ${user.name}</a>
      <a href="#" id="logoutBtn">Logout</a>
      
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  } else {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="products.html">Products</a>
      <a href="cart.html">Cart</a>
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    `;
  }
}

renderNavbar();