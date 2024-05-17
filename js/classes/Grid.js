//Propiedades del grid con invasores
class Grid {
    constructor() {
        this.posicion = {
            x: 0,
            y: 0
        }

        this.velocidad = {
            x: 4.5,
            y: 0
        }
        //Cada que se crea un grid, se crea un nuevo invasor dentro del grid array de invasores
        this.invasores = []

        //Crear filas y columnas de invasores
        const columnas = Math.round(Math.random() * 8 + 3) //Cantidad de columnas del 1 al 11, minimo 3
        const filas = Math.round(Math.random() * 5 + 3) //Cantidad de filas del 1 al 8, minimo 3

        this.width = columnas * 40 //ancho del grid es igual al ancho de las columnas con invasores
        for (let x = 0; x < columnas; x++){
            for (let y = 0; y < filas; y++){
                this.invasores.push(new Invasor({
                    posicion: {
                        x: x * 40, //cambiar valor si cambia tamaño de imagen invasor
                        y: y * 40
                    }
                }))
            }
        }
        console.log(this.invasores)
    }

    actualizar() {
        this.posicion.x += this.velocidad.x
        this.posicion.y += this.velocidad.y

        this.velocidad.y = 0 //Al completar el if, velocidad en y vuelve a 0
        //Mover derecha e izquierda el grid
        if (this.posicion.x + this.width >= canvas.width || this.posicion.x <= 0){
            this.velocidad.x = -this.velocidad.x * 1.1
            this.velocidad.y = 40 //Bajar una fila el grid
        }
    }
}