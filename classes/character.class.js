class Character extends MovableObject {
    world;
    width = 180;
    height = 300;
    time = 0;
    jumpRight = false;
    characterIsDead = false;
    walking = new Audio('audio/walking.mp3');
    jumpAudio = new Audio('audio/jump.mp3');
    hurtAudio = new Audio('audio/hurt.mp3');
    deadAudio = new Audio('audio/dead.mp3');

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
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    images_hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    images_dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_sleeping);
        this.loadImages(this.images_standing);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.characterActions();
        this.animate();
        this.applyGravity();
        this.isDead();
    }


    /**
     *  This function will set all character actions
     */

    characterActions() {
        setInterval(() => {
            this.walking.pause();
            this.characterMoveRight();
            this.characterMoveLeft();
            this.characterJump();
            this.jumpToTheRight();
            this.jumpToTheLeft();
            this.world.camera_x = -this.x + 50;
            this.noAction();
        }, 1000 / 60)
    }

    /**
     * this function will set the intervall for the character animation
     */

    animate() {
        setInterval(() => {
            this.play();
        }, 145)
    }


    /**
     * this function will play the character animation
     */

    play() {
        if (startGame) {
            if (this.characterWalking())
                this.animateObj(this.images_walking);
            else if (this.characterJumping())
                this.animateObj(this.images_jumping);
            else if (this.characterStanding() || this.bottleThow())
                this.animateObj(this.images_standing);
            else if (this.characterSleeping())
                this.animateObj(this.images_sleeping);
            else if (this.bottleThow())
                this.time = 0;
            if (this.isDead())
                this.deadAnimation();
            else if (this.isHurt())
                this.hurtAnimation();
        }
    }


    /**
     * this function will let the character move to the right
     */

    characterMoveRight() {
        if (this.world.keyboard.right
            && this.x < this.world.levelEnd_x
            && this.y >= 135 && this.hp > 1
            && startGame) {
            this.moveRight();
            this.otherDirection = false;
            this.time = 0;
            this.walkingSound();
        }
    }


    /**
     * this function will let the character move to the left
     */

    characterMoveLeft() {
        if (this.world.keyboard.left
            && this.x > 0 && this.y >= 135
            && this.hp > 1
            && startGame) {
            this.moveLeft();
            this.otherDirection = true;
            this.time = 0;
            this.walkingSound();
        }
    }


    /**
     * this function will let the character jump
     */

    characterJump() {
        if (this.world.keyboard.up
            && this.y > 25
            && this.speedY <= 0
            && this.y >= 135
            && this.hp > 1
            && startGame) {
            this.jump();
            this.time = 0;
            this.jumpingSound();
        }
    }


    /**
     * this function will let the character jump to the right
     */

    jumpToTheRight() {
        if (this.world.keyboard.up
            && this.world.keyboard.right
            && this.y <= 135
            && this.hp > 1
            && this.x < this.world.levelEnd_x
            && startGame
            || this.world.keyboard.right
            && this.y < 135
            && this.hp > 1
            && this.x < this.world.levelEnd_x
            && startGame) {
            this.x += 8;
            this.otherDirection = false;
        }
    }


    /**
     * this function will let the character jump to the left
     */

    jumpToTheLeft() {
        if (this.world.keyboard.up
            && this.world.keyboard.left
            && this.y <= 135
            && this.hp > 1
            && this.x > this.world.levelStarts_x
            && startGame
            || this.world.keyboard.left
            && this.y < 135
            && this.hp > 1
            && this.x > this.world.levelStarts_x
            && startGame) {
            this.x -= 8;
            this.otherDirection = true;
        }
    }


    /**
     * this function will increase a timer if the character is not moving
     */

    noAction() {
        if (!this.world.keyboard.right
            && !this.world.keyboard.left
            && !this.world.keyboard.down
            && !this.world.keyboard.up
            && startGame) {
            this.time += 0.1;
        }
    }


    /**
     * this function will start the dead animation and dead sound
     */

    deadAnimation() {
        this.animateObj(this.images_dead);
        this.dieSound();
    }


    /**
     * this function will start the hurt annimation and hurt sound
     */

    hurtAnimation() {
        this.animateObj(this.images_hurt);
        this.hurtSound();
    }


    /**
     * 
     * @returns if the character´s hp is more then 0 and if it´s moving 
     */

    characterWalking() {
        return this.world.keyboard.right
            && this.y >= 135
            && this.hp > 1
            || this.world.keyboard.left
            && this.y >= 135
            && this.hp > 1;
    }

    /**
     * 
     * @returns if the character is above the groung / if it´s jumping
     */

    characterJumping() {
        return this.y < 135
            || this.speedY > 0;
    }

    /**
     * 
     * @returns if the character is not moving
     */

    characterStanding() {
        return !this.world.keyboard.right
            && !this.world.keyboard.left
            && !this.world.keyboard.down
            && !this.world.keyboard.up
            && this.time <= 20
            && this.y == 135
            && this.hp > 1;
    }

    /**
     * 
     * @returns if the character hasn´t moved for the last few sec
     */

    characterSleeping() {
        return !this.world.keyboard.right
            && !this.world.keyboard.left
            && !this.world.keyboard.down
            && !this.world.keyboard.up
            && this.time > 20
            && this.hp > 1
            && !this.world.keyboard.d;
    }


    /**
     * checks if the sound is on, if it is then it will play a sound
     */

    dieSound() {
        if (sound)
            this.deadAudio.play();
    }


    /**
     * checks if the sound is on, if it is then it will play a sound
     */

    hurtSound() {
        this.hurtAudio.playbackRate = 0.8;
        if (sound)
            this.hurtAudio.play();
    }


    /**
     * 
     * @returns the length of an arry, to check if there are bottle to throw available
     */

    bottleThow() {
        return world.throwableObjects.length > 0;
    }


    /**
     * checks if the sound is on, if it is then it will play a sound
     */

    walkingSound() {
        if (sound)
            this.walking.play();
    }


    /**
     * checks if the sound is on, if it is then it will play a sound
     */

    jumpingSound() {
        if (sound)
            this.jumpAudio.play();
    }
}