// ==========================================
// Authentication Check
// ==========================================

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}

if (role !== "VOLUNTEER") {

    alert("Access Denied!");

    window.location.href = "login.html";

}

const opportunityAPI = "https://fullstackjava-6tcg.onrender.com/opportunities";
const enrollmentAPI = "https://fullstackjava-6tcg.onrender.com/volunteer-enrollments";

let opportunities = [];

// ==========================================
// Load Opportunities
// ==========================================

window.onload = function () {

    loadOpportunities();

};

// ==========================================
// Fetch Opportunities
// ==========================================

async function loadOpportunities() {

    try {

        const response = await fetch(opportunityAPI, {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to fetch opportunities.");

        }

        opportunities = await response.json();

        displayOpportunities(opportunities);

    }

    catch (error) {

        console.error(error);

        alert("Failed to load opportunities.");

    }

}

// ==========================================
// Display Opportunities
// ==========================================

function displayOpportunities(data) {

    const container =
        document.getElementById("opportunityContainer");

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML =

            "<h3>No Opportunities Available</h3>";

        return;

    }

    data.forEach(opportunity => {

        let statusClass = "";

        if (opportunity.status === "OPEN") {

            statusClass = "open";

        }

        else if (opportunity.status === "CLOSED") {

            statusClass = "closed";

        }

        else {

            statusClass = "completed";

        }

        container.innerHTML += `

        <div class="card">

            <h2>${opportunity.title}</h2>

            <p>

                <i class="fa-solid fa-location-dot"></i>

                ${opportunity.location}

            </p>

            <p>

                <i class="fa-solid fa-calendar"></i>

                ${formatDate(opportunity.startDate)}

            </p>

            <p>

                <i class="fa-solid fa-users"></i>

                Max Volunteers :
                ${opportunity.maxVolunteers}

            </p>

            <span class="status ${statusClass}">

                ${opportunity.status}

            </span>

            <button
                    class="enrollBtn"
                    onclick="enroll(${opportunity.id})">

                Enroll

            </button>

        </div>

        `;

    });

}

// ==========================================
// Format Date
// ==========================================

function formatDate(date) {

    if (!date) {

        return "-";

    }

    return new Date(date).toLocaleString();

}

// ==========================================
// Search
// ==========================================

document.getElementById("search")
.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = opportunities.filter(opportunity =>

        opportunity.title.toLowerCase().includes(keyword) ||

        opportunity.location.toLowerCase().includes(keyword)

    );

    displayOpportunities(filtered);

});

// ==========================================
// Enroll Volunteer
// ==========================================

async function enroll(opportunityId) {

    const volunteerId = localStorage.getItem("userId");

    if (!volunteerId) {

        alert("Volunteer ID not found. Please login again.");

        window.location.href = "login.html";

        return;

    }

    const enrollment = {

        volunteerId: Number(volunteerId),

        opportunityId: Number(opportunityId),

        hoursLogged: 0,

        notes: ""

    };

    try {

        const response = await fetch(enrollmentAPI, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": "Bearer " + token

            },

            body: JSON.stringify(enrollment)

        });

        if (response.ok) {

            alert("Enrollment Successful!");

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

}

// ==========================================
// Logout
// ==========================================

document.getElementById("logout")
.addEventListener("click", function () {

    localStorage.clear();

    window.location.href = "login.html";

});