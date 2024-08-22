const content = document.getElementById("dynamic_profile_info");

function getToken() {
  return localStorage.getItem("token");
}
let loading = true;
// Function to fetch user profile
async function fetchUserProfile() {
  showLoading(loading);
  const token = getToken();
  const response = await fetch(
    "https://manage-user-rest-api.onrender.com/user/profile/",
    {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

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
    loading = false;
    hideLoading(loading);
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
