class statusBarBottles extends DrawableObjects {
    world;
    bottles = 0;
    x = 10;
    y = 45;
    height = 50;
    width = 200;

    images_bottles = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.images_bottles);
        this.setBottles(0);
    }

    /**
     * this function will return how many bottles are collectes and depanding on that it will load a statusbar image
     * 
     * @param {Object} bottles 
     */

    setBottles(bottles) {
        this.bottles = bottles
        let path = this.images_bottles[bottles];
        this.img = this.imgChache[path];
        if (bottles > 5) 
            bottles = 5;
    }
}