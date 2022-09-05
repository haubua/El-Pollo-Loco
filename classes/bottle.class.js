class Bottle extends MovableObject {
    y = 340;
    width = 100;
    height = 100;
    image_bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
       
    ]
    
    /**
     * This function will load the Images to the draw(), it will place the chickens on a rendom x position, it will set the speed randomly, and it will start the animate()
     */

    constructor(x, i) {
        super().loadImage(this.image_bottle[0]);
        this.x = x;
        this.i = i;
     
    }

    
}