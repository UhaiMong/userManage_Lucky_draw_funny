// User Registration

const registrationHandler = (event) => {
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
  if (password === confirm_password) {
    fetch("http://127.0.0.1:8000/user/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
        window.location.href = "./login.html";
      })
      .catch((error) => console.error("Error:", error));
  } else {
    document.getElementById("not_matched").innerText =
      "Password doesn't matched";
  }
};

// Login handler

const loginHandler = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");
  const user = { username, password };
  fetch("http://127.0.0.1:8000/user/login/", {
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
        console.log("hello: ", data);
        window.location.href = "/profile.html";
      } else {
        console.error("Unexpected response:", data);
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
