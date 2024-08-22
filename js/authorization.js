// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  const currentPage = window.location.pathname;

  if (
    !token &&
    !currentPage.endsWith("login.html") &&
    !currentPage.endsWith("signup.html") &&
    !currentPage.endsWith("account_active.html")
  ) {
    window.location.href = "login.html";
  }
  const navLinks = document.querySelectorAll(".navLinkAuth");
  navLinks.forEach((link) => {
    if (token) {
      link.style.display = "none";
    } else {
      link.className = "";
    }
  });
});
