class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    IMAGES = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];
  
    constructor(x = 0, imageIndex = 0) {
        super().loadImage(this.IMAGES[imageIndex % this.IMAGES.length]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000/60);
    }
}