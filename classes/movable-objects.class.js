class MovableObject extends DrawableObjects {
    speed = 40;
    speedY = 0;
    acceleration = 1;
    world;
    jumpInterval;
    hp = 100;
    lastHit = 0;
    timePassed2 = 0;



    isColliding(mo) {
        return this.x + this.width - 40 > mo.x &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height && mo.hp > 0 &&
            (this.x < mo.x + mo.width || this.x < mo.x);
    }

    bottleIsColliding(mo) {
        return this.x + this.width - 40 > mo.x &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height && mo.hp > 0 &&
            this.x < mo.x;
    }


    jumpedOnTop(mo) {
        let timePassed = new Date().getTime() - this.lastHit;
        return mo.y > this.world.character.y + 250 && timePassed > 1300 &&
            this.y + this.height >= mo.y &&
            this.y < mo.y + mo.height && mo.hp > 0 &&
            (this.x +10 <= mo.x && this.x +140 >= mo.x)
    }


    hit() {
        this.hp -= 15;
        if (this.hp <= 0) {
            this.hp = 0;
            this.lastHit = new Date().getTime();
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000
        return timePassed < 1
    }

    isDead() {
        this.timePassed2 = new Date().getTime() - this.lastHit;
        this.timePassed2 = this.timePassed2 / 1000;
        return this.hp <= 0 && this.timePassed2 < 3;
    }

    isCollectingBo(bo) {
        return this.x == bo.x &&
            this.y == 135
    }

    isCollectingCo(co) {
        return this.x == co.x &&
            this.y < 10 && co.y > 111 ||
            this.x + 80 == co.x &&
            this.y < 10 && co.y > 111 ||
            this.x + 40 == co.x &&
            this.y < 10 && co.y > 111 ||
            this.x == co.x &&
            this.y < 15 && co.y > 141 ||
            this.x + 80 == co.x &&
            this.y < 15 && co.y > 141 ||
            this.x + 40 == co.x &&
            this.y < 15 && co.y > 141 ||
            this.x == co.x &&
            this.y < 80 && co.y < 191 ||
            this.x + 80 == co.x &&
            this.y < 80 && co.y < 191 ||
            this.x + 40 == co.x &&
            this.y < 80 && co.y < 191
    }

    /**
     * this function will let move objects to the right
     */

    moveRight() {
        this.x += this.speed;
    }

    /**
     * This function will let move objects to the left
     */

    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 20;

    }

    animateObj(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imgChache[path];
        this.currentImg++;
    }

    // animateDead(images) {
    //     let i = 0;
    //     if (i < 6) {
    //         let path = images[i];
    //         this.img = this.imgChache[path];
    //         this.i++;
    //     }

    // }



    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

            }
        }, 1000 / 25)
        // this.jumpInterval = setInterval(() => {
        //     if (this.y < 135 || this.speedY > 0) {
        //         this.animateObj(this.images_jumping);
        //     }
        // }, 145)

    }




    isAboveGround() {

        if (this instanceof ThrowableObject) { // Throwable objects should always fall 
            return true;
        } else {
            return this.y < 135
        }
        ;

    }





}


