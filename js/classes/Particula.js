//Propiedades de Partícula
class Particula {
    // Constructor
    constructor({posicion, velocidad, radio, color}){
        this.posicion = posicion // Posición de explosión
        this.velocidad = velocidad // Velocidad de la explosión
        this.radio = radio // Radio de la explosión
        this.color = color
        this.opacidad = 1
    }
    //Dibujar partícula
    dibujar() {
        // Dibujar partícula
        c.save()
        c.globalAlpha = this.opacidad
        c.beginPath()
        c.arc(this.posicion.x, this.posicion.y, this.radio, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }
    // Actualizar opacidad, y posición de partícula con velocidad asignada
    actualizar() {
        this.dibujar()
        this.posicion.x += this.velocidad.x
        this.posicion.y += this.velocidad.y

        this.opacidad -= 0.01
    }
}