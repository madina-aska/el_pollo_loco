class BottleOne extends DrawableObject {
  y = 350;
  width = 65;
  height = 80;
  offset = { top: 10, right: 10, bottom: 5, left: 15 };

  IMAGES_BOTTLE = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];
  
  /**
   * Initializes a new bottle object with a random horizontal position.
   */
  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.x = 300 + Math.random() * 2100;
  }
}
