// ==========================================
// Authentication Check
// ==========================================

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}

if (role !== "ORGANIZATION_COORDINATOR") {

    alert("Access Denied!");

    window.location.href = "login.html";

}

// ==========================================
// API URLs
// ==========================================

const organizationAPI =
    "https://fullstackjava-6tcg.onrender.com/organizations";

const opportunityAPI =
    "https://fullstackjava-6tcg.onrender.com/opportunities";

const enrollmentAPI =
    "https://fullstackjava-6tcg.onrender.com/volunteer-enrollments";

const reportAPI =
    "https://fullstackjava-6tcg.onrender.com/impact-reports";

// ==========================================
// Load Dashboard
// ==========================================

window.onload = function () {

    loadOrganizations();

    loadOpportunities();

    loadEnrollments();

    loadReports();

};

// ==========================================
// Organizations Count
// ==========================================

async function loadOrganizations() {

    try {

        const response = await fetch(organizationAPI, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error();

        }

        const organizations = await response.json();

        document.getElementById("organizationCount")
            .textContent = organizations.length;

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Opportunities Count
// ==========================================

async function loadOpportunities() {

    try {

        const response = await fetch(opportunityAPI, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error();

        }

        const opportunities = await response.json();

        document.getElementById("opportunityCount")
            .textContent = opportunities.length;

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Enrollment Count
// ==========================================

async function loadEnrollments() {

    try {

        const response = await fetch(enrollmentAPI, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error();

        }

        const enrollments = await response.json();

        document.getElementById("enrollmentCount")
            .textContent = enrollments.length;

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Impact Report Count
// ==========================================

async function loadReports() {

    try {

        const response = await fetch(reportAPI, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error();

        }

        const reports = await response.json();

        document.getElementById("reportCount")
            .textContent = reports.length;

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

    if (confirm("Are you sure you want to logout?")) {

        localStorage.clear();

        window.location.href = "login.html";

    }

});