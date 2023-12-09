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
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, -1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.x = 1024;
directionalLight.shadow.mapSize.y = 1024;
directionalLight.shadow.camera.far = 5;
directionalLight.shadow.camera.left = -1.5;
directionalLight.shadow.camera.right = 1.5;
directionalLight.shadow.camera.top = -1.5;
directionalLight.shadow.camera.bottom = 1.5;
// This one does no work with THREE.PCFSoftShadowMap, it works work witdh THREE.PCFShadowMap
// directionalLight.shadow.radius = 10;

gui.add(directionalLight, "intensity").min(0).max(3).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);

const directionalLigthCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
directionalLigthCameraHelper.visible = false;
scene.add(directionalLight, directionalLigthCameraHelper);

// Spot Ligth
const spotLigth = new THREE.SpotLight("#ffffff", 3, 10, Math.PI * 0.3);
const spotLigthCameraHelper = new THREE.CameraHelper(spotLigth.shadow.camera);
spotLigth.position.set(0, 2, 2);
spotLigth.castShadow = true;
// spotLigth.shadow.radius = 3;
spotLigth.shadow.mapSize.x = 1024;
spotLigth.shadow.mapSize.y = 1024;
spotLigth.shadow.camera.near = 0.1;
spotLigthCameraHelper.visible = false;
scene.add(spotLigth, spotLigth.target, spotLigthCameraHelper);

// Poing Ligth

const pointLigth = new THREE.PointLight(0xffffff, 3.7);
pointLigth.castShadow = true;
pointLigth.position.set(-1, 1, 0);
pointLigth.shadow.mapSize.x = 1024;
pointLigth.shadow.mapSize.y = 1024;
pointLigth.shadow.camera.near = 0.2;
pointLigth.shadow.camera.far = 5;

const pointLigthCameraHelper = new THREE.CameraHelper(pointLigth.shadow.camera);
pointLigthCameraHelper.visible = false;

scene.add(pointLigth, pointLigthCameraHelper);

// TEXTURES

const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");
bakedShadow.colorSpace = THREE.SRGBColorSpace;
// MATERIAL

/**
 * Materials
 */
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedShadow });
const bakedMaterialCircle = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, alphaMap: simpleShadow });
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

const sphereShadowPlaneGeometry = new THREE.PlaneGeometry(1.5, 1.5);
const sphereShadowPlaneMesh = new THREE.Mesh(sphereShadowPlaneGeometry, bakedMaterialCircle);
sphereShadowPlaneMesh.rotation.x = -Math.PI * 0.5;
sphereShadowPlaneMesh.position.y = plane.position.y + 0.1;
scene.add(sphere, plane, sphereShadowPlaneMesh);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  const radius = 1;
  sphere.position.x = Math.cos(elapsedTime * 4) * radius;
  // sphere.position.z = Math.sin(elapsedTime * 2) * radius;
  sphere.position.y = Math.abs(Math.cos(elapsedTime * 4)) * 0.5;

  const max = 1;
  let opacity;
  if (sphere.position.y >= max) {
    opacity = 0;
  } else if (sphere.position.y <= 0) {
    opacity = 1;
  } else {
    opacity = max - sphere.position.y;
  }

  sphereShadowPlaneMesh.material.opacity = opacity;
  sphereShadowPlaneMesh.position.set(sphere.position.x, plane.position.y + 0.01, sphere.position.z);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * Cuando el codigo de three js inicia,  hace un analzis de todos los elementos que son compatibles con la luz,
 * se pondra desde la perspectiva de los elementos y hara un shadow map (esto lo utilizara para colorear los objetos)
 * que es como un mapa que indica donde va la sombra en un elemento y ademas mostrara donde se van a ver las sombras
 * que proyecta los meshes.
 *
 * Todo esto es gracias al Shadow map
 */
