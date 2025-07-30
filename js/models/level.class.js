
// class Level: bundles together all the components that make up the level, including:
//backgroundObjects, clouds, enemies, endboss



class Level {                                       
    backgroundObjects;
    clouds;
    enemies;
    endboss;
    level_end_x = 2900;

    constructor(backgroundObjects, clouds, enemies, endboss) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        
    }
}