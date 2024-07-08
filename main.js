import { productos } from './stock.js';

const carrito = [];

// Función para mostrar productos ordenados por precio
function mostrarProductos() {
    const productosOrdenados = productos.slice().sort((a, b) => a.precio - b.precio); 
    let mensaje = "Productos disponibles (ordenados por precio):\n";
    productosOrdenados.forEach((producto, index) => { 
        mensaje += `${index + 1}. ${producto.nombre} - ${producto.descripcion}. Tipo: ${producto.tipo}. Valor: $${producto.precio.toFixed(2)}\n`;
    });
    return mensaje;
}

// Función para seleccionar producto
function seleccionarProducto() {
    const productosOrdenados = productos.slice().sort((a, b) => a.precio - b.precio); 
    const indiceProducto = Number(prompt(mostrarProductos() + "\nSelecciona un producto ingresando su número:")) - 1;
    if (indiceProducto >= 0 && indiceProducto < productosOrdenados.length) {
        return productosOrdenados[indiceProducto];
    } else {
        alert("Opción inválida.");
        return null;
    }
}

// Función para agregar producto al carrito
function agregarProductoAlCarrito(producto) {
    if (producto) {
        carrito.push(producto);
        alert(`Seleccionaste ${producto.nombre}. Valor: $${producto.precio.toFixed(2)}`);
        mostrarCarrito();
    }
}

// Función para mostrar carrito
function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    let mensaje = "Productos en tu carrito:\n";
    carrito.forEach((producto, index) => { 
        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio.toFixed(2)}\n`;
    });
    mensaje += `\nTotal: $${calcularTotal().toFixed(2)}`;
    alert(mensaje);
}

// Función para eliminar producto del carrito
function eliminarProductoDelCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    const indiceProducto = Number(prompt("Selecciona el número del producto que deseas eliminar del carrito:\n" + carrito.map((producto, index) => `${index + 1}. ${producto.nombre}`).join('\n'))) - 1; 
    if (indiceProducto >= 0 && indiceProducto < carrito.length) {
        carrito.splice(indiceProducto, 1);
        alert("Producto eliminado del carrito.");
        mostrarCarrito();
    } else {
        alert("Opción inválida.");
    }
}

// Función para calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0); 
}

// Función para buscar producto por nombre
function buscarProductoPorNombre() {
    const nombreProducto = prompt("Ingresa el nombre del producto que deseas buscar:");
    const productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase()); 
    if (productoEncontrado) {
        alert(`Producto encontrado: ${productoEncontrado.nombre} - ${productoEncontrado.descripcion}. Valor: $${productoEncontrado.precio.toFixed(2)}`);
    } else {
        alert("Producto no encontrado.");
    }
}

// Función para filtrar productos por tipo
function filtrarProductosPorTipo() {
    const tipoProducto = prompt("Ingresa el tipo de producto que deseas filtrar:");
    const productosFiltrados = productos.filter(producto => producto.tipo.toLowerCase() === tipoProducto.toLowerCase()); 
    if (productosFiltrados.length > 0) {
        let mensaje = "Productos filtrados:\n";
        productosFiltrados.forEach((producto, index) => {
            mensaje += `${index + 1}. ${producto.nombre} - ${producto.descripcion}. Tipo: ${producto.tipo}. Valor: $${producto.precio.toFixed(2)}\n`;
        });
        alert(mensaje);
    } else {
        alert("No se encontraron productos de ese tipo.");
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    let mensaje = "Productos en tu carrito:\n";
    carrito.forEach((producto, index) => { 
        mensaje += `${index + 1}. ${producto.nombre}\n`;
    });
    mensaje += `\nTotal: $${calcularTotal().toFixed(2)}\n¡Gracias por tu compra!`;
    alert(mensaje);
    carrito.length = 0; // Vaciar el carrito
    return false; 
}

// Ejecución del programa
let continuar = true;
while (continuar) {
    const opcion = prompt("Selecciona una opción:\n1. Ver productos\n2. Buscar producto por nombre\n3. Filtrar productos por tipo\n4. Agregar producto al carrito\n5. Ver carrito\n6. Eliminar producto del carrito\n7. Finalizar compra\n8. Salir");
    switch (opcion) {
        case '1':
            alert(mostrarProductos());
            break;
        case '2':
            buscarProductoPorNombre();
            break;
        case '3':
            filtrarProductosPorTipo();
            break;
        case '4':
            const productoSeleccionado = seleccionarProducto();
            agregarProductoAlCarrito(productoSeleccionado);
            break;
        case '5':
            mostrarCarrito();
            break;
        case '6':
            eliminarProductoDelCarrito();
            break;
        case '7':
            continuar = finalizarCompra();
            break;
        case '8':
            continuar = false;
            alert("Gracias por visitar nuestra tienda.");
            break;
        default:
            alert("Opción inválida.");
            break;
    }
}
