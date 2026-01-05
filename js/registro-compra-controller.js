document.addEventListener('DOMContentLoaded', () => {
    const productosSeleccionadosContainer = document.getElementById('productos-seleccionados');
    const totalPagoSpan = document.getElementById('total-pago');
    const formCompra = document.getElementById('form-compra');
    const modalResumen = document.getElementById('modal-resumen');
    const detalleResumen = document.getElementById('detalle-resumen');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const direccionInput = document.getElementById('direccion');

  
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function renderizarResumenPedido() {
        const submitButton = formCompra.querySelector('button[type="submit"]');

        if (carrito.length === 0) {
            productosSeleccionadosContainer.innerHTML = '<p>No has seleccionado ningún producto para comprar.</p>';
            totalPagoSpan.textContent = 'S/. 0.00';
            
            if (submitButton) submitButton.disabled = true;
            return;
        }

        if (submitButton) submitButton.disabled = false; 

        let total = 0;
        productosSeleccionadosContainer.innerHTML = ''; 

        carrito.forEach(item => {
            
            const subtotal = item.precio * item.cantidad;
            const itemHtml = `
                <div class="resumen-item">
                    <img src="${item.imagen}" alt="${item.nombre}" class="resumen-item-img">
                    <div class="resumen-item-info">
                        <p class="resumen-item-nombre">${item.nombre} (x${item.cantidad})</p>
                        <p class="resumen-item-precio">S/. ${subtotal.toFixed(2)}</p>
                    </div>
                </div>
            `;
            productosSeleccionadosContainer.insertAdjacentHTML('beforeend', itemHtml);
            total += subtotal;
        });

        totalPagoSpan.textContent = `S/. ${total.toFixed(2)}`;
    }

    function mostrarModalResumen(datos) {
        detalleResumen.innerHTML = `
            <h3>¡Gracias por tu compra, ${datos.nombre}!</h3>
            <p>Hemos enviado un correo de confirmación a <strong>${datos.correo}</strong>.</p>
            <p>Tu pedido será enviado a: <em>${datos.direccion}</em></p>
            <hr>
            <h4>Resumen del Pedido:</h4>
            ${productosSeleccionadosContainer.innerHTML}
            <p><strong>Total Pagado:</strong> ${datos.total}</p>
            <p><strong>Método de Pago:</strong> ${datos.metodoPago}</p>
            <hr>
            <p>Tu pedido ha sido registrado con éxito. ¡Vuelve pronto!</p>
            <button id="cerrar-modal-y-volver" class="button">Volver al Inicio</button>
        `;
        modalResumen.classList.remove('hidden');

        document.getElementById('cerrar-modal-y-volver').addEventListener('click', () => {
            modalResumen.classList.add('hidden');
          
            localStorage.removeItem('carrito');
            window.location.href = 'index.html';
        });
    }

    function guardarCompraEnHistorial(compra) {
       
        const historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
        historial.push(compra);
        localStorage.setItem('historialCompras', JSON.stringify(historial));
    }

    formCompra.addEventListener('submit', (e) => {
        e.preventDefault();

        const metodoPagoInput = document.querySelector('input[name="pago"]:checked');
        const usuarioActual = obtenerUsuarioActual(); 
        
        const datosCompra = {
            userId: usuarioActual ? usuarioActual.id : null, 
            nombre: nombreInput.value,
            correo: correoInput.value,
            direccion: direccionInput.value,
            metodoPago: metodoPagoInput ? metodoPagoInput.value : 'No especificado',
            total: totalPagoSpan.textContent,
            items: carrito,
            fecha: new Date().toISOString()
        };

        mostrarModalResumen(datosCompra);
        guardarCompraEnHistorial(datosCompra); 
    });

    renderizarResumenPedido();
});