const apiBase = "http://localhost:5000/auth"; // backend auth URL
const userBase = "http://localhost:5000/users"; // backend protected routes

// Signup
document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const role = document.getElementById("signupRole").value;

  try {
    const res = await fetch(`${apiBase}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await res.json();
    console.log("Signup response:", data);
    document.getElementById("signupMessage").textContent = data.message || JSON.stringify(data);
  } catch (err) {
    console.error(err);
    document.getElementById("signupMessage").textContent = "Signup failed";
  }
});

// Login
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`${apiBase}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log("Login response:", data);

    if (data.accessToken) {
      document.getElementById("loginMessage").textContent = "Login successful!";
      document.getElementById("token").textContent = data.accessToken;
    } else {
      document.getElementById("loginMessage").textContent = data.message || "Login failed";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("loginMessage").textContent = "Login failed";
  }
});

// Get current user info
document.getElementById("getMeBtn").addEventListener("click", async () => {
  const token = document.getElementById("token").textContent;
  if (!token) return alert("Please login first");

  try {
    const res = await fetch(`${userBase}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    document.getElementById("protectedMessage").textContent = JSON.stringify(data);
  } catch (err) {
    console.error(err);
    document.getElementById("protectedMessage").textContent = "Failed to fetch";
  }
});

// Admin-only route
document.getElementById("getAdminBtn").addEventListener("click", async () => {
  const token = document.getElementById("token").textContent;
  if (!token) return alert("Please login first");

  try {
    const res = await fetch(`${userBase}/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    document.getElementById("protectedMessage").textContent = JSON.stringify(data);
  } catch (err) {
    console.error(err);
    document.getElementById("protectedMessage").textContent = "Failed to fetch";
  }
});
