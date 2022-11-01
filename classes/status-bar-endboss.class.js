class statusBarEndboss extends DrawableObjects {
    world;
    percentage = 25;
    x = 240;
    y = 0;
    height = 50;
    width = 200;

    images_statusbarEndboss = [
        'img/7_statusbars/2_statusbar_endboss/0.png',
        'img/7_statusbars/2_statusbar_endboss/20.png',
        'img/7_statusbars/2_statusbar_endboss/40.png',
        'img/7_statusbars/2_statusbar_endboss/60.png',
        'img/7_statusbars/2_statusbar_endboss/80.png',
        'img/7_statusbars/2_statusbar_endboss/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.images_statusbarEndboss);
        this.setPercentage(25);
    }


    /**
     * this function will load a statusbar image depanding on the endboss hp
     *  
     * @param {*} percentage 
     */

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_statusbarEndboss[this.getImageIndex()];
        this.img = this.imgChache[path];
    }


    /**
     * this function will return a number between 0-5, depanding on the enboss hp
     *  
     * @returns 
     */

    getImageIndex() {
        if (this.percentage == 25) 
            return 5;
         else if (this.percentage > 19) 
            return 4;
         else if (this.percentage > 14) 
            return 3;
        else if (this.percentage > 9) 
            return 2;
         else if (this.percentage > 4) 
            return 1;
         else 
            return 0;
    }
}

