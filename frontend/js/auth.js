/* ============================================================
   SHOPCART PRO — AUTH.JS (ENHANCED)
   SAFE MERGE: All form handling, API calls, localStorage,
   redirects PRESERVED exactly.
   Same IDs: loginForm, registerForm, loginEmail,
   loginPassword, loginMessage, registerName, registerEmail,
   registerPassword, registerMessage, amazon-btn
   Added: security UI (attempts tracking, risk badge, lock
   overlay, visual brute-force feedback). Backend unchanged.
   ============================================================ */

/* ── SECURITY UI STATE ─────────────────────────────────────── */
var loginAttempts = 0;
var maxAttempts   = 5;  // mirrors backend loginLimiter
var lockDuration  = 15; // minutes — matches backend setting

function updateAttemptsUI() {
  var bar  = document.getElementById("attemptsBar");
  var fill = document.getElementById("attemptsFill");
  var text = document.getElementById("attemptsText");
  var risk = document.getElementById("riskBadge");
  if (!bar) return;

  bar.style.display = "block";
  var pct = Math.min((loginAttempts / maxAttempts) * 100, 100);
  if (fill) {
    fill.style.width = pct + "%";
    fill.className   = "attempts-fill" +
      (loginAttempts >= 4 ? " high" : loginAttempts >= 2 ? " medium" : "");
  }
  if (text) {
    text.textContent = loginAttempts + " / " + maxAttempts + " attempts";
  }
  if (risk) {
    var level = loginAttempts >= 4 ? "high" : loginAttempts >= 2 ? "medium" : "low";
    var icons = { low: "🟢", medium: "🟡", high: "🔴" };
    risk.className   = "risk-badge " + level;
    risk.textContent = icons[level] + " Risk: " + level.charAt(0).toUpperCase() + level.slice(1);
    risk.style.display = "inline-flex";
  }
}

function showLockOverlay(minutesLeft) {
  var card = document.querySelector(".amazon-auth-card");
  if (!card) return;
  card.style.position = "relative";

  var existing = document.getElementById("lockOverlay");
  if (existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "lockOverlay";
  overlay.className = "locked-overlay";
  overlay.innerHTML =
    '<div class="locked-icon">🔒</div>' +
    '<div>Account Temporarily Locked</div>' +
    '<div class="locked-timer" id="lockTimer">' + minutesLeft + ':00</div>' +
    '<div style="font-size:0.75rem;color:var(--text-2);font-weight:400;text-align:center;max-width:220px;">Too many failed attempts. Try again in ' + minutesLeft + ' minute' + (minutesLeft !== 1 ? "s" : "") + '.</div>';

  card.appendChild(overlay);
  overlay.style.pointerEvents = "all";

  // Disable submit
  var btn = document.querySelector(".amazon-btn");
  if (btn) { btn.disabled = true; btn.style.opacity = "0.4"; }
}

function showAuthMessage(id, text, type) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className   = "auth-message show " + (type || "error");
}

/* ── REGISTER FORM ─────────────────────────────────────────── */
var registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    var name     = document.getElementById("registerName").value.trim();
    var email    = document.getElementById("registerEmail").value.trim();
    var password = document.getElementById("registerPassword").value.trim();
    var message  = document.getElementById("registerMessage");

    if (message) { message.textContent = ""; message.className = "auth-message"; }

    // Basic client validation
    if (password.length < 6) {
      showAuthMessage("registerMessage", "Password must be at least 6 characters.", "error");
      return;
    }

    var btn = registerForm.querySelector(".amazon-btn");
    if (btn) { btn.disabled = true; btn.textContent = "Creating account…"; }

    try {
      var response = await fetch(API_BASE + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password })
      });

      var data = await response.json();

      if (!response.ok) {
        showAuthMessage("registerMessage", data.message || "Registration failed", "error");
        if (btn) { btn.disabled = false; btn.textContent = "Create your account"; }
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user",  JSON.stringify(data.user));

      showAuthMessage("registerMessage", "Account created! Redirecting…", "success");
      if (window.spToast) window.spToast("Welcome to ShopCart Pro! 🎉", "success");

      setTimeout(function () { window.location.href = "index.html"; }, 1000);

    } catch (error) {
      showAuthMessage("registerMessage", "Something went wrong. Please try again.", "error");
      if (btn) { btn.disabled = false; btn.textContent = "Create your account"; }
    }
  });
}

/* ── LOGIN FORM ────────────────────────────────────────────── */
var loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    var email    = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value.trim();
    var message  = document.getElementById("loginMessage");

    if (message) { message.textContent = ""; message.className = "auth-message"; }

    var btn = loginForm.querySelector(".amazon-btn");
    if (btn) { btn.disabled = true; btn.textContent = "Signing in…"; }

    try {
      var response = await fetch(API_BASE + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
      });

      var data = await response.json();

      if (!response.ok) {
        loginAttempts++;
        updateAttemptsUI();

        // Locked (429 Too Many Requests from backend loginLimiter)
        if (response.status === 429) {
          showAuthMessage("loginMessage",
            data.message || "Too many attempts. Account locked for 15 minutes.",
            "error"
          );
          showLockOverlay(lockDuration);
          return;
        }

        // Show risk-appropriate message
        var msg = data.message || "Login failed. Check your credentials.";
        if (loginAttempts >= 4) {
          msg = "⚠️ " + msg + " — Your account may be locked on next failure.";
          showAuthMessage("loginMessage", msg, "warning");
        } else {
          showAuthMessage("loginMessage", msg, "error");
        }

        if (btn) { btn.disabled = false; btn.textContent = "Sign in"; }
        return;
      }

      // SUCCESS — reset attempt tracking
      loginAttempts = 0;
      updateAttemptsUI();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      showAuthMessage("loginMessage", "Login successful! Redirecting...", "success");

      if (window.spToast) {
        window.spToast(
          "Welcome back, " + ((data.user && data.user.name) || "User") + "! 👋",
          "success"
        );
      }

      setTimeout(function () {
        var target = (data.user && data.user.isAdmin) ? "admin.html" : "profile.html";
        window.location.replace(target + "?t=" + Date.now());
      }, 300);

    } catch (error) {
      showAuthMessage("loginMessage", "Something went wrong. Please try again.", "error");
      if (btn) { btn.disabled = false; btn.textContent = "Sign in"; }
    }
  });
}