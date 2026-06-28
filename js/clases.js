/* Autores: Nahira Chambi 366979 Mathias Soria 359216 */
class Sistema {
    constructor (){
        this.listaDeInfluencers = [];
        this.listaDeArticulos = [];
        this.listaDeVentas = [];
        this.contadorVentas = 1;

    }

    darInfluencer (){
        return this.listaDeInfluencers;
    }

    darVentas () {
        return this.listaDeVentas;
    }
} 


class Influencer {
    constructor (nombre, mail, comision){
        this.nombre = nombre;
        this.mail = mail;
        this.comision = comision;
    }
}


class Articulo {
    constructor (codigo, descripcion, precio){
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precio = precio;
    }

} 

class Venta {
    constructor(numero, articulo, cantidad, influencer, medio){
        this.numero = numero;
        this.articulo = articulo;
        this.cantidad = cantidad;
        this.influencer = influencer;
        this.medio = medio;
    }
}
