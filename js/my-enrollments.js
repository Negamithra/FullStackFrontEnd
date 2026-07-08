// ===========================================
// Authentication Check
// ===========================================

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

const API_URL = "https://fullstackjava-6tcg.onrender.com/volunteer-enrollments";

let enrollments = [];

// ===========================================
// Load Page
// ===========================================

window.onload = function () {

    loadEnrollments();

};

// ===========================================
// Fetch Enrollments
// ===========================================

async function loadEnrollments() {

    try {

        const response = await fetch(API_URL, {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to fetch enrollments.");

        }

        const data = await response.json();

        enrollments = data.filter(enrollment =>

            enrollment.volunteerId == userId

        );

        displayEnrollments(enrollments);

    }

    catch (error) {

        console.error(error);

        alert("Failed to load enrollments.");

    }

}

// ===========================================
// Display Table
// ===========================================

function displayEnrollments(data) {

    const table =
        document.getElementById("enrollmentTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
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

            <td>${enrollment.opportunityTitle}</td>

            <td>${formatDate(enrollment.enrolledAt)}</td>

            <td>${formatDate(enrollment.approvedAt)}</td>

            <td>

                <span class="hours">

                    ${enrollment.hoursLogged ?? 0}

                </span>

            </td>

            <td class="note">

                ${enrollment.notes ?? "-"}

            </td>

        </tr>

        `;

    });

}

// ===========================================
// Search
// ===========================================

document.getElementById("search")
.addEventListener("keyup", function () {

    const keyword =
        this.value.toLowerCase();

    const filtered = enrollments.filter(enrollment =>

        enrollment.opportunityTitle
            .toLowerCase()
            .includes(keyword)

    );

    displayEnrollments(filtered);

});

// ===========================================
// Date Format
// ===========================================

function formatDate(date) {

    if (!date) {

        return "-";

    }

    return new Date(date).toLocaleString();

}

// ===========================================
// Logout
// ===========================================

document.getElementById("logout")
.addEventListener("click", function () {

    localStorage.clear();

    window.location.href = "login.html";

});