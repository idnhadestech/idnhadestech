// LOAD API
fetch("/api/company")
  .then(r => r.json())
  .then(d => {
    document.getElementById("company").innerHTML = `
      <b>${d.name}</b><br/>
      Founder: ${d.founder}<br/>
      Founded: ${d.founded}<br/>
      Location: ${d.location}
    `;
  });

// THREE JS
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha: true
});

renderer.setSize(innerWidth, innerHeight);

// PARTICLES
const geo = new THREE.BufferGeometry();
const count = 2000;
const pos = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  pos[i] = (Math.random() - 0.5) * 10;
}

geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

const mat = new THREE.PointsMaterial({
  size: 0.015,
  color: 0x6ea8ff
});

const points = new THREE.Points(geo, mat);
scene.add(points);

// ANIMATE
function animate() {
  requestAnimationFrame(animate);

  points.rotation.y += 0.0005;
  points.rotation.x += 0.0002;

  renderer.render(scene, camera);
}

animate();

// MOUSE PARALLAX
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / innerWidth - 0.5) * 2;
  const y = (e.clientY / innerHeight - 0.5) * 2;

  camera.position.x = x * 0.4;
  camera.position.y = -y * 0.4;
});

// RESIZE
window.addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
});

// ======================
// SCROLL REVEAL SYSTEM
// ======================
const revealElements = document.querySelectorAll(
  ".card, .hero, .experience"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// ======================
// LOADER CONTROL
// ======================
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hide");
  }, 1800);
});

// ======================
// APPLE SCROLL CINEMATIC SYSTEM
// ======================

// smooth scroll depth tracking
let scrollYPos = 0;

window.addEventListener("scroll", () => {
  scrollYPos = window.scrollY;

  // 3D camera depth shift (Apple feel)
  camera.position.z = 5 + scrollYPos * 0.002;

  // background slow parallax
  points.rotation.y += 0.0002;
});

// ======================
// BLUR → SHARP SCROLL EFFECT
// ======================
const sections = document.querySelectorAll(".card, .hero, .experience");

const blurObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.filter = "blur(0px)";
        entry.target.style.transform = "translateY(0px) scale(1)";
        entry.target.style.opacity = "1";
      } else {
        entry.target.style.filter = "blur(6px)";
        entry.target.style.transform = "translateY(20px) scale(0.98)";
        entry.target.style.opacity = "0.6";
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((el) => {
  el.style.transition = "all 0.8s ease";
  blurObserver.observe(el);
});

// ======================
// SCROLL MOMENTUM FEEL (SMOOTH DRIFT)
// ======================
let targetY = 0;
let currentY = 0;

function smoothScroll() {
  targetY = window.scrollY;
  currentY += (targetY - currentY) * 0.08;

  document.body.style.transform = `translateY(${-currentY * 0.02}px)`;

  requestAnimationFrame(smoothScroll);
}

smoothScroll();

// ======================
// ACTIVE LINK ON SCROLL
// ======================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;

    if (top >= offset && top < offset + height) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ======================
// NAVBAR SCROLL EFFECT
// ======================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.transform = "scale(0.95)";
    navbar.style.opacity = "0.9";
  } else {
    navbar.style.transform = "scale(1)";
    navbar.style.opacity = "1";
  }
});

// ======================
// MOBILE MENU
// ======================
const toggle = document.getElementById("menu-toggle");
const links = document.querySelector(".nav-links");

toggle.onclick = () => {
  links.classList.toggle("show");
};
