let formulario = document.getElementById("formulario"); 

//botones
let botonAgregar = document.getElementById("agregarButton");
let botonBuscar = document.getElementById("buscarxCodigo");
let botonEliminar = document.getElementById("elminarxCodigo");
let botonListar = document.getElementById("listadoTexto");
let botonExtraer = document.getElementById("extraerPrimero");
let botonInsertar = document.getElementById("insertarxPosicion");

let codigo = document.getElementById("codigo").value;
let nombre = document.getElementById("nombre").value;
let cantidad = document.getElementById("cantidad").value;
let costo = document.getElementById("costo").value;
let posicion = document.getElementById("posicion").value;
//divs para mostrar texto
let informes = document.querySelector(".informes");
let elementos = document.querySelector(".mostrarElementos");
let accciones = document.querySelector(".mostrarAcciones");

class listaProductos {
    constructor (){
        this.pri = null;
        this.ult = null;
    }

    agregar(producto){
        if(this.pri == null){
            this.pri = producto;
            this.ult = producto;
        }
        else{
            this.ult.sig = producto;
            this.ult = producto;
        }
    }

    buscar(codigo){
        if(this.pri == null){
            return null;
        }
        else if(codigo == this.pri.codigo){
            return this.pri;
        }
        else {
            return this.buscarRec(this.pri, codigo);
        }
    }

    buscarRec(nodoX, codigo){
        if(codigo == nodoX.codigo){
            return nodoX;
        }
        else if(nodoX.sig == null){
            return nodoX.sig
        }
        else {
            return this.buscarRec(nodoX.sig, codigo);
        }
    }

    eliminar(codigo){
        let aux;
        if(this.pri == null){
            return null;
        }
        else if (codigo == this.pri.codigo){
            this.pri = this.pri.sig;
            return true;
        }
        else{
            aux = this.eliminarRec(this.pri, codigo);
            if (aux == null){
                return null; //no se encontro
            }
            else if(aux.sig == this.ult){
                aux.sig = null;
                this.ult = aux
                return true;
            }
            else{
                aux.sig = aux.sig.sig;
                return true;
            }
            
        }
        
    }
    eliminarRec(nodoX, codigo){ //retorna el anterior
        if(nodoX.sig == null){
            return null;
        }
        else if(codigo == nodoX.sig.codigo){
            return nodoX;
        }
        else {
            return this.eliminarRec(nodoX.sig, codigo);
        }
    }
    insertar(nuevo, posicion){
        let aux;
        if(this.pri == null){
            return null;
        }
        else if(posicion == 1){
            nuevo.sig = this.pri;
            this.pri = nuevo;
            return true;
        }
        else{
            aux = this.insertarRec(this.pri, posicion, 2);
            if(aux==null){ //posicion no existente
                return null;
            }
            else{
                nuevo.sig = aux.sig;
                aux.sig = nuevo;
                return true;
            }

        }
    }
    insertarRec(nodoX, posicion, i){
        if(nodoX == null){
            return null;
        }
        else if(posicion == i){
            return nodoX; //anterior
        }
        else {
            return this.eliminarRec(nodoX.sig, posicion, i+1);
        }
    }
    listar(){
        if (this.pri == null){
            return null;
        }
        else{
            return this.listarRec(this.pri);
        }
    }

    listarRec(nodoX){
        let res;
        if(nodoX != null){
             res = nodoX.info() + this.listarRec(nodoX.sig);
        }
        return res;
    }

    extraerPrimero(){
        let aux;
        if(this.pri == this.ult){
            aux = this.pri;
            this.pri = null;
            this.ult = null;
            return aux;
        }
        else if(this.pri != null){
            let aux = this.pri
            this.pri = this.pri.sig;
            return aux;
        }
    }
    extraerUltimo(){
        let aux = this.pri;
        let ult;
        if(this.pri == this.ult){
            aux = this.pri;
            this.pri = null;
            this.ult = null;
            return aux;
        }
        while(aux.sig != this.ult){
            aux = aux.sig; 
        }
        ult = aux.sig;
        aux.sig = null;
        this.ult = aux;
        return ult;
    }
    
}
//nuevo.sig = anterior.sig.sig
//anterior.sig = nuevo
class producto{
    constructor(codigo, nombre, cantidad, costo){
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.sig = null;
    } 
    
    info(){
        return ` Codigo = ${this.codigo}, Nombre = ${this.nombre}, Cantidad = ${this.cantidad}, Costo = ${this.costo} |`
    }
}

