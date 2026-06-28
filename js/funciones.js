/* Autores: Nahira Chambi 366979 Mathias Soria 359216 */

window.addEventListener("load", inicio);

let sistema = new Sistema();

// Datos de prueba temporales - BORRAR ANTES DE ENTREGAR
let inf1 = new Influencer("Ana", "ana@mail.com", 10);
let inf2 = new Influencer("Juan", "juan@mail.com", 20);
sistema.listaDeInfluencers.push(inf1);
sistema.listaDeInfluencers.push(inf2);

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
    cargarTabla();
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
    if (document.getElementById("idFormInfluencer").reportValidity()) {
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
        cargarTabla();
        cerrarInfluencer();
    }
}

function cargarTabla() {
    let tbodyInflu = document.getElementById("tbodyInfluencers");
    tbodyInflu.innerHTML = "";
    let influ = sistema.darInfluencer();

    let maxTotal = 0;
    for (let elem of influ) {
        let total = calcularTotalInfluencer(elem);
        if (total > maxTotal) {
            maxTotal = total;
        }
    }

    for (let elem of influ) {
        let fila = tbodyInflu.insertRow();
        let celdaNombre = fila.insertCell();
        celdaNombre.innerHTML = elem.nombre;
        let celdaMail = fila.insertCell();
        celdaMail.innerHTML = elem.mail;
        let celdaComision = fila.insertCell();
        celdaComision.innerHTML = elem.comision + "%";

        let celdaTotal = fila.insertCell();
        celdaTotal.innerHTML = "$ " + calcularTotalInfluencer(elem);

        let celdaEtiquetas = fila.insertCell();
        let totalElem = calcularTotalInfluencer(elem);
        let medallas = "";
        if (totalElem === 0) {
            medallas = "🧊";
        } else if (totalElem === maxTotal && maxTotal > 0) {
            medallas = "🔥";
        }
        celdaEtiquetas.innerHTML = medallas;

        let celdaDetalle = fila.insertCell();
        celdaDetalle.innerHTML = "<button type='button'>Ventas</button>";
    }
}

function calcularTotalInfluencer(influencer) {
    let total = 0;
    for (let elem of sistema.darVentas()) {
        if (elem.influencer === influencer) {
            total = total + elem.cantidad * elem.articulo.precio * (influencer.comision / 100);
        }
    }
    return total;
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

    ordenarArticulos();

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