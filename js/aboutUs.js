const about_me = document.getElementById("about_me");

async function getData() {
  try {
    const response = await fetch("http://127.0.0.1:8000/about_us/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    result.forEach((data) => {
      const div = document.createElement("div");
      div.innerHTML = `
                <div class="profile-card d-flex justify-content-between align-items-center gap-2">
                  <div class="about-profile rounded-circle">
                      <img class="rounded-circle"
                            src="${data.about.profileImage}"
                            alt="profile">
                  </div>
                  <div class="w-100">
                        <h3 class="fs-3 fw-bold">${data.about.first_name} ${data.about.last_name}</h3>
                        <h4 class="fs-5 fw-bolder">${data.contribution}</h4>
                        <p class="fs-6">${data.bio}</p>
                  </div>
                </div>
      `;
      about_me.appendChild(div);
    });
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Await the data when calling the function
getData().then((data) => console.log(data));
