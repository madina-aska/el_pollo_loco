class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;
  speedX = 0.2;

  IMAGES = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  constructor(x, i) {
    super().loadImage(this.IMAGES[i]);
    this.x = x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!gamePaused && gameStarted) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }
}
