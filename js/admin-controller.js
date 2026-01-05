let flujoVentasChartInstance = null;
let productosMasVendidosChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // Proteger la ruta: si no es admin, redirigir
    const usuario = obtenerUsuarioActual();
    if (!usuario || usuario.email !== 'admin@hardtek.com') {
        alert('Acceso denegado. Debes ser administrador.');
        window.location.href = 'index.html';
        return; 
    }

    
    cargarDatosReportes('all');
    document.querySelector('.report-controls button[data-range="all"]')?.classList.add('active');

    
    const reportControls = document.querySelector('.report-controls');
    const datePicker = document.getElementById('date-picker');

    reportControls?.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.dataset.range) {
            reportControls.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            datePicker.value = '';
            datePicker.classList.remove('active');
            e.target.classList.add('active');
            cargarDatosReportes(e.target.dataset.range);
        }
    });

    datePicker?.addEventListener('change', (e) => {
        const selectedDate = e.target.value;
        if (selectedDate) {
            reportControls.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            datePicker.classList.add('active');
            cargarDatosReportes(selectedDate); // El rango ahora es la fecha YYYY-MM-DD
        }
    });

    window.addEventListener('storage', (event) => {
        if (event.key === 'historialCompras') {
            console.log('Historial de compras actualizado. Recargando reportes...');
            // Recarga los datos manteniendo el filtro de tiempo activo.
            const activeRange = document.querySelector('.report-controls button.active')?.dataset.range || 'all';
            cargarDatosReportes(activeRange);
        }
    });
});

function filtrarHistorialPorRango(historial, range) {
    if (range === 'all') {
        return historial;
    }
    const ahora = new Date();
    // Clona la fecha para no modificar el objeto original.
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

    if (range === 'today') {
        const hoyStr = ahora.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
        return historial.filter(compra => compra.fecha.startsWith(hoyStr));
    }

    return historial.filter(compra => {
        const fechaCompra = new Date(compra.fecha);
        if (range === 'week') {
            const inicioSemana = new Date(hoy);
            inicioSemana.setDate(hoy.getDate() - (hoy.getDay() === 0 ? 6 : hoy.getDay() - 1)); // Lunes como inicio de semana
            return fechaCompra >= inicioSemana;
        }
        if (range === 'month') {
            const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
            return fechaCompra >= inicioMes;
        }
        // Maneja una fecha específica del calendario (formato YYYY-MM-DD)
        if (range.includes('-')) {
            return compra.fecha.startsWith(range);
        }

        return false; // No debería llegar aquí con los filtros actuales
    });
}

function cargarDatosReportes(range = 'all') {
    const historialCompleto = JSON.parse(localStorage.getItem('historialCompras')) || [];
    const historialCompras = filtrarHistorialPorRango(historialCompleto, range);

    if (flujoVentasChartInstance) {
        flujoVentasChartInstance.destroy();
        flujoVentasChartInstance = null;
    }
    if (productosMasVendidosChartInstance) {
        productosMasVendidosChartInstance.destroy();
        productosMasVendidosChartInstance = null;
    }

    let ingresosTotales = 0;
    let productosVendidosTotales = 0;
    const ventasTotales = historialCompras.length;
    const conteoProductos = {};

    historialCompras.forEach(compra => {
        const totalNumerico = parseFloat(compra.total.replace(/S\/\.\s?/, '').replace(/,/g, ''));
        ingresosTotales += totalNumerico;

        compra.items.forEach(item => {
            productosVendidosTotales += item.cantidad;
            if (conteoProductos[item.nombre]) {
                conteoProductos[item.nombre] += item.cantidad;
            } else {
                conteoProductos[item.nombre] = item.cantidad;
            }
        });
    });

    document.getElementById('ingresos-totales').textContent = `S/. ${ingresosTotales.toFixed(2)}`;
    document.getElementById('ventas-totales').textContent = ventasTotales;
    document.getElementById('productos-vendidos').textContent = productosVendidosTotales;

    crearGraficoFlujoVentas(historialCompras, range);
    crearGraficoProductosMasVendidos(conteoProductos);

   
    const chartsContainer = document.querySelector('.charts-container');
    const adminPanel = document.querySelector('.admin-panel');
    let noSalesMessage = adminPanel.querySelector('.no-sales-message');

    if (historialCompras.length === 0) {
        if (chartsContainer) chartsContainer.style.display = 'none';
        if (!noSalesMessage) {
            adminPanel.insertAdjacentHTML('beforeend', '<p class="no-sales-message" style="text-align:center; padding: 2rem;">Aún no se han registrado ventas para mostrar reportes.</p>');
        }
    } else {
        if (chartsContainer) chartsContainer.style.display = 'grid';
        if (noSalesMessage) noSalesMessage.remove();
    }
}

function crearGraficoFlujoVentas(historial, range) {
    if (historial.length === 0) return;
    const ctx = document.getElementById('flujo-ventas-chart').getContext('2d');

    // 1. Asegurarse de que el historial esté ordenado por fecha para que la línea de tiempo sea correcta.
    const historialOrdenado = historial.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    // 2. Extraer etiquetas (fecha/hora) y datos (total) para cada compra individual.
    // Esto mostrará cada venta como un punto (pico) en el gráfico.
    const labels = historialOrdenado.map(compra => {
        return new Date(compra.fecha).toLocaleString('es-PE', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    });
    const data = historialOrdenado.map(compra => parseFloat(compra.total.replace(/S\/\.\s?/, '').replace(/,/g, '')));

    flujoVentasChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ingreso por Venta (S/.)',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
                pointRadius: 4, // Resaltar cada "pico"
                pointBackgroundColor: 'rgba(75, 192, 192, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'S/. ' + value;
                        }
                    }
                },
                x: {
                    ticks: {
                        // Evita que las etiquetas se superpongan si hay muchas ventas
                        autoSkip: true,
                        maxRotation: 45,
                        minRotation: 0
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            // Muestra la fecha y hora completa en el tooltip para más detalle
                            const index = tooltipItems[0].dataIndex;
                            const fechaCompleta = new Date(historialOrdenado[index].fecha);
                            return fechaCompleta.toLocaleString('es-PE', { dateStyle: 'long', timeStyle: 'medium' });
                        }
                    }
                }
            }
        }
    });
}

function crearGraficoProductosMasVendidos(conteoProductos) {
    if (Object.keys(conteoProductos).length === 0) return;
    const ctx = document.getElementById('productos-mas-vendidos-chart').getContext('2d');

    // Ordenamos y cortamos para que el gráfico de torta sea legible.
    const productosOrdenados = Object.entries(conteoProductos)
        .sort(([,a],[,b]) => b - a)
        .slice(0, 10);

    const labels = productosOrdenados.map(item => item[0]);
    const data = productosOrdenados.map(item => item[1]);

    // Cambiamos a un gráfico de torta (pie).
    productosMasVendidosChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Unidades Vendidas',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)',
                    'rgba(255, 77, 106, 0.8)', 'rgba(46, 204, 113, 0.8)',
                    'rgba(52, 152, 219, 0.8)', 'rgba(241, 196, 15, 0.8)'
                ],
                borderColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}