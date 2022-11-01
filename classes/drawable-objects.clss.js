class DrawableObjects {
    x = 120;
    y = 135;
    img;
    imgChache = [];
    currentImg = 0;
    world;


    /**
         * This function will load the Images for the draw function
         * 
         * @param {var} path 
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
            img.onload = this.countLoadedImg;
            img.src = path;
            this.imgChache[path] = img;
        })
    }


    /**
     * this function will increase i for each loaded image
     */

    countLoadedImg() {
        i++;
    }


    /**
     * This function will draw all objects on the canvas
     * 
     * @param {Context} ctx 
     * @param {Object} mo 
     */

    draw(ctx, mo) {
        ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}