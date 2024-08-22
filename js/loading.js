function showLoading(loading) {
  const loadingElement = document.getElementById("loading");
  if (loading) {
    loadingElement.style.display = "";
  }
}

function hideLoading(loading) {
  const loadingElement = document.getElementById("loading");
  if (!loading) {
    loadingElement.style.display = "none";
  }
}
