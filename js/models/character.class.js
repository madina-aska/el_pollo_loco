class Character extends MovableObject {
  y = 135;
  width = 160;
  height = 300;
  speedX = 5;
  acceleration = 0.22;
  idleDuration = 0;
  world;
  offset = { top: 100, right: 30, bottom: 10, left: 30 };

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  // Initializes the character, loads images, starts animations, and applies gravity.
  constructor() {
    super().loadImage("./img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.applyGravity();
  }

  // Starts the character’s movement and animation intervals.
  animate() {
    this.moveInterval();
    this.animateInterval();
  }

  // Handles movement input (left, right, jump) and updates camera position.
  moveInterval() {
    let movingInterval = setInterval(() => {
      if (!gamePaused) {
        if (this.MovingRightKeyPressed()) this.moveRight();
        if (this.MovingLeftKeyPressed()) this.moveLeft();
        if (this.NoMovementKeyPressed()) sounds.walking_sound.pause();
        if (this.JumpKeyPressed()) this.jump();
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);
    this.animationIntervals.push(movingInterval);
  }

  // Check if right key pressed and inside bounds
  MovingRightKeyPressed() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  // Check if left key pressed and inside bounds
  MovingLeftKeyPressed() {
    return this.world.keyboard.LEFT && this.x > -600;
  }

  // Check if jump key pressed and on ground
  JumpKeyPressed() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  // Check if no horizontal keys pressed
  NoMovementKeyPressed() {
    return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
  }

  // Move character right and face right
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    if (!this.isAboveGround()) {
      sounds.walking_sound.play();
    }
  }

  // Move character left and face left
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    if (!this.isAboveGround()) {
      sounds.walking_sound.play();
    }
  }

  // Make character jump
  jump() {
    super.jump();
    sounds.walking_sound.pause();
    sounds.jumping_sound.play();
  }

  // Switch animations based on state
  animateInterval() {
    let animationInterval = setInterval(() => {
      if (!gamePaused) {
        if (this.isHurt()) {
          this.hurtAnimation();
        } else if (this.isDead()) {
          this.animateDeath();
        } else if (this.isAboveGround()) {
          this.jumpAnimation();
        } else if (this.WalkingKeyPressed()) {
          this.walkAnimation();
        } else if (!this.isAboveGround()) {
          this.idleAnimation();
          if (this.idleTooLong()) this.playAnimation(this.IMAGES_LONGIDLE);
        }
      }
    }, 90);
    this.animationIntervals.push(animationInterval);
  }

  // Play hurt animation
  hurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.idleDuration = 0;
    sounds.hurt_sound.play();
  }

  // Play death animation and stop character
  animateDeath() {
    this.animateOnce(this.IMAGES_DEAD, "loseScreen");
    this.clearCharacterIntervals();
    sounds.walking_sound.pause();
    sounds.dying_sound.currentTime = 0;
    sounds.dying_sound.play();
    sounds.lose_sound.volume = 0.5;
    sounds.lose_sound.play();
  }

  // Play jump animation
  jumpAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.idleDuration = 0;
  }

  // Check if any horizontal key pressed
  WalkingKeyPressed() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  // Play walking animation
  walkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.idleDuration = 0;
  }

  // Play idle animation and increase idle timer
  idleAnimation() {
    this.idleDuration += 90;
    this.playAnimation(this.IMAGES_IDLE);
  }

  // Check if idle too long for long idle animation
  idleTooLong() {
    return this.idleDuration > 3000 && !this.world.isThrowing;
  }

  // Clear all animation intervals
  clearCharacterIntervals() {
    for (const interval of this.animationIntervals) {
      clearInterval(interval);
    }
  }
}
