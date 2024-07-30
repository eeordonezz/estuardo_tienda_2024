let vinculo_header2 = document.querySelector(".productos_categoria");

vinculo_header2.innerHTML = `
    <!-- Seccion de categorias boton --!>
    <div class="categorias">
        <button class="btn_categorias">
            <img src="./img/tres_lineas.svg" alt="" class="tres_lineas">
            <span>Todas Las categorias</span>
            <img src="./img/flecha-hacia-abajo.svg" alt="" class="tres_lineas">
        </button>
        <div class="opciones_despegables">
            <label><input type="checkbox" id="ropa_hombre" data-category="men's clothing"> Ropa de Hombre</label>
            <label><input type="checkbox" id="joyeria" data-category="jewelery"> Joyeria</label>
            <label><input type="checkbox" id="electronicos" data-category="electronics"> Electronicos</label>
            <label><input type="checkbox" id="ropa_mujer" data-category="women's clothing"> Ropa de Mujer</label>
            <label><input type="checkbox" data-category="kid's clothing"> Ropa de Niño</label>
            <label><input type="checkbox" data-category="cell phones"> Celulares</label>
            <label><input type="checkbox" data-category="computers"> Computadoras</label>
            <label class="categorias_comida"><input type="checkbox" data-category="food"> Comida</label>
        </div>
    </div>
    
    <!-- ------------------- --!>
    <div class="opciones_del_dia">
        <a href="#">Ofertas del Día</a>
        <a href="#">Metodos de Envio</a>
        <a href="#">Tarjetas de Regalo</a>
        <a href="#">Servicio al cliente</a>
    </div>

    <!-- ------------------- --!>
    <div class="mas_opciones_categorias">
        <button class="mas_categorias">Mas..</button>
        <div class="opciones_despegables_mas">
            <a href="#">Contactos</a>
            <a href="#">Nosotros</a>
            <a href="#">Ayuda</a>
        </div>
    </div>
`;