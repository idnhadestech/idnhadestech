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
