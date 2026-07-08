// ===============================
// API URL
// ===============================

const API_URL = "https://fullstackjava-6tcg.onrender.com/organizations";

// ===============================
// Authentication
// ===============================

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}

if (
    role !== "PLATFORM_ADMIN" &&
    role !== "ORGANIZATION_COORDINATOR"
) {

    alert("Access Denied");

    window.location.href = "login.html";

}

// ===============================
// Form Elements
// ===============================

const coordinatorId =
localStorage.getItem("userId");

const name = document.getElementById("name");

const mission = document.getElementById("mission");

const address = document.getElementById("address");

const contactEmail = document.getElementById("contactEmail");

const contactPhone = document.getElementById("contactPhone");

const foundedYear = document.getElementById("foundedYear");

const coordinatorId = document.getElementById("coordinatorId");

const tableBody = document.getElementById("organizationTableBody");

// ===============================
// Button Events
// ===============================

document.getElementById("createBtn")
.addEventListener("click", createOrganization);

document.getElementById("updateBtn")
.addEventListener("click", updateOrganization);

document.getElementById("clearBtn")
.addEventListener("click", clearForm);

document.getElementById("loadBtn")
.addEventListener("click", loadOrganizations);

document.getElementById("dashboardBtn")
.addEventListener("click", function () {

    window.location.href = "organization-dashboard.html";

});

document.getElementById("logoutBtn")
.addEventListener("click", function () {

    localStorage.clear();

    window.location.href = "login.html";

});

// ===============================
// Initial Load
// ===============================

loadOrganizations();

// ===============================
// Load Organizations
// ===============================

async function loadOrganizations() {

    try {

        const response = await fetch(API_URL, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load organizations");

        }

        const organizations = await response.json();

        tableBody.innerHTML = "";

        organizations.forEach(org => {

            tableBody.innerHTML += `

            <tr>

                <td>${org.id}</td>

                <td>${org.name}</td>

                <td>${org.mission}</td>

                <td>${org.address}</td>

                <td>${org.contactEmail}</td>

                <td>${org.contactPhone}</td>

                <td>${org.foundedYear}</td>

                <td>${org.coordinatorName ?? "-"}</td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editOrganization(${org.id})">

                        Edit

                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteOrganization(${org.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Failed to load organizations.");

    }

}
// ===============================
// CREATE ORGANIZATION
// ===============================

async function createOrganization() {

    const organization = {

        name: name.value,

        mission: mission.value,

        address: address.value,

        contactEmail: contactEmail.value,

        contactPhone: contactPhone.value,

        foundedYear: parseInt(foundedYear.value),

        coordinatorId: parseInt(coordinatorId)

    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer " + token

            },

            body: JSON.stringify(organization)

        });

        if (!response.ok) {

            throw new Error("Failed to create organization");

        }

        alert("Organization Created Successfully");

        clearForm();

        loadOrganizations();

    }

    catch (error) {

        console.error(error);

        alert("Unable to create organization.");

    }

}

// ===============================
// EDIT ORGANIZATION
// ===============================

async function editOrganization(id) {

    try {

        const response = await fetch(API_URL + "/" + id, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to fetch organization");

        }

        const org = await response.json();

        organizationId.value = org.id;

        name.value = org.name;

        mission.value = org.mission;

        address.value = org.address;

        contactEmail.value = org.contactEmail;

        contactPhone.value = org.contactPhone;

        foundedYear.value = org.foundedYear;

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load organization.");

    }

}

// ===============================
// UPDATE ORGANIZATION
// ===============================

async function updateOrganization() {

    if (organizationId.value === "") {

        alert("Please select an organization to update.");

        return;

    }

    const organization = {

        name: name.value,

        mission: mission.value,

        address: address.value,

        contactEmail: contactEmail.value,

        contactPhone: contactPhone.value,

        foundedYear: parseInt(foundedYear.value),

       coordinatorId: parseInt(coordinatorId)
    };

    try {

        const response = await fetch(
            API_URL + "/" + organizationId.value,
            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: "Bearer " + token

                },

                body: JSON.stringify(organization)

            }
        );

        if (!response.ok) {

            throw new Error("Failed to update organization");

        }

        alert("Organization Updated Successfully");

        clearForm();

        loadOrganizations();

    }

    catch (error) {

        console.error(error);

        alert("Unable to update organization.");

    }

}

// ===============================
// DELETE ORGANIZATION
// ===============================

async function deleteOrganization(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this organization?"
    );

    if (!confirmDelete) {

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

            throw new Error("Failed to delete organization");

        }

        alert("Organization Deleted Successfully");

        loadOrganizations();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete organization.");

    }

}

// ===============================
// CLEAR FORM
// ===============================

function clearForm() {

    organizationId.value = "";

    name.value = "";

    mission.value = "";

    address.value = "";

    contactEmail.value = "";

    contactPhone.value = "";

    foundedYear.value = "";



}
