function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    
    const contadorElemento = document.getElementById('carrito-cantidad');
    if (contadorElemento) {
        contadorElemento.textContent = cantidadTotal;
    }
}

function agregarAlCarrito(productoId, productoNombre, productoPrecio, productoImagen, productoDescripcion) {
    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(p => p.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            id: productoId,
            nombre: productoNombre,
            precio: productoPrecio,
            cantidad: 1,
            imagen: productoImagen,
            descripcion: productoDescripcion
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito(); 
    alert(`"${productoNombre}" fue agregado al carrito.`);
}

function modificarCantidad(productoId, cambio) {
    const carrito = obtenerCarrito();
    const producto = carrito.find(p => p.id === productoId);

    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(productoId);
        } else {
            guardarCarrito(carrito);
            actualizarContadorCarrito();
            mostrarItemsCarrito(); 
        }
    }
}

function eliminarDelCarrito(productoId) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(p => p.id !== productoId);
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    mostrarItemsCarrito();
}

function vaciarCarrito() {
    guardarCarrito([]);
    actualizarContadorCarrito();
    mostrarItemsCarrito();
}


function mostrarItemsCarrito() {
    const tbody = document.getElementById('lista-carrito-body');
    const tablaContainer = document.querySelector('.tabla-carrito-container');
    const mensajeVacio = document.getElementById('carrito-vacio-mensaje');
    const subtotalElemento = document.getElementById('subtotal');
    const totalElemento = document.getElementById('total');
    const carrito = obtenerCarrito();

    if (!tbody) return;

    tbody.innerHTML = '';

    if (carrito.length === 0) {
        if (tablaContainer) tablaContainer.style.display = 'none';
        if (mensajeVacio) mensajeVacio.style.display = 'block';
        if(subtotalElemento) subtotalElemento.textContent = 'S/. 0.00';
        if(totalElemento) totalElemento.textContent = 'S/. 0.00';
        return;
    }

    if (tablaContainer) tablaContainer.style.display = 'block';
    if (mensajeVacio) mensajeVacio.style.display = 'none';

    let subtotal = 0;
    carrito.forEach(producto => {
        const itemTr = document.createElement('tr');
        itemTr.dataset.id = producto.id;

        const precioItem = producto.precio * producto.cantidad;
        subtotal += precioItem;

    itemTr.innerHTML = `
    <td class="td-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="item-imagen">
        <div class="item-info">
            <span class="nombre">${producto.nombre}</span>
            <p class="descripcion">${producto.descripcion}</p>
        </div>
    </td>
    <td class="td-cantidad">
        <div class="item-controles">
            <button class="btn-accion" data-accion="disminuir">-</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button class="btn-accion" data-accion="aumentar">+</button>
        </div>
    </td>
    <td class="td-precio">
        <span>S/. ${parseFloat(producto.precio).toFixed(2)}</span>
    </td>
    <td class="td-subtotal">
        <span>S/. ${precioItem.toFixed(2)}</span>
    </td>
    <td class="td-accion">
        <button class="btn-accion btn-rojo btn-eliminar" data-accion="eliminar" title="Eliminar">
            <img src="img/Tacho.png" alt="Eliminar" class="icono-tacho">
        </button>
    </td>
`;

        tbody.appendChild(itemTr);
    });

    if(subtotalElemento) subtotalElemento.textContent = `S/. ${subtotal.toFixed(2)}`;
    if(totalElemento) totalElemento.textContent = `S/. ${subtotal.toFixed(2)}`;
}



document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();

    if (window.location.pathname.endsWith('carrito.html')) {
        mostrarItemsCarrito();

        const tbody = document.getElementById('lista-carrito-body');
        if (tbody) {
            tbody.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-accion')) {
                    const productoId = e.target.closest('tr').dataset.id;
                    const accion = e.target.dataset.accion;

                    if (accion === 'aumentar') modificarCantidad(productoId, 1);
                    if (accion === 'disminuir') modificarCantidad(productoId, -1);
                    if (accion === 'eliminar') eliminarDelCarrito(productoId);
                }
            });
        }

        const btnVaciar = document.getElementById('btn-vaciar-carrito');
        if (btnVaciar) {
            btnVaciar.addEventListener('click', vaciarCarrito);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
});

function mostrarModalAgregado(mensaje) {
    const modal = document.getElementById('modal-agregado');
    const mensajeElemento = document.getElementById('mensaje-modal-agregado');
    const btnCerrar = document.getElementById('cerrar-modal-agregado');

    mensajeElemento.textContent = mensaje;
    modal.classList.remove('hidden');
    modal.classList.add('active');

    btnCerrar.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('active');
    };
}
