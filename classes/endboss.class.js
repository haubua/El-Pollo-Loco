class Endboss extends MovableObject {
    y = 20;
    width = 250;
    height = 300;
    images_walking = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]
    
    /**
     * This function will load the Images to the draw(), it will place the chickens on a rendom x position, it will set the speed randomly, and it will start the animate()
     */

    constructor() {
        super().loadImage(this.images_walking[0])
        this.loadImages(this.images_walking)
        this.x = 700;
        //this.speed = 0.15 + Math.random() * 0.5;
        //this.animate();
    }

    /**
     * this function makes the chickens look like they are walking
     */

    animate() {
        setInterval(() => {
               this.animateWalking(this.images_walking);
        }, 110)
    }
}