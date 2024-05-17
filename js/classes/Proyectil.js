//Propiedades de Proyectil
class Proyectil {
    // Constructor
    constructor({posicion, velocidad, radio = 7}){
        this.posicion = posicion // Posición del proyectil
        this.velocidad = velocidad // Velocidad del proyectil
        this.radio = radio // Radio del proyectil
    }
    //Dibujar al proyectil
    dibujar() {
        // Dibujar primer circulo del proyectil
        c.beginPath()
        c.arc(this.posicion.x, this.posicion.y, this.radio, 0, Math.PI * 2)
        c.fillStyle = 'aqua'
        c.fill()
        c.closePath()
        // Dibujar segundo circulo del proyectil
        c.beginPath()
        c.arc(this.posicion.x, this.posicion.y, this.radio - 2, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
        // Dibujar tercer círculo del proyectil
        c.beginPath()
        c.arc(this.posicion.x, this.posicion.y, this.radio - 5, 0, Math.PI * 2)
        c.fillStyle = 'aqua'
        c.fill()
        c.closePath()
        // Dibujar cuarto círculo del proyectil
        c.beginPath()
        c.arc(this.posicion.x, this.posicion.y, this.radio - 7, 0, Math.PI * 2)
        c.fillStyle = 'white'
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