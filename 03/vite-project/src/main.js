import "./../style.css";
import * as THREE from "three";
import gsap from "gsap";

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
scene.add(axesHelper);

// OBJECT

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "red" }));
scene.add(cube);

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth);
camera.position.z = 2;
camera.position.x = 2;
camera.position.y = 2;
camera.lookAt(cube.position);
scene.add(camera);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.heigth);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  cube.rotation.y = elapsedTime;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
