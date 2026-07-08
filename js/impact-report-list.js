// ==========================================
// Authentication
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
// API
// ==========================================

const reportAPI = "https://fullstackjava-6tcg.onrender.com/impact-reports";

let reports = [];

// ==========================================
// Load Page
// ==========================================

window.onload = function () {

    loadReports();

};

// ==========================================
// Fetch Reports
// ==========================================

async function loadReports() {

    try {

        const response = await fetch(reportAPI, {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Failed to load reports.");

        }

        reports = await response.json();

        displayReports(reports);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load impact reports.");

    }

}

// ==========================================
// Display Reports
// ==========================================

function displayReports(data) {

    const table = document.getElementById("reportTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="7" style="text-align:center;">

                    No Impact Reports Found

                </td>

            </tr>

        `;

        return;

    }

    data.forEach(report => {

        table.innerHTML += `

            <tr>

                <td>${report.id}</td>

                <td>${report.volunteerName}</td>

                <td>${report.opportunityTitle}</td>

                <td>${report.hoursContributed}</td>

                <td>${report.beneficiariesServed}</td>

                <td>${report.rating} ⭐</td>

                <td>${formatDate(report.submittedAt)}</td>

            </tr>

        `;

    });

}

// ==========================================
// Search
// ==========================================

document.getElementById("search")
.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = reports.filter(report =>

        report.volunteerName.toLowerCase().includes(keyword)

        ||

        report.opportunityTitle.toLowerCase().includes(keyword)

    );

    displayReports(filtered);

});

// ==========================================
// Date Formatter
// ==========================================

function formatDate(date) {

    if (!date) {

        return "-";

    }

    return new Date(date).toLocaleString();

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