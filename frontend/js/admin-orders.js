const adminToken = localStorage.getItem("token");
const adminUser = JSON.parse(localStorage.getItem("user"));

if (!adminToken || !adminUser || !adminUser.isAdmin) {
  window.location.href = "login.html";
}

async function loadAdminOrders() {
  const container = document.getElementById("admin-orders-list");
  if (!container) return;

  try {
    const response = await fetch(`${API_BASE}/orders`, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });

    const orders = await response.json();

    if (!response.ok) {
      container.innerHTML = `<div class="order-card"><p>${orders.message || "Failed to load orders."}</p></div>`;
      return;
    }

    if (!Array.isArray(orders) || orders.length === 0) {
      container.innerHTML = `<div class="order-card"><p>No orders found.</p></div>`;
      return;
    }

    container.innerHTML = orders.map(order => {
      const itemsHtml = Array.isArray(order.items)
        ? order.items.map(item => `
            <div class="order-item-row">
              <span>${item.name}</span>
              <span>Qty: ${item.quantity}</span>
              <span>PKR ${item.price}</span>
            </div>
          `).join("")
        : "<p>No items.</p>";

      return `
        <div class="order-card">
          <div class="order-header">
            <h3>Order #${order._id}</h3>
            <span class="order-status">${order.status}</span>
          </div>

          <div class="order-meta">
            <p><strong>User:</strong> ${order.user?.name || "Unknown"} (${order.user?.email || "No email"})</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> PKR ${order.totalAmount}</p>
          </div>

          <div class="order-section">
            <h4>Shipping Address</h4>
            <p>${order.shippingAddress?.fullName || "-"}</p>
            <p>${order.shippingAddress?.phone || "-"}</p>
            <p>${order.shippingAddress?.city || "-"}</p>
            <p>${order.shippingAddress?.address || "-"}</p>
          </div>

          <div class="order-section">
            <h4>Items</h4>
            <div class="order-items">
              ${itemsHtml}
            </div>
          </div>

          <div class="order-section">
            <h4>Update Status</h4>
            <select onchange="changeOrderStatus('${order._id}', this.value)">
              <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
              <option value="Processing" ${order.status === "Processing" ? "selected" : ""}>Processing</option>
              <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
              <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
            </select>
          </div>
        </div>
      `;
    }).join("");
  } catch (error) {
    container.innerHTML = `<div class="order-card"><p>Something went wrong.</p></div>`;
  }
}

async function changeOrderStatus(orderId, newStatus) {
  try {
    const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: newStatus })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update status");
      return;
    }

    loadAdminOrders();
  } catch (error) {
    alert("Something went wrong while updating order");
  }
}

loadAdminOrders();