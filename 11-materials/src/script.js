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

// TEXTURES

const textureLoader = new THREE.TextureLoader();

const doorColor = textureLoader.load("/textures/door/color.jpg");
doorColor.colorSpace = THREE.SRGBColorSpace;
const doorAlpha = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusion = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const doorHeight = textureLoader.load("/textures/door/height.jpg");
const doorMetalness = textureLoader.load("/textures/door/metalness.jpg");
const doorNormal = textureLoader.load("/textures/door/normal.jpg");
const doorRoughness = textureLoader.load("/textures/door/roughness.jpg");

const matcapsTexture01 = textureLoader.load("/textures/matcaps/1.png");
const matcapsTexture02 = textureLoader.load("/textures/matcaps/2.png");
const matcapsTexture03 = textureLoader.load("/textures/matcaps/3.png");
const matcapsTexture04 = textureLoader.load("/textures/matcaps/4.png");
const matcapsTexture05 = textureLoader.load("/textures/matcaps/5.png");
const matcapsTexture06 = textureLoader.load("/textures/matcaps/6.png");
const matcapsTexture07 = textureLoader.load("/textures/matcaps/7.png");
const matcapsTexture08 = textureLoader.load("/textures/matcaps/8.png");
const matcapsTexture09 = textureLoader.load("/textures/matcaps/9.png");
matcapsTexture01.colorSpace = THREE.SRGBColorSpace;
matcapsTexture02.colorSpace = THREE.SRGBColorSpace;
matcapsTexture03.colorSpace = THREE.SRGBColorSpace;
matcapsTexture04.colorSpace = THREE.SRGBColorSpace;
matcapsTexture05.colorSpace = THREE.SRGBColorSpace;
matcapsTexture06.colorSpace = THREE.SRGBColorSpace;
matcapsTexture07.colorSpace = THREE.SRGBColorSpace;
matcapsTexture08.colorSpace = THREE.SRGBColorSpace;
matcapsTexture08.colorSpace = THREE.SRGBColorSpace;
const gradientTexture03 = textureLoader.load("/textures/gradients/3.jpg");
const gradientTexture05 = textureLoader.load("/textures/gradients/5.jpg");
gradientTexture03.generateMipmaps = false;
gradientTexture05.generateMipmaps = false;
gradientTexture03.magFilter = THREE.NearestFilter;
gradientTexture05.magFilter = THREE.NearestFilter;
gradientTexture03.minFilter = THREE.NearestFilter;
gradientTexture05.minFilter = THREE.NearestFilter;

// MESH

/*
  - MeshBasicMaterial
    En este nos permite poner texturas y colores, y no se afecta por la luz
*/
// const material = new THREE.MeshBasicMaterial({ map: doorColor });

// material.color = new THREE.Color("red");
// material.transparent = true;
// material.opacity = 0.5;
// material.wireframe = true;
// material.side = THREE.DoubleSide;
// material.alphaMap = doorAlpha;

/*
  - MeshNormalMaterial
    Esta setea una textura que es igual desde cualquier angulo, y pone los colores
    que utilizan las imagenes de Normal
*/
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

/*
  - MeshMatcapMaterial 
    Es para poner una textura que da mucha performance, pero desde cualquier angulo
    siempre se va a ver igual
*/
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapsTexture08;

/*
  - MeshDepthMaterial
    Este no es muy utilizado, es para ver lo profundo o lejano que esta un objeto a 
    la camara
*/
// const material = new THREE.MeshDepthMaterial();
// material.matcap = matcapsTexture08;

/*
  - MeshLambertMaterial
    Este necesita luz para poder verse, pose la misma propiedades que el MeshBasicMaterial
    y otros mas que tiene que ver con la luz. Es es que tiene mas performance de los que
    tienen luz.

    Esta muy bueno para utilizar, pero no es bueno para cosas realista, puede que tenga
    patrones extraños y no se vea del todo bien.
*/
// const material = new THREE.MeshLambertMaterial();
// material.matcap = matcapsTexture08;

/*
  - MeshPhongMaterial;
    Es menos performant que  el MeshLambertMaterial, pero no habran glitches raros.
    A pequeña escala la performance no importa mucho
*/
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color("red");

/*
  - MeshToonMaterial;
    Tiene un estilo caricaturesco, tiene un performance promedio. Por defecto solo 
    tiene 2 steps, uno mas claro y otro con sombra. Se pueden añadir mas sombras con
    un GradientTexture en en GradientMap
*/
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture03;

/*
  - MeshStandardMaterial;
    Utiliza tecnicas de renderizados basados en la vida real. Necesita la luz, pero con
    un algoritmo mejor y con mejores parametro como metalness y roughness. Se llama
    "Standard", porque PBR se ha convertido en el standard en muchos softwares.
*/
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.5;
material.roughness = 0.7;

const geometrySphere = new THREE.SphereGeometry(0.5, 16, 16);
const geometryTorus = new THREE.TorusGeometry(0.5, 0.3, 16, 32);
const geometryPlane = new THREE.PlaneGeometry(1, 1, 1, 1);
const mesh1 = new THREE.Mesh(geometrySphere, material);
const mesh2 = new THREE.Mesh(geometryTorus, material);
const mesh3 = new THREE.Mesh(geometryPlane, material);
scene.add(mesh1, mesh2, mesh3);

mesh1.position.x = -2;
mesh2.position.x = 2;

/**
 * Ligth
 */

/**
 * ambientLigth
 */
// const ambientLigth = new THREE.AmbientLight("#ffffff", 1);
// scene.add(ambientLigth);

/**
 * ambientLigth
 */
const pointLight = new THREE.PointLight("#ffffff", 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 5;
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

  mesh1.rotation.y = 0.1 * elapsedTime;
  mesh2.rotation.y = 0.1 * elapsedTime;
  mesh3.rotation.y = 0.1 * elapsedTime;

  mesh1.rotation.x = -0.15 * elapsedTime;
  mesh2.rotation.x = -0.15 * elapsedTime;
  mesh3.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
