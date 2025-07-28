class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    endboss;

    constructor(enemies, clouds, backgroundObjects, endboss) {
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;

    }
}