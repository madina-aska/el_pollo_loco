class CoinBar extends StatusBar {
  IMAGES = [
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 100;

  /**
   * Constructor initializes the object by loading images,
   * and sets initial position and size.
   */
  constructor() {
    super().loadImage(this.IMAGES[5]);
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 50;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Updates the displayed image according to the given percentage.
   * Sets the image to the corresponding image in the image cache.
   *
   * @param {number} percentage - The current percentage (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

}
