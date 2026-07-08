// ===============================
// Authentication Check
// ===============================

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

const API_URL = "https://fullstackjava-6tcg.onrender.com/organizations";

let organizations = [];

// ===============================
// Load Organizations
// ===============================

async function loadOrganizations() {

    try {

        const response = await fetch(API_URL, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to fetch organizations");

        }

        organizations = await response.json();

        displayOrganizations(organizations);

    }

    catch (error) {

        console.error(error);

        alert("Error loading organizations.");

    }

}

// ===============================
// Display Organizations
// ===============================

function displayOrganizations(data) {

    const table = document.getElementById("organizationTable");

    table.innerHTML = "";

    data.forEach(org => {

        table.innerHTML += `

        <tr>

            <td>${org.id}</td>

            <td>${org.name}</td>

            <td>${org.contactEmail}</td>

            <td>${org.contactPhone}</td>

            <td>${org.status}</td>

            <td>

                <button
                    class="editBtn"
                    onclick="editOrganization(${org.id})">

                    Edit

                </button>

                <button
                    class="deleteBtn"
                    onclick="deleteOrganization(${org.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Search
// ===============================

document.getElementById("search").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = organizations.filter(org =>

        org.name.toLowerCase().includes(keyword)

    );

    displayOrganizations(filtered);

});

// ===============================
// Add Organization
// ===============================

document.getElementById("addBtn").addEventListener("click", function () {

    window.location.href = "organization-form.html";

});

// ===============================
// Edit Organization
// ===============================

function editOrganization(id) {

    window.location.href =

        "organization-form.html?id=" + id;

}

// ===============================
// Delete Organization
// ===============================

async function deleteOrganization(id) {

    if (!confirm("Delete this organization?")) {

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

            alert("Organization deleted successfully.");

            loadOrganizations();

        }

        else {

            alert("Unable to delete organization.");

        }

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================
// Logout
// ===============================

document.getElementById("logout").addEventListener("click", function () {

    localStorage.clear();

    window.location.href = "login.html";

});

// ===============================
// Initial Load
// ===============================

loadOrganizations();