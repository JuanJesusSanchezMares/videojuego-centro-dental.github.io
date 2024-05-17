class Bomba {
    static radio = 30
    constructor({posicion, velocidad}) {
        this.posicion = posicion
        this.velocidad = velocidad
        this.radio = 0
        this.color = 'aqua'
        this.opacidad = 1
        this.active = false

        gsap.to(this, {
            radio: 30
        })
    }
    dibujar(){
        c.save()
        c.globalAlpha = this.opacidad
        c.beginPath()
        c.arc(this.posicion.x, this.posicion.y, this.radio, 0, Math.PI*2)
        c.closePath()
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }
    actualizar(){
        this.dibujar()
        this.posicion.x += this.velocidad.x
        this.posicion.y += this.velocidad.y

        if (this.posicion.x + this.radio + this.velocidad.x >= canvas.width
            || this.posicion.x - this.radio + this.velocidad.x <= 0){
                this.velocidad.x = -this.velocidad.x
        } else if(this.posicion.y + this.radio + this.velocidad.y >= canvas.height
            || this.posicion.y - this.radio + this.velocidad.y <= 0){
                this.velocidad.y = -this.velocidad.y
            }
    }
    explotar(){
        audio.bomba.play()
        this.active = true
        this.velocidad.x = 0
        this.velocidad.y = 0
        gsap.to(this, {
            radio: 200,
            color: 'white'
        })
        gsap.to(this, {
            delay: 0.1,
            opacidad: 0,
            duration: 0.15
        })
    }
}