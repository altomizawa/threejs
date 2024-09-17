;import { Tween, update } from 'three/examples/jsm/libs/tween.module.js';
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { gsap } from 'gsap/gsap-core';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set( 0, 8, 20 );
camera.lookAt( 0, 0, 0 );

// ADD Axes Helpers
// const axesHelper = new THREE.AxesHelper(5);  // Size of the axes
// scene.add(axesHelper);

// CREATE GROUP FOR MODELS
const group = new THREE.Group();
scene.add( group );

// ADD MODEL
let model
const loader = new GLTFLoader();
loader.load('./models/hobbit_house/scene.gltf', function(gltf) {
  model = gltf.scene;
  model.castShadow = true;  // Model will cast shadows
  model.receiveShadow = true;  // Model will receive shadows
  model.position.set(10, 0, 0)
  model.scale.set(0.5, 0.5, 0.5)
  group.add(model)
}, undefined, function(error) {
  console.error(error);
});

// ADD SECOND MODEL
let model2
const loader2 = new GLTFLoader();
loader2.load('./models/shanghai_gardens/scene.gltf', function(gltf) {
  model2 = gltf.scene;
  model2.castShadow = true;  // Model2 will cast shadows
  model2.receiveShadow = true;  // Model2 will receive shadows
  model2.scale.set(0.08,0.08,0.08)
  model2.position.set(0, -2s, 0)
  group.add(model2)
}, undefined, function(error) {
  console.error(error);
});

// ADD THIRD MODEL
let model3
const loader3 = new GLTFLoader();
loader3.load('./models/floating_island/scene.gltf', function(gltf) {
  model3 = gltf.scene;
  model3.castShadow = true;  // Model3 will cast shadows
  model3.receiveShadow = true;  // Model3 will receive shadows
  model3.scale.set(0.004,0.004,0.004)
  model3.position.set(-10, 0, 0)
  group.add(model3)
}, undefined, function(error) {
  console.error(error);
});

group.position.set(0,0,0)

// Enable shadow map in renderer
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.shadowMap.enabled = true;  // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Optional: softer shadows
renderer.setSize(windowWidth, windowHeight);
renderer.setClearColor(0x000000, 0); 
const card1 = document.getElementById('card1')
card1.appendChild(renderer.domElement);

// Add PointLight with Shadows
const pointLight1 = new THREE.PointLight(0xffffff,400, 100);
pointLight1.position.set(-0.8, 5, 8);
pointLight1.castShadow = true;  // Enable shadow casting for the light
scene.add(pointLight1);
// const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 1);
// scene.add(pointLightHelper1);

// const pointLight = new THREE.PointLight(0xffffff, 2, 100);
// pointLight.position.set(, 10, -0.7);
// pointLight.castShadow = true;  // Enable shadow casting for the light
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);




// // Rect Area Light
// const width = 10;
// const height = 10;
// const intensity = 0.1;
// const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
// rectLight.position.set(0, 0, 3);
// rectLight.lookAt(0, 0, 0);
// scene.add(rectLight);

// // ADD AMBIENT LIGHT
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

scene.background = null;  // Or a texture using THREE.TextureLoader

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// RENDER ANIMATION
function animate() {
  // console.log(model)
  // model.rotation.y += 0.017
  if (model){
    model.rotation.y += 0.02
  }
  if (model2){
    model2.rotation.y += 0.02
  }
  if (model3){
    model3.rotation.y += 0.02
  }

  renderer.render(scene, camera);
  controls.update();
}


renderer.setAnimationLoop(animate);

// ADD EVENT LISTENER FOR ARROW KEYS
let isKeyDown = false;
window.addEventListener('keydown', keyControl)
function keyControl(e) {
  if (e.key === 'ArrowLeft') {
    rotateCounterClockWise()
  }
  if (e.key === 'ArrowRight') {
    rotateClockWise()
  }
}

// FUNCTION ROTATE MODEL
const next = document.getElementById('next-button')
next.addEventListener('click', ()=>{
  console.log('clicked')
  rotateClockWise();
})

const back = document.getElementById('back-button')
back.addEventListener('click', ()=>{
  console.log('clicked')
  rotateCounterClockWise();
})

function rotateClockWise() {
  let currentX = group.position.x;

  // Create a GSAP timeline to control the animation
  const timeline = gsap.timeline();

  // Add a rotation animation to the timeline
  timeline.to(group.position, {
    x: currentX-10 , // Rotate by 90 degrees
    duration: 1, // Rotate in 1 second
    ease: 'power2.inOut', // Use a power2 easing function
  })
}
function rotateCounterClockWise() {
  let currentX = group.position.x

  // Create a GSAP timeline to control the animation
  const timeline = gsap.timeline();

  // Add a rotation animation to the timeline
  timeline.to(group.position, {
    x: currentX + 10, // Rotate by 90 degrees
    duration: 1, // Rotate in 1 second
    ease: 'power2.inOut', // Use a power2 easing function
  })
}