import "./../style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// SIZES
const sizes = {
  width: 800,
  heigth: 600,
};

// CANVAS
const canvas = document.querySelector("#webgl");

// SCENE
const scene = new THREE.Scene();

// HELPER
const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// OBJECT

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "red", wireframe: true }));
scene.add(cube);

// CAMERA
const aspectRatio = sizes.width / sizes.heigth;
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = 3;
scene.add(camera);

// ORBIT CONTROLS
const controlls = new OrbitControls(camera, canvas);
controlls.enableDamping = true;
controlls.enablePan = true;

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.heigth);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * cameraRadious;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * cameraRadious;
  // camera.position.y = cursor.y * movementReach * -1;

  controlls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
