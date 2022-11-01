class Chicken extends MovableObject {
    y = 340;
    width = 90;
    height = 90
    hp = 5;
    id;
    die = new Audio('audio/chickenDie.mp3');
    chickenIsDead = false;
    world;

    images_walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    image_dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor(id) {
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.loadImages(this.image_dead);
        this.id = id;
        this.x = 1400 + Math.random() * 1000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    /**
     * this function animates the chicken
     */

    animate() {
        setInterval(() => {
            this.play();
        }, 110)
        setInterval(() => {
            this.move();
        }, 1000 / 60)
    }


    /**
     * this function will play the animations
     */

    play() {
        if (startGame) {
            if (this.hp > 0)
                this.animateObj(this.images_walking);
            else if (!this.chickenIsDead) {
                this.animateObj(this.image_dead);
                this.chickenIsDead = true;
                this.speed = 0;
                this.dieSound();
            }
        }
    }


    /**
     * this function will let the chicken move
     */

    move() {
        if (startGame) 
                this.moveLeft();
    }

    /**
     * checks if the sound is on, if it is then it will play a sound
     */

    dieSound() {
        if (sound) {
            this.die.play();
        }
    }
}