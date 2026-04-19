# Urban Byte - Tienda Online

Este proyecto es un simulador interactivo de una tienda de e-commerce desarrollado para el curso de JavaScript de Coderhouse.

## Funcionalidades
- **Carga Dinámica**: Los productos se cargan desde un archivo `data.json` local mediante `fetch`.
- **Carrito de Compras**: Permite agregar, eliminar productos y vaciar el carrito por completo.
- **Gestión de Cantidades**: Agrupa productos idénticos y permite ver la cantidad y el subtotal por item.
- **Persistencia**: El carrito se guarda automáticamente en `localStorage` para que no se pierda al recargar la página.
- **Filtrado**: Sistema de categorías para navegar por el catálogo.
- **Circuit de Compra**: Simulación de finalización de compra con feedback visual.
- **Librerías Externas**: Uso de **SweetAlert2** para notificaciones y diálogos interactivos.

## Funcionalidades y temas del curso.
1. **DOM y Eventos**: Manipulación del DOM para renderizar productos y manejar interacciones.
2. **JSON y Fetch**: Base de datos simulada en `data.json` consumida de forma asíncrona.
3. **Control de Errores**: Implementación de `try/catch` para el manejo de fallos en la carga de datos.
4. **Almacenamiento**: Uso de `localStorage` para mantener el estado del carrito.
5. **Estética**: Diseño moderno y responsivo con CSS nativo.
6. **Código Limpio**: Estructura modular y eliminación de alertas nativas (`alert`, `confirm`).
7. **Librerías Externas**: Uso de **SweetAlert2** para notificaciones y diálogos interactivos.

## Instrucciones de Uso
1. Abre `index.html` en tu navegador.
2. Explora los productos y utiliza los filtros por categoría.
3. Haz clic en el icono "+" de cualquier producto para agregarlo al carrito.
4. Abre el carrito haciendo clic en el icono de la bolsa en la barra de navegación.
5. Puedes eliminar productos individualmente o vaciar el carrito.
6. Para finalizar, haz clic en "Finalizar Compra".

## Estructura de Archivos
- `index.html`: Estructura principal de la aplicación.
- `README.md`: Documentación del proyecto.
- `css/styles.css`: Estilos de la interfaz.
- `js/main.js`: Selectores de DOM y utilidades globales.
- `js/app.js`: Lógica de negocio y manejo del estado.
- `data/data.json`: Base de datos de productos.
- `assets/`: Recursos multimedia (imágenes de productos).

