class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

     loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);   //mo.width/mo.height are the end points 

    }

    drawFrame(ctx) {

        if ( this instanceof Character || this instanceof Chicken){  //add frame on the (instanceof) of character/chicken
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }  
    }

     loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            // img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
            
        });
    }

}