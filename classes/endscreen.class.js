class Endscreen extends DrawableObjects {
    world;
    height = 480;
    width = 720;
    x = 0;
    y = 0;


    constructor() {
        super().loadImage('img/5_background/second_half_background.png');
        this.keepPosition();
    }


    /**
     * this function will place the endscreen to the correct position
     */

    keepPosition() {
        setInterval(() => {
            this.x = world.character.x - 50;
        }, 145);
    }
}