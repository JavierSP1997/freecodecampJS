let xp = 0;
let salud = 100;
let oro = 50;
let armaActual = 0;
let luchando;
let saludMonstruo;
let inventario = ["palo"];

const boton1 = document.querySelector('#button1');
const boton2 = document.querySelector("#button2");
const boton3 = document.querySelector("#button3");
const texto = document.querySelector("#text");
const textoXP = document.querySelector("#xpText");
const textoSalud = document.querySelector("#healthText");
const textoOro = document.querySelector("#goldText");
const statsMonstruo = document.querySelector("#monsterStats");
const nombreMonstruo = document.querySelector("#monsterName");
const saludMonstruoTexto = document.querySelector("#monsterHealth");
const armas = [
  { name: 'palo', power: 5 },
  { name: 'daga', power: 30 },
  { name: 'martillo de garra', power: 50 },
  { name: 'espada', power: 100 }
];
const monstruos = [
  {
    name: "monstruo baboso",
    level: 2,
    health: 15
  },
  {
    name: "bestia dentada",
    level: 8,
    health: 60
  },
  {
    name: "dragón",
    level: 20,
    health: 300
  }
]
const lugares = [
  {
    name: "plaza del pueblo",
    "button text": ["Ir a la tienda", "Ir a la cueva", "Luchar contra el dragón"],
    "button functions": [irTienda, irCueva, lucharDragon],
    text: "Estás en la plaza del pueblo. Ves un cartel que dice \"Tienda\"."
  },
  {
    name: "tienda",
    "button text": ["Comprar 10 de salud (10 de oro)", "Comprar arma (30 de oro)", "Ir a la plaza del pueblo"],
    "button functions": [comprarSalud, comprarArma, irPlaza],
    text: "Entras en la tienda."
  },
  {
    name: "cueva",
    "button text": ["Luchar contra monstruo baboso", "Luchar contra bestia dentada", "Ir a la plaza del pueblo"],
    "button functions": [lucharBaba, lucharBestia, irPlaza],
    text: "Entras en la cueva. Ves algunos monstruos."
  },
  {
    name: "lucha",
    "button text": ["Atacar", "Esquivar", "Huir"],
    "button functions": [atacar, esquivar, irPlaza],
    text: "Estás luchando contra un monstruo."
  },
  {
    name: "matar monstruo",
    "button text": ["Ir a la plaza del pueblo", "Ir a la plaza del pueblo", "Ir a la plaza del pueblo"],
    "button functions": [irPlaza, irPlaza, huevoDePascua],
    text: 'El monstruo grita "¡Arg!" mientras muere. Ganas puntos de experiencia y encuentras oro.'
  },
  {
    name: "perder",
    "button text": ["¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?"],
    "button functions": [reiniciar, reiniciar, reiniciar],
    text: "Has muerto. &#x2620;"
  },
  { 
    name: "ganar", 
    "button text": ["¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?"], 
    "button functions": [reiniciar, reiniciar, reiniciar], 
    text: "¡Derrotaste al dragón! ¡GANASTE EL JUEGO! &#x1F389;" 
  },
  {
    name: "huevo de pascua",
    "button text": ["2", "8", "¿Ir a la plaza del pueblo?"],
    "button functions": [elegirDos, elegirOcho, irPlaza],
    text: "Encuentras un juego secreto. Elige un número arriba. Se seleccionarán diez números aleatorios entre 0 y 10. Si el número que elegiste coincide con alguno, ¡ganas!"
  }
];

// inicializar botones
boton1.onclick = irTienda;
boton2.onclick = irCueva;
boton3.onclick = lucharDragon;

function actualizar(lugar) {
  statsMonstruo.style.display = "none";
  boton1.innerText = lugar["button text"][0];
  boton2.innerText = lugar["button text"][1];
  boton3.innerText = lugar["button text"][2];
  boton1.onclick = lugar["button functions"][0];
  boton2.onclick = lugar["button functions"][1];
  boton3.onclick = lugar["button functions"][2];
  texto.innerHTML = lugar.text;
}

function irPlaza() {
  actualizar(lugares[0]);
}

function irTienda() {
  actualizar(lugares[1]);
}

function irCueva() {
  actualizar(lugares[2]);
}

function comprarSalud() {
  if (oro >= 10) {
    oro -= 10;
    salud += 10;
    textoOro.innerText = oro;
    textoSalud.innerText = salud;
  } else {
    texto.innerText = "No tienes suficiente oro para comprar salud.";
  }
}