let lista = new listaProductos();
let productos = new producto(1, "a", 2, 50);


function actualizar(){
    codigo = document.getElementById("codigo").value;
    nombre = document.getElementById("nombre").value;
    cantidad = document.getElementById("cantidad").value;
    costo = document.getElementById("costo").value;
    posicion = document.getElementById("posicion").value;
}
function agregar(){
    actualizar();
    if (codigo != "" && nombre != "" && cantidad != "" && costo != ""){
        productos = new producto(codigo, nombre, cantidad, costo);
        lista.agregar(productos);
        accciones.innerHTML += `Se agrego el producto llamado ${nombre} <br>`;
        informes.innerHTML = `<p class="informes">Agregado correctamente</p>`;
    }
    else{
        informes.innerHTML = `<p class="errores">Completa todos los campos</p>`;
    } 
    
}

function buscar(){
    actualizar()
    if (codigo != ""){
        let producto = lista.buscar(codigo);
        if(producto != null){
            elementos.innerHTML = `
            <div class="Producto">
                <p>Codigo: ${producto.codigo}<br>
                Nombre: ${producto.nombre}<br>
                Cantidad: ${producto.cantidad} <br>
                Costo: $${producto.costo}</p>
            </div>`;
            informes.innerHTML = `<p class="informes">Resultados:</p>`;
            accciones.innerHTML += `Producto con el codigo ${producto.codigo} buscado <br>`;
        }
        else{
            informes.innerHTML = `<p class="errores">No existe este codigo</p>`;
        }
    }
    else{
        informes.innerHTML = `<p class="errores">Introduce el codigo</p>`;
    } 
}

function eliminar(){
    actualizar()
    if (codigo != ""){
        let producto = lista.eliminar(codigo);
        if(producto == true){
            informes.innerHTML = `<p class="informes">Producto ${codigo} eliminado</p>`;
            accciones.innerHTML += `Producto con el codigo ${codigo} eliminado <br>`;
        }
        else{
            informes.innerHTML = `<p class="errores">No existe este codigo</p>`;
        }
    }
    else{
        informes.innerHTML = `<p class="errores">Introduce el codigo</p>`;
    } 
}

function listar(){
    elementos.innerHTML = lista.listar();
    accciones.innerHTML += "Se listaron los productos<br>";
}

function extraerUltimo(){
    let ultimo = lista.extraerUltimo();
    if (ultimo == null){
        informes.innerHTML = `<p class="errores">Sin elementos en la lista</p>`;
    }
    else{
        elementos.innerHTML = `
        <div class="Producto">
            <p>Codigo: ${ultimo.codigo}<br>
            Nombre: ${ultimo.nombre}<br>
            Cantidad: ${ultimo.cantidad} <br>
            Costo: $${ultimo.costo}</p>
        </div>`;
        informes.innerHTML = `<p class="informes">Producto eliminado</p>`;
        accciones.innerHTML += `Ultimo producto extraido<br>`;
    }
    
}

function extraerPrimero(){
    let primero = lista.extraerPrimero();
    if (primero == null){
        informes.innerHTML = `<p class="errores">Sin elementos en la lista</p>`;
    }
    else{
        elementos.innerHTML = `
        <div class="Producto">
            <p>Codigo: ${primero.codigo}<br>
            Nombre: ${primero.nombre}<br>
            Cantidad: ${primero.cantidad} <br>
            Costo: $${primero.costo}</p>
        </div>`;
        informes.innerHTML = `<p class="informes">Producto eliminado</p>`;
        accciones.innerHTML += `Primer producto extraido<br>`;
    }
    
}

function insertar(){
    actualizar();
    if (posicion == ""){
        informes.innerHTML = `<p class="errores">Introduce una posicion</p>`;
    }
    else if (codigo != "" && nombre != "" && cantidad != "" && costo != ""){
        let insertar = new producto(codigo, nombre, cantidad, costo);
        let pos = lista.insertar(insertar, posicion);
        if(pos == null){
            informes.innerHTML = `<p class="errores">Posicion no encontrada</p>`;
        }
        else{
            informes.innerHTML = `<p class="informes">Producto insertado en la posicion ${posicion}</p>`;
            accciones.innerHTML += `Producto con el codigo ${insertar.codigo} insertado<br>`;
        }

    }
    else{
        informes.innerHTML = `<p class="errores">Introduce todos los valores del producto</p>`;
    }
}

