function login(tipoLogin){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
let mensaje = document.getElementById("mensaje");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let usuario = usuarios.find(u =>
u.email === email &&
u.password === password &&
u.rol === tipoLogin
);

if(usuario){

localStorage.setItem(
"sesionActiva",
JSON.stringify(usuario)
);

mensaje.innerText = "Acceso correcto";

setTimeout(()=>{
window.location.href = "index.html";
},1000);

}else{
mensaje.innerText = "Datos incorrectos o rol inválido";
}

}