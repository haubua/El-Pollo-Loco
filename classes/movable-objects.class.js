class MovableObject {
    x = 120;
    y = 135;
    img;
    imgChache = [];
    currentImg = 0;
    speed;

    /**
     * This function will load the Images for the draw function
     * 
     * @param {string} path 
     */

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function will load the Images for the draw function
     * 
     * @param {Array} arr 
     */

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgChache[path] = img;
        });
    }

    /**
     * this function will let move objects to the right
     */

    moveRight() {
        console.log('Moving right');
    }

    /**
     * This function will let move objects to the left
     */

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }
}
