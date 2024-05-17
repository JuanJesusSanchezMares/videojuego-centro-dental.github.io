//Propiedades del fondo
class Fondo {
    // Constructor
    constructor(){
        // Imagen del fondo
        const imagen = new Image()
        imagen.src = './img/fondo.jpg' // Imagen del fondo
            this.imagen = imagen
            this.width = canvas.width // Ancho fondo
            this.height = canvas.height // Altura fondo
            this.posicion = { // Posición de inicio imágen de fondo
                x: 0,
                y: 0
            }
    }
    // Dibujar fondo en canvas
    dibujar(){
        c.drawImage(
            this.imagen,
            this.posicion.x,
            this.posicion.y,
            this.width,
            this.height
        )
    }
}