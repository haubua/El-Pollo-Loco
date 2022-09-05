class MovableObject extends DrawableObjects{
    speed = 40;
    speedY = 0;
    acceleration = 1;
    intervallIds = [];
    jumpInterval;
    hp = 10000;
    


    isColliding(mo) {
        return this.x + this.width - 40 > mo.x &&
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

    isCollectingBo(bo) {
        return this.x == bo.x &&
            this.y == 135 
    }

    isCollectingCo(co) {
        return this.x == co.x &&
        this.y < 10 && co.y > 111 || 
        this.x +80 == co.x &&
        this.y < 10 && co.y > 111 || 
        this.x +40 == co.x &&
        this.y < 10 && co.y > 111 ||
        this.x == co.x && 
        this.y < 15 && co.y > 141 || 
        this.x +80 == co.x && 
        this.y < 15 && co.y > 141 || 
        this.x +40 == co.x && 
        this.y < 15 && co.y > 141 ||
        this.x == co.x && 
        this.y < 80 && co.y < 191|| 
        this.x +80 == co.x && 
        this.y < 80 && co.y < 191|| 
        this.x +40 == co.x && 
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
        this.seconds = 0;
    }

    animateObj(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imgChache[path];
        this.currentImg++;
    }

    animateDead(images) {
        let i = 0;
        if (i < 6) {
        let path = images[i];
        this.img = this.imgChache[path];
        this.i++;
        } 
        
    }



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
    }

    setStoppableIntervall(fn, time) {
        let id = setInterval(fn, time)
        this.intervallIds.push(id)
    }

    // stopGame() {
    //     this.world.intervallIds.forEach(clearInterval);
    // }



}


