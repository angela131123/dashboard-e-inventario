function guardarUsuario(rol) {
    let idInput = document.getElementById("id");
    let nombreInput = document.getElementById("nombre");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");

    let id = idInput ? idInput.value : "";
    let nombre = nombreInput.value.trim();
    let email = emailInput.value.trim().toLowerCase();
    let password = passwordInput.value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Validación
    if (nombre === "" || email === "" || password === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Rol por defecto
    if (!rol) {
        rol = "usuario";
    }

    // Verificar correo repetido
    let repetido = usuarios.find(u => u.email === email && String(u.id) !== String(id));

    if (repetido) {
        alert("Ese correo ya está registrado");
        return;
    }

    // Nuevo usuario
    if (id === "") {

        let nuevoUsuario = {
            id: Date.now(),
            nombre: nombre,
            email: email,
            password: password,
            rol: rol
        };

        usuarios.push(nuevoUsuario);

    } else {
        // Editar
        usuarios = usuarios.map(u => {
            if (String(u.id) === String(id)) {
                return {
                    id: Number(id),
                    nombre: nombre,
                    email: email,
                    password: password,
                    rol: rol
                };
            }
            return u;
        });
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso como: " + rol);

    // limpiar
    if (idInput) idInput.value = "";
    nombreInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    window.location.href = "login.html";
}

// importante para onclick en HTML
window.guardarUsuario = guardarUsuario;