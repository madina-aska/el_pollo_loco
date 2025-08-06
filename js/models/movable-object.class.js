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

    
    // Applies gravity to the object by updating vertical position and speed
    applyGravity() {
        setInterval(() => {
            if (!gamePaused && this.isAboveGround() || !gamePaused && this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 100);
    }
    
    // Returns true if the object is above ground level
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 550;
        } else {
            return this.y < 135;
        }
    }


    // Checks collision with another movable object
    isColliding(mo) {
        return (this.x + this.width - this.offset.right) > (mo.x + mo.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (mo.y + mo.offset.top) &&
            (this.x + this.offset.left) < (mo.x + mo.width - mo.offset.right) &&
            (this.y + this.offset.top) < (mo.y + mo.height - mo.offset.bottom)
            
    }


   // Reduces energy and records hit timestamp  
   hit() {
        this.energy -= 2.5;
        this.lastHit = new Date().getTime();
    }


    // Checks if the object is still alive (has energy)
    isAlive() {
        return this.energy > 0;
    }

    // Checks if the object was recently hurt
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 400;
    }

   // Checks if the object is dead (energy is 0)
   isDead() {
        return this.energy == 0;
    }

    // Plays the next frame of an animation from a list of images
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    
    // Moves the object to the right
    moveRight() {
        this.x += this.speedX;
    }

    // Moves the object to the left
    moveLeft() {
        this.x -= this.speedX;
    }
    
    // Moves the object quickly to the left (attack motion)
    attackLeft() {
        this.x -= this.attackSpeedX;
    }

    // Moves the object quickly to the right (attack motion)
    attackRight() {
        this.x += this.attackSpeedX
    }
 
    // Plays an animation once, then ends the game.
    async animateOnce(images, status) {
        for (const image of images) {
            await new Promise(resolve => setTimeout(() => {
                let path = image;
                this.img = this.imageCache[path];
                resolve();
            }, 150));
        }
        clearAllIntervals();
        displayGameOverScreen(status);
    }


   // Jumping speed
   jump() {
        this.speedY = 10;                     
        }

   // bounce up into the air
   bounceUp() {                            
        this.speedY = 9;
    }


}