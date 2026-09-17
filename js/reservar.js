document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formReserva");
    const fecha = document.getElementById("fecha");
    const hora = document.getElementById("hora");

    // Obtener la fecha de hoy en formato YYYY-MM-DD
    function obtenerFechaHoy() {
        const hoy = new Date();

        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        return anio + "-" + mes + "-" + dia;
    }

    // La fecha mínima es hoy
    fecha.min = obtenerFechaHoy();


    // DESHABILITAR HORARIOS QUE YA PASARON

    function actualizarHorarios() {

        const fechaHoy = obtenerFechaHoy();
        const ahora = new Date();

        const opciones = hora.querySelectorAll("option");

        opciones.forEach(function (opcion) {

            // Ignorar la opción vacía
            if (opcion.value === "") {
                return;
            }

            // Si la fecha seleccionada es hoy
            if (fecha.value === fechaHoy) {

                const partesHora = opcion.value.split(":");

                const horaSeleccionada = parseInt(partesHora[0]);
                const minutosSeleccionados = parseInt(partesHora[1]);

                // Crear una fecha con la hora del turno
                const fechaHoraTurno = new Date();

                fechaHoraTurno.setHours(
                    horaSeleccionada,
                    minutosSeleccionados,
                    0,
                    0
                );

                // Si el horario ya pasó, se deshabilita
                if (fechaHoraTurno <= ahora) {
                    opcion.disabled = true;
                } else {
                    opcion.disabled = false;
                }

            } else {

                // Si es otro día, habilitar todos los horarios
                opcion.disabled = false;
            }
        });


        // Si la hora que estaba seleccionada quedó deshabilitada,
        // se limpia la selección
        if (
            hora.selectedOptions.length > 0 &&
            hora.selectedOptions[0].disabled
        ) {
            hora.value = "";
        }
    }


    // 
    // CUANDO CAMBIA LA FECHA

    fecha.addEventListener("change", function () {

        const fechaHoy = obtenerFechaHoy();

        if (fecha.value < fechaHoy) {

            fecha.setCustomValidity(
                "No podés seleccionar una fecha anterior a hoy."
            );

        } else {

            fecha.setCustomValidity("");
        }

        actualizarHorarios();
    });


    // CUANDO CAMBIA LA HORA
   

    hora.addEventListener("change", function () {

        const fechaHoy = obtenerFechaHoy();

        if (fecha.value === fechaHoy && hora.value !== "") {

            const ahora = new Date();

            const partesHora = hora.value.split(":");

            const horaSeleccionada = parseInt(partesHora[0]);
            const minutosSeleccionados = parseInt(partesHora[1]);

            const fechaHoraTurno = new Date();

            fechaHoraTurno.setHours(
                horaSeleccionada,
                minutosSeleccionados,
                0,
                0
            );

            if (fechaHoraTurno <= ahora) {

                hora.setCustomValidity(
                    "Ese horario ya pasó. Seleccioná otro."
                );

            } else {

                hora.setCustomValidity("");
            }

        } else {

            hora.setCustomValidity("");
        }
    });


    // GUARDAR RESERVA
  

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        // Actualizar horarios antes de validar
        actualizarHorarios();

        // Validar formulario
        if (!formulario.checkValidity()) {

            formulario.classList.add("was-validated");

            return;
        }

        // Si todo está correcto
        alert("Reserva realizada correctamente.");

        formulario.reset();

        formulario.classList.remove("was-validated");

        // Volver a habilitar los horarios
        actualizarHorarios();
    });



    // ACTUALIZAR CADA MINUTO
    

    actualizarHorarios();

    setInterval(function () {

        actualizarHorarios();

    }, 60000);

});

const telefono = document.getElementById("telefono");

telefono.addEventListener("input", function () {

    // Solo números
    telefono.value = telefono.value.replace(/\D/g, "");

    // Máximo 10 dígitos
    telefono.value = telefono.value.slice(0, 10);

    // Teléfono de Argentina: exactamente 10 números
    if (/^\d{10}$/.test(telefono.value)) {

        telefono.setCustomValidity("");

    } else {

        telefono.setCustomValidity("Ingresá un teléfono válido");
    }
});