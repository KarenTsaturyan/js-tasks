class Canvas2D {
    constructor () {
        this.cavas = document.getElementById('screen');
        this.cavasContext = this.cavas.getContext('2d');
    }

    clear () {
        this.cavasContext.clearRect(0, 0, this.cavas.width, this.cavas.height);
    }

    drawImage (image, position, origin, rotation = 0) {
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
    }
}

const Canvas = new Canvas2D();
