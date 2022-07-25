class Canvas2D {
    constructor () {
        this.cavas = document.getElementById('screen');
        this.cavasContext = this.cavas.getContext('2d');
    }

    clear () {
        this.cavasContext.clearRect(0, 0, this.cavas.width, this.cavas.height);
    }

    drawImage (image, position, origin, rotation = 0, power) {
        if (!position) {
            position = new Vector2();
        }

        if (!origin) {
            origin = new Vector2();
        }

        this.cavasContext.save();
        this.cavasContext.translate(position.x, position.y);
        this.cavasContext.rotate(rotation);
        this.cavasContext.drawImage(image, -origin.x, -origin.y);
        this.cavasContext.restore();

        this.cavasContext.beginPath();
        this.cavasContext.moveTo(position.x, position.y);
        this.cavasContext.lineTo(position.x + (power/50)*Math.cos(rotation),position.y + (power/50)*Math.sin(rotation));//taking power from stick.js 
        this.cavasContext.stroke();//draw a line for aim depending on its power and speed;
    }
}

const Canvas = new Canvas2D();
