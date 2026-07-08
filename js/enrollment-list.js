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
// API URL
// ==========================================

const enrollmentAPI =
    "https://fullstackjava-6tcg.onrender.com/volunteer-enrollments";

let enrollments = [];

// ==========================================
// Load Page
// ==========================================

window.onload = function () {

    loadEnrollments();

};

// ==========================================
// Fetch Enrollments
// ==========================================

async function loadEnrollments() {

    try {

        const response = await fetch(enrollmentAPI, {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to fetch enrollments.");

        }

        enrollments = await response.json();

        displayEnrollments(enrollments);

    }

    catch (error) {

        console.error(error);

        alert("Failed to load volunteer enrollments.");

    }

}

// ==========================================
// Display Table
// ==========================================

function displayEnrollments(data) {

    const table =
        document.getElementById("enrollmentTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="7"
                    style="text-align:center;">

                    No Enrollments Found

                </td>

            </tr>

        `;

        return;

    }

    data.forEach(enrollment => {

        table.innerHTML += `

        <tr>

            <td>${enrollment.id}</td>

            <td>${enrollment.volunteerName}</td>

            <td>${enrollment.opportunityTitle}</td>

            <td>${formatDate(enrollment.enrolledAt)}</td>

            <td>${formatDate(enrollment.approvedAt)}</td>

            <td>${enrollment.hoursLogged ?? 0}</td>

            <td>${enrollment.notes ?? "-"}</td>

        </tr>

        `;

    });

}

// ==========================================
// Search
// ==========================================

document.getElementById("search")
.addEventListener("keyup", function () {

    const keyword =
        this.value.toLowerCase();

    const filtered = enrollments.filter(enrollment =>

        enrollment.volunteerName
            .toLowerCase()
            .includes(keyword)

        ||

        enrollment.opportunityTitle
            .toLowerCase()
            .includes(keyword)

    );

    displayEnrollments(filtered);

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