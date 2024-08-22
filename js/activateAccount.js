// Extracting uid and token
const uid64 = "extracted_uid64";
const token = "extracted_token";

// Function to handle account activation
function activateAccount(uid64, token) {
  fetch(
    `https://manage-user-rest-api.onrender.com/user/active/${uid64}/${token}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        window.location.href = "/login.html";
      } else {
        alert(data.message);
        window.location.href = "/signup.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// login url with uid and token
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const uid64 = urlParams.get("uid64");
  const token = urlParams.get("token");

  if (uid64 && token) {
    activateAccount(uid64, token);
  }
});
