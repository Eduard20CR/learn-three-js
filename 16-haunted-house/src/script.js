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
 * House
 */

// Group

const house = new THREE.Group();
scene.add(house);

// Walls
const wallsColorTexture = textureLoader.load("/textures/bricks/color.jpg");
wallsColorTexture.colorSpace = THREE.SRGBColorSpace;
const wallsAbientOcclusionTexture = textureLoader.load("/textures/bricks/ambientOcclusion.jpg");
const wallsNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const wallsRoughnessTexture = textureLoader.load("/textures/bricks/roughness.jpg");

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallsColorTexture,
    normalMap: wallsNormalTexture,
    roughness: wallsRoughnessTexture,
    aoMap: wallsAbientOcclusionTexture,
  })
);
walls.position.y = 2.5 / 2;
house.add(walls);

// Roof

const roof = new THREE.Mesh(new THREE.ConeGeometry(3.5, 2, 4, 4, false, Math.PI * 0.25), new THREE.MeshStandardMaterial({ color: "#b35f45" }));
house.add(roof);
roof.position.y = 2.5 + 2 / 2;

// Floor
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
grassColorTexture.colorSpace = THREE.SRGBColorSpace;
const grassAbientOcclusionTexture = textureLoader.load("/textures/grass/ambientOcclusion.jpg");
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load("/textures/grass/roughness.jpg");

grassColorTexture.repeat.set(8, 8);
grassAbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// Door
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
house.add(door);
door.position.z = 2.01;
door.position.y = 2 / 2;

// Bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const mushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, mushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, mushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, mushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, mushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

/**
 * Graves
 */

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.7, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  graves.add(grave);

  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 5.5 + 4;

  const xPosition = Math.sin(angle) * radius;
  const zPosition = Math.cos(angle) * radius;

  grave.castShadow = true;

  grave.position.set(xPosition, 0.35, zPosition);
  grave.rotation.set(0, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3);
}

/**
 * Ghost
 */

const ghost1 = new THREE.PointLight("#ff00ff", 6, 2);
const ghost2 = new THREE.PointLight("#00ffff", 6, 2);
const ghost3 = new THREE.PointLight("#ffff00", 6, 2);
scene.add(ghost1, ghost2, ghost3);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.02);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.0);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// Door Ligth

const doorLight = new THREE.PointLight("#ff7d46", 4, 15);
house.add(doorLight);

doorLight.position.set(0, 2, 3);

/**
 * Fog
 */

const fog = new THREE.Fog("#262837", 1, 20);
scene.fog = fog;

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
camera.position.x = 7;
camera.position.y = 2;
camera.position.z = 7;
// camera.position.x = 0;
// camera.position.y = 2;
// camera.position.z = 4;
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
renderer.setClearColor("#262837");

/**
 * Shadow
 */

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

walls.castShadow = true;
roof.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
moonLight.castShadow = true;
doorLight.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;

walls.receiveShadow = true;
floor.receiveShadow = true;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 5;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 5;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 5;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 5;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  ghost1.position.x = Math.cos(elapsedTime) * (7 + Math.sin(elapsedTime * 0.3));
  ghost1.position.z = Math.sin(elapsedTime) * (7 + Math.sin(elapsedTime * 0.5));

  ghost2.position.x = Math.cos(elapsedTime * 3) * 5;
  ghost2.position.z = Math.sin(elapsedTime * 3) * 5;

  ghost3.position.x = Math.cos(elapsedTime * -0.4) * 7;
  ghost3.position.z = Math.sin(elapsedTime * -0.4) * 7;

  ghost3.position.y = Math.sin(elapsedTime) + 1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
