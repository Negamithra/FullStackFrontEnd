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

const enrollmentAPI =
    "https://fullstackjava-6tcg.onrender.com/volunteer-enrollments";

const reportAPI =
    "https://fullstackjava-6tcg.onrender.com/impact-reports";

// ==========================================
// Load Page
// ==========================================

window.onload = function () {

    loadEnrollments();

};

// ==========================================
// Load Volunteer Enrollments
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

            throw new Error("Unable to load enrollments.");

        }

        const enrollments = await response.json();

        const myEnrollments = enrollments.filter(enrollment =>

            enrollment.volunteerId == userId

        );

        const dropdown =
            document.getElementById("volunteerEnrollmentId");

        dropdown.innerHTML =

            `<option value="">Select Enrollment</option>`;

        myEnrollments.forEach(enrollment => {

            dropdown.innerHTML += `

                <option value="${enrollment.id}">

                    ${enrollment.opportunityTitle}

                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load enrollments.");

    }

}

// ==========================================
// Submit Impact Report
// ==========================================

document.getElementById("reportForm")
.addEventListener("submit", async function (event) {

    event.preventDefault();

    const report = {

        volunteerEnrollmentId:

            Number(document.getElementById(
                "volunteerEnrollmentId").value),

        summary:

            document.getElementById(
                "summary").value,

        hoursContributed:

            Number(document.getElementById(
                "hoursContributed").value),

        beneficiariesServed:

            Number(document.getElementById(
                "beneficiariesServed").value),

        rating:

            Number(document.getElementById(
                "rating").value)

    };

    try {

        const response = await fetch(reportAPI, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": "Bearer " + token

            },

            body: JSON.stringify(report)

        });

        if (response.ok) {

            alert("Impact Report Submitted Successfully!");

            document.getElementById("reportForm").reset();

        }

        else {

            const message = await response.text();

            alert(message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error.");

    }

});

// ==========================================
// Logout
// ==========================================

document.getElementById("logout")
.addEventListener("click", function () {

    localStorage.clear();

    window.location.href = "login.html";

});