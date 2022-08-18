class Cloud extends MovableObject {
    y = 30;
    width = 500;
    height = 250;
    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x =  0 + Math.random() * 500; //math.random gibt eine zufällige Zahl zwischen 0 - 1 heraus
        
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.2;
        },1000 / 60)
    }
}