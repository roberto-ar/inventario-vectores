let productos = [];

//formulario y datos
let formulario = document.getElementById("formulario"); 

//botones
let botonAgregar = document.getElementById("agregarButton");
let botonBuscar = document.getElementById("buscarxCodigo");
let botonEliminar = document.getElementById("elminarxCodigo");
let botonListar = document.getElementById("listadoTexto");
let botonExtraer = document.getElementById("extraerPrimero");
let botonInsertar = document.getElementById("insertarxPosicion");

//divs para mostrar texto
let informes = document.querySelector(".informes");
let errores = document.querySelector(".errores");
let elementos = document.querySelector(".mostrarElementos");
let accciones = document.querySelector(".mostrarAcciones");

function enviarProducto(){
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let cantidad = document.getElementById("cantidad").value;
    let costo = document.getElementById("costo").value;
    return {codigo, nombre, cantidad, costo};

}
botonAgregar.addEventListener("click", function(){
    let producto = enviarProducto();
    let unico = true;
    if(producto.codigo !== "" && producto.nombre !== "" && producto.cantidad !== "" && producto.costo !== ""){
        for (i = 0; i < productos.length; i++){
            if(producto.codigo == productos[i].Codigo){
                unico = false;
            }
        }
        if (unico){
            productos[productos.length] = {Codigo : producto.codigo, Nombre : producto.nombre, Cantidad : producto.cantidad, Costo : producto.costo};
            formulario.reset();
            elementos.innerHTML = "";
            informes.textContent = "Producto agregado con exito";
            errores.textContent = "";
            accciones.innerHTML += `El producto con el codigo ${producto.codigo} ha sido agregado<br>`;
        }
        else {
            informes.textContent = "";
            errores.textContent = "Ya existe un producto con ese codigo";
        }
        }
    else{
        errores.textContent = "Porfavor completa todos los campos (codigo, nombre, cantidad y costo)";
        informes.textContent = "";
    }    
})

botonBuscar.addEventListener("click", function(){
let producto = enviarProducto();
let codigo = producto.codigo;
let position;
let encontrado = false;
if(codigo !== ""){
    for(i = 0 ; i < productos.length ; i++){
        if(codigo == productos[i].Codigo){
            position = i;
            encontrado = true;
        }
    }
    if(encontrado){
        elementos.innerHTML = `
                    <div class="Producto">
                <p>Codigo: ${productos[position].Codigo}<br>
                    Nombre: ${productos[position].Nombre}<br>
                    Cantidad: ${productos[position].Cantidad} <br>
                    Costo: $${productos[position].Costo}</p>
            </div>`;
        errores.textContent = "";
        informes.textContent = "";
        accciones.innerHTML += `El producto con el codigo ${producto.codigo} ha sido buscado <br>`;
    }
    else{
        errores.textContent = "No se encontro el producto";
        informes.textContent = "";
    }
}
else {
    errores.textContent = "Introduce el codigo para buscar";
    informes.textContent = "";
}

})
botonEliminar.addEventListener("click", function(){
    elementos.innerHTML = "";
    let producto = enviarProducto();
    let codigo = producto.codigo;
    let index = 0;
    let encontrado = false;
    if(codigo !== ""){
        for(i = 0 ; i < productos.length ; i++){
            if(codigo !== productos[i].Codigo){
                productos[index] = productos[i]; 
                index ++;
            }
            else {
                encontrado = true
            }
        }
        if(encontrado){
            productos.length = index;
            informes.textContent = `Producto con el codigo : ${codigo} eliminado`;
            errores.textContent = "";
            accciones.innerHTML += `El producto con el codigo ${codigo} ha sido eliminado<br>`;
            formulario.reset();
        }
        else{
            errores.textContent = "No se encontro el producto";
            informes.textContent = "";
        }
    }
    else {
        errores.textContent = "Introduce el codigo para eliminar";
        informes.textContent = "";
    }
    })

botonListar.addEventListener("click", function(){
    elementos.innerHTML = "";
    informes.textContent = "";
    errores.textContent = "";
    if (productos.length !== 0){
        for(let i = 0 ; i < productos.length ; i++){
            console.log("Hola");
            elementos.innerHTML += `
            <div class="Producto">
                 <p>Codigo: ${productos[i].Codigo}<br>
                    Nombre: ${productos[i].Nombre}<br>
                    Cantidad: ${productos[i].Cantidad} <br>
                    Costo: $${productos[i].Costo}</p>
            </div>`;
        }
        accciones.innerHTML += `Se listaron todos los elementos<br>`;
    }
    else{
        errores.textContent = "Aún no hay productos agregados";
        informes.textContent = "";
    }
})

botonExtraer.addEventListener("click", function(){
    elementos.innerHTML = `
    <div class="Producto">
         <p>El producto:<br>
            Codigo: ${productos[0].Codigo}<br>
            Nombre: ${productos[0].Nombre}<br>
            Cantidad: ${productos[0].Cantidad} <br>
            Costo: $${productos[0].Costo}<br>
            Fue eliminado con exito</p>
    </div>`;
    accciones.innerHTML += `El primer producto con el codigo ${productos[0].Codigo} ha sido extraido`;
    for(let i = 1; i < productos.length; i++){
        let j = i-1;
        productos[j] = productos[i];
    }
    productos.length = productos.length - 1;
})

botonInsertar.addEventListener("click", function(){
    let producto = enviarProducto();
    let unico = true;
    let posicion = document.getElementById("posicion").value;
    if(producto.codigo !== "" && producto.nombre !== "" && producto.cantidad !== "" && producto.costo !== ""){
        for (i = 0; i < productos.length; i++){
            if(producto.codigo == productos[i].Codigo){
                unico = false;
            }
        }
        if (unico){
            if (posicion !== ""){
                if (posicion <= productos.length){
                    for (i = productos.length; i != posicion; i--){
                        productos[i] = productos [i-1];
                    }
                    productos[posicion] = {Codigo : producto.codigo, Nombre : producto.nombre, Cantidad : producto.cantidad, Costo : producto.costo};
                    formulario.reset();
                    elementos.innerHTML = "";
                    informes.textContent = `Producto insertado con exito en la posicion ${posicion}`;
                    errores.textContent = "";
                    accciones.innerHTML += `El producto con el codigo ${producto.codigo} ha sido insertado en la posicion ${posicion}<br>`;
                }
                else {
                    errores.textContent = `Está posicion no existe aún, existen hasta ${productos.length - 1}`;
                    informes.textContent = "";
                }
            }
            else {
                errores.textContent = "Introduce la posicion";
                informes.textContent = "";
            }
        }
        else {
            errores.textContent = "Ya existe un producto con ese codigo";
            informes.textContent = "";
        }
        }
    else{
        errores.textContent = "Porfavor completa todos los campos (codigo, nombre, cantidad y costo)";
        informes.textContent = "";
    }    
})