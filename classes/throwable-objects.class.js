class ThrowableObject extends MovableObject {
    world;
    speedY = 0;
    hp = 5;
    level = level1;
    bottleHit = new Audio('audio/bottleHit.mp3');
    bottleThrow = new Audio('audio/bottleThrow.mp3');
    left = false;

    images_rotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    images_splash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    constructor(x, y, id) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.images_rotation);
        this.loadImages(this.images_splash);
        this.x = x;
        this.y = y;
        this.id = id;
        this.height = 100;
        this.width = 100;
        this.throw(100, 150);
    }


    /**
     * this function will animate the bottle when it´s thrown and it will increase/decrease the bottles x position
     * 
     */

    throw() {
        this.applyGravity();
        this.speedY = 15;
        this.throwSound();
        this.bottleRotate();
        this.throwBottleLeft();
        this.throwBottleRight();
    }


    throwSound() {
        if (sound == true) {
            this.bottleThrow.play();
        }
    }


    hitSound() {
        if (sound == true) {
            this.bottleHit.play();
        }
    }


    bottleRotate() {
        setInterval(() => {
            if (this.isHurt()) {
                this.animateObj(this.images_splash);
                this.bottleThrow.pause();
                this.hitSound();
            } else if (this.hp > 0) {
                this.animateObj(this.images_rotation);
            }
        }, 150);
    }


    throwBottleLeft() {
        if (world.character.otherDirection == true) {
            this.bottleIncreaseX = setInterval(() => {
                this.x -= 6;
            }, 18);
        }
    }


    throwBottleRight() {
        if (world.character.otherDirection == false) {
            this.bottleIncreaseX = setInterval(() => {
                this.x += 6;
            }, 18);
        }
    }
}
