// class Level: bundles together all the components that make up the level, including:
//backgroundObjects, clouds, enemies, endboss, coins and bottles

class Level {
  backgroundObjects;
  clouds;
  enemies;
  endboss;
  coins;
  bottles;
  level_end_x = 2900;

  constructor(backgroundObjects, clouds, enemies, endboss, coins, bottles) {
    this.backgroundObjects = backgroundObjects;
    this.clouds = clouds;
    this.enemies = enemies;
    this.endboss = endboss;
    this.coins = coins;
    this.bottles = bottles;
  }
}
