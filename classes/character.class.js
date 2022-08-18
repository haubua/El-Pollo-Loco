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

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.character_walking);

        this.animate();
    }

    animate() {
        setInterval( () => {
        let i = this.currentImg % this.character_walking.length;
        let path = this.character_walking[i];
        this.img = this.imgChache[path];
        this.currentImg++
        },110 )}


    jump() {

    }
}