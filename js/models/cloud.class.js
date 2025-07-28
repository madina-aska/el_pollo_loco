class Cloud extends MovableObject {
    // y = 50;
    width = 600;
    height = 350;

    IMAGES = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];
  
    constructor(x, i) {
    super().loadImage(this.IMAGES[i]);
    this.x = x + Math.random() * 100;
    this.y = 20 + Math.random() * 10;
    this.animate();
  }

  
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000/60);
  }
}
