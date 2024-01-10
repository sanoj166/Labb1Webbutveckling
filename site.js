document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-item');
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');

    let cart = [];

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            addToCart(item);
        });
    });

    function addToCart(item) {
        const dishName = item.querySelector('.dish-name').textContent;
        const dishPrice = parseFloat(item.querySelector('.price').textContent);
        const itemId = cart.length + 1;

        cart.push({
            id: itemId,
            name: dishName,
            price: dishPrice,
            quantity: 1
        });

        updateCart();
    }

    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'cart-item';
            listItem.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)} SEK</span>
                <span class="remove-from-cart" onclick="removeFromCart(${item.id})">Remove</span>
            `;
            cartList.appendChild(listItem);

            total += item.price * item.quantity;
        });

        totalPrice.textContent = total.toFixed(2) + ' SEK';
    }

    window.removeFromCart = function (itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCart();
    };
});
