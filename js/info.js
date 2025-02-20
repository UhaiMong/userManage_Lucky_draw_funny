const apiURL = "http://127.0.0.1:8000/user/alumnus/";
document.addEventListener("DOMContentLoaded", fetchAlumnus);

// Retrieve Alumni Info
async function fetchAlumnus() {
  const response = await fetch(apiURL);
  const alumnus = await response.json();
  const tableBody = document.getElementById("alumniTable");
  tableBody.innerHTML = "";
  alumnus.forEach((alumni) => {
    let row = `<tr>
                    <td>${alumni.full_name}</td>
                    <td>${alumni.department}</td>
                    <td>${alumni.batch_no}</td>
                    <td>${alumni.contribution}</td>
                    <td>${alumni.hobbies}</td>
                    <td>
                        <button onclick="updateAlumni(${alumni.id})" class="btn btn-warning btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#dataModal">Update</button>
                        <button onclick="deleteAlumni(${alumni.id})" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>`;
    tableBody.innerHTML += row;
  });
}

// Insert alumni info
document
  .getElementById("alumniForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    let alumniId = document.getElementById("_id").value;
    let alumniData = {
      full_name: document.getElementById("fullName").value,
      department: document.getElementById("department").value,
      batch_no: document.getElementById("batchNo").value,
      contribution: document.getElementById("contribution").value,
      hobbies: document.getElementById("hobbies").value,
    };
    if (alumniId) {
      await fetch(apiURL + alumniId + "/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alumniData),
      });
    } else {
      await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alumniData),
      });
    }
    this.reset();
    document.getElementById("_id").value = "";
    fetchAlumnus();
  });

// Update Alumni info.
async function updateAlumni(id) {
  const response = await fetch(apiURL + id + "/");
  const alumni = await response.json();
  document.getElementById("_id").value = alumni.id;
  document.getElementById("fullName").value = alumni.full_name;
  document.getElementById("department").value = alumni.department;
  document.getElementById("batchNo").value = alumni.batch_no;
  document.getElementById("contribution").value = alumni.contribution;
  document.getElementById("hobbies").value = alumni.hobbies;
}

// Delete Alumni info

async function deleteAlumni(id) {
  if (confirm("Are you sure to delete this alumni?")) {
    await fetch(apiURL + id + "/", {
      method: "DELETE",
    });
    fetchAlumnus();
  }
}
