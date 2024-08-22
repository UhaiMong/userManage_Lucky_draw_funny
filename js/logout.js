function logoutUser() {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  if (token) {
    fetch("https://manage-user-rest-api.onrender.com/user/logout/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Clear token and user_id from localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");

          // Redirect to login or home page
          window.location.href = "/login.html";
        } else {
          console.log("Error logging out:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    console.log("No token found, user is not logged in");
  }
}

document.getElementById("logoutButton").addEventListener("click", logoutUser);
