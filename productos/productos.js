document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.querySelector('.div_produductos');
    const carritoDropdown = document.getElementById('carrito-dropdown');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let allProducts = []; 

    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            const products = await response.json();
            allProducts = products; 
            displayProducts(products); 
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function displayProducts(products) {
        productContainer.innerHTML = ''; 
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
    }

    function filterProducts() {
        const checkboxes = document.querySelectorAll('.opciones_despegables input[type="checkbox"]');
        const selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.category);

        if (selectedCategories.length > 0) {
            const filteredProducts = allProducts.filter(product => selectedCategories.includes(product.category));
            displayProducts(filteredProducts);
        } else {
            displayProducts(allProducts); 
        }
    }

    document.querySelectorAll('.opciones_despegables input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    productContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;
            addProductToCart(productId);
        }
    });

    function addProductToCart(productId) {
        const product = allProducts.find(p => p.id === parseInt(productId));
        
        if (product) {
            // Verificar si el producto ya está en el carrito
            const productInCart = carrito.find(p => p.id === product.id);

            if (productInCart) {
                // Incrementar la cantidad si el producto ya está en el carrito
                productInCart.quantity += 1;
            } else {
                // Agregar el producto al carrito con cantidad inicial de 1
                carrito.push({ ...product, quantity: 1 });
            }

            updateCartDropdown();
            saveCartToLocalStorage();
        }
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
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
                    <span class="item-quantity">Cantidad: ${item.quantity}</span>
                </div>
                <button class="remove-from-cart" data-index="${index}">Eliminar</button>
            `;

            carritoDropdown.appendChild(cartItem);
        });

        carritoDropdown.style.display = carrito.length > 0 ? 'block' : 'none';
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
        saveCartToLocalStorage();
    }

    document.getElementById('carrito').addEventListener('click', function() {
        carritoDropdown.style.display = carritoDropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Cargar productos al iniciar
    await fetchProducts();
    updateCartDropdown(); // Actualizar el carrito al cargar la página
});
