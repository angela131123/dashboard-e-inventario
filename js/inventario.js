// =================================
// js/inventario.js
// =================================

const API = "https://dummyjson.com/products";

let inventario =
JSON.parse(localStorage.getItem("inventario")) || [];

let api = [];

// ======================
async function cargar(){

const res = await fetch(API);
const data = await res.json();

api = data.products;

mostrar();

}

// ======================
function mostrar(){

let html = "";

// PRODUCTOS API
api.forEach(p => {

html += `
<li>
🌐 ${p.title} - $${p.price}
</li>
`;

});

// INVENTARIO LOCAL
inventario.forEach((p,i)=>{

html += `
<li>
📦 ${p.nombre} - $${p.precio} - Stock: ${p.stock}

<button onclick="eliminar(${i})">
❌
</button>
</li>
`;

});

document.getElementById("lista").innerHTML = html;

}

// ======================
function agregar(){

const nombre =
document.getElementById("nombre").value;

const precio =
parseFloat(document.getElementById("precio").value);

const stock =
parseInt(document.getElementById("stock").value);

if(!nombre || isNaN(precio) || isNaN(stock)){
alert("Datos incorrectos");
return;
}

// SI EXISTE ACTUALIZA
let existe = inventario.find(p =>
p.nombre.toLowerCase() === nombre.toLowerCase()
);

if(existe){

existe.stock += stock;
existe.precio = precio;

}else{

inventario.push({
nombre,
precio,
stock
});

}

localStorage.setItem(
"inventario",
JSON.stringify(inventario)
);

document.getElementById("nombre").value="";
document.getElementById("precio").value="";
document.getElementById("stock").value="";

mostrar();

}

// ======================
function eliminar(i){

inventario.splice(i,1);

localStorage.setItem(
"inventario",
JSON.stringify(inventario)
);

mostrar();

}

// ======================
window.onload = cargar;