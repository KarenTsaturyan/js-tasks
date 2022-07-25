const OriginOfTheStick = new Vector2(970, 11);
const ShootOrigin =new Vector2(950, 11);
const MaxPower = 6500;
class Stick {
    constructor (position,shootBall) {
        this.position = position;
        this.rotation = 0;
        this.origin = OriginOfTheStick.copy();
        this.power = 0;//force of impact
        this.shootBall=shootBall;
        this.shot = false;
        this.disable = true;
    }

    // update method is called every frame (see detailed description in the dock) 
    update (delta) {
        if(Mouse.left.down && this.disable){
            this.increasePower();
        }else if(this.power>0){
            this.shoot();
        }
        let a =Mouse.position.y - this.position.y;
        let b =Mouse.position.x - this.position.x;
        this.rotation=Math.atan2(a, b);// From (x1,y1) to (x2,y2) the direction is atan2(y2−y1,x2−x1) (-radians-) 
    }   

    // draws sprite every frame
    draw () {
        Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
    }
    increasePower(){
        this.power+=100;
        this.origin.x+=5;
        if(this.origin.x >= 1200){
            this.origin.x-=5;
            this.power = MaxPower;
        }
    }
    shoot(){
        this.shootBall(this.power,this.rotation);//give arguments to shoot()/ball.js
        this.power = 0;
        this.origin = ShootOrigin.copy();//coordinates of the starting position of the stick
        this.shot = true;
    }
    reposition(position){
        this.position = position.copy();
        this.origin = OriginOfTheStick.copy();
        this.shot = false;
    }
}
