function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// Fetch contoh backend
fetch("/api/company")
  .then(res => res.json())
  .then(data => {
    console.log("Company:", data);
  });
