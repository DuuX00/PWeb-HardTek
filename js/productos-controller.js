document.addEventListener('DOMContentLoaded', () => {
    const productosGrid = document.getElementById('productos-grid');
    const tituloPagina = document.querySelector('.productos-page h2');

    if (!productosGrid || !tituloPagina) {
        console.error("Elementos necesarios no encontrados en la página.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const categoriaId = params.get('categoria');

    if (categoriaId) {
        
        const categoriaInfo = categorias.find(c => c.id === categoriaId);
        const productosAMostrar = productos[categoriaId];

        if (categoriaInfo && productosAMostrar) {
            tituloPagina.textContent = categoriaInfo.nombre;
            renderizarProductos(productosAMostrar, productosGrid);
        } else {
            tituloPagina.textContent = "Categoría no encontrada";
            productosGrid.innerHTML = '<p>La categoría que buscas no existe. <a href="productos.html">Ver todas las categorías</a>.</p>';
        }
    } else {
        
        tituloPagina.textContent = "Nuestros Productos y Servicios";
        renderizarCategorias(categorias, productosGrid);
    }
});

function renderizarProductos(listaProductos, container) {
    container.innerHTML = ''; 
    listaProductos.forEach(producto => {
        const productoHtml = `
            <div class="producto-item">
                <img src="${producto.imagen}" alt="${producto.nombre}" />
                <h3>${producto.nombre}</h3>
                <p class="descripcion-breve">${producto.descripcion}</p>
                <span class="precio">S/. ${parseFloat(producto.precio).toFixed(2)}</span>
                <button class="button agregar-carrito" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}" data-descripcion="${producto.descripcion}">Agregar al Carrito</button>
            </div>
            `;
        container.insertAdjacentHTML('beforeend', productoHtml);
    });

    
    container.addEventListener('click', (evento) => {
        
        if (evento.target.classList.contains('agregar-carrito')) {
            const boton = evento.target;
            const id = boton.dataset.id;
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            const imagen = boton.dataset.imagen;
            const descripcion = boton.dataset.descripcion;

            agregarAlCarrito(id, nombre, precio, imagen, descripcion); 
        }
    });
}

function renderizarCategorias(listaCategorias, container) {
    container.innerHTML = ''; 
    listaCategorias.forEach(categoria => {
        const enlace = categoria.externo 
            ? `<a href="${categoria.url}" class="button" target="_blank">Solicitar Asesoramiento</a>`
            : `<a href="productos.html?categoria=${categoria.id}" class="button">Ver más detalles</a>`;

        const categoriaHtml = `
            <div class="producto-item">
                <img src="${categoria.imagen}" alt="${categoria.nombre}">
                <h3>${categoria.nombre}</h3>
                <p>${categoria.descripcion}</p>
                ${enlace}
            </div>
        `;
        container.insertAdjacentHTML('beforeend', categoriaHtml);
    });
}