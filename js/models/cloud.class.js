class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;
  speedX = 0.2;

  IMAGES = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  /**
   * Creates a new throwable object at position x using image at index i.
   */
  constructor(x, i) {
    super().loadImage(this.IMAGES[i]);
    this.x = x;
    this.animate();
  }

  /**
   * Starts the movement interval to move the object left while the game is active.
   */
  animate() {
    setInterval(() => {
      if (!gamePaused && gameStarted) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }
}
