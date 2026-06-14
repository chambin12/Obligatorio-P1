/* Autores: Nahira Chambi 366979 Mathias Soria 359216 */

window.addEventListener("load",inicio);

let sistema = new Sistema();
let ordenInfluencers = "asc";
let ordenArticulos = "asc";

function inicio (){
    document.getElementById("btnAbrirInfluencer").addEventListener("click", abrirInfluencer);
    document.getElementById("btnCancelarInfluencer").addEventListener("click", cerrarInfluencer);
    document.getElementById("btnAgregarInfluencer").addEventListener("click", agregarInfluencer);
    document.getElementById("btnAbrirArticulo").addEventListener("click", abrirArticulo);
    document.getElementById("btnCancelarArticulo").addEventListener("click", cerrarArticulo);
    document.getElementById("btnAgregarArticulo").addEventListener("click", agregarArticulo);
    document.getElementById("btnAbrirVenta").addEventListener("click", abrirVenta);
    document.getElementById("btnCancelarVenta").addEventListener("click", cerrarVenta); 
    document.getElementById("btnAgregarVenta").addEventListener("click", agregarVenta);
    }


function abrirInfluencer () {
    document.getElementById("dlgInfluencer").showModal();
}

function cerrarInfluencer (){
    limpiarFormInfluencer();
    document.getElementById("dlgInfluencer").close();
}

function agregarInfluencer (){
    let nombre = document.getElementById("idNombre").value;
    let mail = document.getElementById("idMail").value;
    let comision = parseFloat(document.getElementById("idComision").value);

    let mailExiste = false;
    for (let i=0; i < sistema.listaDeInfluencers.length; i++){
        if (sistema.listaDeInfluencers[i].mail=== mail.value){
            mailExiste = true;
        }
    }
    if (mailExiste) {
        alert ("Ya existe un influenceer con este mail.");
        return;
    }

    let nuevoInfluencer = new Influencer (nombre.value, mail.value, parseFloat (comision.value));
    sistema.listaDeInfluencers.push(nuevoInfluencer);
    cerrarInfluencer ();
}   

function abrirArticulo(){
    document.getElementById("dlgArticulo").showModal();
}

function cerrarArticulo(){
    limpiarFormArticulo();
    document.getElementById("dlgArticulo").close();
}

function agregarArticulo (){
    alert ("Artitu");
}

function abrirVenta(){
    if (sistema.listaDeInfluencers.length === 0 || sistema.listaDeArticulos.length === 0) {
        alert("Debe haber al menos un artículo y un influencer registrados.");
    } else {
    cargarSelectsVenta();
    document.getElementById("dlgVenta").showModal();
    }
}
function cargarSelectsVenta (){

}

function agregarVenta (){
    alert ("Ventu");
}


function cerrarVenta (){
    limpiarFormVenta();
    document.getElementById("dlgVenta").close();
}



// --- Limpiar formularios ---

function limpiarFormInfluencer() {
    document.getElementById("idNombre").value = "";
    document.getElementById("idMail").value = "";
    document.getElementById("idComision").value = "";
}

function limpiarFormArticulo() {
    document.getElementById("idCodigo").value = "";
    document.getElementById("idDescripcion").value = "";
    document.getElementById("idPrecio").value = "";
}

function limpiarFormVenta() {
    document.getElementById("idCantidad").value = "";
    document.getElementById("idMedio").selectedIndex = 0;
}