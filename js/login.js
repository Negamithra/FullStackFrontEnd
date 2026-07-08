const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get Input Values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic Validation
    if (email === "" || password === "") {

        message.style.color = "red";
        message.innerText = "Please fill all the fields.";

        return;
    }

    // Login Request Object
    const loginData = {

        email: email,
        password: password

    };

    try {

        const response = await fetch("https://fullstackjava-6tcg.onrender.com/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(loginData)

        });

        let data;

        try {

            data = await response.json();

        } catch (error) {

            data = {

                message: "Unexpected server response."

            };

        }

        if (response.ok) {

            // Success Message
            message.style.color = "green";
            message.innerHTML = "✅ " + data.message + "<br>Redirecting...";

            // Store JWT Token
            localStorage.setItem("token", data.token);

            // Store Role
            localStorage.setItem("role", data.role);
            localStorage.setItem("userId", data.userId);
            // Redirect Based on Role
            setTimeout(() => {

                switch (data.role) {

                    case "PLATFORM_ADMIN":
                        window.location.href = "admin-dashboard.html";
                        break;

                    case "ORGANIZATION_COORDINATOR":
                        window.location.href = "organization-dashboard.html";
                        break;

                    case "VOLUNTEER":
                        window.location.href = "volunteer-dashboard.html";
                        break;

                    default:
                        window.location.href = "index.html";

                }

            }, 1500);

        }

        else {

            message.style.color = "red";
            message.innerText = data.message;

        }

    }

    catch (error) {

        console.error(error);

        message.style.color = "red";
        message.innerText = "Unable to connect to the server.";

    }

});