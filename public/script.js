// ======================
// LOAD COMPANY DATA
// ======================
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

// ======================
// THREE.JS BACKGROUND (SUBTLE STARTUP STYLE)
// ======================
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

// LIGHT PARTICLES (NOT OVERKILL)
const geo = new THREE.BufferGeometry();
const count = 2000;

const pos = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  pos[i] = (Math.random() - 0.5) * 10;
}

geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

const mat = new THREE.PointsMaterial({
  size: 0.015,
  color: 0x6ea8ff,
  transparent: true,
  opacity: 0.8
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

// ======================
// MOUSE PARALLAX (SUBTLE)
// ======================
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / innerWidth - 0.5) * 2;
  const y = (e.clientY / innerHeight - 0.5) * 2;

  camera.position.x = x * 0.4;
  camera.position.y = -y * 0.4;
});

// ======================
// IMMERSIVE SECTION INTERACTION
// ======================
const exp = document.querySelector(".experience");

exp.addEventListener("mousemove", (e) => {
  const r = exp.getBoundingClientRect();

  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;

  exp.style.transform = `
    perspective(800px)
    rotateX(${(y - 0.5) * -10}deg)
    rotateY(${(x - 0.5) * 10}deg)
  `;
});

exp.addEventListener("mouseleave", () => {
  exp.style.transform = "none";
});
