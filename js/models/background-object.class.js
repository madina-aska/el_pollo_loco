class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new throwable object with a given image and horizontal position.
   * @param {string} imagePath - The path to the image to load.
   * @param {number} x - The horizontal position to place the object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 0;
  }
}
