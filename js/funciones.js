/* Autores: Nahira Chambi 366979 Mathias Soria 359216 */

window.addEventListener("load", inicio);

let sistema = new Sistema();

let ordenInfluencers = "asc";
let ordenArticulos = "asc";

function inicio() {
    document.getElementById("btnAbrirInfluencer").addEventListener("click", abrirInfluencer);
    document.getElementById("btnCancelarInfluencer").addEventListener("click", cerrarInfluencer);
    document.getElementById("btnAgregarInfluencer").addEventListener("click", agregarInfluencer);
    document.getElementById("btnOrdenNombre").addEventListener("click", cambiarOrdenInfluencer);
    document.getElementById("btnAbrirArticulo").addEventListener("click", abrirArticulo);
    document.getElementById("btnCancelarArticulo").addEventListener("click", cerrarArticulo);
    document.getElementById("btnAgregarArticulo").addEventListener("click", agregarArticulo);
    document.getElementById("btnOrdenCodigo").addEventListener("click", cambiarOrdenArticulos);
    document.getElementById("btnAbrirVenta").addEventListener("click", abrirVenta);
    document.getElementById("btnCancelarVenta").addEventListener("click", cerrarVenta);
    document.getElementById("btnAgregarVenta").addEventListener("click", agregarVenta);
    cargarTabla();
    dibujarGrafico();
}

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
            alert("Ya existe un influencer con este mail.");
            return;
        }

        let nuevoInfluencer = new Influencer(nombre, mail, comision);
        sistema.listaDeInfluencers.push(nuevoInfluencer);
        cargarTabla();
        limpiarFormInfluencer();
    }
}

function ordenarInfluencers() {
    sistema.listaDeInfluencers.sort(function (a, b) {
        if (ordenInfluencers === "asc") {
            return a.nombre.localeCompare(b.nombre);
        } else {
            return b.nombre.localeCompare(a.nombre);
        }
    });
}

function cambiarOrdenInfluencer() {
    if (ordenInfluencers === "asc") {
        ordenInfluencers = "desc";
    } else {
        ordenInfluencers = "asc";
    }
    cargarTabla();
}

function cargarTabla() {
    ordenarInfluencers();
    let tbodyInflu = document.getElementById("tbodyInfluencers");
    tbodyInflu.innerHTML = "";
    let influ = sistema.darInfluencer();
    let maxTotal = sistema.calcularMaxTotal();
    let influencerVentaCara = sistema.calcularInfluencerVentaCara();

    for (let elem of influ) {
        let fila = tbodyInflu.insertRow();
        let celdaNombre = fila.insertCell();
        celdaNombre.innerHTML = elem.nombre;
        let celdaMail = fila.insertCell();
        celdaMail.innerHTML = elem.mail;
        let celdaComision = fila.insertCell();
        celdaComision.innerHTML = elem.comision + "%";

        let totalElem = elem.calcularTotal(sistema.darVentas());

        let celdaTotal = fila.insertCell();
        celdaTotal.innerHTML = "$ " + totalElem;

        let celdaEtiquetas = fila.insertCell();
        let medallas = "";
        if (!elem.tieneVentas(sistema.darVentas())) {
            medallas = "🧊";
        } else if (totalElem === maxTotal && maxTotal > 0) {
            medallas = "🔥";
        }
        if (elem === influencerVentaCara) {
            medallas = medallas + "🟢";
        }
        celdaEtiquetas.innerHTML = medallas;

        let celdaDetalle = fila.insertCell();
        let botonVentas = document.createElement("button");
        botonVentas.innerHTML = "Ventas";
        botonVentas.addEventListener("click", function () {
            mostrarDetalleComision(elem);
        });
        celdaDetalle.appendChild(botonVentas);
    }
}

function mostrarDetalleComision(influencer) {
    if (!influencer.tieneVentas(sistema.darVentas())) {
        alert("Ventas: \n sin datos");
        return;
    }

    let ventas = sistema.darVentas();
    ventas.sort(function(a, b){
        return a.numero - b.numero;
    });

    let texto = "Ventas:\n";
    for (let elem of ventas) {
        if (elem.influencer === influencer) {
            let total = elem.calcularMonto();
            let comision = elem.calcularComision();
            texto = texto + "Nro " + elem.numero + "→ " + elem.articulo.codigo + "→" + elem.cantidad + " → $" + elem.articulo.precio + " c/u Total $" + total + "→ Comisión: $" + comision + "\n";
        }
    }
    alert(texto);
}

