var users = [];

// Referencias a elementos del DOM
var nombreInput = document.getElementById('nombre');
var emailInput = document.getElementById('email');
var telefonoInput = document.getElementById('telefono');
var mensajeInput = document.getElementById('mensaje');
var searchInput = document.getElementById('searchInput');
var userList = document.getElementById('userList');

// Submit del formulario de registro
document.getElementById('registroFormulario').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validarFormulario()) {
        var usuario = {
            nombre: nombreInput.value.trim(),
            email: emailInput.value.trim(),
            telefono: telefonoInput.value.trim(),
            mensaje: mensajeInput.value.trim()
        };
        users.push(usuario);
        agregarUsuarioLista(usuario);
        limpiarFormulario();
    }
});

// Función para validar el formulario de registro
function validarFormulario() {
    var nombre = nombreInput.value.trim();
    var email = emailInput.value.trim();
    var telefono = telefonoInput.value.trim();
    var mensaje = mensajeInput.value.trim();

    var errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';
    errorDiv.innerHTML = '';

    if (nombre.length < 3) {
        mostrarError('El nombre debe tener al menos 3 caracteres.');
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarError('Ingrese un correo electrónico válido.');
        return false;
    }

    if (isNaN(telefono) || telefono.length < 8) {
        mostrarError('Ingrese un número de teléfono válido.');
        return false;
    }

    if (mensaje.length < 10) {
        mostrarError('El mensaje debe tener al menos 10 caracteres.');
        return false;
    }

    
    return true;
}

// Función para mostrar errores en el formulario
function mostrarError(mensaje) {
    var errorDiv = document.getElementById('error');
    errorDiv.style.display = 'block';
    errorDiv.innerHTML = mensaje;
}

// Función para limpiar el formulario después de enviar
function limpiarFormulario() {
    nombreInput.value = '';
    emailInput.value = '';
    telefonoInput.value = '';
    mensajeInput.value = '';
}

// Función para agregar usuario a la lista de usuarios registrados
function agregarUsuarioLista(usuario) {
    var ul = document.createElement('ul');
    ul.innerHTML = `
        <li>
            <span>Nombre:</span> ${usuario.nombre}
        </li>
        <li>
            <span>Email:</span> ${usuario.email}
        </li>
        <li>
            <span>Teléfono:</span> ${usuario.telefono}
        </li>
        <li>
            <span>Mensaje:</span> ${usuario.mensaje}
        </li>
        <li class="edit-delete">
            <button onclick="editarUsuario(${users.length - 1})">Editar</button>
            <button onclick="eliminarUsuario(${users.length - 1})">Eliminar</button>
        </li>
        <hr>
    `;
    userList.appendChild(ul);
}

// Función para buscar usuarios por nombre
searchInput.addEventListener('input', function() {
    var searchString = searchInput.value.toLowerCase();
    var usersElements = document.querySelectorAll('#userList ul');
    usersElements.forEach(function(userElement) {
        var username = userElement.querySelector('li:first-child').textContent.toLowerCase();
        if (username.includes(searchString)) {
            userElement.style.display = 'block';
        } else {
            userElement.style.display = 'none';
        }
    });
});

// Función para editar usuario
function editarUsuario(index) {
    var usuario = users[index];
    nombreInput.value = usuario.nombre;
    emailInput.value = usuario.email;
    telefonoInput.value = usuario.telefono;
    mensajeInput.value = usuario.mensaje;

    // Elimina lo que el usuario cambia 
    users.splice(index, 1);
    actualizarListaUsuarios();
}

// Función para eliminar usuario
function eliminarUsuario(index) {
    users.splice(index, 1);
    actualizarListaUsuarios();
}

// Función para actualizar la lista de usuarios mostrada
function actualizarListaUsuarios() {
    userList.innerHTML = '';
    users.forEach(function(usuario) {
        agregarUsuarioLista(usuario);
    });
}
