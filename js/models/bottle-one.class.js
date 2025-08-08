//Defines a ground salsa bottle collectible with fixed size and Y-position,
//placed at a random X-position and rendered using a specific image.

class BottleOne extends DrawableObject {
  y = 350;
  width = 65;
  height = 80;
  offset = { top: 10, right: 10, bottom: 5, left: 15 };

  IMAGES_BOTTLE = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.x = 300 + Math.random() * 2100;
  }
}
