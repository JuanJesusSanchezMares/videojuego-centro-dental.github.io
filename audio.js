Howler.volume(0.5)
const audio = {
    musicaFondo: new Howl({
        src:'./audio/musicaFondo.wav',
        loop: true
    }),
    bomba: new Howl({
        src:'./audio/bomba.mp3'
    }),
    bonus: new Howl({
        src:'./audio/bonus.mp3',
        volume: 0.8
    }),
    enemigoDisparo: new Howl({
        src:'./audio/enemigoDisparo.wav'
    }),
    explotar: new Howl({
        src:'./audio/explotar.wav'
    }),
    gameOver: new Howl({
        src:'./audio/gameOver.mp3'
    }),
    seleccionar: new Howl({
        src:'./audio/seleccionar.mp3'
    }),
    disparar: new Howl({
        src:'./audio/disparar.wav'
    }),
    iniciar: new Howl({
        src:'./audio/iniciar.mp3'
    })
}