// Creo un parrafo nuevo con la fecha de hoy en espanol y lo agrego al hero
const ahora = new Date();
const formato = { weekday: "long", day: "numeric", month: "long", year: "numeric" };

const parrafoFecha = document.createElement("p");
parrafoFecha.className = "fw-semibold mb-0";
parrafoFecha.textContent = "Hoy es " + ahora.toLocaleDateString("es-AR", formato);

const hero = document.querySelector(".hero-club .container");
hero.appendChild(parrafoFecha);


/* ============ 2. Contar los turnos libres de cada cancha ============ */

// Cuenta cuantos chips "Libre" hay en una pestaña y agrega un chip con el numero al lado del titulo
function contarLibres(idPestana) {
  const libres = document.querySelectorAll("#" + idPestana + " .chip-libre");
  const titulo = document.querySelector("#" + idPestana + " h3");

  const contador = document.createElement("span");
  contador.className = "chip-estado chip-libre ms-2";
  contador.textContent = libres.length + " libres";

  titulo.appendChild(contador);
}

contarLibres("f5");
contarLibres("f7");
contarLibres("padel");


/* ============ 3. Boton "Ver solo turnos libres" ============ */

// Creo el boton y lo pongo justo antes de las pestañas de canchas
const botonSoloLibres = document.createElement("button");
botonSoloLibres.type = "button";
botonSoloLibres.className = "btn btn-club-linea btn-sm mb-3";
botonSoloLibres.textContent = "Ver solo turnos libres";

const pestanas = document.getElementById("pestanas-canchas");
pestanas.parentElement.insertBefore(botonSoloLibres, pestanas);

const columnas = document.querySelectorAll("#contenido-canchas .col");

botonSoloLibres.addEventListener("click", function () {

  // Recorre todas las tarjetas: la que NO tiene chip "Libre" se oculta o se muestra
  columnas.forEach(function (columna) {
    const tieneLibre = columna.querySelector(".chip-libre");

    if (tieneLibre === null) {
      columna.classList.toggle("d-none");
    }
  });

  // Cambia el texto del boton
  if (botonSoloLibres.textContent === "Ver solo turnos libres") {
    botonSoloLibres.textContent = "Ver todos los turnos";
  } else {
    botonSoloLibres.textContent = "Ver solo turnos libres";
  }
});


/* ============ 4. Marcar el turno en curso segun la hora real ============ */

// Primero saco la marca fija que tenian las tarjetas de las 21:00
const marcadas = document.querySelectorAll("#contenido-canchas .turno-actual");

marcadas.forEach(function (tarjeta) {
  tarjeta.classList.remove("turno-actual");
});

// Armo la hora actual como texto igual al de las tarjetas, por ejemplo "08:00" o "21:00"
let horaActual = ahora.getHours() + ":00";

if (ahora.getHours() < 10) {
  horaActual = "0" + horaActual;
}

// Busco todas las horas de las tarjetas y marco las que coinciden con la hora actual
const horas = document.querySelectorAll("#contenido-canchas .fw-bold");

horas.forEach(function (hora) {
  if (hora.textContent === horaActual) {
    hora.parentElement.classList.add("turno-actual");
  }
});
