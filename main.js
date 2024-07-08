import { productos } from './stock.js';

// Función para mostrar productos
function mostrarProductos() {
    let mensaje = "Puedes seleccionar un producto ingresando su número correspondiente. Los valores están expresados en $.\nProductos disponibles:\n";
    productos.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre}. Valor: $${producto.precio.toFixed(2)}\n`;
    });
    return mensaje;
}

// Función para seleccionar producto
function seleccionarProducto() {
    const indiceProducto = Number(prompt(mostrarProductos())) - 1;
    if (indiceProducto >= 0 && indiceProducto < productos.length) {
        return productos[indiceProducto];
    } else {
        return null;
    }
}

// Función para agregar producto al carrito
function agregarProductoAlCarrito(producto, carrito) {
    if (producto) {
        carrito.push(producto);
        alert(`Seleccionaste ${producto.nombre}. Valor: $${producto.precio.toFixed(2)}\nEl total de tu compra hasta el momento es: $${calcularTotal(carrito).toFixed(2)}`);
    } else {
        alert("Opción inválida.");
    }
}

// Función para calcular el total
function calcularTotal(carrito) {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Variables principales
const carrito = [];
let continuar = true;

// Ejecución del programa
while (continuar) {
    const productoSeleccionado = seleccionarProducto();
    agregarProductoAlCarrito(productoSeleccionado, carrito);
    continuar = confirm("¿Deseas agregar otro producto?");
}

const totalCompra = calcularTotal(carrito);

if (totalCompra > 0) {
    alert(`El total de tu compra es: $${totalCompra.toFixed(2)}\n¡Gracias por tu compra!`);
} else {
    alert("No seleccionaste ningún producto. ¡Gracias por tu visita!");
}