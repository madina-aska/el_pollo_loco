class Smallchickens extends MovableObject {
  y = 360;
  height = 60;
  width = 60;
  offset = { top: 0, right: 10, bottom: 0, left: 10 };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Creates a new SmallChicken instance at position x.
   * @param {number} x - The starting x-coordinate of the chicken.
   */
  constructor(x) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = x;
    this.speedX = 0.2 + Math.random() * 0.3;
    this.animate();
  }

  /**
   * Starts the animation and movement intervals.
   */
  animate() {
    this.animationIntervals.push(
      setInterval(() => this.startAnimations(), 200)
    );
    this.animationIntervals.push(setInterval(() => this.moveLeft(), 1000 / 60));
  }

  /**
   * Plays walking animation if the game is active.
   */
  startAnimations() {
    if (!gamePaused && gameStarted) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Moves the chicken left if the game is active.
   */
  moveLeft() {
    if (!gamePaused && gameStarted) {
      super.moveLeft();
    }
  }

  /**
   * Handles the elimination of the chicken.
   * Stops animation, switches to dead image, and schedules removal.
   */
  eliminateEnemy() {
    this.energy = 0;
    this.stopAnimations();
    this.img.src = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
    this.enableRemoval();
  }

  /**
   * Allows the chicken to be removed from the game after a delay.
   */
  enableRemoval() {
    setTimeout(() => {
      this.canBeRemoved = true;
    }, 500);
  }

  /**
   * Stops all animation intervals for this chicken.
   */
  stopAnimations() {
    this.animationIntervals.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    this.animationIntervals = [];
  }
}