function comprarArma() {
  if (armaActual < armas.length - 1) {
    if (oro >= 30) {
      oro -= 30;
      armaActual++;
      textoOro.innerText = oro;
      let nuevaArma = armas[armaActual].name;
      texto.innerText = "Ahora tienes un " + nuevaArma + ".";
      inventario.push(nuevaArma);
      texto.innerText += " En tu inventario tienes: " + inventario;
    } else {
      texto.innerText = "No tienes suficiente oro para comprar un arma.";
    }
  } else {
    texto.innerText = "¡Ya tienes el arma más poderosa!";
    boton2.innerText = "Vender arma por 15 de oro";
    boton2.onclick = venderArma;
  }
}

function venderArma() {
  if (inventario.length > 1) {
    oro += 15;
    textoOro.innerText = oro;
    let armaVendida = inventario.shift();
    texto.innerText = "Has vendido un " + armaVendida + ".";
    texto.innerText += " En tu inventario tienes: " + inventario;
  } else {
    texto.innerText = "¡No vendas tu única arma!";
  }
}

function lucharBaba() {
  luchando = 0;
  irLuchar();
}

function lucharBestia() {
  luchando = 1;
  irLuchar();
}

function lucharDragon() {
  luchando = 2;
  irLuchar();
}

function irLuchar() {
  actualizar(lugares[3]);
  saludMonstruo = monstruos[luchando].health;
  statsMonstruo.style.display = "block";
  nombreMonstruo.innerText = monstruos[luchando].name;
  saludMonstruoTexto.innerText = saludMonstruo;
}

function atacar() {
  texto.innerText = "El " + monstruos[luchando].name + " ataca.";
  texto.innerText += " Tú lo atacas con tu " + armas[armaActual].name + ".";
  salud -= valorAtaqueMonstruo(monstruos[luchando].level);
  if (aciertaMonstruo()) {
    saludMonstruo -= armas[armaActual].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    texto.innerText += " Fallas el golpe.";
  }
  textoSalud.innerText = salud;
  saludMonstruoTexto.innerText = saludMonstruo;
  if (salud <= 0) {
    perder();
  } else if (saludMonstruo <= 0) {
    if (luchando === 2) {
      ganarJuego();
    } else {
      derrotarMonstruo();
    }
  }
  if (Math.random() <= .1 && inventario.length !== 1) {
    texto.innerText += " Tu " + inventario.pop() + " se rompe.";
    armaActual--;
  }
}

function valorAtaqueMonstruo(nivel) {
  const golpe = (nivel * 5) - (Math.floor(Math.random() * xp));
  console.log(golpe);
  return golpe > 0 ? golpe : 0;
}

function aciertaMonstruo() {
  return Math.random() > .2 || salud < 20;
}

function esquivar() {
  texto.innerText = "Esquivas el ataque del " + monstruos[luchando].name;
}

function derrotarMonstruo() {
  oro += Math.floor(monstruos[luchando].level * 6.7);
  xp += monstruos[luchando].level;
  textoOro.innerText = oro;
  textoXP.innerText = xp;
  actualizar(lugares[4]);
}

function perder() {
  actualizar(lugares[5]);
}

function ganarJuego() {
  actualizar(lugares[6]);
}

function reiniciar() {
  xp = 0;
  salud = 100;
  oro = 50;
  armaActual = 0;
  inventario = ["palo"];
  textoOro.innerText = oro;
  textoSalud.innerText = salud;
  textoXP.innerText = xp;
  irPlaza();
}

function huevoDePascua() {
  actualizar(lugares[7]);
}

function elegirDos() {
  elegir(2);
}

function elegirOcho() {
  elegir(8);
}

function elegir(adivinanza) {
  const numeros = [];
  while (numeros.length < 10) {
    numeros.push(Math.floor(Math.random() * 11));
  }
  texto.innerText = "Has elegido " + adivinanza + ". Estos son los números aleatorios:\n";
  for (let i = 0; i < 10; i++) {
    texto.innerText += numeros[i] + "\n";
  }
  if (numeros.includes(adivinanza)) {
    texto.innerText += "¡Correcto! ¡Ganas 20 de oro!";
    oro += 20;
    textoOro.innerText = oro;
  } else {
    texto.innerText += "¡Incorrecto! ¡Pierdes 10 de salud!";
    salud -= 10;
    textoSalud.innerText = salud;
    if (salud <= 0) {
      perder();
    }
  }
}
