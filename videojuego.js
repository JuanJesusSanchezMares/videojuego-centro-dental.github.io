const canvas = document.querySelector('canvas') // Seleccionar elemento "canvas" del documento
const puntuacionElemento = document.querySelector('#puntuacionElemento')
const c = canvas.getContext('2d') // Contexto de renderizado de dos dimensiones
canvas.width = window.innerWidth // Ancho del canvas equivalente al ancho de la ventana
canvas.height = window.innerHeight // Altura del canvas equivalente a altura de la ventana

let fondo = new Fondo()

let jugador = new Jugador()

let proyectiles = []

let grids = []

let invasorProyectiles = []

let particulas = []

let bombas = []

let powerUps = []

let teclas = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    A: {
        pressed: false
    },
    D: {
        pressed: false
    },
    space: {
        pressed: false
    },
    p: {
        pressed: false
    },
    P: {
        pressed: false
    }
}

let fotogramas = 0
let intervaloRandom = Math.floor(Math.random() * 500 + 500)
let game = {
    over: false,
    active: true
}
let noPausar = false //no pausar al iniciar juego? falso, se puede pausar

let puntuacion = 0

let spawnBuffer = 500
let fps = 60
let fpsIntervalo = 1000 / fps
let msPrev = window.performance.now()

function init(){
    fondo = new Fondo()

    jugador = new Jugador()

    proyectiles = []

    grids = []

    invasorProyectiles = []

    particulas = []

    bombas = []

    powerUps = []

    teclas = {
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
        A: {
            pressed: false
        },
        D: {
            pressed: false
        },
        space: {
            pressed: false
        },
        p: {
            pressed: false
        },
        P: {
            pressed: false
        }
    }
    
    fotogramas = 0
    intervaloRandom = Math.floor(Math.random() * 500 + 500)
    game = {
        over: false,
        active: true
    }
    noPausar = false //no pausar al iniciar juego? falso, se puede pausar
    puntuacion = 0
    document.querySelector('#puntuacionElemento').innerHTML = puntuacion
    document.querySelector('#puntuacionFinal').innerHTML = puntuacion
}


function finJuego(){
    audio.gameOver.play()
    noPausar = true //no pausar cuando se pierde? verdadero, no se puede pausar
    // Jugador desaparece
    setTimeout(() =>{
        jugador.opacidad = 0
        game.over = true

    }, 0)

    // Parar el juego
    setTimeout(() =>{
        game.active = false
        document.querySelector('#pantallaReinicio').style.display='flex'
        document.querySelector('#puntuacionFinal').innerHTML = puntuacion
    }, 2000)

    console.log('Impacto en la nave')
    crearParticulas({
        objeto: jugador,
        color: 'aqua'
    })
}

