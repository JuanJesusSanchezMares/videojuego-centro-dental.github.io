//Propiedades de Proyectil
class InvasorProyectil {
    // Constructor
    constructor({posicion, velocidad}){
        this.posicion = posicion // Posición del proyectil
        this.velocidad = velocidad // Velocidad del proyectil
        this.width = 3
        this.height = 25
    }
    //Dibujar al proyectil
    dibujar() {
        c.fillStyle = 'fuchsia'
        c.fillRect(this.posicion.x - 2, this.posicion.y - 2.5, this.width + 4, this.height + 8)
        c.fillStyle = 'white'
        c.fillRect(this.posicion.x, this.posicion.y, this.width, this.height)
    }
    // Actualizar posición del proyectil con velocidad asignada
    actualizar() {
        this.dibujar()
        this.posicion.x += this.velocidad.x
        this.posicion.y += this.velocidad.y
    }
}