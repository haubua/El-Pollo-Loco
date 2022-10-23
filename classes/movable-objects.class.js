class MovableObject extends DrawableObjects {
    speed = 8;
    speedY = 0;
    acceleration = 1;
    world;
    jumpInterval;
    hp = 100;
    lastHit = 0;
    timePassed2 = 0;

    /**
     * this function will check if the character is colliding with an enemy
     * 
     * @param {Object} mo 
     * @returns 
     */


    isColliding(mo) {
        return this.x + this.width - 40 > mo.x &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height && mo.hp > 0 &&
            (this.x < mo.x + mo.width || this.x < mo.x);
    }

    /**
     * this function will check if the throwed bottle is colligin with an enemy
     * 
     * @param {Object} mo 
     * @returns 
     */


    bottleIsColliding(mo) {
        return this.x + this.width - 30 > mo.x &&
            this.y + 100 > mo.y &&
            this.y < mo.y + mo.height && mo.hp > 0 &&
            this.x < mo.x;
    }


    /**
     * this function will check if the character jumped on an enemy 
     * 
     * @param {Object} mo 
     * @returns 
     */

    jumpedOnTop(mo) {
        let timePassed = new Date().getTime() - this.lastHit;
        return mo.y > this.world.character.y + 220 && timePassed > 1100 &&
            this.y + this.height >= mo.y &&
            this.y < mo.y + mo.height && mo.hp > 0 &&
            (this.x + 10 <= mo.x && this.x + 140 >= mo.x);
    }


    /**
     * this function will decrease the hp if a object got hit and it will set the time form the last hit
     */

    hit() {
        this.hp -= 5;
        if (this.hp <= 0) {
            this.hp = 0;
            this.lastHit = new Date().getTime();
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * this function will return the time passed since the last hit,
     * it will be active >1sec after a hit, to start the objects hurt animation
     * 
     * @returns 
     */

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * this function will just return if a object is dead 
     * 
     * @returns 
     */

    isDead() {
        this.timePassed2 = new Date().getTime() - this.lastHit;
        this.timePassed2 = this.timePassed2 / 1000;
        return this.hp <= 0 && this.timePassed2 < 3;
    }


    /**
     * this function will return if the characer is on the same position as the bottle
     * 
     * @param {Object} bo 
     * @returns 
     */

    isCollectingBo(bo) {
        return this.x == bo.x && this.y == 135;
    }


    /**
     * this function will return if the characer is on the same position as the coin
     * 
     * @param {Object} co 
     * @returns 
     */

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
            this.y < 80 && co.y < 191;
    }


    /**
     * this function will make objects move to the right
     */

    moveRight() {
        this.x += this.speed;
    }


    /**
     * this function will make objects move to the left
     */

    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * this function will let objects jump
     */

    jump() {
        this.speedY = 20;

    }


    /**
     * this function will load the current Image
     * 
     * @param {img} images 
     */

    animateObj(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imgChache[path];
        this.currentImg++;
    }


    /**
     * this function will let objects fall down to the ground 
     */

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }


    /**
     * this function returns if a object is above the ground
     * 
     * @returns 
     */

    isAboveGround() {
        if (this instanceof ThrowableObject && this.y < 350) { // Throwable objects should always fall 
            return true;
        } else {
            return this.y < 135;
        }
    }
}


