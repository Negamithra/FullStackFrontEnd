const userName = localStorage.getItem("userName");
const role = localStorage.getItem("role");

if (!localStorage.getItem("token")) {

    window.location.href = "login.html";

}

if (role !== "ORGANIZATION_COORDINATOR") {

    alert("Access Denied");

    window.location.href = "login.html";

}

document.getElementById("welcomeText").innerText =
    "Welcome, " + (userName || "Coordinator");

document
    .getElementById("organizationBtn")
    .addEventListener("click", function () {

        window.location.href =
            "organization-management.html";

    });

document
    .getElementById("opportunityBtn")
    .addEventListener("click", function () {

        window.location.href =
            "opportunity-management.html";

    });

document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {

        localStorage.clear();

        window.location.href = "login.html";

    });