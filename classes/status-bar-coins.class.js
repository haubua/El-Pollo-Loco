class statusBarCoins extends DrawableObjects {
    world;
    coins = 0;
    x = 10;
    y = 85;
    height = 50;
    width = 200;

    images_coins = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];


    constructor() {
        super();
        this.loadImages(this.images_coins);
        this.setCoins();
    }



    /**
     * this function will return how many coins are collectes
     * 
     * @param {Object} coins 
     */

    setCoins(coins) {
        this.coins = coins;
        let path = this.images_coins[this.getImageIndex()];
        this.img = this.imgChache[path];
    }


    /**
     * this function will return a number between 0-5, depending on the coins collected
     * 
     * @returns 
     */

    getImageIndex() {
        if (this.coins == 13) {
            return 5;
        } else if (this.coins > 10) {
            return 4;
        } else if (this.coins > 7) {
            return 3;
        } else if (this.coins > 4) {
            return 2;
        } else if (this.coins >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}