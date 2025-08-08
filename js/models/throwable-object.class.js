class ThrowableObject extends MovableObject {
  width = 55;
  height = 80;
  otherDirection;
  offset = { top: 10, right: 0, bottom: 5, left: 10 };

  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Represents a throwable bottle object.
   * @param {number} characterX - The starting x position of the bottle (usually character's x).
   * @param {number} characterY - The starting y position of the bottle (usually character's y).
   * @param {boolean} isOtherDirection - Whether the bottle is thrown to the left (true) or right (false).
   */
  constructor(characterX, characterY, isOtherDirection) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = characterX;
    this.y = characterY;
    this.otherDirection = isOtherDirection;
    this.throw();
  }

  /**
   * Starts the bottle throw animation and movement.
   * Applies gravity, sets initial speeds, and sets intervals for movement.
   */
  throw() {
    this.applyGravity();
    this.speedY = 9;
    this.speedX = 20;

    if (!this.otherDirection) {
      let throwToRight = setInterval(() => this.throwBottleRight(), 40);
      this.playBottleThrowSound();
      this.animationIntervals.push(throwToRight);
    } else {
      this.x -= 80;
      let throwToLeft = setInterval(() => this.throwBottleLeft(), 40);
      this.animationIntervals.push(throwToLeft);
    }
  }

  /**
   * Moves the bottle to the right and plays rotation animation.
   */
  throwBottleRight() {
    if (this.x < 3000 && !gamePaused) {
      this.x += this.speedX;
      this.playAnimation(this.IMAGES_ROTATION);
    }
  }

  /**
   * Moves the bottle to the left and plays rotation animation.
   */
  throwBottleLeft() {
    if (this.x > -2000 && !gamePaused) {
      this.x -= this.speedX;
      this.playAnimation(this.IMAGES_ROTATION);
    }
  }

  /**
   * Starts splash animation after the bottle breaks.
   * Clears previous throw intervals and plays breaking sound.
   */
  splashAnimation() {
    this.clearThrowIntervals();
    this.energy = 0;
    this.playBottleBreakSound();
    this.speedY = 0;
    this.speedX = 0;

    let splashAnimation = setInterval(() => {
      if (this.bottleInAir()) {
        this.playAnimation(this.IMAGES_SPLASH);
      } else if (this.bottleHitGround()) {
        clearInterval(splashAnimation);
      }
    }, 1000 / 60);
  }

  /**
   * Checks if the bottle is still in the air.
   * @returns {boolean} True if the bottle is above the ground and game is not paused.
   */
  bottleInAir() {
    return !gamePaused && this.y < 500;
  }

  /**
   * Checks if the bottle has hit the ground.
   * @returns {boolean} True if the bottle's y position is below ground level.
   */
  bottleHitGround() {
    return this.y > 500;
  }

  /**
   * Plays the bottle throwing sound effect.
   */
  playBottleThrowSound() {
    sounds.bottle_throwing.volume = 0.7;
    sounds.bottle_throwing.currentTime = 0;
    sounds.bottle_throwing.play();
  }

  /**
   * Plays the bottle breaking sound effect.
   */
  playBottleBreakSound() {
    sounds.bottle_breaking.currentTime = 0;
    sounds.bottle_breaking.volume = 0.8;
    sounds.bottle_breaking.play();
  }

  /**
   * Clears all intervals related to the bottle throwing animation.
   */
  clearThrowIntervals() {
    for (const interval of this.animationIntervals) {
      clearInterval(interval);
    }
  }
}
