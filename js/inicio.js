/* inicio.js - Lourdes - TP4 */

/* ============ Apertura del dia ============ */

const casillas = document.querySelectorAll("#lista-apertura input");
const progreso = document.getElementById("progreso-apertura");
const botonReiniciar = document.getElementById("boton-reiniciar");


function actualizarProgreso() {
  let hechas = 0;

  casillas.forEach(function (casilla) {
    if (casilla.checked) {
      hechas = hechas + 1;
    }
  });

  if (hechas === casillas.length) {
    progreso.textContent = "Club listo para abrir";
    progreso.className = "chip-estado chip-libre";
  } else {
    progreso.textContent = hechas + " de " + casillas.length + " tareas";
    progreso.className = "chip-estado chip-pendiente";
  }
}


casillas.forEach(function (casilla) {
  casilla.addEventListener("change", actualizarProgreso);
});

botonReiniciar.addEventListener("click", function () {
  casillas.forEach(function (casilla) {
    casilla.checked = false;
  });
  actualizarProgreso();
});

actualizarProgreso();

/* ============  Avisos para el proximo turno ============ */


const formAviso = document.getElementById("form-aviso");
const textoAviso = document.getElementById("texto-aviso");
const listaAvisos = document.getElementById("lista-avisos");
const sinAvisos = document.getElementById("sin-avisos");


let avisos = JSON.parse(localStorage.getItem("avisos")) || [];

function guardarAvisos() {
  localStorage.setItem("avisos", JSON.stringify(avisos));
}

function mostrarAvisos() {
  listaAvisos.innerHTML = "";

  avisos.forEach(function (aviso, posicion) {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center gap-2";
    item.textContent = aviso;

    const botonListo = document.createElement("button");
    botonListo.type = "button";
    botonListo.className = "btn btn-club-linea btn-sm";
    botonListo.textContent = "Listo";


    botonListo.addEventListener("click", function () {
      avisos.splice(posicion, 1);
      guardarAvisos();
      mostrarAvisos();
    });

    item.appendChild(botonListo);
    listaAvisos.appendChild(item);
  });

  if (avisos.length === 0) {
    sinAvisos.classList.remove("d-none");
  } else {
    sinAvisos.classList.add("d-none");
  }
}

formAviso.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = textoAviso.value.trim();
  if (texto === "") {
    return;
  }

  avisos.push(texto);
  guardarAvisos();
  mostrarAvisos();
  textoAviso.value = "";
});

mostrarAvisos();
