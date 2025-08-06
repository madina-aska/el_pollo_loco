class ThrowableObject extends MovableObject {
    width = 55;
    height = 80;
    otherDirection; 
    offset = { top: 10, right: 0, bottom: 5, left: 10 };
    

    IMAGES_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];
  
  IMAGES_SPLASH = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];
    

    
    constructor(characterX, characterY, isOtherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = characterX;
        this.y = characterY;
        this.otherDirection = isOtherDirection;
        this.throw();
    }

    
    throw() {
        this.applyGravity()
        this.speedY = 9;
        this.speedX = 20;
        
        if (!this.otherDirection) {
            let throwToRight = setInterval(() => this.throwBottleRight(), 40);
            this.animationIntervals.push(throwToRight);
        } else {
            this.x -= 80;
            let throwToLeft = setInterval(() => this.throwBottleLeft(), 40);
            this.animationIntervals.push(throwToLeft);
        }
    }


    throwBottleRight() {
        if (this.x < 3000 && !gamePaused) {
            this.x += this.speedX;
            this.playAnimation(this.IMAGES_ROTATION);
        }
    }


    throwBottleLeft() {
        if (this.x > -2000 && !gamePaused) {
            this.x -= this.speedX;
            this.playAnimation(this.IMAGES_ROTATION);
        }
    }


    splashAnimation() {
        this.clearThrowIntervals();
        this.energy = 0;
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


    bottleInAir() {
        return !gamePaused && this.y < 500;
    }
    

    bottleHitGround() {
        return this.y > 500;
    }


    clearThrowIntervals() {
        for (const interval of this.animationIntervals) {
            clearInterval(interval);
        }
    }
    
}

