const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

// Authentication Check
if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";
}

if (role !== "PLATFORM_ADMIN") {

    alert("Access Denied!");

    window.location.href = "login.html";
}

const API_URL = "https://fullstackjava-6tcg.onrender.com/organizations";

const form = document.getElementById("organizationForm");
const title = document.getElementById("title");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// ==============================
// Edit Mode
// ==============================

if (id) {

    title.innerText = "Edit Organization";

    loadOrganization();

}

// ==============================
// Load Organization
// ==============================

async function loadOrganization() {

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to fetch organization");

        }

        const org = await response.json();

        document.getElementById("name").value = org.name;
        document.getElementById("mission").value = org.mission;
        document.getElementById("address").value = org.address;
        document.getElementById("contactEmail").value = org.contactEmail;
        document.getElementById("contactPhone").value = org.contactPhone;
        document.getElementById("foundedYear").value = org.foundedYear;

        // If your response contains coordinatorId
        if (org.coordinatorId != null) {

            document.getElementById("coordinatorId").value =
                org.coordinatorId;

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to load organization.");

    }

}

// ==============================
// Save Organization
// ==============================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const organization = {

        name: document.getElementById("name").value.trim(),

        mission: document.getElementById("mission").value.trim(),

        address: document.getElementById("address").value.trim(),

        contactEmail: document.getElementById("contactEmail").value.trim(),

        contactPhone: document.getElementById("contactPhone").value.trim(),

        foundedYear: Number(
            document.getElementById("foundedYear").value
        ),

        coordinatorId: Number(
            document.getElementById("coordinatorId").value
        )

    };

    try {

        let response;

        // Update
        if (id) {

            response = await fetch(API_URL + "/" + id, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify(organization)

            });

        }

        // Create
        else {

            response = await fetch(API_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify(organization)

            });

        }

        if (response.ok) {

            alert(id
                ? "Organization Updated Successfully"
                : "Organization Created Successfully");

            window.location.href = "manage-organizations.html";

        }

        else {

            const error = await response.text();

            alert(error);

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error.");

    }

});