class Cloud extends MovableObject {
    y = 30;
    width = 500;
    height = 250;
    speed = 0.5;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 50 + Math.random() * 500;
        this.animate();
    }


    /**
     * this function animates the clouds
     */

    animate() {
        setInterval(() => {
        if (startGame) 
            this.moveLeft();
    }, 100)
    }
}