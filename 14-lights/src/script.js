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
 * Lights
 */

const ambientLight = new THREE.AmbientLight("#fff", 1);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#00ffff", 1.5);
directionalLight.position.set(1, 1, -1);
// scene.add(directionalLight);

const hemisphereLigth = new THREE.HemisphereLight("#ff0000", "#ff00ff", 1);
scene.add(hemisphereLigth);

const pointLigth = new THREE.PointLight("#ff0fff", 1, 10, 1);
pointLigth.position.set(1, -0.5, 1);

// gui.add(pointLigth, "intensity", 0, 10, 0.01);
// gui.add(pointLigth, "distance", 0.1, 10, 0.01);
// gui.add(pointLigth, "decay", 0, 100, 0.01);
// scene.add(pointLigth);

const rectLight = new THREE.RectAreaLight("#0ab", 6, 1, 1);
rectLight.position.set(-2, 0, 2);
rectLight.lookAt(new THREE.Vector3());

// scene.add(rectLight);

const spotLigth = new THREE.SpotLight("#b91", 5, 10, Math.PI * 0.1, 0.25, 1);
spotLigth.position.set(0, 2, 3);
spotLigth.target.position.x = -1;
// scene.add(spotLigth, spotLigth.target);

// gui.add(spotLigth, "intensity", 0, 20, 0.01);
// gui.add(spotLigth, "distance", 0, 20, 0.01);
// gui.add(spotLigth, "angle", 0, Math.PI, 0.01);
// gui.add(spotLigth, "penumbra", 0, 1, 0.01);
// gui.add(spotLigth, "decay", 0, 10, 0.01);

/**
 * Helpers
 */

// const hemisphereLigthHelper = new THREE.HemisphereLightHelper(hemisphereLigth, 0.2);
// scene.add(hemisphereLigthHelper);

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
// scene.add(directionalLightHelper);

// const pointLigthHelper = new THREE.PointLightHelper(pointLigth, 0.2);
// scene.add(pointLigthHelper);

// const spotLigthHelper = new THREE.SpotLightHelper(spotLigth, 0.2);
// scene.add(spotLigthHelper);
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.side = THREE.DoubleSide;
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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
camera.position.x = 2.5;
camera.position.y = 2.5;
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

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // spotLigth.target.position.x = Math.cos(elapsedTime * 10);
  // spotLigth.target.position.z = Math.sin(elapsedTime * 10);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