// Función para visualizar/cargar imagenes, realizar animación de los objetos
function animar() {
    if (!game.active) return
    requestAnimationFrame(animar)

    // velocidad de fotogramas consistente en todas las pantallas
    const msNow = window.performance.now()
    const elapsed = msNow - msPrev

    if(elapsed < fpsIntervalo) return

    msPrev = msNow - (elapsed % fpsIntervalo) //3.34

    fondo.dibujar()

    for( let i = powerUps.length - 1; i>=0; i--){
        const powerUp = powerUps[i]

        if(powerUp.posicion.x - powerUp.radio >= canvas.width){
            powerUps.splice(i, 1)
        } else{
            powerUp.actualizar()
        }
    }
    //Spawn de powerups
    if (fotogramas % 500 === 0){
        powerUps.push(
            new PowerUp({
                posicion: {
                    x: 0,
                    y: Math.random() * 300 + 15
                },
                velocidad: {
                    x: 5,
                    y: 0
                }
            })
        )
    }
    //Spawn de bombas
    if (fotogramas % 200 === 0 && bombas.length < 3){
        bombas.push(
            new Bomba({
                posicion: {
                    x: randomIntervalo(Bomba.radio, canvas.width - Bomba.radio),
                    y: randomIntervalo(Bomba.radio, canvas.height - Bomba.radio)
                },
                velocidad: {
                    x: (Math.random() - 0.5) * 6,
                    y: (Math.random() - 0.5) * 6
                }
            })
        )
    }

    for (let i = bombas.length - 1; i>=0; i--){
        const bomba = bombas[i]
        if(bomba.opacidad <= 0){
            bombas.splice(i,1)
        } else bomba.actualizar()
    }
    jugador.actualizar()

    for ( let i = jugador.particulas.length - 1; i>=0; i--){
        const particula = jugador.particulas[i]
        particula.actualizar()

        if(particula.opacidad === 0) jugador.particulas[i].splice(i, 1)
    }
    particulas.forEach((particula, i) => {
        if (particula.opacidad <= 0){
            setTimeout(() => {
                particulas.splice(i, 1)
            }, 0)
        } else {
            particula.actualizar()
        }
    console.log(particulas)
    })
    invasorProyectiles.forEach((invasorProyectil, index) => {
        if (invasorProyectil.posicion.y + invasorProyectil.height >= canvas.height){
            setTimeout(() =>{
                invasorProyectiles.splice(index, 1)
            }, 0)
        } else invasorProyectil.actualizar()

        //Proyectil impacta con jugador
        if(colisionRectangulo({
            rectangulo1: invasorProyectil,
            rectangulo2: jugador
        })){
            invasorProyectiles.splice(index, 1)
            finJuego()
        }
    })

    //console.log(invasorProyectiles)

    for(let i = proyectiles.length - 1; i>=0 ; i--) {
        const proyectil = proyectiles[i]
        for(let j = bombas.length - 1; j>=0 ; j--) {
            const bomba = bombas[j]
            //Si el proyectil toca a una bomba, remover proyectil
            if(Math.hypot(proyectil.posicion.x - bomba.posicion.x,
            proyectil.posicion.y - bomba.posicion.y) < proyectil.radio + bomba.radio && !bomba.active){
                proyectiles.splice(i, 1)
                bomba.explotar()
            }
        }

        for(let j = powerUps.length - 1; j>=0 ; j--) {
            const powerUp = powerUps[j]
            //Si el proyectil toca a un powerUp, remover proyectil
            if(Math.hypot(proyectil.posicion.x - powerUp.posicion.x,
            proyectil.posicion.y - powerUp.posicion.y) < proyectil.radio + powerUp.radio){
                proyectiles.splice(i, 1)
                powerUps.splice(j, 1)
                jugador.powerUp = 'Ametralladora'
                audio.bonus.play()
                setTimeout(() => {
                    jugador.powerUp = null
                }, 5000)
            }
        }

        //Al salir de la pantalla, el proyectil deja de formar parte del array
        if (proyectil.posicion.y + proyectil.radio <= 0) {
            proyectiles.splice(i, 1)
        } else {
            proyectil.actualizar()
        }
    }

    //Por cada grid en grids...
    grids.forEach((grid, gridIndex) => {
        grid.actualizar()
        // Spawn de proyectiles de enemigos
        if(fotogramas % 100 === 0 && grid.invasores.length > 0){
            grid.invasores[Math.floor(Math.random() * grid.invasores.length)].disparar(
                invasorProyectiles
            )
        }
        for(let i = grid.invasores.length - 1; i>=0 ; i--) {
            const invasor = grid.invasores[i]
            invasor.actualizar({velocidad: grid.velocidad})

            for(let j = bombas.length - 1; j>=0 ; j--) {
                const bomba = bombas[j]
                const invasorRadio = 15
                //Si el proyectil toca a un invasor, remover invasor
                if(Math.hypot(invasor.posicion.x - bomba.posicion.x,
                invasor.posicion.y - bomba.posicion.y) < invasorRadio + bomba.radio && bomba.active){
                    puntuacion += 50
                    puntuacionElemento.innerHTML = puntuacion
                    grid.invasores.splice(i, 1)
                    crearEtiquetaPuntuacion({
                        objeto: invasor,
                        puntuacion: 50
                    })
                    crearParticulas({
                        objeto: invasor
                    })
                }
            }
            

            // Proyectil colisión con enemigo
            //Por cada proyectil dentro del array proyectiles...
            proyectiles.forEach((proyectil, j) => {
                //Si el proyectil alcanza la posición del invasor entonces...
                if (proyectil.posicion.y - proyectil.radio <= invasor.posicion.y + invasor.height
                && proyectil.posicion.x + proyectil.radio >= invasor.posicion.x
                && proyectil.posicion.x - proyectil.radio <= invasor.posicion.x + invasor.width
                && proyectil.posicion.y + proyectil.radio >= invasor.posicion.y) {

                    setTimeout(() => {
                        const invasorEncontrado = grid.invasores.find((invasor2) => invasor2 === invasor)
                        const proyectilEncontrado = proyectiles.find((proyectil2) => proyectil2 === proyectil)
                        // Remover invasor y proyectil
                        if (invasorEncontrado && proyectilEncontrado){
                            puntuacion += 100
                            puntuacionElemento.innerHTML = puntuacion

                            crearEtiquetaPuntuacion({
                                objeto: invasor
                            })
                            crearParticulas({
                                objeto: invasor
                            })
                            audio.explotar.play()
                            grid.invasores.splice(i, 1)
                            proyectiles.splice(j, 1)
                            // Ajustar grid de invasores para colisión izquierda y derecha pantalla
                            if (grid.invasores.length > 0) {
                                const primerInvasor = grid.invasores[0]
                                const ultimoInvasor = grid.invasores[grid.invasores.length - 1]

                                grid.width = ultimoInvasor.posicion.x - primerInvasor.posicion.x + ultimoInvasor.width

                                grid.posicion.x = primerInvasor.posicion.x
                            } else {
                                grids.splice(gridIndex, 1)
                            }
                        }
                    }, 0)
                }
            })
            // Remover jugador si lo alcanzan invasores
            if(colisionRectangulo({
                rectangulo1: invasor,
                rectangulo2: jugador
            }) && !game.over
        ){
                finJuego()
            }
        }
    })

    //Al presionar A estando dentro de la pantalla...
    if(teclas.a.pressed && jugador.posicion.x >= 0 || teclas.A.pressed && jugador.posicion.x >= 0) {
        jugador.velocidad.x = -10
        jugador.rotacion = -0.06
    //Al presionar D estando dentro de la pantalla...
    } else if (teclas.d.pressed && jugador.posicion.x + jugador.width <= canvas.width || teclas.D.pressed && jugador.posicion.x + jugador.width <= canvas.width) {
        jugador.velocidad.x = 10
        jugador.rotacion = 0.06
    //Al no presionar A ni D...
    } else {
        jugador.velocidad.x = 0
        jugador.rotacion = 0
    }

    //Spawn de enemigos segun midiendo la cantidad de fotogramas y asignando un intervalo aleatorio
    //console.log(fotogramas)
    if (fotogramas % intervaloRandom === 0) {
        spawnBuffer = spawnBuffer < 0 ? 100 : spawnBuffer
        grids.push(new Grid())
        intervaloRandom = Math.floor(Math.random() * 500 + spawnBuffer)
        fotogramas = 0
        spawnBuffer -= 100
        console.log(intervaloRandom)
    }

    if (teclas.space.pressed && jugador.powerUp === 'Ametralladora' && fotogramas % 3 === 0 && !game.over){
        if (fotogramas % 6 === 0){
            audio.disparar.play()
        }
        proyectiles.push(
            new Proyectil({
                posicion: {
                    x: jugador.posicion.x + jugador.width / 2,
                    y: jugador.posicion.y
                },
                velocidad: {
                    x: 0,
                    y: -18
                },
                radio: 9
            }))
    }
    
    fotogramas++
}

