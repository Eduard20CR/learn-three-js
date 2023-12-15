import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Meshes
 */

/**
 * Particles
 */
// Geometry
const particleGeometry = new THREE.SphereGeometry(1, 32, 32);

const customParticleGeometry = new THREE.BufferGeometry();
const count = 5000;
const range = 10;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * range;
  colors[i] = Math.random();
}
customParticleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
customParticleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// Material
const particleTexture01 = textureLoader.load("/textures/particles/1.png");
const particleTexture02 = textureLoader.load("/textures/particles/2.png");
const particleTexture03 = textureLoader.load("/textures/particles/3.png");
const particleTexture04 = textureLoader.load("/textures/particles/4.png");
const particleTexture05 = textureLoader.load("/textures/particles/5.png");
const particleTexture06 = textureLoader.load("/textures/particles/6.png");
const particleTexture07 = textureLoader.load("/textures/particles/7.png");
const particleTexture08 = textureLoader.load("/textures/particles/8.png");
const particleTexture09 = textureLoader.load("/textures/particles/9.png");
const particleTexture10 = textureLoader.load("/textures/particles/10.png");
const particleTexture11 = textureLoader.load("/textures/particles/11.png");
const particleTexture12 = textureLoader.load("/textures/particles/12.png");
const particleTexture13 = textureLoader.load("/textures/particles/13.png");

const particleMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  transparent: true,
  vertexColors: true,
  //   color: "#ff88cc",
  alphaMap: particleTexture02,
  //   alphaTest: 0.001,
  //   depthTest: false,
  depthWrite: false,
});

// Points

const points = new THREE.Points(customParticleGeometry, particleMaterial);
const point2 = points.clone();
point2.position.y = 10;
scene.add(points, point2);

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

  // points.rotation.y += 0.0001 * Math.PI;

  for (let i = 0; i < count; i++) {
    const geometryArray = points.geometry.attributes.position;
    // const x = i * 3;
    const y = i * 3 + 1;
    const z = i * 3 + 2;

    geometryArray.array[y] = Math.sin(elapsedTime + geometryArray.array[z]);
    geometryArray.needsUpdate = true;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
