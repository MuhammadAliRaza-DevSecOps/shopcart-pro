async function loadProfile() {
  const profileData = document.getElementById("profileData");
  if (!profileData) return;

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      profileData.innerHTML = "<p>Failed to load profile.</p>";
      return;
    }

    profileData.innerHTML = `
      <p><strong>Name:</strong> ${data.user.name}</p>
      <p><strong>Email:</strong> ${data.user.email}</p>
      <p><strong>Role:</strong> ${data.user.isAdmin ? "Admin" : "User"}</p>
      <p><strong>Account Created:</strong> ${new Date(data.user.createdAt).toLocaleString()}</p>
    `;
  } catch (error) {
    profileData.innerHTML = "<p>Something went wrong.</p>";
  }
}

loadProfile();