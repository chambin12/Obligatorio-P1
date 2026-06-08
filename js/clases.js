class Sistemas {

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
    constructor (articulo, cantidad, influencer, medio){
        this.articulo = articulo;
        this.cantidad = cantidad;
        this.influencer = influencer;
        this.medio = medio;
    }
}
