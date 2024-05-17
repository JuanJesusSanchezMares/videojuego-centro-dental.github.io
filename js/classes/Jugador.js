// Propiedades del Jugador
class Jugador {
    // Constructor
    constructor() {
        // Velocidad inicial de movimiento del jugador
        this.velocidad = {
            x: 0,
            y: 0
        }
        // Rotación inicial del jugador
        this.rotacion = 0
        this.opacidad = 1
        // Imagen del jugador
        const imagen = new Image()
        imagen.src = './img/nave.png' // Imagen de la nave
        imagen.onload = () => {
            const escala = 0.22
            this.imagen = imagen
            // Ancho imagen del jugador
            this.width = imagen.width  * escala
            // Altura imagen del jugador
            this.height = imagen.height * escala
            // Posición 2D del jugador
            this.posicion = {
                x: canvas.width / 2 - this.width / 2, //Posición en la mitad del canvas
                y: canvas.height - this.height - 30 //Posición en el inferior del canvas
            }
        }
        this.particulas = []
        this.fotogramas = 0
    }
    // Dibujar al jugador
    dibujar() {
            // Dibujar cuadrado donde se ubica imagen del jugador
            // c.fillStyle = 'red'
            // c.fillRect(this.posicion.x, this.posicion.y, this.width, this.height)
            //Rotacion del jugador
            c.save()
            c.globalAlpha = this.opacidad
            c.translate(
                jugador.posicion.x + jugador.width / 2,
                jugador.posicion.x + jugador.height / 2
            )
            c.rotate(this.rotacion)
            c.translate(
                -jugador.posicion.x - jugador.width / 2,
                -jugador.posicion.x - jugador.height / 2
            )
            c.drawImage(
                this.imagen,
                this.posicion.x,
                this.posicion.y,
                this.width,
                this.height)
            c.restore()
    }

    actualizar(){
        if(!this.imagen) return //Si la imagen no esta cargada entonces...
        this.dibujar()
        this.posicion.x += this.velocidad.x

        if(this.opacidad !== 1) return
        this.fotogramas++
        if(this.fotogramas % 2 === 0){
            this.particulas.push(new Particula({
                posicion: {
                    x: this.posicion.x + this.width / 2,
                    y: this.posicion.y + this.height,
                },
                velocidad: {
                    x: (Math.random() - 0.5) * 2,
                    y: 1.4
                },
                radio: Math.random() * 3,
                color: 'white'
            }))
        }
    }

}