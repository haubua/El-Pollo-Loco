class World {
    character = new Character();
    coin = new Audio('audio/coin.mp3');
    bottleCollect = new Audio('audio/bottleCollect.mp3');
    gameOver = false;
    gameWon = false;
    gameLost = false;
    endScreenActive = false;
    ctx;
    canvas;
    keyboard;
    otherDirection = false;
    camera_x = 0;
    levelEnd_x = 4000;
    levelStarts_x = 0;
    level = level1;
    lastEnemy;
    enemyID;
    bottleID;
    statusBar = new StatusBar();
    statusBarBottles = new statusBarBottles();
    statusBarCoins = new statusBarCoins();
    statusBarEndboss = new statusBarEndboss();
    lastBottleTime = 1;
    throwableObjects = [];
    bottles = [];
    coins = [];
    intervalIds = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.loadBackgroundObjects();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.isGameOver();
        this.showEndscreen();
        this.getEnemyID();
    }


    /**
     * this function will load all Backrounglayers for the whole level
     */

    loadBackgroundObjects() {
        for (let i = 1; i < 4; i++) {
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
     * This function will make all function from world.class available for character.class
     */

    setWorld() {
        this.character.world = this;
    }


    /**
     * This function will draw everything on the canvas
     */

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.renderObjects();
        this.renderMaObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.renderFixedObjects();
        //Draw() wird durch requestAnimationFrame immer wieder aufgerufen, soviel wie die jeweilige Grafikkarte hergibt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }


    /**
     * this function will render all movable Objects
     */

    renderMaObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
    }


    /**
     * this function will render all none moveable Objects
     */

    renderObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }


    /**
     * this function will render all fixed Objects
     */

    renderFixedObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        if (this.characterIsNearEndboss()) {
            this.addToMap(this.statusBarEndboss);
        }
    }


    /**
     * 
     * @returns if the character is near the endboss
     */

    characterIsNearEndboss() {
        this.lastEnemy = this.level.enemies.length - 1;
        return this.character.x <= this.level.enemies[this.lastEnemy].x
            && this.character.x + 600 >= this.level.enemies[this.lastEnemy].x
            || this.character.x >= this.level.enemies[this.lastEnemy].x;
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
        if (mo.otherDirection) {
            this.flipImageback(mo);
        }
    }


    /**
     * this function will flip the image when the object is moving to the other direction
     * 
     * @param {Object} mo 
     */

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * this function will flip the image back when the object back to its original 
     * 
     * @param {Object} mo 
     */

    flipImageback(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * this function sets important intervalls for the game
     */

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkBottleCollision();
            this.isGameOver();
            this.showEndscreen();
        }, 200)
        setInterval(() => {
            this.checkCollecting();
            this.checkThrowableObjects();
        }, 1);
    }


    /**
     * this function will check if a bottle is thrown and it will just let you throw a bottle every 1 second
     */

    checkThrowableObjects() {
        if (this.keyboard.d 
            && this.bottles.length > 0 
            && this.lastBottleTime >= 1) {
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 120);
            this.throwableObjects.push(bottle);
            this.bottles.splice(0, 1);
            this.statusBarBottles.setBottles(this.bottles.length);
            this.keyboard.d = false;
            this.lastBottleTime = 0;
        }
        this.lastBottleTime += 0.01;
    }


    /**
     * this function will check if some objects on the map are colliding
     */

    checkCollision() {
        this.level.enemies.forEach(enemy => {
            if (this.character.jumpedOnTop(enemy)) {
                enemy.hit();
                setTimeout(() => this.level.enemies.splice(enemy.id, 1), 2000);
                setTimeout(() => this.getEnemyID(), 2000);
            }
            if (this.character.isColliding(enemy) && this.character.hp > 0) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.hp);
            }
        })
    }


    /**
     * this function will give each enemy a specific ID
     */

    getEnemyID() {
        for (let id = 0; id < this.level.enemies.length; id++) {
            this.level.enemies[id].id = id;
        }
    }


    /**
     * this function will check if a bottle is collding with an enemy or if the bottle hit the gound
     */

    checkBottleCollision() {
        this.level.enemies.forEach(enemy => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.bottleIsColliding(enemy)) {
                    enemy.hit();
                    bottle.hit();
                    this.isNotEndboss(enemy);
                    this.statusBarEndboss.setPercentage(this.level.enemies[this.lastEnemy].hp);
                    setTimeout(() => this.throwableObjects.splice(0, 1), 150);
                }
            })
        })
        this.bottleHitGround();
    }


    /**
     * this function will check if the enemy is not the endboss and after 2sec it will be removed after the enemys dead 
     * 
     * @param {Object} enemy 
     */

    isNotEndboss(enemy) {
        if (enemy.id != this.lastEnemy) {
            setTimeout(() => this.level.enemies.splice(enemy.id, 1), 2000);
            setTimeout(() => this.getEnemyID(), 2000);
        }
    }


    /**
     * this function willl check if the bottle hits the ground and it will remove it form the map then
     */

    bottleHitGround() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.y > 270) {
                bottle.hit();
                setTimeout(() => this.throwableObjects.splice(0, 1), 150);
            }
        })
    }


    /**
     * this function will check it the character is collecting bottles or/and coins
     */

    checkCollecting() {
        this.checkCollectBottle();
        this.checkCollectCoin();
    }


    /**
     * this function will check if the character is collecting bottles
     */

    checkCollectBottle() {
        this.level.bottle.forEach(bo => {
            if (this.character.isCollectingBo(bo)) {
                let i = this.level.bottle.indexOf(bo);
                if (this.bottles.length < 5) {
                    this.bottles.push(1);
                    this.statusBarBottles.setBottles(this.bottles.length);
                    this.level.bottle.splice(i, 1);
                    this.bottleCollectSound();
                } else {
                    document.getElementById('warning').classList.remove('d-none-important');
                    setTimeout(() => document.getElementById('warning').classList.add('d-none-important'), 2000);
                }
            }
        })
    }


    /**
     * checks if the sound is on, if it is then it will play a sound
     */

    bottleCollectSound() {
        if (sound) {
            this.bottleCollect.play();
        }
    }


    /**
     * this function will check if the character is collecting coins
     */

    checkCollectCoin() {
        this.level.coin.forEach(co => {
            if (this.character.isCollectingCo(co)) {
                let i = this.level.coin.indexOf(co);
                this.coins.push(1);
                this.level.coin.splice(i, 1);
                this.coin.playbackRate = 9;
                this.statusBarCoins.setCoins(this.coins.length);
                this.coinCollectSound();
            }
        })
    }


    /**
     * checks if the sound is on, if it is then it will play a sound
     */

    coinCollectSound() {
        if (sound) {
            this.coin.play();
        }
    }


    /**
     * this function will check if you won or lost the game
     */

    isGameOver() {
        this.lost();
        this.won();
    }


    /**
     * this function will set the gameLost variable to true after 2sec, if you lost the game
     */

    lost() {
        if (this.character.hp <= 0 
            && !this.gameOver) {
            this.gameOver = true;
            this.bottles = [];
            setTimeout(() => {
                this.gameLost = true;
            }, 2000)
        }
    }


    /**
     * this function will set the gameWon variable to true after 2sec, if you won the game
     */


    won() {
        if (this.character.hp >= 0 
            && this.level.enemies[this.level.enemies.length - 1].hp <= 0 
            && !this.gameOver) {
            this.gameOver = true;
            this.bottles = [];
            setTimeout(() => {
                this.gameWon = true;
            }, 2000)
        }
    }


    /**
     * this function will run 2 other functions
     */

    showEndscreen() {
        this.showWonEndscreen();
        this.showLostEndscreen();
    }


    /**
     * this function will show the won endscreen 
     */

    showWonEndscreen() {
        if (this.gameWon 
            && !this.endScreenActive) {
            this.stopGame();
            wonScreenHtmlTemplate();
            document.getElementById('topBar').classList.add('screenCenter');
            document.getElementById('restartButton').classList.remove('d-none');
            if (isMobile) {
                document.getElementById('introScreen').classList.add('width100', 'height100');
            }
            this.endScreenActive = true;
        }
    }


    /**
     * this function will show the lost endscreen
     */

    showLostEndscreen() {
        if (this.gameLost && !this.endScreenActive) {
            this.stopGame();
            lostScreenHtmlTemplate();
            document.getElementById('restartButton').classList.remove('d-none');
            document.getElementById('topBar').classList.add('screenCenter');
            if (isMobile) {
                document.getElementById('introScreen').classList.add('width100', 'height100');
            }
            this.endScreenActive = true;
        }
    }


    /**
     * this function will stop all game intervalls after the game is over
     */

    stopGame() {
        for (let i = 0; i < 9999; i++) {
            window.clearInterval(i);
        }
    }
}