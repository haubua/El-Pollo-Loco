class Coin extends MovableObject {
    width = 110;
    height = 110;
    images_coins = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]
    
    /**
     * This function will load the Images to the draw(), it will place the chickens on a rendom x position, it will set the speed randomly, and it will start the animate()
     */

    constructor(x, y, i) {
        super().loadImage(this.images_coins[0]);
        this.loadImages(this.images_coins);
        this.x = x;
        this.y = y;
        this.i = i;
        this.animate();
    }

    animate() {
        setInterval(() => {
                this.animateObj(this.images_coins);
        }, 610)
    }
   
}