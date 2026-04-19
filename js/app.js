/**
 * URBAN BYTE - App.js
 * Lógica de negocio: Fetch, Carrito.
 */

// 1. VARIABLES GLOBALES DE ESTADO
let products = [];
let cart = JSON.parse(localStorage.getItem('urban_byte_cart')) || [];

// 2. FUNCIONES DE CARGA DE DATOS (FETCH)
const fetchProducts = async () => {
    try {
        const response = await fetch('./data/data.json');

        if (!response.ok) {
            throw new Error('No se pudo cargar el catálogo de productos.');
        }

        products = await response.json();
        renderProducts(products);
    } catch (error) {
        // Control de errores.
        productsContainer.innerHTML = `
            <div class="error-container" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
                <h3>¡Ups! Algo salió mal</h3>
                <p>No pudimos cargar los productos en este momento. Por favor, intenta recargar la página.</p>
            </div>
        `;
    }
};

// 3. FUNCIONES DE RENDERIZADO
const renderProducts = (items) => {
    productsContainer.innerHTML = '';

    if (items.length === 0) {
        productsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No se encontraron productos en esta categoría.</p>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="img-container">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <span class="category">${product.category}</span>
                <h3>${product.title}</h3>
                <div class="product-footer">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <div style="display: flex; align-items: center;">
                        <input type="number" min="1" value="1" id="qty-${product.id}" class="qty-input-card">
                        <button class="add-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });
};

const renderCart = () => {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">El carrito está vacío</p>';
        cartTotal.innerText = '$0.00';
        checkoutBtn.classList.add('hidden');
        clearCartBtn.classList.add('hidden');
        return;
    }

    checkoutBtn.classList.remove('hidden');
    clearCartBtn.classList.remove('hidden');

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-info">
                <h4>${item.title}</h4>
                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem;">
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
                        <span class="qty-input">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <p style="font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotals();
};

const updateTotals = () => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);

    cartTotal.innerText = `$${total.toFixed(2)}`;
    cartCount.innerText = count;

    localStorage.setItem('urban_byte_cart', JSON.stringify(cart));
};

// 4. FUNCIONES DEL CARRITO (LÓGICA)
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const qtyInput = document.getElementById(`qty-${id}`);
    const quantityToAdd = parseInt(qtyInput.value) || 1;

    if (product) {
        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += quantityToAdd;
        } else {
            cart.push({ ...product, quantity: quantityToAdd });
        }

        updateTotals();
        renderCart();

        toast(`Agregado: ${quantityToAdd} x "${product.title}"`);

        // Reset del input
        qtyInput.value = 1;

        cartIcon.classList.add('bounce');
        setTimeout(() => cartIcon.classList.remove('bounce'), 300);
    }
};

window.changeQuantity = (index, delta) => {
    cart[index].quantity += delta;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
        toast('Producto eliminado', 'info');
    }

    renderCart();
    updateTotals();
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    renderCart();
    updateTotals();
    toast(`Producto eliminado`, 'info');
};

const clearCart = () => {
    cart = [];
    renderCart();
    updateTotals();
    localStorage.removeItem('urban_byte_cart');
};

const finalizePurchase = () => {
    if (cart.length === 0) {
        notify('Carrito Vacío', 'Agrega algunos productos antes de finalizar la compra.', 'warning');
        return;
    }

    notify(
        '¡Gracias por tu compra!',
        'Tu pedido ha sido procesado con éxito. Pronto recibirás un correo con los detalles.',
        'success'
    );

    clearCart();
    cartModal.style.display = 'none';
};

// 5. FILTRADO
const filterProducts = (category) => {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
};

// 6. EVENTOS
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    renderCart();
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

clearCartBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    Swal.fire({
        title: '¿Vaciar carrito?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            clearCart();
            toast('Carrito vaciado', 'success');
        }
    });
});

checkoutBtn.addEventListener('click', finalizePurchase);

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts(btn.dataset.category);
    });
});

// 7. INICIO DE LA APP
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateTotals();
});
