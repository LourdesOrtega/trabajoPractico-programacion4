/* canchas.js - Analia - TP4 */
const filtroEstado = document.getElementById("filtroEstado");
const canchas = document.querySelectorAll("[data-estado]");

filtroEstado.addEventListener("change", function () {

    const estadoSeleccionado = filtroEstado.value;

    canchas.forEach(function (cancha) {

        if (estadoSeleccionado === "todos" ||
            cancha.dataset.estado === estadoSeleccionado) {

            cancha.style.display = "";
        } else {

            cancha.style.display = "none";
        }

    });

});