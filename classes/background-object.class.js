class BackgroundObject extends MovableObject {
    
    height = 480;
    width = 720;

    /**
     * This function starts the loadImage() to load all Background Images
     * 
     * @param {string} imagePath 
     * @param {coordinate} x 
     */

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 -this.height;
    }
}