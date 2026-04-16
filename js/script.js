const API = "https://dummyjson.com/products";

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

// ================= API =================
async function listarProductos() {
    const res = await fetch(API);
    const data = await res.json();

    const apiProductos = data.products.map(p => ({
        ...p,
        stock: p.stock || 10
    }));

    const inventarioFormateado = inventario.map((p, i) => ({
        id: 1000 + i,
        title: p.nombre,
        price: p.precio,
        stock: p.stock,
        category: "Inventario"
    }));

    productos = [...apiProductos, ...inventarioFormateado];

    mostrarProductos(productos);
}

// ================= MOSTRAR =================
function mostrarProductos(lista) {
    let html = "";

    lista.forEach(p => {
        html += `
        <div class="card">
            <img src="${p.thumbnail || 'https://via.placeholder.com/150'}">
            <h3>${p.title}</h3>
            <p class="precio">💲 $${p.price}</p>
            <p class="stock">📦 Stock: ${p.stock}</p>
            <button onclick="agregarCarrito(${p.id}, ${p.price}, '${p.title}')">
                🛒 Agregar
            </button>
        </div>
        `;
    });

    document.getElementById("productos").innerHTML = html;
}

// ================= INVENTARIO =================
function agregarInventario() {
    const nombre = document.getElementById("nombre").value.toLowerCase();
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!nombre || isNaN(precio) || isNaN(stock)) {
        alert("Datos inválidos");
        return;
    }

    const existe = inventario.find(p => p.nombre.toLowerCase() === nombre);

    if (existe) {
        existe.stock += stock;
        existe.precio = precio;
    } else {
        inventario.push({ nombre, precio, stock });
    }

    localStorage.setItem("inventario", JSON.stringify(inventario));

    listarProductos();

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
}

// ================= BUSCAR =================
function buscarProductos() {
    const texto = document.getElementById("buscar").value.toLowerCase();

    const filtrados = productos.filter(p =>
        p.title.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
}

// ================= ORDENAR =================
function ordenarProductos() {
    const tipo = document.getElementById("ordenar").value;

    let copia = [...productos];

    if (tipo === "asc") copia.sort((a,b)=>a.price-b.price);
    if (tipo === "desc") copia.sort((a,b)=>b.price-a.price);

    mostrarProductos(copia);
}

// ================= CARRITO =================
function agregarCarrito(id, precio, titulo) {
    const producto = productos.find(p => p.id === id);

    if (producto.stock <= 0) {
        alert("Sin stock");
        return;
    }

    producto.stock--;

    carrito.push({ id, precio, titulo });

    actualizarCarrito();
    mostrarProductos(productos);
}

function actualizarCarrito() {
    let html = "";
    let total = 0;

    carrito.forEach(p => {
        html += `<li>🛒 ${p.titulo} - $${p.precio}</li>`;
        total += p.precio;
    });

    document.getElementById("carrito").innerHTML = html;
    document.getElementById("total").innerText = "Total: $" + total;
    document.getElementById("totalCaja").innerText = "$" + total;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ================= CAJA =================
function pagar() {
    const dinero = parseFloat(document.getElementById("pagoCliente").value);

    let total = carrito.reduce((acc, p) => acc + p.precio, 0);

    if (carrito.length === 0) return alert("Carrito vacío");
    if (isNaN(dinero) || dinero < total) return alert("Dinero insuficiente");

    let cambio = dinero - total;

    document.getElementById("cambio").innerText = "💰 Cambio: $" + cambio;

    generarFactura(total);

    ventas.push({
        fecha: new Date().toLocaleString(),
        total,
        items: [...carrito]
    });

    localStorage.setItem("ventas", JSON.stringify(ventas));

    carrito = [];
    localStorage.removeItem("carrito");

    actualizarCarrito();
}

// ================= FACTURA =================
function generarFactura(total) {
    let html = "<h3>🧾 Factura</h3><ul>";

    carrito.forEach(p => {
        html += `<li>${p.titulo} - $${p.precio}</li>`;
    });

    html += `</ul><strong>Total: $${total}</strong>`;

    document.getElementById("factura").innerHTML = html;
}
// ================= PERFIL =================
function mostrarPerfil() {

    let perfil =
        document.getElementById("perfil");

    perfil.style.display =
        perfil.style.display === "none"
            ? "block"
            : "none";

    document.getElementById("nuevoNombre").value =
        sesion.nombre;

    document.getElementById("nuevoEmail").value =
        sesion.email;

    document.getElementById("nuevoPassword").value =
        sesion.password;
}

function guardarPerfil() {

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    sesion.nombre =
        document.getElementById("nuevoNombre").value;

    sesion.email =
        document.getElementById("nuevoEmail").value;

    sesion.password =
        document.getElementById("nuevoPassword").value;

    usuarios = usuarios.map(u => {
        if (u.id == sesion.id) return sesion;
        return u;
    });

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    localStorage.setItem(
        "sesionActiva",
        JSON.stringify(sesion)
    );

    alert("Perfil actualizado");

    location.reload();
}
// ================= CERRAR =================
function cerrarSesion() {
    localStorage.removeItem("sesionActiva");
    window.location.href = "login.html";
}
// AL CARGAR
window.onload = () => {

document.getElementById("usuarioActivo").innerText =
"👤 " + sesion.nombre;

document.getElementById("rolActivo").innerText =
" | 🔑 " + (sesion.rol || "usuario");

// MOSTRAR INVENTARIO SOLO ADMIN
if(sesion.rol === "admin"){
document.getElementById("btnInventario").style.display = "inline-block";
}else{
document.getElementById("btnInventario").style.display = "none";
}

listarProductos();
actualizarCarrito();

};

// CAMBIAR ROL
function cambiarRol(){

let usuarios =
JSON.parse(localStorage.getItem("usuarios")) || [];

if(!sesion.rol || sesion.rol === "usuario"){
sesion.rol = "admin";
}else{
sesion.rol = "usuario";
}

usuarios = usuarios.map(u => {
if(u.id == sesion.id){
return sesion;
}
return u;
});

localStorage.setItem("usuarios", JSON.stringify(usuarios));
localStorage.setItem("sesionActiva", JSON.stringify(sesion));

alert("Rol cambiado a: " + sesion.rol);

location.reload();

}

// ================= INICIO =================
window.onload = () => {

    document.getElementById("usuarioActivo").innerText =
        "👤 " + sesion.nombre;

    document.getElementById("rolActivo").innerText =
        sesion.rol
            ? "🔑 " + sesion.rol
            : "👤 Usuario";

    if (sesion.rol !== "admin") {
        document.getElementById("btnInventario").style.display = "none";
    }

    listarProductos();
    actualizarCarrito();
};