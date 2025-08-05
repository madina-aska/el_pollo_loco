class World {
    character = new Character();
    level = level1;                //contains all the variables from level class.. 
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar(); 
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
          this.ctx = canvas.getContext('2d');
          this.canvas = canvas;
          this.keyboard = keyboard;
          this.totalCoins = this.level.coins.length;
          this.draw();
          this.setWorld();
          this.startIntervals();
    }
    // Links the current world instance to the character
    setWorld() {
        this.character.world = this;
    }
    

    // Starts timed checks for collisions and interactions
    startIntervals() {
        setInterval(() => {
            if (!gamePaused) {
                this.checkCollisions();
              
            }
        }, 60);
    }

    
    // Runs all collision checks: enemies, endboss, and coins
    checkCollisions() {
        this.checkEnemyCollision();
        this.checkEndbossCollision();
        this.checkCoinCollection();
    }

    
    // Handles collisions between character and enemies (or enemy elimination)
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
        })
    }

    
    // Returns true if character is colliding with a living enemy on the ground
    isCharacterDamageable(enemy) {
        return !this.character.isAboveGround() && this.character.isColliding(enemy) && enemy.energy;
    }

   // Returns true if character is landing on a living enemy from above 
    isChickenDamageable(enemy) {
        return this.character.isAboveGround && this.character.speedY <= 2 && this.character.isColliding(enemy) && enemy.energy;
    }

    
    // Called when character jumps on enemy from above, killing it
    collidedFromTop(enemy) {
        enemy.eliminateEnemy();
        this.character.bounceUp();
    }
    
    
    // Removes a loseScreened enemy from the level if it can be removed
    destroyChicken(enemy) {
        if (enemy.canBeRemoved) {
            let enemyIndex = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(enemyIndex, 1);
        }
    }

    // Damages the character if colliding with a living endboss
    checkEndbossCollision() {
        if (this.character.isColliding(this.level.endboss) && this.level.endboss.isAlive()) {
            if (this.character.isAlive()) {
                this.hitCharacter();
            }
        }
    }
    

    // Reduces character energy and updates status bar
    hitCharacter() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    
    // 
    hitEndBoss() {
        this.level.endboss.hitEndboss();
    }

    //Checks for collisions between the character and coins, and removes collected coins.
   checkCoinCollection() {
        this.level.coins.forEach((coin) => {
           if (this.character.isColliding(coin)) {
            this.removeCoin(coin);
            }
        });
    }


    //Removes the given coin from the level's coin array.
    removeCoin(coin) {
        let coinIndex = this.level.coins.indexOf(coin);
        this.level.coins.splice(coinIndex, 1);
    }

    
    // Draws all game elements and UI components to the canvas
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        // -------- space for fixed objects --------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.coinBar.setPercentage(this.calculateCoinPercentage());
        this.addToMap(this.bottleBar);
        // ------- space for Movable objects -------
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
        })
    }

    
    // Adds all objects in the array to the canvas
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        });
    }

    
    // Adds a single object to the canvas, flipping it if it's facing left
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.drawObject(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    // Flips the object image for left-facing direction
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    
    // Restores the image orientation after flipping
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


     // Returns true if the endboss is within 500px range of the character
    isEndbossInRange() {
        return this.level.endboss.x - (this.character.x + this.character.width) < 500;
    }

 
    //Calculates the percentage of coins collected out of the total number of coins in the level.
    calculateCoinPercentage() {
        const collected = this.totalCoins - this.level.coins.length;
        return (collected / this.totalCoins) * 100;
    }


}
