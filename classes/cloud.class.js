class Cloud extends MovableObject {
    y = 30;
    width = 500;
    height = 250;
    speed = 0.2;

    /**
     * This function will load the Image to the draw(), it will place the clouds on a rendom x position, and it will start the animate()
     */

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = 0 + Math.random() * 500; //math.random gibt eine zufällige Zahl zwischen 0 - 1 heraus

        this.animate();
    }

    /**
     * this function makes the clouds look like they are moving
     */


    animate() {
        this.moveLeft();
    }
}