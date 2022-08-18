class Chicken extends MovableObject {
    y = 340;
    width = 90;
    height = 90
    chicken_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    
    /**
     * This function will load the Images to the draw(), it will place the chickens on a rendom x, it will set the speed randomly, and it will start the animate()
     */

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.chicken_walking)
        this.x = 200 + Math.random() * 500; //math.random gibt eine zufällige Zahl zwischen 0 - 1 heraus
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * This functiion will let the chickens move 
     */

    animate() {
        setInterval(() => {
            let i = this.currentImg % this.chicken_walking.length;
            let path = this.chicken_walking[i];
            this.img = this.imgChache[path];
            this.currentImg++;
        }, 110);
        this.moveLeft();
    }
}