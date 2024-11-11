document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito desde localStorage
    const loadCart = () => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    };

    // Guardar carrito en localStorage
    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Actualizar la visualización del carrito en el navbar
    const updateCartDisplay = () => {
        const cart = loadCart();
        const cartItemsContainer = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const totalPriceElement = document.getElementById('total-price');

        cartItemsContainer.innerHTML = ''; // Limpiar elementos previos
        let totalPrice = 0;

        // Agregar cada ítem al carrito visual y calcular el precio total
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'dropdown-item d-flex justify-content-between align-items-center';
            itemElement.innerHTML = `
                <img src="${item.image}" style="height: 50px; width: auto;">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="btn btn-sm btn-danger ml-2" onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price;
        });

        // Actualizar contador de carrito y precio total
        cartCount.textContent = cart.length;
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    };

    // Manejar la acción de añadir al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');
            const size = document.getElementById("size").value;
            const cart = loadCart();

            // Crear objeto del producto y añadirlo al carrito
            const product = { name, price, image, size };
            cart.push(product);
            saveCart(cart);
            updateCartDisplay(); // Actualizar visualización del carrito
        });
    });

    // Función para eliminar ítems del carrito
    window.removeFromCart = (index) => {
        let cart = loadCart();
        cart.splice(index, 1); // Eliminar ítem por su índice
        saveCart(cart);
        updateCartDisplay();
    };

    // Actualizar la cantidad de ítems en el icono del carrito
    const updateCartCount = () => {
        const cart = loadCart();
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    };

    // Inicializar el carrito
    updateCartDisplay();
    updateCartCount();

    // Inicializar usuarios para login si no existen
    if (!localStorage.getItem('users')) {
        initializeUsers();
    }
});

// Inicializar usuarios para login
function initializeUsers() {
    const users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}
