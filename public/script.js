// LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hide");
});

// NAVBAR SCROLL
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;
  if (scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// MENU TOGGLE
const toggle = document.getElementById("menu-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    links.classList.toggle("active");
  });
}

// COMPANY DATA
const company = document.getElementById("company");

if (company) {
  fetch("/api")
    .then((res) => res.json())
    .then((data) => {
      company.innerText = data.name || "HADES TECH";
    })
    .catch(() => {
      company.innerText = "HADES TECH";
    });
}

// THREE JS
const canvas = document.getElementById("bg");

if (canvas && window.THREE) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });

  renderer.setSize(innerWidth, innerHeight);
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
}

// SCROLL ANIMATION (FIXED NO DUPLICATE)
const sectionsAll = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

sectionsAll.forEach((sec) => observer.observe(sec));
