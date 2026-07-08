// ==========================================
// Authentication
// ==========================================

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}

if (role !== "PLATFORM_ADMIN") {

    alert("Access Denied!");

    window.location.href = "login.html";

}

// ==========================================
// API URLs
// ==========================================

const USERS_API = "https://fullstackjava-6tcg.onrender.com/users";
const ORGANIZATIONS_API = "https://fullstackjava-6tcg.onrender.com/organizations";
const OPPORTUNITIES_API = "https://fullstackjava-6tcg.onrender.com/opportunities";
const REPORTS_API = "https://fullstackjava-6tcg.onrender.com/impact-reports";

// ==========================================
// Page Load
// ==========================================

window.onload = function () {

    loadUsers();

    loadOrganizations();

    loadOpportunities();

    loadReports();

};

// ==========================================
// Users
// ==========================================

async function loadUsers() {

    try {

        const response = await fetch(USERS_API, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error();

        }

        const users = await response.json();

        document.getElementById("userCount").textContent = users.length;

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Organizations
// ==========================================

async function loadOrganizations() {

    try {

        const response = await fetch(ORGANIZATIONS_API, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error();

        }

        const organizations = await response.json();

        document.getElementById("organizationCount").textContent = organizations.length;

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Opportunities
// ==========================================

async function loadOpportunities() {

    try {

        const response = await fetch(OPPORTUNITIES_API, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error();

        }

        const opportunities = await response.json();

        document.getElementById("opportunityCount").textContent = opportunities.length;

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Impact Reports
// ==========================================

async function loadReports() {

    try {

        const response = await fetch(REPORTS_API, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error();

        }

        const reports = await response.json();

        document.getElementById("reportCount").textContent = reports.length;

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Logout
// ==========================================

document.getElementById("logout")
.addEventListener("click", function () {

    if (confirm("Do you want to logout?")) {

        localStorage.clear();

        window.location.href = "login.html";

    }

});