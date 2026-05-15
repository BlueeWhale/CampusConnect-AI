// =========================
// THREE JS BACKGROUND
// =========================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 30;

// GEOMETRY
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  wireframe: true,
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// LIGHT
const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(20, 20, 20);

scene.add(pointLight);

// ANIMATION
function animate() {

  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();

// RESPONSIVE
window.addEventListener("resize", () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===============================
// CAMPUSCONNECT AI - MAIN JS
// ===============================

console.log("CampusConnect AI Loaded 🚀");

// ===============================
// NAVIGATION BUTTONS
// ===============================

// Explore Events button
const exploreBtn = document.querySelector(".primary-btn");
if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    window.location.href = "events.html";
  });
}

// Organizer Panel button (IMPORTANT FIX)
const organizerBtn = document.querySelector(".secondary-btn");
if (organizerBtn) {
  organizerBtn.addEventListener("click", () => {
    window.location.href = "organizer-dashboard.html";
  });
}

// ===============================
// SIMPLE UI ANIMATION
// ===============================

const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.style.transform = "translateY(0)";
      card.style.opacity = "1";
    }
  });
});