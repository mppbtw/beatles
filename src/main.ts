import './style.css'
import * as THREE from 'three'

let isSpinning = true;

document.addEventListener("keypress", (e) => {
  if (e.key == ' ') {
    isSpinning = !isSpinning;
  }
})
let rotation_multiplier = 1;

document.addEventListener('mousemove', (e) => {
  const middleX = window.innerWidth/2;
  const middleY = window.innerHeight/2;
  rotation_multiplier = 3 - (3 *(Math.sqrt((e.x-middleX)**2 + (e.y-middleY)**2))/Math.max(window.innerWidth, window.innerHeight));
  rotation_multiplier = 10**rotation_multiplier
  rotation_multiplier *= 0.01
  console.log(rotation_multiplier);

})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div id="bg"></div>
<div id="teckst" style="color: red;">
  <h2>The Beatles!!!</h2>

    <p>The Beatles are a rocky road band which made lots of sings in the olden days</p>

    <p>they had four members:</p>
    <ul>
      <li>Paul McArtery</li>
      <li>George Harrasment</li>
      <li>Bingo Starr</li>
      <li>James Lemon</li>
    </ul>

    <p>To perceive the liknesses of the four beatles please kindly consult the undulating tetrahedron</p>
</div>
`;



const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();

let john = loader.load('/john.jpg');
let paul = loader.load('/paul.jpg');
let george = loader.load('/george.jpg');
let ringo = loader.load('/ringo.jpg');
let beatles = loader.load('/beatles.webp');
john.colorSpace = THREE.SRGBColorSpace;
paul.colorSpace = THREE.SRGBColorSpace;
george.colorSpace = THREE.SRGBColorSpace;
ringo.colorSpace = THREE.SRGBColorSpace;
beatles.colorSpace = THREE.SRGBColorSpace;

george.repeat.set(2,2);
george.offset = new THREE.Vector2(-0.26, -0.23)

paul.repeat.set(3,3);
paul.offset = new THREE.Vector2(-0.1,-1.3);
paul.rotation = -0.3;

ringo.repeat.set(1, 3);
ringo.offset = new THREE.Vector2(0.1,-0.8);
ringo.rotation = 0;

john.offset = new THREE.Vector2(-0.8, -0.5);
john.repeat.set(2, 2);

scene.background = beatles;

const geometry = new THREE.TetrahedronGeometry(0.5, 0);
geometry.clearGroups();
geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);
geometry.addGroup(6, 3, 2);
geometry.addGroup(9, 3, 3);

const materials = [
  new THREE.MeshBasicMaterial({map: john}),
  new THREE.MeshBasicMaterial({map: paul}),
  new THREE.MeshBasicMaterial({map: ringo}),
  new THREE.MeshBasicMaterial({map: george}),
];

const mesh = new THREE.Mesh(geometry, materials);
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

let rotX = 0;
let rotY = 0.5;

function generateColours(i: number): string {
    let r = Math.sin(i*0.3 + 0) * 127 + 128;
    let g = Math.sin(i*0.3 + 2) * 127 + 128;
    let b = Math.sin(i*0.3 + 4) * 127 + 128;
    return 'rgb('+r+',' + g + ',' + b + ')';
}

let ticks = 0;

function animate() {
  ticks += 0.05;

  document.getElementById("teckst").style.color = generateColours(Date.now()/70);
  document.getElementById("teckst").style.textShadow = Math.sin(ticks)*8 + "px " + Math.sin(ticks)*8 + "px 0px black";

  if (isSpinning) {
    mesh.rotation.x = rotX;
    mesh.rotation.y = rotY;
    rotX += rotation_multiplier * (1/80);
    rotY += rotation_multiplier * (1/60);

    mesh.position.x = 0.15*Math.sin(rotX);
    mesh.position.y = 0.15*Math.cos(rotX);
  } else {
    console.log(mesh.rotation.x, mesh.rotation.y);
  }

	renderer.render( scene, camera );

}


