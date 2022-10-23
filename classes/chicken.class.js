class Chicken extends MovableObject {
    y = 340;
    width = 90;
    height = 90
    hp = 5;
    id;
    die = new Audio('audio/chickenDie.mp3');
    chickenIsDead = false;

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
            if (this.hp > 0) {
                this.animateObj(this.images_walking);
            } else if (this.chickenIsDead == false) {
                this.animateObj(this.image_dead);
                this.speed = 0;
                this.chickenIsDead = true;
                this.dieSound();
            }
        }, 110)
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }


    dieSound() {
        if (sound == true) {
            this.die.play();
        }
    }
}