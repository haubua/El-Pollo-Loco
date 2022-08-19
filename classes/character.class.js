class Character extends MovableObject {
    world;
    width = 180;
    height = 300;
    character_walking = [
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
        this.loadImages(this.character_walking);

        this.animate();
    }

    /**
     * this function makes the character look like he is walking
     */


    animate() {
        setInterval(() => {
            if (this.world.keyboard.right) {
                this.x += this.speed;
                this.otherDirection = false;
                
            }
            if (this.world.keyboard.left) {
                this.otherDirection = true;
                this.x -= this.speed;
                
            }
            this.world.camera_x = -this.x
        }, 1000 / 15)



        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                let i = this.currentImg % this.character_walking.length;
                let path = this.character_walking[i];
                this.img = this.imgChache[path];
                this.currentImg++

            }
        }, 1000 / 15)
    }




    jump() {

    }




}
