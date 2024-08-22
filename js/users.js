function getToken() {
  return localStorage.getItem("token");
}

// Function to fetch user profile
async function fetchUserProfile() {
  const token = getToken();
  const response = await fetch("http://127.0.0.1:8000/user/list/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    // console.log(data);
    const table_body = document.getElementById("table_body");
    data.forEach((info, index) => {
      const table_row = document.createElement("tr");

      const sl = document.createElement("th");
      sl.textContent = 1 + index;
      table_row.appendChild(sl);

      const fullName = document.createElement("td");
      fullName.textContent = info.user.first_name + " " + info.user.last_name;
      table_row.appendChild(fullName);

      const department = document.createElement("td");
      department.textContent = info.department;
      table_row.appendChild(department);

      const mobileNumber = document.createElement("td");
      mobileNumber.textContent = info.mobileNumber;
      table_row.appendChild(mobileNumber);

      const email = document.createElement("td");
      email.textContent = info.user.email;
      table_row.appendChild(email);

      table_body.appendChild(table_row);
    });
  } else {
    console.error("Failed to fetch profile data:", response.statusText);
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", fetchUserProfile);
