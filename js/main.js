// ==========================================
// 1. DECLARACIÓN DE VARIABLES Y CONSTANTES
// ==========================================
const IVA = 0.22;
let carrito = [];

// Array de objetos.
const productos = [
    { id: 1, nombre: "Remera Oversize", precio: 1500, categoria: "Ropa" },
    { id: 2, nombre: "Pantalón Denim", precio: 2500, categoria: "Ropa" },
    { id: 3, nombre: "Zapatillas Urbanas", precio: 4000, categoria: "Calzado" },
    { id: 4, nombre: "Gorra Snapback", precio: 800, categoria: "Accesorios" }
];

// ==========================================
// 2. FUNCIONES
// ==========================================

// Función flecha para listar productos en consola
const mostrarMenuConsola = () => {
    console.log("--- Catálogo de Productos ---");
    productos.forEach(prod => {
        console.log(`${prod.id}: ${prod.nombre} - $${prod.precio}`);
    });
}

// Función para buscar un producto por ID
function buscarProducto(id) {
    return productos.find(p => p.id === id);
}

// Función para calcular el total del carrito.
function calcularTotalCarrito() {
    let total = 0;
    for (const item of carrito) {
        total += item.precio;
    }
    return total;
}

// Función principal de interacción (Entrada, Procesamiento, Salida)
function iniciarSimulador() {
    alert("¡Bienvenido a nuestra Tienda de Ropa Online!");
    let continuar = true;

    while (continuar) {
        mostrarMenuConsola(); // Invocación de función

        let opcion = prompt(
            "Ingrese el ID del producto que desea agregar al carrito:\n" +
            "1: Remera\n2: Pantalón\n3: Zapatillas\n4: Gorra\n\n" +
            "Escriba 'FIN' para finalizar o 'VER' para ver el carrito."
        );

        if (opcion === null || opcion.toUpperCase() === "FIN") {
            continuar = false;
        } else if (opcion.toUpperCase() === "VER") {
            if (carrito.length === 0) {
                alert("El carrito está vacío.");
            } else {
                let detalle = "Productos en tu carrito:\n";
                carrito.forEach(item => detalle += `- ${item.nombre} ($${item.precio})\n`);
                alert(detalle);
            }
        } else {
            // Procesamiento de la entrada
            let idSeleccionado = parseInt(opcion);
            let productoEncontrado = buscarProducto(idSeleccionado);

            // Condicionales para validar
            if (productoEncontrado) {
                carrito.push(productoEncontrado);
                console.log(`Agregado: ${productoEncontrado.nombre}`);
                alert(`${productoEncontrado.nombre} ha sido agregado al carrito.`);
            } else {
                alert("ID de producto no válido. Intente nuevamente.");
            }
        }
    }

    // Salida final
    finalizarCompra();
}

function finalizarCompra() {
    if (carrito.length > 0) {
        let subtotal = calcularTotalCarrito();
        let totalConIva = subtotal * (1 + IVA);

        alert(
            "--- Resumen de Compra ---\n" +
            "Cantidad de productos: " + carrito.length + "\n" +
            "Subtotal: $" + subtotal + "\n" +
            "Total (con IVA 21%): $" + totalConIva.toFixed(2) + "\n\n" +
            "¡Gracias por su compra!"
        );
        console.log("Compra finalizada. Total con IVA: $" + totalConIva.toFixed(2));
    } else {
        alert("No compraste nada hoy. ¡Te esperamos pronto!");
    }
}

// ==========================================
// 3. EJECUCIÓN DEL PROGRAMA
// ==========================================
iniciarSimulador();