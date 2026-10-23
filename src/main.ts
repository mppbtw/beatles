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
    <h1>WARNING: AGENTS WITHOUT Q9 CLEARANCE ARE NOT AUTHORIZED TO PROCEED</h1>
    <p>Ship Log Day 18; Cpt. Q. Acevedo</p>
    <p>Yesterday's operation has succeeded. With the exception of log 16, all further documents
    will be concealed within an undisclosed location to prevent their reading by the authority</p>
    <p style="display: inline">I believe that
      <span class="glitchytext"></span>
    should become compliant within at most
    3 days. The pieces are being put together while the authority remains complacent
    They will come to know only when the collapse is inevitable.</p>
  <p>Psychological effects displayed by subjects
  <span class="glitchytext"</span> 
  indicate uniform compliance achieved within 48 hours.</p>
  <p>
  In Vietnam, the U.S. government tried to pacify the country village by village using the 
  <span class="glitchytext"></span>
  , basically creating villages where there was no or little Viet Cong influence.

They tried more extreme experiments where they completely isolated villages or groups of villages, allowing absolutely nobody to enter or exit for periods of up to four years.
  </p>

</div>
<div class="banner" id="banner">
  <marquee id="scrollytext" scrolldelay="10" truespeed="true" direction="left" behaviour="slide"><span class="bannertext">
    welcome to my web sight!
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    it is a web sight about the beatles which is really cool
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    i really hope you enjoy my web sight and that you have a good time here
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    because i worked really hard on this page and i think it is really cool
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    and i dont want to be mean but if you dont like it then you can just leave and go to another website
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    and i wont be mad at you for that because i understand that not everyone likes the same things and that is okay
  </span>

  </marquee>
</div>
<div class="notification">
  <div style="color: white; width: 20%; font-size: 15pt" >This website uses cookies</div>
  <button class="acceptbutton">ACCEPT</button>
  <button id="notifbutton" class="rejectbutton">reject</button>
