const DELTA = 1/177;

class GameWorld {
    constructor () {
        //create the rest of balls
        this.balls = [
        [new Vector2(413, 413), Color.white]//main ball
        ].map(params=>new Ball(params[0],params[1]));
        // create the ball
        this.ball = this.balls[this.balls.length - 1];

        // create the stick 
        this.stick = new Stick(new Vector2(413, 413), this.ball.shoot.bind(this.ball));//.bind=> reference for the ball;

        // create the table
        this.table = new Table();
    }

    handleCollision(){
        for (let i = 0; i <this.balls.length; i++) {
            this.balls[i].collideWithTable(this.table)
        }
    }   

    // update method is called every frame (see detailed description in the dock) 
    update () {
        this.handleCollision();
        // updating objects created in the constructor
        this.table.update(DELTA);
        this.stick.update(DELTA);
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update(DELTA);
        }
        if(!this.ballsMoving() && this.stick.shot){// check when the ball stops
            this.stick.reposition(this.ball.position);//The cue sticks to ball
            this.stick.disable = true;//left click on
        }else if(this.ballsMoving() ){this.stick.disable = false;}//left click off
    }

    // draws sprite every frame
    draw () {
        // updating objects created in the constructor
        this.table.draw();
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].draw();
        }
        this.stick.draw();
    }
    ballsMoving(){
        let ballsMoving = false;
        for (let i = 0; i < this.balls.length; i++) {
            if(this.balls[i].isMoving){
                ballsMoving = true;
                break;
            }
        }
          return ballsMoving;
    }
}
