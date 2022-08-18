class Chicken extends MovableObject {
    y = 340;
    width = 90;
    height = 90
    imgOne = 'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png';
    imgTwo = 'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png'
    imgThree = 'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    path;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')

        this.x = 200 + Math.random() * 500; //math.random gibt eine zufällige Zahl zwischen 0 - 1 heraus

        this.animate();
    }

    animate() {
        setInterval(() => {
           /* i = 0;
            if (i=0) {
                this.path = this.imgOne;
                i=1;
            }
            if (i=1) {
                this.path = this.imgTwo;
                i=2;
            }
            if (i=2) {
                this.path = this.imgThree;
                i=0;
            }
*/
            this.x -= 0.2;
        }, 1000 / 60)
    }


}