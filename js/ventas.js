let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

function mostrarVentas() {
    let html = "";

    ventas.forEach(v => {
        html += `
        <li>
            <strong>📅 ${v.fecha}</strong><br>
            💰 Total: $${v.total}
            <ul>
                ${v.items.map(p => `<li>${p.titulo} - $${p.precio}</li>`).join("")}
            </ul>
        </li>
        <hr>
        `;
    });

    document.getElementById("listaVentas").innerHTML = html;
}

window.onload = mostrarVentas;