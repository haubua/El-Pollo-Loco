class ThrowableObject extends MovableObject {




    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.throw(100, 150);
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 6;
        }, 18);
    }


}