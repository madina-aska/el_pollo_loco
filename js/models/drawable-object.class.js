class DrawableObject {
  x = 120;
  y;
  img;
  height;
  width;
  imageCache = {};
  offset = { top: 0, bottom: 0, left: 0, right: 0 };

  /**
   * Draws the current image on the provided canvas context at the object's position with its dimensions.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads a single image from the specified path and sets it as the object's current image.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Preloads multiple images and stores them in the image cache for later use.
   * @param {string[]} images - An array of image file paths to preload.
   */
  loadImages(images) {
    images.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }
}
