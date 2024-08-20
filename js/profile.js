const content = document.getElementById("dynamic_profile_info");

function getToken() {
  return localStorage.getItem("token");
}

// Function to fetch user profile
async function fetchUserProfile() {
  const token = getToken();
  const response = await fetch("http://127.0.0.1:8000/user/profile/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    let profileImage;
    const image = data[0].profileImage;
    if (image) {
      profileImage = image;
    } else {
      profileImage = "../images/profile.jpg";
    }
    const div = document.createElement("div");
    div.innerHTML = `
                    <div>
                        <div class="photo">
                            <img class="profile-img" src="${profileImage}"
                                    alt="profile avatar">
                        </div>
                        <h2>${data[0]?.user?.first_name} ${data[0]?.user?.last_name}</h2>
                        <div class="qr-code">

                        </div>
                        <h3>Student</h3>
                        <h3>${data[0]?.user?.username}</h3>
                        <hr>
                        <p><strong>Bandarban University</strong> Rowado main road
                        <p>
                        <p>Bandarban Sadar <strong>4600</strong></p>
                        <p>Email: ${data[0]?.user?.email}</p>
                    </div>        
      `;
    content.appendChild(div);
  } else {
    console.error("Failed to fetch profile data:", response.statusText);
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", fetchUserProfile);

// redirect to update page
document
  .getElementById("profileUpdate")
  .addEventListener("click", profileUpdateHandler);

function profileUpdateHandler() {
  window.location.href = "/profileUpdate.html";
}

// fetch default data

async function fetchDefaultData() {
  const token = getToken();

  const response = await fetch("http://127.0.0.1:8000/user/profile/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    document.getElementById("username").value = "tanmoy";
    document.getElementById("first_name").value = data[0]?.user.first_name;
    document.getElementById("last_name").value = data[0]?.user.last_name;
    document.getElementById("email").value = data[0]?.user.email;
  } else {
    console.error("Failed to fetch profile data:", response.statusText);
  }
}
// Call the function when the page loads
document.addEventListener("DOMContentLoaded", fetchDefaultData);

// Update profile function
async function updateUserProfile(event) {
  event.preventDefault();
  const token = getToken();

  const formData = new FormData();
  formData.append("username", document.getElementById("username").value);
  formData.append("first_name", document.getElementById("first_name").value);
  formData.append("last_name", document.getElementById("last_name").value);
  formData.append("email", document.getElementById("email").value);

  const profileImage = document.getElementById("profileImage").files[0];
  if (profileImage) {
    formData.append("profileImage", profileImage);
  }

  const response = await fetch("http://127.0.0.1:8000/user/profile_update/", {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  });

  if (response.ok) {
    const result = await response.json();
    console.log("Profile updated successfully:", result);
  } else {
    console.error("Failed to update profile:", response.statusText);
  }
}

// document
//   .getElementById("profile-form")
//   .addEventListener("submit", updateUserProfile);
