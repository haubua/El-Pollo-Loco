class Coin extends MovableObject {
    width = 110;
    height = 110;

    images_coins = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor(x, y, i) {
        super().loadImage(this.images_coins[0]);
        this.loadImages(this.images_coins);
        this.x = x;
        this.y = y;
        this.i = i;
        this.animate();
    }

    /**
     * this function animates the coins
     */

    animate() {
        setInterval(() => {
            if (startGame) {
            this.animateObj(this.images_coins);}
        }, 610)
    }
}