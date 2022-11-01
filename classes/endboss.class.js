class Endboss extends MovableObject {
    world;
    hp = 25;
    y = 140;
    width = 250;
    height = 300;
    id;
    alert = new Audio('audio/chickenAlert.mp3');
    deadAudio = new Audio('audio/dead.mp3');

    images_walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    images_alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    images_attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    images_hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    images_dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];


    constructor(id) {
        super().loadImage(this.images_alert[0]);
        this.loadImages(this.images_alert);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.id = id;
        this.x = 3000;
        this.speed = 10;
        this.animate();
        this.isDead();
    }


    /**
     * this function animates the Endboss
     */

    animate() {
        setInterval(() => {
            if (startGame) {
                if (this.endbossWalking())
                    this.animateWalkingLeft();
                else if (this.endbossAttackLeft())
                    this.animateAttackLeft();
                else if (this.endbossAttackRight())
                    this.animateAttackRight();
            }
        }, 300)
        setInterval(() => {
            if (startGame) {
                if (this.isDead())
                    this.animateDead();
                else if (this.isHurt())
                    this.animateObj(this.images_hurt);
            }
        }, 150)
    }


    /**
     * this function will animate the endboss walking to the left
     */

    animateWalkingLeft() {
        this.animateObj(this.images_walking);
        this.moveLeft();
        this.otherDirection = false;
    }


    /**
     * this function will animate the endboss attacking to the left
     */

    animateAttackLeft() {
        this.animateObj(this.images_attack);
        this.moveLeft();
        this.speed = 45;
        this.alertSound();
        this.otherDirection = false;
    }


    /**
     * this function will animate the endboss attacking to the right
     */

    animateAttackRight() {
        this.animateObj(this.images_attack);
        this.moveRight();
        this.speed = 45;
        this.alertSound();
        this.otherDirection = true;
    }


    /**
     * this function will animate the dead of the endboss
     */

    animateDead() {
        this.animateObj(this.images_dead);
        this.speed = 0;
        this.dieSound();
    }


    /**
     * 
     * @returns if the endboss hp is more then 0 and if the character is near
     */

    endbossWalking() {
        return this.hp > 0 
                && world.character.x + 500 < this.x 
                && world.character.x + 800 > this.x;
    }


    /**
     * 
     * @returns if the endboss hp is more then 0 and if the characters x position is less then the endboss x position
     */


    endbossAttackLeft() {
        return this.hp > 0 
                && world.character.x + 500 >= this.x 
                && world.character.x < this.x;
    }


    /**
     * 
     * @returns if the endboss hp is more then 0 and if the characters x position is higher then the endboss x position
     */

    endbossAttackRight() {
        return this.hp > 0 
                && world.character.x >= this.x;
    }


    /**
     * checks if the sound is on, if it is then it will play a sound and it will also set the volume of this audio to 0.5
     */

    alertSound() {
        this.alert.volume = 0.5;
        if (sound) 
            this.alert.play();
    }


    /**
     * checks if the sound is on, if it is then it will play a sound
     */

    dieSound() {
        if (sound) 
            this.deadAudio.play();
    }
}