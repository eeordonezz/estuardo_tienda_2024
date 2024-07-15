// productos/productos.js

document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.querySelector('.div_produductos');
    const carritoDropdown = document.getElementById('carrito-dropdown');
    let carrito = [];

    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            const products = await response.json();
            const categories = {};

            products.forEach(product => {
                if (!categories[product.category]) {
                    categories[product.category] = [];
                }
                categories[product.category].push(product);
            });

            for (const category in categories) {
                const categoryContainer = document.createElement('div');
                categoryContainer.classList.add('category');
                categoryContainer.id = category.replace(/\s+/g, '-');

                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = category;
                categoryContainer.appendChild(categoryTitle);

                const productsFlexContainer = document.createElement('div');
                productsFlexContainer.classList.add('products-flex');

                categories[category].forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product');

                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p class="description">${product.description.substring(0, 100)}...</p>
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    `;

                    productsFlexContainer.appendChild(productElement);
                });

                categoryContainer.appendChild(productsFlexContainer);
                productContainer.appendChild(categoryContainer);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function scrollToCategory(categoryId) {
        const categoryElement = document.getElementById(categoryId);
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    document.getElementById('ropa_hombre').addEventListener('click', function(e) {
        e.preventDefault();
        scrollToCategory("men's-clothing");
    });

    document.getElementById('joyeria').addEventListener('click', function(e) {
        e.preventDefault();
        scrollToCategory("jewelery");
    });

    document.getElementById('electronicos').addEventListener('click', function(e) {
        e.preventDefault();
        scrollToCategory("electronics");
    });

    document.getElementById('ropa_mujer').addEventListener('click', function(e) {
        e.preventDefault();
        scrollToCategory("women's-clothing");
    });

    productContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;
            addProductToCart(productId);
        }
    });

    function addProductToCart(productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                carrito.push(product);
                updateCartDropdown();
            })
            .catch(error => console.error('Error:', error));
    }

    function updateCartDropdown() {
        carritoDropdown.innerHTML = '';

        carrito.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-info">
                    <span class="item-name">${item.title}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-from-cart" data-index="${index}">Eliminar</button>
            `;

            carritoDropdown.appendChild(cartItem);
        });

        carritoDropdown.style.display = 'block';
    }

    carritoDropdown.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-from-cart')) {
            const itemIndex = e.target.dataset.index;
            removeProductFromCart(itemIndex);
        }
    });

    function removeProductFromCart(index) {
        carrito.splice(index, 1);
        updateCartDropdown();
    }

    document.getElementById('carrito').addEventListener('click', function() {
        carritoDropdown.style.display = carritoDropdown.style.display === 'none' ? 'block' : 'none';
    });

    await fetchProducts();
});
