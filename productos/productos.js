document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.querySelector('.div_produductos');

    // Función asíncrona para obtener productos
    async function fetchProducts() {
        try {
            // Llamada a la API usando fetch
            const response = await fetch('https://fakestoreapi.com/products');
            
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            // Convertir la respuesta en JSON
            const products = await response.json();
            const categories = {};

            // Agrupar productos por categorías
            products.forEach(product => {
                if (!categories[product.category]) {
                    categories[product.category] = [];
                }
                categories[product.category].push(product);
            });

            // Recorrer las categorías y crear los elementos HTML
            for (const category in categories) {
                // Crear un contenedor para cada categoría
                const categoryContainer = document.createElement('div');
                categoryContainer.classList.add('category');

                // Crear título de la categoría
                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = category;
                categoryContainer.appendChild(categoryTitle);

                // Crear contenedor flex para los productos
                const productsFlexContainer = document.createElement('div');
                productsFlexContainer.classList.add('products-flex');

                // Recorrer los productos dentro de cada categoría
                categories[category].forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product');

                    // Crear el contenido HTML para cada producto
                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p class="description">${product.description.substring(0, 100)}...</p>
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart">Añadir al carrito</button>
                    `;

                    // Añadir el producto al contenedor flex de productos
                    productsFlexContainer.appendChild(productElement);
                });

                // Añadir el contenedor flex de productos al contenedor de categoría
                categoryContainer.appendChild(productsFlexContainer);

                // Añadir el contenedor de la categoría al contenedor principal
                productContainer.appendChild(categoryContainer);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Llamar a la función para obtener productos
    await fetchProducts();
});
