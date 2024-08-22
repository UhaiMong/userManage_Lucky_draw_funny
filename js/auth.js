// User Registration
let loading = true;
const registrationHandler = (event) => {
  showLoading(loading);
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("password2");
  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };
  // console.log(info);
  fetch("https://manage-user-rest-api.onrender.com/user/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      const errors = data.errors;
      const passwordContent = document.getElementById("passwordContent");

      // Clear previous content
      passwordContent.innerHTML = "";

      if (errors) {
        const errorList = document.createElement("ul");
        errorList.className = "list-group text-danger";
        // Handle username errors
        if (errors.username) {
          errors.username.forEach((msg, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item text-danger";
            listItem.textContent = `${index + 1}. ${msg}`;
            errorList.appendChild(listItem);
          });
        }

        // Handle password errors
        if (errors.password) {
          errors.password.forEach((msg, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item text-danger";
            listItem.textContent = `${index + 1}. ${msg}`;
            errorList.appendChild(listItem);
          });
        }

        passwordContent.appendChild(errorList);
      } else {
        // Handle generic error
        passwordContent.textContent = data.error || "An error occurred.";
      }
      if (data.message === "success") {
        hideLoading((loading = false));
        Toastify({
          text: "Registration successful! Now, please verify your account.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "#4caf50",
          stopOnFocus: true,
        }).showToast();

        setTimeout(() => {
          window.location.href = "/account_active.html";
        }, 3000);
      }
    })
    .catch((error) => console.error("Error:", error));
};
// Login handler

const loginHandler = (event) => {
  showLoading(loading);
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");
  const user = { username, password };
  fetch("https://manage-user-rest-api.onrender.com/user/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token && data.user_id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);

        if (data.message === "success") {
          hideLoading((loading = false));
          Toastify({
            text: "Login Successful! Redirecting to your profile page...",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "#4caf50",
            stopOnFocus: true,
          }).showToast();

          setTimeout(() => {
            console.log("Redirecting to profile page");
            window.location.href = "/profile.html";
          }, 3000);
        }
      } else {
        console.error("Unexpected response:", data);
        document.getElementById("login-error").innerText = `${data.error}`;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};
