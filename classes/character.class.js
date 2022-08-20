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

    images_jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    images_standing = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    images_sleeping = [
        'img/2_character_pepe/1_idle/long_iidle/I-11.png',
        'img/2_character_pepe/1_idle/long_iidle/I-13.png',
        'img/2_character_pepe/1_idle/long_iidle/I-14.png',
        'img/2_character_pepe/1_idle/long_iidle/I-15.png',
        'img/2_character_pepe/1_idle/long_iidle/I-16.png',
        'img/2_character_pepe/1_idle/long_iidle/I-17.png',
        'img/2_character_pepe/1_idle/long_iidle/I-18.png',
        'img/2_character_pepe/1_idle/long_iidle/I-19.png',
        'img/2_character_pepe/1_idle/long_iidle/I-20.png'

    ];

    images_hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]


    /**
     * This function will load the Images to the draw(), and it will start the animate()
     */

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_sleeping);
        this.loadImages(this.images_standing);
        
        this.animate();
        this.applyGravity();
        this.animatePause();
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
            if (this.world.keyboard.up && this.y > 25 && this.speedY <= 0 && this.y >= 135) {
                this.speedY = 16;
            } 
            this.world.camera_x = -this.x + 50
        }, 1000 / 15)
        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                this.animateObj(this.images_walking);
            }
        }, 1000 / 15)
    }

    animatePause() {
        
        setInterval(() => {
        if (!this.world.keyboard.right && !this.world.keyboard.left && !this.world.keyboard.down && !this.world.keyboard.up) {
            this.animateObj(this.images_standing);
            setTimeout(() => {
                this.animateObj(this.images_sleeping);
        }, 2000)
        }}, 200)
    }




    /*jump() {
        setInterval(() => {

            if (this.y == 25) {
                this.jumped = true;
                this.world.keyboard.up = false;
            }
        }, 1000 / 60)
    }*/




}