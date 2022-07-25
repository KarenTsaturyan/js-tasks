class Table {
    constructor () {
    	this.TopBorderY = 57;
    	this.RightBorderX = 1443;
    	this.BottomBorderY = 768;
    	this.LeftBorderX = 57;
    }

    // update method is called every frame (see detailed description in the dock) 
    update (delta) {
        
    }

    // draws sprite every frame
    draw () {
        Canvas.drawImage(sprites.background, {x: 0, y: 0});
    }
}
