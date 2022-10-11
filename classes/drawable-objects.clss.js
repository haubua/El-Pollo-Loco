class DrawableObjects {
    x = 120;
    y = 135;
    img;
    imgChache = [];
    currentImg = 0;


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

draw(ctx, mo) {
    ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
}



drawFrame(ctx, mo) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Babychicken || this instanceof Endboss) {
        // ctx.beginPath();
        // ctx.lineWidth = "1";
        // ctx.strokeStyle = "blue";
        // ctx.rect(mo.x, mo.y, mo.width, mo.height);
        // ctx.stroke();
    }
}
}