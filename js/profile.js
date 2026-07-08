// ==========================================
// Authentication Check
// ==========================================

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const userId = localStorage.getItem("userId");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}

if (role !== "VOLUNTEER") {

    alert("Access Denied!");

    window.location.href = "login.html";

}

if (!userId) {

    alert("User ID not found.");

    window.location.href = "login.html";

}

// ==========================================
// Load Profile
// ==========================================

window.onload = function () {

    loadProfile();

};

// ==========================================
// Display Profile
// ==========================================

function loadProfile() {

    document.getElementById("profileName").textContent =
        "Volunteer #" + userId;

    document.getElementById("profileRole").textContent =
        role;

    document.getElementById("volunteerId").textContent =
        userId;

    document.getElementById("role").textContent =
        role;

}

// ==========================================
// Logout Function
// ==========================================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.clear();

        window.location.href = "login.html";

    }

}

// ==========================================
// Event Listeners
// ==========================================

document.getElementById("logout")
.addEventListener("click", logout);

document.getElementById("logoutBtn")
.addEventListener("click", logout);