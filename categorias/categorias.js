let vinculo_header2 = document.querySelector(".productos_categoria")


vinculo_header2.innerHTML = `

    <!-- Seccion de categoriras boton --!>


    <div class="categorias">

    <button class="btn_categorias" >

    <img src="./img/tres_lineas.svg" alt="" class="tres_lineas">
    <span>Todas Las categorias</span>
    <img src="./img/flecha-hacia-abajo.svg" alt="" class="tres_lineas">



    </button>
    <div class="opciones_despegables"> 


    <a href="#">Ropa de Hombre </a>
    <a href="#">Joyeria</a>
    <a href="#">Electronicos</a>
    <a href="#">Ropa de Mujer</a>
    <a href="#">Ropa de Niño </a>
    <a href="#">Celulares</a>
    <a href="#">Computadoras</a>
    <a href="#" class="categorias_comida">Comida</a>

</div>




    </div>

    
    <!-- ------------------- --!>

    <div class="opciones_del_dia">

    <a href="#">Ofertas del Día </a>
    <a href="#">Metodos de Envio</a>
    <a href="#">Tarjetas de Regalo</a>
    <a href="#">Servicio al cliente</a>
    </div>

    <!-- ------------------- --!>


    <div class="mas_opciones_categorias"> 

    <button class="mas_categorias">Mas..</button>

    <div class="opciones_despegables_mas"> 


    <a href="#">Contactos </a>
    <a href="#">Nosotros</a>
    <a href="#">Ayuda</a>


</div>


    </div>



`