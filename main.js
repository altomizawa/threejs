import { update } from 'three/examples/jsm/libs/tween.module.js';
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { color } from 'three/webgpu';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set( 0, 0, 100 )
camera.lookAt( 0, 0, 0 );

// ADD MODEL
const loader = new GLTFLoader();
loader.load('./models/1963_volkswagen_beetle/scene.gltf', function (gltf) {
  const model = gltf.scene
  scene.add ( model );
  // model.position.set(-30, 0, 4)
  // model.rotation.set(0, 0, 0)

  // // Load Texture
  // const textureLoader = new THREE.TextureLoader();
  // const texture = textureLoader.load('./fur.jpg');

  // // Create a material with the texture
  // const material = new THREE.MeshStandardMaterial({ color: 0xf1ff00})

  // Traverse the model and apply the material to the meshes
  // model.traverse(function (node) {
  //   if (node.isMesh) {
  //     node.material = material;
  //   }
  // })

}, undefined, function ( error ) {
  console.error( error );
} );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement )

// ADD CUBE
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffffff } )
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube )

// const light = new THREE.PointLight( 0xff0000, 1, 100 );
// light.position.set( 50, 50, 50 );
// scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
scene.add( directionalLight );
directionalLight.position.set(10, 5 , 0)

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2);
scene.add( hemisphereLight );

// const ambientLight = new THREE.AmbientLight({ color: 0xff0000, intensity: 0.2})
// scene.add(ambientLight)

// ADD LINES
const materialLine = new THREE.LineBasicMaterial( { color: 0x767a33});

const points = [];
points.push( new THREE.Vector3( -10, 0, 0))
points.push( new THREE.Vector3( 0, 10, 0))
points.push( new THREE.Vector3( 10, 0, 0))

const geometryLine = new THREE.BufferGeometry().setFromPoints( points )

const line = new THREE.Line( geometryLine, materialLine )

scene.add( line )

// RENDER ANIMATION
function animate() {
  renderer.render( scene, camera );

}

const controls = new OrbitControls( camera, renderer.domElement );
renderer.setAnimationLoop( animate )