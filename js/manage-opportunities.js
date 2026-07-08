// ===============================
// Authentication Check
// ===============================

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}

if (role !== "PLATFORM_ADMIN" &&
    role !== "ORGANIZATION_COORDINATOR") {

    alert("Access Denied!");

    window.location.href = "login.html";

}

const API_URL = "https://fullstackjava-6tcg.onrender.com/opportunities";

let opportunities = [];

// ===============================
// Load Opportunities
// ===============================

async function loadOpportunities() {

    try {

        const response = await fetch(API_URL, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load opportunities.");

        }

        opportunities = await response.json();

        displayOpportunities(opportunities);

    }

    catch (error) {

        console.error(error);

        alert("Unable to fetch opportunities.");

    }

}

// ===============================
// Display Opportunities
// ===============================

function displayOpportunities(data) {

    const table = document.getElementById("opportunityTable");

    table.innerHTML = "";

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

        table.innerHTML += `

        <tr>

            <td>${opportunity.id}</td>

            <td>${opportunity.title}</td>

            <td>${opportunity.location}</td>

            <td>${formatDate(opportunity.startDate)}</td>

            <td class="${statusClass}">

                ${opportunity.status}

            </td>

            <td>

                <button
                    class="editBtn"
                    onclick="editOpportunity(${opportunity.id})">

                    Edit

                </button>

                <button
                    class="deleteBtn"
                    onclick="deleteOpportunity(${opportunity.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Format Date
// ===============================

function formatDate(dateTime) {

    return new Date(dateTime).toLocaleString();

}

// ===============================
// Search
// ===============================

document.getElementById("search")
.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = opportunities.filter(opportunity =>

        opportunity.title.toLowerCase().includes(keyword) ||

        opportunity.location.toLowerCase().includes(keyword)

    );

    displayOpportunities(filtered);

});

// ===============================
// Add Opportunity
// ===============================

document.getElementById("addBtn")
.addEventListener("click", function () {

    window.location.href = "opportunity-form.html";

});

// ===============================
// Edit Opportunity
// ===============================

function editOpportunity(id) {

    window.location.href =
        "opportunity-form.html?id=" + id;

}

// ===============================
// Delete Opportunity
// ===============================

async function deleteOpportunity(id) {

    if (!confirm("Delete this opportunity?")) {

        return;

    }

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "DELETE",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (response.ok) {

            alert("Opportunity deleted successfully.");

            loadOpportunities();

        }

        else {

            alert("Unable to delete opportunity.");

        }

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Logout
// ===============================

document.getElementById("logout")
.addEventListener("click", function () {

    localStorage.clear();

    window.location.href = "login.html";

});

// ===============================
// Initial Load
// ===============================

loadOpportunities();