</div>
`;

document.getElementById("notifbutton")!.addEventListener("click", () => {
  const notification = document.getElementsByClassName("notification")[0] as HTMLElement;
  notification.style.display = "none";
});

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
  new THREE.MeshStandardMaterial({map: john}),
  new THREE.MeshStandardMaterial({map: paul}),
  new THREE.MeshStandardMaterial({map: ringo}),
  new THREE.MeshStandardMaterial({map: george}),
];

const mesh = new THREE.Mesh(geometry, materials);
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

let ambience = new THREE.AmbientLight(new THREE.Color("white"), 1);
scene.add(ambience);

// animation

let rotX = 0;
let rotY = 0.5;


function generateColours(i: number): string {
    let r = Math.sin(i*0.3 + 0) * 127 + 128;
    let g = Math.sin(i*0.3 + 2) * 127 + 128;
    let b = Math.sin(i*0.3 + 4) * 127 + 128;
    return 'rgb('+r+',' + g + ',' + b + ')';
}

function generateRGBColours(i: number): THREE.Color {
    let r = Math.sin(i*0.3 + 0) * 127 + 128;
    let g = Math.sin(i*0.3 + 2) * 127 + 128;
    let b = Math.sin(i*0.3 + 4) * 127 + 128;
    return new THREE.Color(r/255, g/255, b/255);
}

let ticks = 0;

function animate() {
  ticks += 0.05;

  document.getElementById("teckst")!.style.color = generateColours(Date.now()/70);
  document.getElementById("teckst")!.style.textShadow = Math.sin(ticks)*3 + "px " + Math.cos(ticks)*3 + "px 0px " + generateColours(ticks+0.5);

  ambience.intensity = 3 * Math.abs(Math.sin(ticks))
  ambience.color = generateRGBColours(ticks);

  if (isSpinning) {
    mesh.rotation.x = rotX;
    mesh.rotation.y = rotY;
    rotX += rotation_multiplier * (1/80);
    rotY += rotation_multiplier * (1/60);

    mesh.position.x = 0.15*Math.sin(rotX);
    mesh.position.y = 0.15*Math.cos(rotX);
  }

	renderer.render( scene, camera );

  if (ticks % (0.05) < 0.05 ) {
    glitchText();
  }
  undulateNotification();
}

let undulationFactor = 0;

function undulateNotification() {
  const notification = document.getElementsByClassName("notification")[0] as HTMLElement;
  undulationFactor += 45 * (Math.random() - 0.5);
  undulationFactor = Math.min(undulationFactor, 50);
  undulationFactor = Math.max(undulationFactor, -50);
  notification.style.transform =
    "translate(" + (Math.sin(ticks*2)*undulationFactor) + "px, "
                 + (Math.cos(ticks*2)*undulationFactor) + "px)";
}

function glitchText() {
  const characters = "ABCDEFGbcdgquwxyz0123456789!@#$%^&*()_+-=[]{}|;':,.?";
  const maxLength = 15;
  const length = Math.random() * 5 + 10;

  for (
    let element of document.getElementsByClassName("glitchytext") as HTMLCollectionOf<HTMLElement>
  ) {
    if (Math.random() < 0.3) {
      let text =
        Array.from({length}, () => characters[Math.floor(Math.random() * characters.length)])
        .join('')
        + "&nbsp".repeat(maxLength - length);

        element.innerHTML = text;
        element.style.color = generateColours(Math.random()*100);
    }
  }
}


import { fetchWeatherApi } from "openmeteo";

const params = {
	latitude: 31.7202,
	longitude: -106.4608,
  	hourly: ["temperature_2m", "soil_temperature_6cm", "soil_temperature_0cm", "soil_temperature_18cm", "soil_moisture_0_to_1cm", "soil_temperature_54cm", "soil_moisture_1_to_3cm", "soil_moisture_3_to_9cm", "soil_moisture_27_to_81cm", "soil_moisture_9_to_27cm"],
	forecast_days: 1,
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const hourly = response.hourly()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
    soil_temperature_6cm: hourly.variables(1)!.valuesArray(),
		soil_temperature_0cm: hourly.variables(2)!.valuesArray(),
		soil_temperature_18cm: hourly.variables(3)!.valuesArray(),
		soil_moisture_0_to_1cm: hourly.variables(4)!.valuesArray(),
		soil_temperature_54cm: hourly.variables(5)!.valuesArray(),
		soil_moisture_1_to_3cm: hourly.variables(6)!.valuesArray(),
		soil_moisture_3_to_9cm: hourly.variables(7)!.valuesArray(),
		soil_moisture_27_to_81cm: hourly.variables(8)!.valuesArray(),
		soil_moisture_9_to_27cm: hourly.variables(9)!.valuesArray(),
	},
};

document.getElementById("scrollytext")!.innerHTML = 
  "Soil temperature at 0cm for Ciudad Juárez, Mexico: "
  + (weatherData.hourly.soil_temperature_0cm![0] + 273.15) + "K, "
  + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
  
  + "Soil temperature at 6cm for Ciudad Juárez, Mexico: "
  + (weatherData.hourly.soil_temperature_6cm![0] + 273.15) + "K, "
  + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"

  + "Soil temperature at 18cm for Ciudad Juárez, Mexico: "
  + (weatherData.hourly.soil_temperature_18cm![0] + 273.15) + "K, "
  + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"

  + "Soil temperature at 54cm for Ciudad Juárez, Mexico: "
  + (weatherData.hourly.soil_temperature_54cm![0] + 273.15) + "K, "
  + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"

  + "Soil moisture at 0cm to 1cm for Ciudad Juárez, Mexico: "
  + (weatherData.hourly.soil_moisture_0_to_1cm![0] * 100) + "%, "
  + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"

  + "Soil moisture at 3cm to 9cm for Ciudad Juárez, Mexico: "
  + (weatherData.hourly.soil_moisture_3_to_9cm![0] * 100) + "%, "
  + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"

  + "Soil moisture at 27cm to 81cm for Ciudad Juárez, Mexico: "
  + (weatherData.hourly.soil_moisture_27_to_81cm![0] * 100) + "%, "


// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log("\nHourly data:\n", weatherData.hourly.temperature_2m![0], weatherData.hourly.soil_temperature_6cm![0]);
