console.log("se cargo el js correctamente");

// Esperar a que el HTML cargue por completo
document.addEventListener("DOMContentLoaded", function () {
    // Ocultar el texto al iniciar
    statetext(false);
    
    // Asignar el evento click al botón
    const btn = document.getElementById("btninfo");
    if (btn) {
        btn.addEventListener("click", function () {
            statetext(true);
        });
    }
});

function statetext(state) {
    const texto = document.getElementById("text-example");
    if (texto) {
        if (state) {
            texto.style.display = "block"; // Equivalente a $("#text-example").show()
        } else {
            texto.style.display = "none";  // Equivalente a $("#text-example").hide()
        }
    }
}