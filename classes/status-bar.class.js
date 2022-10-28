class StatusBar extends DrawableObjects {
    world;
    percentage = 100;
    x = 10;
    y = 0;
    height = 50;
    width = 200;

    images_hp = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.images_hp);
        this.setPercentage(100);
    }


    /**
     * this function will load a statusbar image depanding on the endboss hp
     *  
     * @param {*} percentage 
     */

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_hp[this.getImageIndex()];
        this.img = this.imgChache[path];
    }

    /**
     * this function will return a number between 0-5, depanding on the characters hp
     *  
     * @returns 
     */


    getImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 79) {
            return 4;
        } else if (this.percentage > 59) {
            return 3;
        } else if (this.percentage > 39) {
            return 2;
        } else if (this.percentage > 19) {
            return 1;
        } else {
            return 0;
        }
    }
}