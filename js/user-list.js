// ==========================================
// Authentication
// ==========================================

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

// ==========================================
// API URL
// ==========================================

const API_URL = "https://fullstackjava-6tcg.onrender.com/users";

let users = [];

// ==========================================
// Page Load
// ==========================================

window.onload = function () {

    loadUsers();

};

// ==========================================
// Load Users
// ==========================================

async function loadUsers() {

    try {

        const response = await fetch(API_URL, {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load users.");

        }

        users = await response.json();

        displayUsers(users);

    }

    catch (error) {

        console.error(error);

        alert("Failed to load users.");

    }

}

// ==========================================
// Display Users
// ==========================================

function displayUsers(data) {

    const table = document.getElementById("userTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="7" style="text-align:center;">

                    No Users Found

                </td>

            </tr>

        `;

        return;

    }

    data.forEach(user => {

        table.innerHTML += `

            <tr>

                <td>${user.id}</td>

                <td>${user.name}</td>

                <td>${user.email}</td>

                <td>${user.phonenumber}</td>

                <td>${user.role}</td>

                <td>${user.status}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editUser(${user.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteUser(${user.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}

// ==========================================
// Search Users
// ==========================================

document.getElementById("search")
.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filteredUsers = users.filter(user =>

        user.name.toLowerCase().includes(keyword)

        ||

        user.email.toLowerCase().includes(keyword)

    );

    displayUsers(filteredUsers);

});

// ==========================================
// Edit User
// ==========================================

function editUser(id) {

    window.location.href = "user-form.html?id=" + id;

}

// ==========================================
// Delete User
// ==========================================

async function deleteUser(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this user?"

    );

    if (!confirmDelete) {

        return;

    }

    try {

        const response = await fetch(

            API_URL + "/" + id,

            {

                method: "DELETE",

                headers: {

                    "Authorization": "Bearer " + token

                }

            }

        );

        if (!response.ok) {

            throw new Error("Delete failed.");

        }

        alert("User deleted successfully.");

        loadUsers();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete user.");

    }

}

// ==========================================
// Logout
// ==========================================

document.getElementById("logout")
.addEventListener("click", function () {

    if (confirm("Do you want to logout?")) {

        localStorage.clear();

        window.location.href = "login.html";

    }

});