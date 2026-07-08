const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const phonenumber = document.getElementById("phonenumber").value.trim();
    const role = document.getElementById("role").value;

    // Validation

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        phonenumber === "" ||
        role === ""
    ) {

        message.style.color = "red";
        message.innerText = "Please fill all the fields.";
        return;
    }

    // Email Validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        message.style.color = "red";
        message.innerText = "Please enter a valid email address.";
        return;
    }

    // Phone Validation (Starts with 6-9)

    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phonenumber)) {

        message.style.color = "red";
        message.innerText = "Enter a valid 10-digit phone number.";
        return;
    }

    // Password Validation

    if (password.length < 8) {

        message.style.color = "red";
        message.innerText = "Password must contain at least 8 characters.";
        return;
    }

    // Request Object

    const registerData = {

        name: name,
        email: email,
        password: password,
        phonenumber: phonenumber,
        role: role,

        // Required by your backend DTO
        status: "PENDING"

    };

    try {

        const response = await fetch("https://fullstackjava-6tcg.onrender.com/auth/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(registerData)

        });

        const data = await response.json();

        if (response.ok) {

            message.style.color = "green";
            message.innerHTML =
                "✅ Registration Successful!<br>Redirecting to Login...";

            registerForm.reset();

            setTimeout(() => {

                window.location.href = "login.html";

            }, 2000);

        }

        else {

            message.style.color = "red";
            message.innerText =
                data.message || "Registration failed.";

        }

    }

    catch (error) {

        console.error(error);

        message.style.color = "red";
        message.innerText = "Unable to connect to the server.";

    }

});