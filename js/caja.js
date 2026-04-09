// CARGAR CARRITO DESDE LOCALSTORAGE
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ================= MOSTRAR =================
function mostrarCaja() {
    let html = "";
    let total = 0;

    carrito.forEach((item, index) => {
        html += `<li>${item.titulo} - $${item.precio}</li>`;
        total += item.precio;
    });

    document.getElementById("listaCaja").innerHTML = html;
    document.getElementById("totalCaja").innerText = "Total a pagar: $" + total;
}

// ================= PAGAR =================
function pagar() {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito");
        return;
    }

    let total = 0;
    let facturaHTML = "<h3>Factura de Compra</h3><ul>";

    carrito.forEach(item => {
        facturaHTML += `<li>${item.titulo} - $${item.precio}</li>`;
        total += item.precio;
    });

    facturaHTML += `</ul><strong>Total pagado: $${total}</strong>`;

    document.getElementById("factura").innerHTML = facturaHTML;

    // LIMPIAR CARRITO
    carrito = [];
    localStorage.removeItem("carrito");

    mostrarCaja();
}

// ================= INICIO =================
window.onload = mostrarCaja;