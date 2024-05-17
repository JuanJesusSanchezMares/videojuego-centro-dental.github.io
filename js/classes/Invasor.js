//Crear invasor
class Invasor {

    constructor({posicion}) {
        // Velocidad de movimiento del invasor
        this.velocidad = {
            x: 0,
            y: 0
        }
        // Imagen del invasor
        const imagen = new Image()
        imagen.src = './img/bacteria.png'
        imagen.onload = () => {
            const escala = 0.065
            this.imagen = imagen
            // Ancho imagen del invasor
            this.width = imagen.width  * escala
            // Altura imagen del invasor
            this.height = imagen.height * escala
            // Posición 2D del invasor
            this.posicion = {
                x: posicion.x,
                y: posicion.y
            }
        }
    }
    // Dibujar al invasor
    dibujar() {
            c.drawImage(
                this.imagen,
                this.posicion.x,
                this.posicion.y,
                this.width,
                this.height)
    }

    actualizar({velocidad}){
        if(this.imagen){ //Si la imagen esta cargada entonces...
        this.dibujar()
        this.posicion.x += velocidad.x
        this.posicion.y += velocidad.y
        }
    }

    // Disparar proyectiles desde el invasor
    disparar(InvasorProyectiles){
        audio.enemigoDisparo.play()
        InvasorProyectiles.push(
            new InvasorProyectil({
                posicion: {
                    x: this.posicion.x + this.width / 2,
                    y: this.posicion.y + this.height
                },
                velocidad: {
                    x: 0,
                    y: 5
                }
            })
        )
    }

}