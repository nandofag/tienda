/**
 * URBAN BYTE - Main.js
 * Selectores de DOM y configuración general de la UI
 */

// SELECTORES DEL DOM
const productsContainer = document.getElementById('products-container');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const clearCartBtn = document.getElementById('clear-cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// UTILIDADES DE NOTIFICACIÓN (SWEETALERT2)
const notify = (title, text, icon = 'success') => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonColor: '#2563eb',
        background: '#ffffff',
        customClass: {
            popup: 'animated fadeInDown'
        }
    });
};

const toast = (title, icon = 'success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
    Toast.fire({
        icon,
        title
    });
};