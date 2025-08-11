class BottleBar extends StatusBar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];
  percentage = 100;

  constructor() {
    super().loadImage(this.IMAGES[5]);
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 100;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Updates the displayed image based on the given percentage value.
   * @param {number} percentage - The new percentage to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
  
}