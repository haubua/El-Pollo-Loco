class statusBarEndboss extends DrawableObjects {
    world;
    percentage = 25;
    x = 360;
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
    ]

    image_healthEndboss = [
        'img/7_statusbars/3_icons/icon_health.png',
    ]

    constructor() {
        super();
        this.loadImages(this.images_statusbarEndboss);
        // this.loadImages(this.image_healthEndboss);
        this.setPercentage(25);
        this.keepPosition();
    }

    keepPosition() {
        setInterval(() => {
            this.x = world.character.x +190;
        }, 145);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_statusbarEndboss[this.getImageIndex()];
        this.img = this.imgChache[path];
    }

    getImageIndex() {
        if (this.percentage == 25) {
            return 5;
        } else if (this.percentage > 19) {
            return 4;
        } else if (this.percentage > 14) {
            return 3;
        } else if (this.percentage > 9) {
            return 2;
        } else if (this.percentage > 4) {
            return 1;
        } else {
            return 0;
        }
    }
}

