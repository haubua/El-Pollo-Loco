class World {
    character = new Character();
    clouds = [
        new Cloud()
    ];
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    ctx;
    canvas;
    keyboard;

    /**
     * This is the main function of this game, it will draw all objects on a 2d canvas
     * 
     * @param {canvas} canvas 
     * @param {keyboard} keyboard 
     */

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    /**
     * This function will just make all functiion from world.class available for character.class
     */

    setWorld() {
        this.character.world = this
    }

    /**
     * This function will draw the game
     */


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.addObjectsToMap(this.backgroundObjects);

        this.addToMap(this.character);

        //jedes Huhn welches oben in dem enemies Array angegeben ist wird ausgeführt
        this.addObjectsToMap(this.enemies);

        this.addObjectsToMap(this.clouds);

        //Draw() wird immer wieder aufgerufen
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}