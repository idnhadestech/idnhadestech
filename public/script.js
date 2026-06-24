// ===== LOADER =====
const loader = document.getElementById("loader");

function hideLoader() {
  if (!loader) return;
  loader.style.opacity = "0";
  setTimeout(() => (loader.style.display = "none"), 300);
}

setTimeout(hideLoader, 500);

// ===== FETCH API =====
fetch("/api/company")
  .then((res) => res.json())
  .then((data) => {
    const el = document.getElementById("company");
    if (!el) return;

    el.innerHTML = `
      <b>${data.name}</b><br/>
      Founder: ${data.founder}<br/>
      Founded: ${data.founded}<br/>
      Location: ${data.location}
    `;
  })
  .catch(() => {
    const el = document.getElementById("company");
    if (el) el.innerText = "Failed load data";
  });

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(".card, .hero, .experience");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
});

revealEls.forEach((el) => observer.observe(el));

// ===== NAV ACTIVE =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 200;
    const height = sec.offsetHeight;

    if (scrollY >= offset && scrollY < offset + height) {
      current = sec.id;
    }
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

// ===== THREE JS =====
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
    alpha: true
  });

  renderer.setSize(innerWidth, innerHeight);

  const geometry = new THREE.BufferGeometry();

  const count = innerWidth < 768 ? 800 : 2000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({ size: 0.02 });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  camera.position.z = 3;

  function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0003;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });
}
