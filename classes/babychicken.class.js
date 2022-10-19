class Babychicken extends MovableObject {
    y = 375;
    width = 50;
    height = 50
    hp = 5;
    die = new Audio('audio/chickenDie.mp3');
    chickenIsDead = false;
    images_walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    image_dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    
    /**
     * This function will load the Images to the draw(), it will place the chickens on a rendom x position, it will set the speed randomly, and it will start the animate()
     */

    constructor() {
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.loadImages(this.image_dead);
        this.x = 400 + Math.random() * 800; //math.random gibt eine zufällige Zahl zwischen 0 - 1 heraus
        this.speed = 0.15 + Math.random() * 0.2;
        this.animate();
    }

    /**
     * this function makes the chickens look like they are walking
     */

    animate() {
        setInterval(() => {
            if (this.hp > 0) {
                this.animateObj(this.images_walking);
            } else if (this.chickenIsDead == false){
                this.animateObj(this.image_dead);
                this.speed = 0;
                this.chickenIsDead = true;
                if (sound == true) {
                   this.die.play()
                }
            }
        }, 110)
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 40)
    }
}