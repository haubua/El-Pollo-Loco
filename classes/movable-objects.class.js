class MovableObject {
    x = 120;
    y = 135;
    img;
    imgChache = [];

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgChache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}