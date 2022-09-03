class MovableObject extends DrawableObjects{
    speed = 30;
    speedY = 0;
    acceleration = 1;
    intervallIds = [];
    jumpInterval;
    hp = 100;
    


    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        this.hp -= 5;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

     isHurt() {
          let timePassed = new Date().getTime() - this.lastHit; 
          timePassed = timePassed / 1000
          return timePassed <1
     }

    isDead() {
        return this.hp == 0;
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
        this.speedY = 16;
        this.seconds = 0;
    }

    animateObj(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imgChache[path];
        this.currentImg++;
    }

    animateDead(images) {
        for (let i = 0; i < images.length; i++) {
            let path = images[i];
            this.img = this.imgChache[path];
        }
    }



    applyGravity() {
        setInterval(() => {
            if (this.y < 135 || this.speedY > 0) {
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
        return

    }

    setStoppableIntervall(fn, time) {
        let id = setInterval(fn, time)
        this.intervallIds.push(id)
    }

    // stopGame() {
    //     this.world.intervallIds.forEach(clearInterval);
    // }



}


