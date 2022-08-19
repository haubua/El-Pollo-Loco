class Character extends MovableObject {
    world;
    width = 180;
    height = 300;
    walking = new Audio('audio/walking.mp3');
    images_walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * This function will load the Images to the draw(), and it will start the animate()
     */

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);

        this.animate();
    }

    /**
     * this function makes the character look like he is walking
     */


    animate() {
        setInterval(() => {
            this.walking.pause();
            if (this.world.keyboard.right && this.x < this.world.levelEnd_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking.play();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.otherDirection = true;
                this.x -= this.speed;
                this.walking.play();

            }
            this.world.camera_x = -this.x + 50
        }, 1000 / 15)
        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                this.animateWalking(this.images_walking);
            }
        }, 1000 / 15)
    }




    jump() {

    }




}
