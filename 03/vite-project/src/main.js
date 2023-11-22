import * as THREE from "three";

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
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;

mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth);
camera.position.z = 3;
scene.add(camera);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.heigth);
renderer.render(scene, camera);

setInterval(() => {
  renderer.render(scene, camera);
}, 1000 / 60);
