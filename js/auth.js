
const usuarios = [
    { id: 1, nombre: "Juan Velasco", email: "juan.velasco@gmail.com", contrasena: "clave123" },
    { id: 2, nombre: "Angel Mendez", email: "angel.mendez@gmail.com", contrasena: "clave123" },
    { id: 4, nombre: "Admin HardTek", email: "admin@hardtek.com", contrasena: "admin" },
    { id: 5, nombre: "Jennifer Silva", email: "jsilva@hardtek.com", contrasena: "clave123" },
    { id: 6, nombre: "Edward Campos", email: "Ecampos@hardtek.com", contrasena: "clave123" },
    { id: 7, nombre: "Carlos Montoya", email: "Cmontoya@hardtek.com", contrasena: "clave123" }
];

/**
 
 
 * @param {string} email 
 * @param {string} contrasena 
 * @returns {object|null} 
 */
function iniciarSesion(email, contrasena) {
    const usuarioEncontrado = usuarios.find(u => u.email === email && u.contrasena === contrasena);

    if (usuarioEncontrado) {
        
        const usuarioParaGuardar = {
            id: usuarioEncontrado.id,
            nombre: usuarioEncontrado.nombre,
            email: usuarioEncontrado.email
        };
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioParaGuardar));
        console.log(`Sesión iniciada para: ${usuarioParaGuardar.nombre}`);
        return usuarioParaGuardar;
    } else {
        console.log("Error: Credenciales incorrectas.");
        localStorage.removeItem('usuarioActual'); 
        return null;
    }
}


function cerrarSesion() {
    const usuario = obtenerUsuarioActual();
    if (usuario) {
        console.log(`Cerrando sesión de: ${usuario.nombre}`);
    }
    localStorage.removeItem('usuarioActual');
   
    window.location.href = 'login.html';
}

/**
 
 * @returns {object|null} 
 */
function obtenerUsuarioActual() {
    try {
        const usuarioSerializado = localStorage.getItem('usuarioActual');
        return usuarioSerializado ? JSON.parse(usuarioSerializado) : null;
    } catch (e) {
        console.error("Error al parsear datos de usuario desde localStorage:", e);
        localStorage.removeItem('usuarioActual');
        return null;
    }
}


function actualizarInterfazUsuario() {
    const usuario = obtenerUsuarioActual();
    const elementosLogueado = document.querySelectorAll('.logueado');
    const elementosNoLogueado = document.querySelectorAll('.no-logueado');
    const spanNombreUsuario = document.getElementById('nombreUsuarioLogueado');
    const enlaceCerrarSesion = document.getElementById('enlaceCerrarSesion');
    const enlaceAdminPanel = document.getElementById('enlaceAdminPanel');

    if (usuario) {
        // Usuario está logueado
        if (spanNombreUsuario) spanNombreUsuario.textContent = usuario.nombre;
        elementosLogueado.forEach(el => el.style.display = 'list-item');
        elementosNoLogueado.forEach(el => el.style.display = 'none');

        // Mostrar enlace al panel de admin SOLO si es el admin
        if (enlaceAdminPanel) {
            if (usuario.email === 'admin@hardtek.com') {
                enlaceAdminPanel.style.display = 'list-item';
            } else {
                enlaceAdminPanel.style.display = 'none';
            }
        }

        if (enlaceCerrarSesion) {
            enlaceCerrarSesion.onclick = (e) => { e.preventDefault(); cerrarSesion(); };
        }
    } else {
        // Usuario no está logueado
        elementosLogueado.forEach(el => el.style.display = 'none');
        elementosNoLogueado.forEach(el => el.style.display = 'list-item');
        if (enlaceAdminPanel) enlaceAdminPanel.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Actualizar la interfaz de usuario (menú de navegación, etc.)
    actualizarInterfazUsuario();
    
    // 2. Autocompletar formulario de compra si el usuario ha iniciado sesión
    const usuario = obtenerUsuarioActual();
    if (usuario && window.location.pathname.endsWith('registro-compra.html')) {
      const nombreInput = document.getElementById('nombre');
      const correoInput = document.getElementById('correo');

      if (nombreInput) nombreInput.value = usuario.nombre;
      if (correoInput) correoInput.value = usuario.email;
    }
});
