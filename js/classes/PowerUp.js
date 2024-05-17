//Propiedades de PowerUp
class PowerUp {
    // Constructor
    constructor({posicion, velocidad}){
        this.posicion = posicion // Posición del proyectil
        this.velocidad = velocidad // Velocidad del proyectil
        this.radio = 20 // Radio del proyectil
    }
    //Dibujar al proyectil
    dibujar() {
        c.beginPath()
        c.arc(this.posicion.x, this.posicion.y, this.radio, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }
    // Actualizar posición del proyectil con velocidad asignada
    actualizar() {
        this.dibujar()
        this.posicion.x += this.velocidad.x
        this.posicion.y += this.velocidad.y
    }
}