document.querySelector('#botonInicio').addEventListener('click', () => {
    audio.seleccionar.play()
    audio.iniciar.play()
    audio.musicaFondo.play()
    document.querySelector('#pantallaInicio').style.display = 'none'
    document.querySelector('#puntuacionContenedor').style.display = 'block'
    animar()
})

document.querySelector('#botonReiniciar').addEventListener('click', () => {
    audio.seleccionar.play()
    document.querySelector('#pantallaReinicio').style.display = 'none'
    init()
    animar()
})

document.querySelector('#botonReanudar').addEventListener('click', () => {
    audio.seleccionar.play()
    document.querySelector('#pantallaPausa').style.display = 'none'
    game.over = false
    game.active = true
    animar()
})

// Detectar evento Pulsar Teclas
window.addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a':
            if(game.over) break
            console.log('izquierda')
            teclas.a.pressed = true
            break
        case 'd':
            if(game.over) break
            console.log('derecha')
            teclas.d.pressed = true
            break
        case 'A':
            if(game.over) break
            console.log('izquierda')
            teclas.A.pressed = true
            break
        case 'D':
            if(game.over) break
            console.log('derecha')
            teclas.D.pressed = true
            break
        case ' ':
            if(game.over) break
            audio.disparar.play()
            console.log('disparar')
            if (teclas.space.pressed) return
            teclas.space.pressed = true
            if (jugador.powerUp === 'Ametralladora') return
            proyectiles.push(
                new Proyectil({
                    posicion: {
                        x: jugador.posicion.x + jugador.width / 2,
                        y: jugador.posicion.y
                    },
                    velocidad: {
                        x: 0,
                        y: -18
                    }
                }))
            console.log(proyectiles)
            break
        //--------------------------------------------------------------------
        case 'p':
            teclas.p.pressed = true
            if(game.over === false && game.active === true && noPausar === false){
                document.querySelector('#pantallaPausa').style.display = 'flex'
                audio.seleccionar.play()
                game.over = true
                game.active = false
            }else if(game.over === true && game.active === false && noPausar === false){
                document.querySelector('#pantallaPausa').style.display = 'none'
                audio.seleccionar.play()
                game.over = false
                game.active = true
                animar()
            }
            break
        case 'P':
            teclas.P.pressed = true
            if(game.over === false && game.active === true && noPausar === false){
                document.querySelector('#pantallaPausa').style.display = 'flex'
                audio.seleccionar.play()
                game.over = true
                game.active = false
            }else if(game.over === true && game.active === false && noPausar === false){
                document.querySelector('#pantallaPausa').style.display = 'none'
                audio.seleccionar.play()
                game.over = false
                game.active = true
                animar()
            }
            break
    }
})

window.addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a':
            //console.log('izquierda')
            teclas.a.pressed = false
            break
        case 'd':
            //console.log('derecha')
            teclas.d.pressed = false
            break
        case 'A':
            //console.log('izquierda')
            teclas.A.pressed = false
            break
        case 'D':
            //console.log('derecha')
            teclas.D.pressed = false
            break
        case ' ':
            //console.log('disparar')
            teclas.space.pressed = false
            break
        case 'p':
            //console.log('pausa')
            teclas.p.pressed = false
        case 'P':
            //console.log('pausa')
            teclas.P.pressed = false
    }
})