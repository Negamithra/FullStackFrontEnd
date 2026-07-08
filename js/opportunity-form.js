const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}

if (role !== "PLATFORM_ADMIN" &&
    role !== "ORGANIZATION_COORDINATOR") {

    alert("Access Denied.");

    window.location.href = "login.html";

}

const API_URL = "https://fullstackjava-6tcg.onrender.com/opportunities";

const form = document.getElementById("opportunityForm");
const title = document.getElementById("title");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// ===================================
// Edit Mode
// ===================================

if (id) {

    title.innerText = "Edit Opportunity";

    loadOpportunity();

}

// ===================================
// Load Opportunity
// ===================================

async function loadOpportunity() {

    try {

        const response = await fetch(API_URL + "/" + id, {

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load opportunity");

        }

        const opportunity = await response.json();

        document.getElementById("titleInput").value =
            opportunity.title;

        document.getElementById("description").value =
            opportunity.description;

        document.getElementById("location").value =
            opportunity.location;

        document.getElementById("startDate").value =
            formatDateForInput(opportunity.startDate);

        document.getElementById("endDate").value =
            formatDateForInput(opportunity.endDate);

        document.getElementById("maxVolunteers").value =
            opportunity.maxVolunteers;

        document.getElementById("status").value =
            opportunity.status;

        document.getElementById("organizationId").value =
            opportunity.organizationId;

    }

    catch (error) {

        console.error(error);

        alert("Unable to load opportunity.");

    }

}

// ===================================
// Format DateTime
// ===================================

function formatDateForInput(date) {

    const d = new Date(date);

    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());

    return d.toISOString().slice(0,16);

}

// ===================================
// Save Opportunity
// ===================================

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const opportunity = {

        title:
            document.getElementById("titleInput").value.trim(),

        description:
            document.getElementById("description").value.trim(),

        location:
            document.getElementById("location").value.trim(),

        startDate:
            document.getElementById("startDate").value,

        endDate:
            document.getElementById("endDate").value,

        maxVolunteers:
            Number(document.getElementById("maxVolunteers").value),

        status:
            document.getElementById("status").value,

        organizationId:
            Number(document.getElementById("organizationId").value)

    };

    try {

        let response;

        if(id){

            response = await fetch(API_URL + "/" + id,{

                method:"PUT",

                headers:{

                    "Content-Type":"application/json",

                    "Authorization":"Bearer " + token

                },

                body:JSON.stringify(opportunity)

            });

        }

        else{

            response = await fetch(API_URL,{

                method:"POST",

                headers:{

                    "Content-Type":"application/json",

                    "Authorization":"Bearer " + token

                },

                body:JSON.stringify(opportunity)

            });

        }

        if(response.ok){

            alert(id
                ? "Opportunity Updated Successfully"
                : "Opportunity Created Successfully");

            window.location.href="manage-opportunities.html";

        }

        else{

            const error = await response.text();

            alert(error);

        }

    }

    catch(error){

        console.error(error);

        alert("Server Error.");

    }

});