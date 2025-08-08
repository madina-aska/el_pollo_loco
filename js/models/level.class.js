/**
 * Represents a game level with its elements and boundaries.
 */
class Level {
  backgroundObjects;
  clouds;
  enemies;
  endboss;
  coins;
  bottles;
  level_end_x = 2900; // X-coordinate where the level ends

  /**
   * Creates a new Level instance.
   * @param {Array} backgroundObjects - Array of background objects.
   * @param {Array} clouds - Array of cloud objects.
   * @param {Array} enemies - Array of enemy objects.
   * @param {Object} endboss - The end boss object.
   * @param {Array} coins - Array of coin objects.
   * @param {Array} bottles - Array of bottle objects.
   */
  constructor(backgroundObjects, clouds, enemies, endboss, coins, bottles) {
    this.backgroundObjects = backgroundObjects;
    this.clouds = clouds;
    this.enemies = enemies;
    this.endboss = endboss;
    this.coins = coins;
    this.bottles = bottles;
  }
}