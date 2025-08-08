class Coin extends DrawableObject {
  offset = { top: 30, right: 30, bottom: 40, left: 40 };

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  /**
   * Initializes a new coin object with a random position.
   */
  constructor() {
    super().loadImage(this.IMAGES_COIN[1]);
    this.x = 300 + Math.random() * 1900;
    this.y = 310 - Math.random() * 200;
    this.width = 100;
    this.height = 120;
  }
}
