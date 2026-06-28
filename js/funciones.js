/* Autores: Nahira Chambi 366979 Mathias Soria 359216 */

window.addEventListener("load", inicio);

let sistema = new Sistema();
let ordenInfluencers = "asc";
let ordenArticulos = "asc";

function inicio() {
    document.getElementById("btnAbrirInfluencer").addEventListener("click", abrirInfluencer);
    document.getElementById("btnCancelarInfluencer").addEventListener("click", cerrarInfluencer);
    document.getElementById("btnAgregarInfluencer").addEventListener("click", agregarInfluencer);
    document.getElementById("btnAbrirArticulo").addEventListener("click", abrirArticulo);
    document.getElementById("btnCancelarArticulo").addEventListener("click", cerrarArticulo);
    document.getElementById("btnAgregarArticulo").addEventListener("click", agregarArticulo);
    document.getElementById("btnOrdenCodigo").addEventListener("click", cambiarOrdenArticulos);
    document.getElementById("btnAbrirVenta").addEventListener("click", abrirVenta);
    document.getElementById("btnCancelarVenta").addEventListener("click", cerrarVenta);
    document.getElementById("btnAgregarVenta").addEventListener("click", agregarVenta);
}


// ===================== INFLUENCERS =====================

function abrirInfluencer() {
    document.getElementById("dlgInfluencer").showModal();
}

function cerrarInfluencer() {
    limpiarFormInfluencer();
    document.getElementById("dlgInfluencer").close();
}

function agregarInfluencer() {
    let nombre = document.getElementById("idNombre").value;
    let mail = document.getElementById("idMail").value;
    let comision = parseFloat(document.getElementById("idComision").value);

    let mailExiste = false;
    for (let i = 0; i < sistema.listaDeInfluencers.length; i++) {
        if (sistema.listaDeInfluencers[i].mail === mail) {
            mailExiste = true;
        }
    }
    if (mailExiste) {
        alert("Ya existe un influenceer con este mail.");
        return;
    }

    let nuevoInfluencer = new Influencer(nombre, mail, comision);
    sistema.listaDeInfluencers.push(nuevoInfluencer);

    let tbody = document.getElementById("tbodyInfluencers");
    tbody.innerHTML = "";

    for (let i = 0; i < sistema.listaDeInfluencers.length; i++) {
        let influ = sistema.listaDeInfluencers[i];
        let fila = "<tr>";
        fila += "<td>" + influ.nombre + "</td>";
        fila += "<td>" + influ.mail + "</td>";
        fila += "<td>" + influ.comision + "%" + "</td>";
        fila += "<td>$ 0</td>";
        fila += "<td></td>";
        fila += "<td><button type='button'>Ventas</button></td>";
        fila += "</tr>";
        tbody.innerHTML += fila;
    }

    cerrarInfluencer();
}


// ===================== ARTÍCULOS =====================

function abrirArticulo() {
    document.getElementById("dlgArticulo").showModal();
}

function cerrarArticulo() {
    limpiarFormArticulo();
    document.getElementById("dlgArticulo").close();
}

function agregarArticulo() {
    let codigo = document.getElementById("idCodigo").value;
    let descripcion = document.getElementById("idDescripcion").value;
    let precio = parseFloat(document.getElementById("idPrecio").value);

    if (codigo === "" || descripcion === "" || isNaN(precio)) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let codigoExiste = false;
    for (let i = 0; i < sistema.listaDeArticulos.length; i++) {
        if (sistema.listaDeArticulos[i].codigo === codigo) {
            codigoExiste = true;
        }
    }
    if (codigoExiste) {
        alert("Ya existe un artículo con ese código.");
        return;
    }

    let nuevoArticulo = new Articulo(codigo, descripcion, precio);
    sistema.listaDeArticulos.push(nuevoArticulo);

    cerrarArticulo();
    pintarTablaArticulos();
}

function ordenarArticulos() {
    sistema.listaDeArticulos.sort(function (a, b) {
        if (ordenArticulos === "asc") {
            return a.codigo.localeCompare(b.codigo);
        } else {
            return b.codigo.localeCompare(a.codigo);
        }
    });
}

function pintarTablaArticulos() {
    let tabla = document.getElementById("tbodyArticulos");
    let contenido = "";

    ordenarArticulos(); // ordeno la lista según la dirección actual antes de dibujar

    for (let i = 0; i < sistema.listaDeArticulos.length; i++) {
        let articulo = sistema.listaDeArticulos[i];
        contenido = contenido + "<tr>";
        contenido = contenido + "<td>" + articulo.codigo + "</td>";
        contenido = contenido + "<td>" + articulo.descripcion + "</td>";
        contenido = contenido + "<td>$" + articulo.precio + "</td>";
        contenido = contenido + "</tr>";
    }

    tabla.innerHTML = contenido;
}

function cambiarOrdenArticulos() {
    if (ordenArticulos === "asc") {
        ordenArticulos = "desc";
    } else {
        ordenArticulos = "asc";
    }
    pintarTablaArticulos();
}


// ===================== VENTAS =====================

function abrirVenta() {
    if (sistema.listaDeInfluencers.length === 0 || sistema.listaDeArticulos.length === 0) {
        alert("Debe haber al menos un artículo y un influencer registrados.");
    } else {
        cargarSelectsVenta();
        document.getElementById("dlgVenta").showModal();
    }
}

function cargarSelectsVenta() {

}

function agregarVenta() {
    alert("Ventu");
}

function cerrarVenta() {
    limpiarFormVenta();
    document.getElementById("dlgVenta").close();
}


// ===================== LIMPIAR FORMULARIOS =====================

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