class statusBarBottles extends DrawableObjects {
    world;
    bottles = 0;
    x = 80;
    y = 60;
    height = 50;
    width = 200;

    images_bottles = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ]

    constructor() {
        super();
        this.loadImages(this.images_bottles);
        this.setBottles(0);
        this.keepPosition();
    }

    keepPosition() {
        setInterval(() => {
            this.x = world.character.x -30;
        }, 145);
    }
    

    setBottles(bottles) {
        this.bottles = bottles
        let path = this.images_bottles[bottles];
        this.img = this.imgChache[path];
    }

    getImageIndex() {
        if (this.bottles == 3) {
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