function abrirArticulo() {
    document.getElementById("dlgArticulo").showModal();
}

function cerrarArticulo() {
    limpiarFormArticulo();
    document.getElementById("dlgArticulo").close();
}

function agregarArticulo() {
    if (document.getElementById("idFormArticulo").reportValidity()){
    let codigo = document.getElementById("idCodigo").value;
    let descripcion = document.getElementById("idDescripcion").value;
    let precio = parseFloat(document.getElementById("idPrecio").value);

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

    limpiarFormArticulo();
    pintarTablaArticulos();
    }
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

    let maxUnidades = 0;
    for (let i = 0; i < sistema.listaDeArticulos.length; i++) {
        let unidades = sistema.listaDeArticulos[i].calcularUnidadesVendidas(sistema.darVentas());
        if (unidades > maxUnidades) {
            maxUnidades = unidades;
        }
    }

    for (let i = 0; i < sistema.listaDeArticulos.length; i++) {
        let articulo = sistema.listaDeArticulos[i];

        let medalla = "";
        if (articulo.calcularUnidadesVendidas(sistema.darVentas()) === maxUnidades && maxUnidades > 0) {
            medalla = " ⭐";
        }

        contenido = contenido + "<tr>";
        contenido = contenido + "<td>" + articulo.codigo + medalla + "</td>";
        contenido = contenido + "<td>" + articulo.descripcion + "</td>";
        contenido = contenido + "<td>" + articulo.precio + "</td>";
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


function abrirVenta() {
    if (sistema.listaDeInfluencers.length === 0 || sistema.listaDeArticulos.length === 0) {
        alert("Debe haber al menos un artículo y un influencer registrados.");
    } else {
        cargarSelectsVenta();
        document.getElementById("dlgVenta").showModal();
    }
}

function cargarSelectsVenta() {
    document.getElementById("idNumeroVenta").innerHTML = sistema.contadorVentas;

    let selectArticulo = document.getElementById("idArticuloVenta");
    let selectInfluencer = document.getElementById("idInfluencerVenta");

    selectArticulo.innerHTML = "";
    for (let i = 0; i < sistema.listaDeArticulos.length; i++) {
        let articulo = sistema.listaDeArticulos[i];
        selectArticulo.innerHTML += "<option value='" + articulo.codigo + "'>" + articulo.codigo + " - " + articulo.descripcion + "</option>";
    }

    selectInfluencer.innerHTML = "";
    for (let i = 0; i < sistema.listaDeInfluencers.length; i++) {
        let influ = sistema.listaDeInfluencers[i];
        selectInfluencer.innerHTML += "<option value='" + influ.mail + "'>" + influ.nombre + "</option>";
    }
}

function agregarVenta() {
    if (document.getElementById ("idFormVenta").reportValidity()){
    let codigoArticulo = document.getElementById("idArticuloVenta").value;
    let mailInfluencer = document.getElementById("idInfluencerVenta").value;
    let cantidad = parseInt(document.getElementById("idCantidad").value);

    let selectMedio = document.getElementById("idMedio");
    let medio = selectMedio.options[selectMedio.selectedIndex].text;

    let articuloElegido = null;
    for (let i = 0; i < sistema.listaDeArticulos.length; i++) {
        if (sistema.listaDeArticulos[i].codigo === codigoArticulo) {
            articuloElegido = sistema.listaDeArticulos[i];
        }
    }

    let influencerElegido = null;
    for (let i = 0; i < sistema.listaDeInfluencers.length; i++) {
        if (sistema.listaDeInfluencers[i].mail === mailInfluencer) {
            influencerElegido = sistema.listaDeInfluencers[i];
        }
    }

    let nuevaVenta = new Venta(sistema.contadorVentas, articuloElegido, cantidad, influencerElegido, medio);
    sistema.listaDeVentas.push(nuevaVenta);
    sistema.contadorVentas = sistema.contadorVentas + 1;

    limpiarFormVenta();
    pintarTablaVentas();
    cargarTabla();
    pintarTablaArticulos();
    dibujarGrafico();
    }
}

function pintarTablaVentas() {
    let tabla = document.getElementById("tbodyVentas");
    tabla.innerHTML = "";

    for (let i = 0; i < sistema.listaDeVentas.length; i++) {
        let venta = sistema.listaDeVentas[i];

        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = venta.numero;
        fila.insertCell().innerHTML = venta.articulo.codigo;
        fila.insertCell().innerHTML = venta.influencer.nombre;
        fila.insertCell().innerHTML = venta.cantidad;
        fila.insertCell().innerHTML = venta.medio;

        let celdaAccion = fila.insertCell();
        let boton = document.createElement("button");
        boton.type = "button";
        boton.innerHTML = "❌";
        boton.addEventListener("click", function () {
            eliminarVenta(venta.numero);
        });
        celdaAccion.appendChild(boton);
    }
}

function eliminarVenta(numero) {
    let confirmacion = confirm("¿Eliminar la fila?");
    if (confirmacion === false) {
        return;
    }

    let seguir = true;
    for (let i = 0; i < sistema.listaDeVentas.length && seguir; i++) {
        if (sistema.listaDeVentas[i].numero === numero) {
            sistema.listaDeVentas.splice(i, 1);
            seguir = false;
        }
    }

    pintarTablaVentas();
    cargarTabla();
    pintarTablaArticulos();
    dibujarGrafico();
}

function cerrarVenta() {
    limpiarFormVenta();
    document.getElementById("dlgVenta").close();
}

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
    document.getElementById("idArticuloVenta").selectedIndex = 0;
    document.getElementById("idInfluencerVenta").selectedIndex = 0;
}

function dibujarGrafico() {
    let medios = ["1-Instagram", "2-YouTube", "3-X", "4-TikTok", "5-Facebook", "6-Otras"];
    let colores = ["#E1306C", "#FF0000", "#000000", "#25F4EE", "#1877F2", "#888888"];

    let montos = [];
    for (let i = 0; i < medios.length; i++) {
        let totalMedio = 0;
        for (let j = 0; j < sistema.listaDeVentas.length; j++) {
            let venta = sistema.listaDeVentas[j];
            if (venta.medio === medios[i]) {
                totalMedio = totalMedio + venta.cantidad * venta.articulo.precio;
            }
        }
        montos.push(totalMedio);
    }

    let minMonto = montos[0];
    let maxMonto = montos[0];
    for (let i = 1; i < montos.length; i++) {
        if (montos[i] < minMonto) {
            minMonto = montos[i];
        }
        if (montos[i] > maxMonto) {
            maxMonto = montos[i];
        }
    }

    let contenedor = document.getElementById("graficoBurbujas");
    contenedor.innerHTML = "";
    contenedor.style.display = "flex";
    contenedor.style.alignItems = "flex-end";
    contenedor.style.gap = "20px";

    let radioMax = 60;

    for (let i = 0; i < medios.length; i++) {
        let porcentaje;
        if (maxMonto === minMonto) {
            porcentaje = 100;
        } else {
            porcentaje = 10 + (montos[i] - minMonto) / (maxMonto - minMonto) * 90;
        }

        let radio = radioMax * porcentaje / 100;
        let diametro = radio * 2;

        let columna = document.createElement("div");
        columna.style.display = "flex";
        columna.style.flexDirection = "column";
        columna.style.alignItems = "center";

        let burbuja = document.createElement("div");
        burbuja.style.width = diametro + "px";
        burbuja.style.height = diametro + "px";
        burbuja.style.borderRadius = "50%";
        burbuja.style.backgroundColor = colores[i];
        burbuja.style.color = "white";
        burbuja.style.display = "flex";
        burbuja.style.alignItems = "center";
        burbuja.style.justifyContent = "center";
        burbuja.style.textAlign = "center";
        burbuja.innerHTML = montos[i];

        let etiqueta = document.createElement("div");
        etiqueta.innerHTML = medios[i];
        etiqueta.style.marginTop = "6px";
        etiqueta.style.textAlign = "center";

        columna.appendChild(burbuja);
        columna.appendChild(etiqueta);
        contenedor.appendChild(columna);
    }
}