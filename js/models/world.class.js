class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endbossBar;
  throwableObjects = [];
  isThrowing = false;
  bottleCount = 0;

  /**
   * Creates the game world and initializes canvas, keyboard, and UI bars.
   * Starts rendering and interaction checks.
   *
   * @param {HTMLCanvasElement} canvas The canvas element to draw the game on.
   * @param {Object} keyboard The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.totalCoins = this.level.coins.length;
    this.maxBottles = this.level.bottles.length;
    this.draw();
    this.setWorld();
    this.startIntervals();
  }

  /**
   * Links this world instance to the main character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts repeated timed intervals to check collisions,
   * create throwable objects, and show the endboss status bar.
   * Runs approximately every 60 milliseconds.
   */
  startIntervals() {
    setInterval(() => {
      if (!gamePaused) {
        this.checkCollisions();
        this.createThrowableObjects();
        this.createEndbossStatusbar();
      }
    }, 60);
  }

  /**
   * Checks if the endboss is within 500 pixels horizontally of the character.
   *
   * @returns {boolean} True if the endboss is close enough to be active.
   */
  isEndbossInRange() {
    return (
      this.level.endboss.x - (this.character.x + this.character.width) < 500
    );
  }

  /**
   * Creates a new throwable bottle object if the player presses 'D',
   * has bottles available, and is not already throwing.
   * Decreases bottle count and updates UI accordingly.
   */
  createThrowableObjects() {
    if (this.keyboard.D > 0 && !this.isThrowing && this.bottleCount > 0 && !gamePaused) {
      this.isThrowing = true;
      this.bottleCount--;
      this.updateBottleBar();

      setTimeout(() => {
        this.isThrowing = false;
      }, 750);

      let isOtherDirection = this.character.otherDirection;
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 120,
        isOtherDirection );
      this.throwableObjects.push(bottle);
    }
  }

  /**
   * Runs all collision detection logic:
   * checks collisions with enemies, endboss, coins,
   * handles bottle pickups, and applies bottle damage to endboss.
   */
  checkCollisions() {
    this.checkEnemyCollision();
    this.checkEndbossCollision();
    this.checkCoinCollection();
    this.increaseBottleCounter();
    this.damageEndbossWithBottle();
  }

  /**
   * Checks for collisions between the character and enemies.
   * Handles damage to the character or enemy elimination on stomp.
   */
  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.isCharacterDamageable(enemy)) {
        if (this.character.isAlive()) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      } else if (this.isChickenDamageable(enemy)) {
        this.collidedFromTop(enemy);
      } else if (!enemy.energy) {
        this.destroyChicken(enemy);
      }
    });
  }

  /**
   * Determines if the character is colliding with a live enemy on the ground.
   *
   * @param {Enemy} enemy The enemy to check collision with.
   * @returns {boolean} True if collision causes character damage.
   */
  isCharacterDamageable(enemy) {
    return (
      !this.character.isAboveGround() &&
      this.character.isColliding(enemy) &&
      enemy.energy
    );
  }

  /**
   * Determines if the character is landing on a live enemy from above.
   *
   * @param {Enemy} enemy The enemy to check collision with.
   * @returns {boolean} True if collision causes enemy damage (stomp).
   */
  isChickenDamageable(enemy) {
    return (
      this.character.isAboveGround() &&
      this.character.speedY <= 2 &&
      this.character.isColliding(enemy) &&
      enemy.energy
    );
  }

  /**
   * Called when the character successfully jumps on an enemy.
   * Eliminates the enemy and makes the character bounce up.
   *
   * @param {Enemy} enemy The enemy to eliminate.
   */
  collidedFromTop(enemy) {
    enemy.eliminateEnemy();
    this.character.bounceUp();
  }

  /**
   * Removes an enemy from the level's enemies array if flagged as removable.
   *
   * @param {Enemy} enemy The enemy to remove.
   */
  destroyChicken(enemy) {
    if (enemy.canBeRemoved) {
      let enemyIndex = this.level.enemies.indexOf(enemy);
      this.level.enemies.splice(enemyIndex, 1);
    }
  }

  /**
   * Checks for collision between the character and the endboss.
   * Damages the character if collision occurs and both are alive.
   */
  checkEndbossCollision() {
    if (
      this.character.isColliding(this.level.endboss) &&
      this.level.endboss.isAlive()
    ) {
      if (this.character.isAlive()) {
        this.hitCharacter();
      }
    }
  }

  /**
   * Reduces the character's energy and updates the health status bar.
   */
  hitCharacter() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Damages the endboss and updates the endboss health bar.
   */
  hitEndBoss() {
    this.level.endboss.hitEndboss();
    this.endbossBar.setPercentage(this.level.endboss.energy);
  }

  /**
   * Checks if any throwable bottles hit the endboss and
   * applies damage and splash animation if so.
   */
  damageEndbossWithBottle() {
    this.throwableObjects.forEach((bottle) => {
      if (
        this.level.endboss.isColliding(bottle) &&
        this.level.endboss.isAlive() &&
        bottle.energy
      ) {
        this.hitEndBoss();
        bottle.splashAnimation();
        bottle.energy = 0;
      }
    });
  }

  /**
   * Checks for collisions between character and coins and removes collected coins.
   */
  checkCoinCollection() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.removeCoin(coin);
      }
    });
  }

  /**
   * Removes a coin from the level and plays the coin collection sound.
   *
   * @param {Coin} coin The coin to remove.
   */
  removeCoin(coin) {
    let coinIndex = this.level.coins.indexOf(coin);
    sounds.coin_collecting.volume = 0.3;
    sounds.coin_collecting.currentTime = 0;
    sounds.coin_collecting.play();
    this.level.coins.splice(coinIndex, 1);
  }

  /**
   * Checks for collisions between the character and bottles,
   * removes collected bottles, increases bottle count, and updates UI.
   */
  increaseBottleCounter() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.removeBottle(bottle);
        this.bottleCount++;
        this.updateBottleBar();
      }
    });
  }

  /**
   * Removes a bottle from the level's bottles array and plays collection sound.
   *
   * @param {Bottle} bottle - The bottle object to remove.
   */
  removeBottle(bottle) {
    let bottleIndex = this.level.bottles.indexOf(bottle);
    sounds.bottle_collecting.currentTime = 0;
    sounds.bottle_collecting.play();
    this.level.bottles.splice(bottleIndex, 1);
  }

  /**
   * Draws the entire game world including background, characters,
   * enemies, collectibles, UI bars, and throwable objects to the canvas.
   * Continuously called using requestAnimationFrame for smooth animation.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);

    // Fixed UI elements (not affected by camera movement)
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.coinBar.setPercentage(this.calculateCoinPercentage());
    this.addToMap(this.bottleBar);
    this.updateBottleBar();
    if (this.endbossBar) {
      this.addToMap(this.endbossBar);
    }

    // Movable objects (affected by camera)
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  /**
   * Adds multiple drawable objects to the canvas.
   *
   * @param {DrawableObject[]} objects - Array of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single drawable object to the canvas.
   * Handles flipping the image if the object faces the opposite direction.
   *
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.drawObject(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the canvas horizontally for drawing objects facing left.
   * Modifies object's x-coordinate accordingly.
   *
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores canvas state after flipping and resets object's x-coordinate.
   *
   * @param {DrawableObject} mo - The object to flip back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Calculates the percentage of coins collected by the player.
   *
   * @returns {number} Percentage (0-100) of collected coins.
   */
  calculateCoinPercentage() {
    const collected = this.totalCoins - this.level.coins.length;
    return (collected / this.totalCoins) * 100;
  }

  /**
   * Updates the bottle bar UI element based on current bottle count.
   * Caps percentage at 100%.
   */
  updateBottleBar() {
    let percentage = Math.min((this.bottleCount / this.maxBottles) * 100, 100);
    this.bottleBar.setPercentage(percentage);
  }

  /**
   * Creates the endboss health bar UI element when the endboss comes into range,
   * but only if it hasn't been created yet.
   */
  createEndbossStatusbar() {
    if (!this.endbossBar) {
      if (this.isEndbossInRange()) {
        this.endbossBar = new EndBossBar();
      }
    }
  }
}
