import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 500 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Galaxy
 */

let particleGeometry = null;
let particlesMaterial = null;
let galaxy = null;

const parameters = {};
parameters.count = 1000;
parameters.radius = 1;
parameters.branch = 10;
parameters.particleSize = 0.01;
parameters.spin = 1;

const generateGalaxy = () => {
  if (galaxy !== null) {
    particleGeometry.dispose();
    particlesMaterial.dispose();
    scene.remove(galaxy);
  }

  particleGeometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(parameters.count * 3);

  for (let i = 0; i < parameters.count; i++) {
    const newI = i * 3;

    const branchAngle = ((i % parameters.branch) / parameters.branch) * Math.PI * 2;
    const radius = Math.random() * parameters.radius;
    const spinAngle = parameters.spin * radius;

    const x = Math.cos(branchAngle + spinAngle) * radius;
    const y = Math.sin(branchAngle + spinAngle) * radius;
    const z = Math.cos(i) * 0.5;

    vertices[newI] = x;
    vertices[newI + 1] = y;
    vertices[newI + 2] = z;
  }
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  particlesMaterial = new THREE.PointsMaterial({
    size: parameters.particleSize,
    sizeAttenuation: true,
    depthWrite: true,
    blending: THREE.AdditiveBlending,
  });

  galaxy = new THREE.Points(particleGeometry, particlesMaterial);

  scene.add(galaxy);
};

generateGalaxy();

gui.add(parameters, "radius").min(0.1).max(50).step(1).onFinishChange(generateGalaxy);
gui.add(parameters, "count").min(10).max(100000).step(1).onFinishChange(generateGalaxy);
gui.add(parameters, "particleSize").min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);
gui.add(parameters, "branch").min(1).max(50).step(1).onFinishChange(generateGalaxy);
gui.add(parameters, "spin").min(-10).max(10).step(0.1).onFinishChange(generateGalaxy);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// camera.position.x = 3;
// camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  parameters.spin = Math.sin(elapsedTime);
  generateGalaxy();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
