let vinculo_header = document.querySelector(".cabeza");

vinculo_header.innerHTML = `
    <div class="logo"><img src="https://www.anaitgames.com/wp-content/uploads/2020/11/xbox_logo.png" alt=""></div>
    <div class="envios">
        <div class="envio1"><img src="https://www.clipartmax.com/png/full/269-2697089_pickup-delivery-camion-de-envios-blanco-png.png" alt=""></div>
        <div class="envio2">
            <span class="envio3">Envios</span> 
            <span class="envio4">A Toda Guatemala</span>
        </div>
    </div>
    <div class="div_busqueda">
        <input type="text" placeholder="" class="barra_busqueda">
        <div class="icon_busqueda"><img src="./img/lupa-de-busqueda.svg" alt=""></div>
    </div>
    <div class="mi_cuenta">     
        <div class="cuenta_persona"><img src="https://images.vexels.me/media/users/3/136558/isolated/preview/43cc80b4c098e43a988c535eaba42c53-person-user-icon.png" alt=""></div>
        <div class="micuenta_info">
            <span class="mi_cuenta1">Hola, usuario</span> 
            <span class="mi_cuenta2"><a href="#" id="open-login">Iniciar sesión</a></span>
        </div>
    </div>
    <div class="lista_deseos"><img src="./img/lista_deseos_corazon.svg" alt=""></div>
    <div class="carrito" id="carrito">
        <img src="./img/carrito-de-compras.svg" alt="">
        <div class="carrito-dropdown" id="carrito-dropdown"></div>
    </div>
`;

// Elemento del formulario de login
const loginForm = `
    <div class="login-form-container" id="login-form-container">
        <div class="login-form" id="login-form">
            <h2>Login</h2>
            <form id="login-form">
                <input type="text" placeholder="Correo electrónico" id="email">
                <input type="password" placeholder="Contraseña" id="password">
                <button type="submit">Iniciar sesión</button>
            </form>
            <div class="form-link">
                <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
        </div>
    </div>
`;

// Agregar el formulario de login al DOM, pero inicialmente oculto
vinculo_header.insertAdjacentHTML('beforeend', loginForm);

// Función para mostrar el formulario de login al hacer clic en "Iniciar sesión"
const openLogin = document.getElementById('open-login');
const loginFormContainer = document.getElementById('login-form-container');

openLogin.addEventListener('click', function(event) {
    event.preventDefault();
    loginFormContainer.style.display = 'flex'; // Mostrar el contenedor del formulario

    // Centrar el formulario en la pantalla
    const windowHeight = window.innerHeight;
    const formHeight = loginFormContainer.offsetHeight;
    const marginTop = (windowHeight - formHeight) / 2;
    loginFormContainer.style.marginTop = `${marginTop}px`;
});

// Escuchar el envío del formulario de login
const form = document.getElementById('login-form');

// Escuchar el envío del formulario de login
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Obtener datos de usuario desde Fake Store API
    fetch('https://fakestoreapi.com/users')
        .then(response => response.json())
        .then(data => {
            // Buscar el usuario que coincida con el correo electrónico y contraseña ingresados
            const user = data.find(u => u.email === emailInput && u.password === passwordInput);
            
            if (user) {
                // Actualizar el nombre de usuario en el mensaje "Hola, usuario"
                const miCuentaSpan = document.querySelector('.mi_cuenta1');
                miCuentaSpan.textContent = `Hola, ${user.username}`;

                // Cerrar el formulario de login
                loginFormContainer.style.display = 'none';

                // Cargar productos del carrito del usuario
                cargarProductosAlCarrito(user.id);
            } else {
                alert('Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.');
            }
        })
        .catch(error => {
            console.error('Error al obtener datos de usuario:', error);
        });
});

// Función para cargar productos al carrito
function cargarProductosAlCarrito(userId) {
    fetch(`https://fakestoreapi.com/carts/user/${userId}`)
        .then(response => response.json())
        .then(cart => {
            // Obtener el contenedor del carrito
            const carritoDropdown = document.getElementById('carrito-dropdown');
            
            // Limpiar el contenido actual del carrito
            carritoDropdown.innerHTML = '';

            // Verificar si el carrito contiene productos
            if (cart.length > 0) {
                const productos = cart[0].products;
                // Obtener detalles de cada producto
                productos.forEach(product => {
                    fetch(`https://fakestoreapi.com/products/${product.productId}`)
                        .then(response => response.json())
                        .then(productDetails => {
                            // Crear elemento para cada producto en el carrito
                            const productElement = document.createElement('div');
                            productElement.classList.add('carrito-item');
                            productElement.innerHTML = `
                                <img src="${productDetails.image}" alt="${productDetails.title}">
                                <div class="carrito-item-info">
                                    <span>${productDetails.title}</span>
                                    <span>Precio: $${productDetails.price}</span>
                                    <span>Cantidad: ${product.quantity}</span>
                                </div>
                            `;
                            carritoDropdown.appendChild(productElement);
                        })
                        .catch(error => {
                            console.error('Error al obtener detalles del producto:', error);
                        });
                });
            } else {
                carritoDropdown.innerHTML = '<p>El carrito está vacío.</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener el carrito del usuario:', error);
        });
}
