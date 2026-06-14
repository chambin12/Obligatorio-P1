/* Autores: Nahira Chambi 366979 Mathias Soria 359216 */

let sistema = new Sistema();
let ordenInfluencers = "asc";
let ordenArticulos = "asc";


document.getElementById("btnAbrirInfluencer").addEventListener("click", function() {
    document.getElementById("dlgInfluencer").showModal();
});

document.getElementById("btnCancelarInfluencer").addEventListener("click", function() {
    limpiarFormInfluencer();
    document.getElementById("dlgInfluencer").close();
});

document.getElementById("btnAbrirArticulo").addEventListener("click", function() {
    document.getElementById("dlgArticulo").showModal();
});

document.getElementById("btnCancelarArticulo").addEventListener("click", function() {
    limpiarFormArticulo();
    document.getElementById("dlgArticulo").close();
});

document.getElementById("btnAbrirVenta").addEventListener("click", function() {
    if (sistema.listaDeInfluencers.length === 0 || sistema.listaDeArticulos.length === 0) {
        alert("Debe haber al menos un artículo y un influencer registrados.");
        return;
    }
    cargarSelectsVenta();
    document.getElementById("dlgVenta").showModal();
});

document.getElementById("btnCancelarVenta").addEventListener("click", function() {
    limpiarFormVenta();
    document.getElementById("dlgVenta").close();
});

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