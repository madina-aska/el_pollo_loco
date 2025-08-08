class MovableObject extends DrawableObject {
  speedX = 0.1;
  attackSpeedX = 3;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.25;
  energy = 100;
  lastHit = 0;
  currentImage = 0;
  canBeRemoved = false;
  animationIntervals = [];

  /**
   * Applies gravity by adjusting the vertical position and speed of the object.
   */
  applyGravity() {
    setInterval(() => {
      if (
        (!gamePaused && this.isAboveGround()) ||
        (!gamePaused && this.speedY > 0)
      ) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 100);
  }

  /**
   * Checks whether the object is above ground level.
   * @returns {boolean}
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y < 550;
    } else {
      return this.y < 135;
    }
  }

  /**
   * Checks if this object is colliding with another object.
   * @param {MovableObject} mo
   * @returns {boolean}
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces energy and records the time of the hit.
   */
  hit() {
    this.energy -= 2.5;
    this.lastHit = new Date().getTime();
  }

  /**
   * Checks if the object is still alive.
   * @returns {boolean}
   */
  isAlive() {
    return this.energy > 0;
  }

  /**
   * Checks if the object was recently hurt.
   * @returns {boolean}
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed < 400;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays the next frame of an animation using a given image list.
   * @param {string[]} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speedX;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speedX;
  }

  /**
   * Moves the object quickly to the left (used for attacks).
   */
  attackLeft() {
    this.x -= this.attackSpeedX;
  }

  /**
   * Moves the object quickly to the right (used for attacks).
   */
  attackRight() {
    this.x += this.attackSpeedX;
  }

  /**
   * Plays an animation sequence once and then ends the game with the given status.
   * @param {string[]} images
   * @param {string} status
   */
  async animateOnce(images, status) {
    for (const image of images) {
      await new Promise((resolve) =>
        setTimeout(() => {
          let path = image;
          this.img = this.imageCache[path];
          resolve();
        }, 150)
      );
    }
    pauseAllAudio();
    clearAllIntervals();
    displayGameOverScreen(status);
  }

  /**
   * Makes the object jump upward.
   */
  jump() {
    this.speedY = 10;
  }

  /**
   * Makes the object bounce upward and plays a sound.
   */
  bounceUp() {
    this.speedY = 9;
    sounds.bounce_sound.currentTime = 0;
    sounds.bounce_sound.volume = 0.15;
    sounds.bounce_sound.play();
  }
}