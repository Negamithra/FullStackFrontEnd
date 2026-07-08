const API_URL = "https://fullstackjava-6tcg.onrender.com" + "/opportunities";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

if (role !== "ORGANIZATION_COORDINATOR" &&
    role !== "PLATFORM_ADMIN") {

    alert("Access Denied");
    window.location.href = "login.html";
}

// Form Fields

const opportunityId = document.getElementById("opportunityId");
const title = document.getElementById("title");
const description = document.getElementById("description");
const location = document.getElementById("location");
const requiredSkills = document.getElementById("requiredSkills");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const maxVolunteers = document.getElementById("maxVolunteers");
const status = document.getElementById("status");
const organizationId = document.getElementById("organizationId");

// Buttons

const createBtn = document.getElementById("createBtn");
const updateBtn = document.getElementById("updateBtn");
const clearBtn = document.getElementById("clearBtn");
const loadBtn = document.getElementById("loadBtn");

// Table

const tableBody = document.getElementById("opportunityTableBody");

// Event Listeners

createBtn.addEventListener("click", createOpportunity);

updateBtn.addEventListener("click", updateOpportunity);

clearBtn.addEventListener("click", clearForm);

loadBtn.addEventListener("click", loadOpportunities);

document.getElementById("dashboardBtn")
.addEventListener("click", function () {

    window.location.href = "organization-dashboard.html";

});

document.getElementById("logoutBtn")
.addEventListener("click", function () {

    localStorage.clear();

    window.location.href = "login.html";

});

// Initial Load

loadOpportunities();

async function loadOpportunities() {

    try {

        const response = await fetch(API_URL, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load opportunities");

        }

        const opportunities = await response.json();

        tableBody.innerHTML = "";

        opportunities.forEach(opportunity => {

            tableBody.innerHTML += `

            <tr>

                <td>${opportunity.id}</td>

                <td>${opportunity.title}</td>

                <td>${opportunity.location}</td>

                <td>${opportunity.status}</td>

                <td>${opportunity.maxVolunteers}</td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editOpportunity(${opportunity.id})">

                        Edit

                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteOpportunity(${opportunity.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Failed to load opportunities.");

    }

}
// =============================
// CREATE OPPORTUNITY
// =============================

async function createOpportunity() {

    const opportunity = {

        title: title.value,

        description: description.value,

        location: location.value,

        requiredSkills: requiredSkills.value,

        startDate: startDate.value,

        endDate: endDate.value,

        maxVolunteers: parseInt(maxVolunteers.value),

        status: status.value,

        organizationId: parseInt(organizationId.value)

    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer " + token

            },

            body: JSON.stringify(opportunity)

        });

        if (!response.ok) {

            throw new Error("Failed to create opportunity");

        }

        alert("Opportunity Created Successfully");

        clearForm();

        loadOpportunities();

    }

    catch (error) {

        console.error(error);

        alert("Unable to create opportunity.");

    }

}



// =============================
// UPDATE OPPORTUNITY
// =============================

async function updateOpportunity() {

    if (opportunityId.value === "") {

        alert("Please select an opportunity.");

        return;

    }

    const opportunity = {

        title: title.value,

        description: description.value,

        location: location.value,

        requiredSkills: requiredSkills.value,

        startDate: startDate.value,

        endDate: endDate.value,

        maxVolunteers: parseInt(maxVolunteers.value),

        status: status.value,

        organizationId: parseInt(organizationId.value)

    };

    try {

        const response = await fetch(

            API_URL + "/" + opportunityId.value,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: "Bearer " + token

                },

                body: JSON.stringify(opportunity)

            }

        );

        if (!response.ok) {

            throw new Error("Failed to update opportunity");

        }

        alert("Opportunity Updated Successfully");

        clearForm();

        loadOpportunities();

    }

    catch (error) {

        console.error(error);

        alert("Unable to update opportunity.");

    }

}
// =============================
// DELETE OPPORTUNITY
// =============================

async function deleteOpportunity(id) {

    if (!confirm("Are you sure you want to delete this opportunity?")) {
        return;
    }

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "DELETE",

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Failed to delete opportunity");

        }

        alert("Opportunity Deleted Successfully");

        loadOpportunities();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete opportunity.");

    }

}

// =============================
// EDIT OPPORTUNITY
// =============================

async function editOpportunity(id) {

    try {

        const response = await fetch(API_URL + "/" + id, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Failed to fetch opportunity");

        }

        const opportunity = await response.json();

        opportunityId.value = opportunity.id;
        title.value = opportunity.title;
        description.value = opportunity.description;
        location.value = opportunity.location;
        requiredSkills.value = opportunity.requiredSkills;

        startDate.value = formatDateTime(opportunity.startDate);
        endDate.value = formatDateTime(opportunity.endDate);

        maxVolunteers.value = opportunity.maxVolunteers;
        status.value = opportunity.status;

        if (opportunity.organization) {

            organizationId.value = opportunity.organization.id;

        }

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load opportunity details.");

    }

}

// =============================
// CLEAR FORM
// =============================

function clearForm() {

    opportunityId.value = "";
    title.value = "";
    description.value = "";
    location.value = "";
    requiredSkills.value = "";
    startDate.value = "";
    endDate.value = "";
    maxVolunteers.value = "";
    status.value = "OPEN";
    organizationId.value = "";

}

// =============================
// FORMAT DATETIME
// =============================

function formatDateTime(dateTime) {

    if (!dateTime) {

        return "";

    }

    return dateTime.substring(0, 16);

}