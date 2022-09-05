class World {
    character = new Character();
    ctx;
    canvas;
    keyboard;
    otherDirection = false;
    camera_x = 0;
    levelEnd_x = 3000;
    level = level1;
    statusBar = new StatusBar();
    statusBarBottles = new statusBarBottles();
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
        }, 100);
    }

    checkThrowableObjects() {
        if (this.keyboard.d == true && this.bottles.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 120);
            this.throwableObjects.push(bottle)
            this.bottles.splice(0, 1)
            this.statusBarBottles.setBottles(this.bottles.length)
            this.keyboard.d = false;
        }
    }


    checkCollision() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.hp > 0) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.hp)
            }
        })
    }


    checkBottleCollision() {
        this.level.enemies.forEach(enemy => {
            if (this.level.bottle.BottleIsColliding(enemy)) { //fix this
                let i = this.level.enemies.indexOf(enemy);
                this.level.enemies.splice(i, 1)
            }
        })
    }

    bottleIsColliding(mo) {
        return this.level.bottle.x == mo.x 
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
                this.level.coin.splice(i, 1)
            }
        }
        )
    }
}