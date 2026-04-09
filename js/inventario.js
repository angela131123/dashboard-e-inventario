const API = "https://dummyjson.com/products";

let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
let api = [];

// ================= CARGAR =================
async function cargar() {
    const res = await fetch(API);
    const data = await res.json();

    api = data.products;

    mostrar();
}

// ================= MOSTRAR =================
function mostrar() {
    let html = "";

    api.forEach(p => {
        html += `<li>${p.title} - $${p.price} (API)</li>`;
    });

    inventario.forEach((p, i) => {
        html += `
        <li>
            ${p.nombre} - $${p.precio} - Stock: ${p.stock}
            <button onclick="eliminar(${i})">Eliminar</button>
        </li>
        `;
    });

    document.getElementById("lista").innerHTML = html;
}

// ================= AGREGAR =================
function agregar() {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!nombre || isNaN(precio) || isNaN(stock)) {
        alert("Datos incorrectos");
        return;
    }

    inventario.push({ nombre, precio, stock });

    localStorage.setItem("inventario", JSON.stringify(inventario));

    mostrar();
}

// ================= ELIMINAR =================
function eliminar(i) {
    inventario.splice(i, 1);
    localStorage.setItem("inventario", JSON.stringify(inventario));
    mostrar();
}

// ================= INICIO =================
window.onload = cargar;