// js/panel.js 

let sesion = JSON.parse(localStorage.getItem("sesionActiva"));

if (!sesion) {

window.location.href = "login.html";

} else {

document.getElementById("bienvenida").textContent =
"Bienvenido, " + sesion.nombre;

}

function cerrarSesion() {

localStorage.removeItem("sesionActiva");

/* AHORA VA AL LOGIN */
window.location.href = "login.html";

}