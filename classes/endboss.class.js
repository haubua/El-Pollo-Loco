class Endboss extends MovableObject {
    world;
    hp = 25;
    y = 140;
    width = 250;
    height = 300;
    alert = new Audio('audio/chickenAlert.mp3');
    deadAudio = new Audio('audio/dead.mp3');

    images_walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]
    images_alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    images_attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]
    images_hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    images_dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    /**
     * This function will load the Images to the draw(), it will place the chickens on a rendom x position, it will set the speed randomly, and it will start the animate()
     */

    constructor() {
        super().loadImage(this.images_alert[0]);
        this.loadImages(this.images_alert);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.x = 3000;
        this.speed = 10;
        this.animate();
        this.isDead();
        
    }

    /**
     * this function makes the chickens look like they are walking
     */

    animate() {
        // setInterval(() => {

        //        this.animateObj(this.images_alert);
        // }, 400)
        setInterval(() => {
            if (this.hp > 0 && world.character.x + 500 < this.x) {
                this.animateObj(this.images_walking);
                this.moveLeft();
            }
            else if (this.hp > 0 && world.character.x + 500 >= this.x && world.character.x - 300 < this.x) {
                this.animateObj(this.images_attack);
                this.speed = 20;
                this.moveLeft();
                this.alert.volume = 0.5;
                this.alert.play();
                console.log(this.hp )
            }
        }, 300)
        setInterval(() => {
            if (this.isDead()) {
                this.animateObj(this.images_dead);
                this.speed = 0;
                this.deadAudio.play();
            } else if (this.isHurt()) {
                this.animateObj(this.images_hurt)    
           }
        }, 150)
    }
}

