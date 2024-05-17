function randomIntervalo(min, max) {
    return Math.random() * (max - min) + min
}

function crearEtiquetaPuntuacion({puntuacion = 100, objeto}) {
    // Puntuación en pantalla al matar invasor
    const etiquetaPuntuacion = document.createElement('etiqueta')
    etiquetaPuntuacion.innerHTML = puntuacion

    etiquetaPuntuacion.style.position = 'absolute'
    etiquetaPuntuacion.style.color = 'white'
    etiquetaPuntuacion.style.top = objeto.posicion.y + 'px'
    etiquetaPuntuacion.style.left = objeto.posicion.x + 'px'

    etiquetaPuntuacion.style.userSelect = 'none'

    document.querySelector('#parentDiv').appendChild(etiquetaPuntuacion)

    gsap.to(etiquetaPuntuacion, {
        opacity: 0,
        y: -30,
        duration: 0.75,
        onComplete: () => {
            document.querySelector('#parentDiv').removeChild(etiquetaPuntuacion)
        }
    })
}


function colisionRectangulo({ rectangulo1, rectangulo2}) {
    return(
        rectangulo1.posicion.y + rectangulo1.height >= rectangulo2.posicion.y
            && rectangulo1.posicion.x + rectangulo1.width >= rectangulo2.posicion.x
            && rectangulo1.posicion.x <= rectangulo2.posicion.x + rectangulo2.width
    )
}

function crearParticulas({objeto, color}) {
    for (let i = 0; i < 15; i++){
        particulas.push(new Particula({
            posicion: {
                x: objeto.posicion.x + objeto.width / 2,
                y: objeto.posicion.y + objeto.height / 2
            },
            velocidad: {
                x : (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radio: Math.random() * 3,
            color: color || 'orange'
        }))
    }
}