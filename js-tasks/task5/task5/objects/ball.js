const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;
const HOLE_RADIUS = 46;

class Ball {
    constructor (position, color) {
        this.position = position;
        this.speed= new Vector2();
        this.isMoving = false;
        // get ball sprite by its color
        this.sprite = getBallSpriteByColor(color);
    }

    // update method is called every frame (see detailed description in the dock) 
    update (delta) {
        this.position.addTo(this.speed.mult(delta));//speed*1/177=>plus to position during every update.
        this.speed = this.speed.mult(0.985);//ball is gonna lose speed.

        if(this.speed.length()<6){//changing the position of the stick when the ball stops 
            this.speed = new Vector2();//reset
            this.isMoving=false;
        }
    }

    // draws sprite every frame
    draw () {
        Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
    }

    shoot(power, rotation){
        this.speed = new Vector2(power*Math.cos(rotation), power*Math.sin(rotation));
        this.isMoving = true;
    }

    collideWithTable(table){//table collision
        if(!this.isMoving){
            return;
        }
        let collided = false;
        if(this.position.y <= table.TopBorderY + BALL_RADIUS){
            this.speed = new Vector2(this.speed.x, -this.speed.y);
            collided = true;
        }else if(this.position.x >= table.RightBorderX - BALL_RADIUS){
            this.speed = new Vector2(-this.speed.x, this.speed.y);
            collided = true;
        }else if(this.position.x <= table.LeftBorderX + BALL_RADIUS){
            this.speed = new Vector2(-this.speed.x, this.speed.y);
            collided = true;
        }else if(this.position.y >= table.BottomBorderY - BALL_RADIUS){
            this.speed = new Vector2(this.speed.x, -this.speed.y);
            collided = true;
        }
        if(collided){
            this.speed = this.speed.mult(0.97);
        }
    }
    collideWithBall(ball){//ball collision
    let squareDistance = Math.sqrt(Math.pow(ball.position.x-this.position.x,2) + Math.pow(ball.position.y - this.position.y,2));
    if(squareDistance <= (BALL_RADIUS + BALL_RADIUS)){
        ball.speed = this.speed.copy();
        ball.isMoving = true;
        this.isMoving = true;
        this.speed = new Vector2(this.speed.x-=this.speed.x/4, -this.speed.y);//white ball is starting to slow more, after collideWithBall
        ball.speed = new Vector2(ball.speed.x,ball.speed.y);
        }
    }
    Hole(){
         let startx = Math.floor((Math.random()+0.35) * 1000);//random position next to the Top-Right hole
         let starty = Math.floor((Math.random()+0.15) * 500);
        if(this.position.x>1443-HOLE_RADIUS && this.position.y<=57+HOLE_RADIUS){//only Top-Right hole
            this.position.x = startx;
            this.position.y = starty;
            this.speed = new Vector2(0, 0);//zeroing the speed
        }
    }
}
