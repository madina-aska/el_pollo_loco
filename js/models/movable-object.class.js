class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 10;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
            
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;  //0 % 6 => 0, 1 % 6 => 1,  6 % 6 => 0, then it starts back from 0  
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        

    }

    
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60);
    }
}