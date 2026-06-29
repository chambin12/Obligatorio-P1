/* Autores: Nahira Chambi 366979 Mathias Soria 359216 */
class Sistema {
    constructor() {
        this.listaDeInfluencers = [];
        this.listaDeArticulos = [];
        this.listaDeVentas = [];
        this.contadorVentas = 1;
    }

    darInfluencer() {
        return this.listaDeInfluencers;
    }

    darVentas() {
        return this.listaDeVentas;
    }

    // Total a cobrar más alto entre todos los influencers (para la medalla 🔥)
    calcularMaxTotal() {
        let maxTotal = 0;
        for (let i = 0; i < this.listaDeInfluencers.length; i++) {
            let total = this.listaDeInfluencers[i].calcularTotal(this.listaDeVentas);
            if (total > maxTotal) {
                maxTotal = total;
            }
        }
        return maxTotal;
    }

    // Influencer dueño de la venta más cara (para la medalla 🟢)
    calcularInfluencerVentaCara() {
        let influencerVentaCara = "";
        let maxVenta = 0;
        for (let i = 0; i < this.listaDeVentas.length; i++) {
            let monto = this.listaDeVentas[i].calcularMonto();
            if (monto > maxVenta) {
                maxVenta = monto;
                influencerVentaCara = this.listaDeVentas[i].influencer;
            }
        }
        return influencerVentaCara;
    }
}


class Influencer {
    constructor(nombre, mail, comision) {
        this.nombre = nombre;
        this.mail = mail;
        this.comision = comision;
    }

    // Total a cobrar: suma de las comisiones de sus ventas.
    // Recibe la lista de ventas porque el influencer no la guarda (vive en Sistema).
    calcularTotal(listaDeVentas) {
        let total = 0;
        for (let i = 0; i < listaDeVentas.length; i++) {
            if (listaDeVentas[i].influencer === this) {
                total = total + listaDeVentas[i].calcularComision();
            }
        }
        return total;
    }

    // ¿Tiene al menos una venta registrada? (para la medalla 🧊 y el detalle)
    tieneVentas(listaDeVentas) {
        for (let i = 0; i < listaDeVentas.length; i++) {
            if (listaDeVentas[i].influencer === this) {
                return true;
            }
        }
        return false;
    }
}


class Articulo {
    constructor(codigo, descripcion, precio) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    // Unidades vendidas de este artículo (para la medalla ⭐)
    calcularUnidadesVendidas(listaDeVentas) {
        let total = 0;
        for (let i = 0; i < listaDeVentas.length; i++) {
            if (listaDeVentas[i].articulo === this) {
                total = total + listaDeVentas[i].cantidad;
            }
        }
        return total;
    }
}


class Venta {
    constructor(numero, articulo, cantidad, influencer, medio) {
        this.numero = numero;
        this.articulo = articulo;
        this.cantidad = cantidad;
        this.influencer = influencer;
        this.medio = medio;
    }

    // Monto de la venta: cantidad por precio del artículo
    calcularMonto() {
        return this.cantidad * this.articulo.precio;
    }

    // Comisión que gana el influencer por esta venta
    calcularComision() {
        return this.calcularMonto() * this.influencer.comision / 100;
    }
}