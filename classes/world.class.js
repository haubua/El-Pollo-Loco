class World {
    character = new Character();
    coin = new Audio ('audio/coin.mp3');
    ctx;
    canvas;
    keyboard;
    otherDirection = false;
    camera_x = 0;
    levelEnd_x = 3500;
    level = level1;
    statusBar = new StatusBar();
    statusBarBottles = new statusBarBottles();
    statusBarCoins = new statusBarCoins();
    throwableObjects = [];
    bottles = [];
    coins = [];
    

    /**
     * This is the main function of this game, it will draw all objects on a 2d canvas
     * 
     * @param {canvas} canvas 
     * @param {keyboard} keyboard 
     */

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.loadBackgroundObjects();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    loadBackgroundObjects() {
        for (let i = 1; i < 10; i++) {
            this.level.backgroundObjects.push(
                new BackgroundObject('img/5_background/layers/air.png', 1438 * i - 719),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 1438 * i - 719),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 1438 * i - 719),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 1438 * i - 719),
                new BackgroundObject('img/5_background/layers/air.png', 1438 * i),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438 * i),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438 * i),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438 * i)
            )
        }
    }


    /**
     * This function will just make all functiion from world.class available for character.class
     */

    setWorld() {
        this.character.world = this;
        this.statusBar.world = this;
    }

    /**
     * This function will draw the game
     */


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        //wird für jedes Huhn welches oben in dem enemies Array angegeben ist wird ausgeführt
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        //Draw() wird immer wieder aufgerufen, soviel wie die jeweilige Grafikkarte hergibt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    /**
     * This function will add objects from an Array to addToMap function
     * 
     * @param {object} objects 
     */

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * This function will add MovableObjects to the Canvas
     * 
     * @param {MovableObject} mo 
     */

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx, mo);
        mo.drawFrame(this.ctx, mo);
        if (mo.otherDirection) {
            this.flipImageback(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageback(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    run() {
        setInterval(() => {
            this.checkThrowableObjects();
            this.checkCollision();
            this.checkBottleCollision();
        }, 200)
        setInterval(() => {
            this.checkCollecting();
        }, 1);
    }


    checkThrowableObjects() {
        if (this.keyboard.d == true && this.bottles.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 120);
            // this.ThrowableObject.throw(100, 150);
            this.throwableObjects.push(bottle);
            this.bottles.splice(0, 1);
            this.statusBarBottles.setBottles(this.bottles.length);
            this.keyboard.d = false;
            
        }
    }


    checkCollision() {
        this.level.enemies.forEach(enemy => {
            if (this.character.jumpedOnTop(enemy)) {
                //chicken is dead
                enemy.hit();
            }
            if (this.character.isColliding(enemy) && this.character.hp > 0) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.hp)
            }
            
        })
    }


    checkBottleCollision() {
        this.level.enemies.forEach(enemy => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(enemy)) { 
                    let i = this.level.enemies.indexOf(enemy);
                    enemy.hit();
                    // bottle.hit(); benötigt?!
                    // enemy.animateObj(Chicken.image_dead)
                    // this.level.enemies.splice(i, 1);
                    
                }
            })
        })
    }
    

    bottleIsColliding(mo) {
        return this.throwableObjects.x + this.throwableObjects.width - 40 > mo.x &&
            this.throwableObjects.y + this.throwableObjects.height > mo.y &&
            this.throwableObjects.x < mo.x &&
            this.throwableObjects.y < mo.y + mo.height
    }


    checkCollecting() {
        this.level.bottle.forEach(bo => {
            if (this.character.isCollectingBo(bo)) {
                let i = this.level.bottle.indexOf(bo);
                this.bottles.push(1)
                this.statusBarBottles.setBottles(this.bottles.length)
                this.level.bottle.splice(i, 1)
            }
        })
        this.level.coin.forEach(co => {
            if (this.character.isCollectingCo(co)) {
                let i = this.level.coin.indexOf(co)
                this.coins.push(1);
                this.level.coin.splice(i, 1);
                this.coin.playbackRate = 9;
                this.coin.play();
                this.statusBarCoins.setCoins(this.coins.length)
            }
        }
        )
    }


    setStoppableIntervall(fn, time) {
        let id = setInterval(fn, time)
        this.intervallIds.push(id)
    }

    stopGame() {
        this.intervallIds.forEach(clearInterval);
    }
}