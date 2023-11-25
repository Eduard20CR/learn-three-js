import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */

const imageColorSource = "/textures/door/color.jpg";
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(imageColorSource);
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({ map: texture });

const geometry = new THREE.BoxGeometry(1, 1, 1);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 1;
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

  // Update controls
  controls.update();

  // RenderJ
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

//
// TEXTURAS
//
/* 

COLOR
- SOLO VAN A COLOREAR LAS COSAS
- SE PONE EN LAS CARAS PARA DARLES COLORES BONITOS

ALPHA
- ESTA EN ESCALA DE GRISES
- ES LAS QUE DECIDE QUE SE VE Y QUE NO SE VE, BLANCO SE VE, NEGRO NO SE VE

HEIGHT
- ESTA EN ESCALA DE GRISES
- ES LAS QUE DECIDE LA PROFUNDIDAS DE LAS COSAS 
- HACE QUE LOS VERTICES SE HAGAN MAS PARA ARRIBA O MAS PARA ABAJO, PARA DAR
  PROFUNDIDAD EN LAS GEOMETRIAS

NORMAL
- ES DE COLOR MORADO
- SE UTILIZA PARA DAR DETALLES
- NO SE NECESITAN MUCHOS VERTICES PARA VER COMO SE APLICA
- NO MUEVE A LOS VERTICES
- TRABAJAN MAS QUE TODO CON LA LUZ, ESTO DARA DETALLES A LAS GEOMETRIAS
  PERO SON TRABAJANDO CON LA LUZ Y LOS REFLEJOS
- TIENE MEJOR PERFOMACE QUE LOS "HEIGHT CON MUCHAS SUBDIVISIONES"

AMBIENT OCLUSION
- ESTA EN ESCALA DE GRISES
- SE UTILIZA PARA SIMULAS SOMBRAS
- NO ES FISICAMENTE CORRECTAS
- AYUDA A DAR CONTRASTE Y DETALLES

METALNESS
- ESTA EN ESCALA DE GRISES
- BLACO ES METALICO, NEGRO NO ES METALICO
- UTILIZADO PARA HACER QUE LAS COSAS SE REFLEJEN

ROUGHNESS
- ESTA EN ESCALA DE GRISES
- TRABAJA JUNTO CON EL "METALNESS"
- BLANCO ES ROUGH, NEGRO ES SMOTH
- SE UTILIZA PARA DAR DISIPACION DE LAS LUZ

*/
