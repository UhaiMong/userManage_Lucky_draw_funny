// Update profile function
document
  .getElementById("profileImageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    const profileImage = document.getElementById("profileImage").files[0];
    formData.append("profileImage", profileImage);
    console.log(token, profileImage);
    // Send the request to the backend
    fetch("http://127.0.0.1:8000/user/profile_update/", {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        if (data.profileImage) {
          showToast("Profile image updated successfully!", "success");
          // Optionally, redirect or update the profile image display on the page
        } else if (data.error) {
          showToast(data.error, "error");
        } else {
          // Handle validation errors
          for (const key in data) {
            showToast(`${key}: ${data[key]}`, "error");
          }
        }
      })
      .catch((error) => {
        showToast(
          "An error occurred while updating the profile image.",
          "error"
        );
        console.error("Error:", error);
      });
  });

// Function to show a toast notification
function showToast(message, type) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.style.display = "block";

  // Hide the toast after a few seconds
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Preview image before upload

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      const blah = document.getElementById("blah");
      blah.src = e.target.result; // Directly sets the src attribute
    };

    reader.readAsDataURL(input.files[0]);
  }
}
