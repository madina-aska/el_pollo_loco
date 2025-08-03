class Chicken extends MovableObject {    
    y = 330;
    width = 90;
    height = 100;
   
   IMAGES_WALKING = [
    '/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
   ];


    constructor(x) {
        super().loadImage('/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speedX = 0.5 + Math.random() * 0.8;              
        this.animate();
    }
    
    // Start animation and movement intervals
    animate() {
        this.animationIntervals.push(
            setInterval(() => this.startAnimations(), 200));
        this.animationIntervals.push(
            setInterval(() => this.moveLeft(), 1000 / 60));
    }

   // Play walking animation if game is active
    startAnimations() {
        if (!gamePaused && gameStarted) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    // Move the Enemy left if game is active
    moveLeft() {
        if (!gamePaused && gameStarted) {
            super.moveLeft();
        }
    }
    
    // Triggered when the Enemy is defeated
    eliminateEnemy() {
        this.energy = 0;
        this.stopAnimations();
        this.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
        this.enableRemoval();
    }
   
    // Allow the enemies to be removed after a delay
    enableRemoval() {
        setTimeout(() => {
            this.canBeRemoved = true;
        }, 400);
    }

    // Clear all running animation intervals
    stopAnimations() {
        this.animationIntervals.forEach(intervalId => {
        clearInterval(intervalId); 
       });
        this.animationIntervals = [];
    }
}