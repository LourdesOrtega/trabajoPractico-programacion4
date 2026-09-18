const buscarRespuesta = document.querySelector("#buscarRespuesta");
const respuestas = document.querySelectorAll(".respuesta-cliente");

buscarRespuesta.addEventListener("input", function () {
    const textoBuscado = buscarRespuesta.value.toLowerCase();

    respuestas.forEach(function (respuesta) {
        const textoRespuesta = respuesta.textContent.toLowerCase();

        if (textoRespuesta.includes(textoBuscado)) {
            respuesta.classList.remove("d-none");
        } else {
            respuesta.classList.add("d-none");
        }
    });
});
