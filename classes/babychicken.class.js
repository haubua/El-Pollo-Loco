class Babychicken extends MovableObject {
    y = 355;
    width = 65;
    height = 65;
    hp = 5;
    id;
    die = new Audio('audio/chickenDie.mp3');
    chickenIsDead = false;

    images_walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    image_dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor(id) {
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.loadImages(this.image_dead);
        this.id = id;
        this.x = 400 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.2;
        this.animate();
    }

    /**
     * this function animates the babychicken
     */

    animate() {
        setInterval(() => {
            this.play();
        }, 110)
        setInterval(() => {
            this.move();
        }, 1000 / 40)
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
                this.speed = 0;
                this.chickenIsDead = true;
                this.dieSound();
            }
        }
    }


    /**
     * this function will let the babychicken move
     */

    move() {
        if (startGame) 
                this.moveLeft();
    }

    /**
     * this function will play a sound
     */

    dieSound() {
        if (sound) 
            this.die.play();
    }
}