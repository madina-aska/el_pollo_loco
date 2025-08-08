class Endboss extends MovableObject {
  y = 50;
  width = 275;
  height = 400;
  speedX = 0.5;
  hasTriggeredFirstAttack = false;
  offset = { top: 50, right: 10, bottom: 5, left: 20 };

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACKING = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACKING);
    this.x = 3000;
    this.animate();
  }

  /**
   * Starts the animation and movement intervals for the endboss.
   */
  animate() {
    let walkingAnimation = setInterval(() => this.startAnimations(), 200);
    let animations = setInterval(() => this.playAnimations(), 100);
    let walkingDirection = setInterval(() => this.moveEndboss(), 1000 / 60);
    this.animationIntervals.push(
      animations,
      walkingAnimation,
      walkingDirection
    );
  }

  /**
   * Plays walking animation if the endboss is at full health.
   */
  startAnimations() {
    if (!gamePaused && gameStarted) {
      if (this.energy == 100) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }

  /**
   * Plays different animations based on endboss health and state.
   */
  playAnimations() {
    if (!gamePaused && gameStarted) {
      if (this.isFirstHit()) {
        this.animateAlert();
      }
      if (this.isSecondHit()) {
        this.animateAttack();
      }
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
      if (this.isDead()) {
        this.animateDeath();
      }
    }
  }

  /**
   * Checks if endboss is at first hit state (energy 80).
   * @returns {boolean}
   */
  isFirstHit() {
    return this.energy == 80;
  }

  /**
   * Plays alert animation and sets first attack triggered.
   */
  animateAlert() {
    this.hasTriggeredFirstAttack = true;
    this.playAnimation(this.IMAGES_ALERT);
  }

  /**
   * Checks if endboss is at second hit state (energy <= 60).
   * @returns {boolean}
   */
  isSecondHit() {
    return this.energy <= 60;
  }

  /**
   * Plays attacking animation and resets first attack trigger.
   */
  animateAttack() {
    this.hasTriggeredFirstAttack = false;
    this.playAnimation(this.IMAGES_ATTACKING);
  }

  /**
   * Stops all animations and plays death animation with sound effects.
   */
  animateDeath() {
    this.clearIntervals();
    this.animateOnce(this.IMAGES_DEAD, "winScreen");
    sounds.win_sound.volume = 0.6;
    sounds.background_sound.pause();
    sounds.win_sound.play();
  }

  /**
   * Controls the endboss movement and attack behavior based on position and health.
   */
  moveEndboss() {
    if (!gamePaused && gameStarted && !this.hasTriggeredFirstAttack) {
      if (this.isRightSideFullHealth()) {
        this.moveLeft();
      }
      if (this.isRightSideDamaged()) {
        this.attackLeft();
      }
      if (this.isLeftSideFullHealth()) {
        this.moveRight();
      }
      if (this.isLeftSideDamaged()) {
        this.attackRight();
      }
    }
  }

  /**
   * Position and health state checks.
   */
  isRightSideFullHealth() {
    return (
      this.energy == 100 &&
      this.x + this.offset.left >
        world.character.x + world.character.offset.left
    );
  }

  isRightSideDamaged() {
    return (
      this.energy < 100 &&
      this.x + this.offset.left >
        world.character.x + world.character.offset.left
    );
  }

  isLeftSideFullHealth() {
    return (
      this.energy == 100 &&
      this.x + this.width <
        world.character.x + world.character.width - world.character.offset.left
    );
  }

  isLeftSideDamaged() {
    return (
      this.energy < 100 &&
      this.x + this.width <
        world.character.x + world.character.width - world.character.offset.left
    );
  }

  /**
   * Movement and attack commands for the endboss.
   */
  moveLeft() {
    this.otherDirection = false;
    super.moveLeft();
  }

  attackLeft() {
    this.otherDirection = false;
    super.attackLeft();
    sounds.chicken_cluking.volume = 0.4;
    sounds.chicken_cluking.play();
  }

  moveRight() {
    this.otherDirection = true;
    super.moveRight();
  }

  attackRight() {
    this.otherDirection = true;
    super.attackRight();
    sounds.chicken_cluking.volume = 0.4;
    sounds.chicken_cluking.play();
  }

  /**
   * Reduces energy by 20 when hit and updates last hit time.
   */
  hitEndboss() {
    this.energy -= 20;
    this.lastHit = new Date().getTime();
  }

  /**
   * Clears all active animation intervals.
   */
  clearIntervals() {
    for (const interval of this.animationIntervals) {
      clearInterval(interval);
    }
  }
}
