class DrawableObject {
    x = 120;
    y;
    img;
    height;
    width;
    imageCache = {};
    offset = { top: 0, bottom: 0, left: 0, right: 0 };


     // Draw the current image on the canvas context at (x, y) with width and height
    drawObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // Load a single image from a given path
     loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // Preload multiple images and cache them for reuse
     loadImages(images) {
        images.forEach(path => {
            let image = new Image();
            image.src = path;
            this.imageCache[path] = image;
        })
    }

   

}