
/**
 * Sets up level1 with all game objects when the game begins.
 */

let level1;
    function setupLevel() {  
    level1 = new Level(
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4)
        ],
        [
            new Cloud(0, 0),
            new Cloud(400, 0),
            new Cloud(1200, 1),
            new Cloud(2000, 1),
            new Cloud(2800, 1),
            new Cloud(3500, 1)          
            
        ],
        [
            new Chicken(780), new Smallchickens(900),
            new Chicken(1030), new Smallchickens(1100),
            new Chicken(1350), new Chicken(1540),
            new Chicken(1700), new Smallchickens(1850),
            new Chicken(2200), new Smallchickens(2400),
            new Chicken(2600), new Chicken(2900)
        ],
        new Endboss(),
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new BottleOne(), new BottleTwo(),   
            new BottleOne(), new BottleTwo(), 
            new BottleOne(), new BottleTwo(), 
            new BottleOne(), new BottleTwo(), 
            new BottleOne(), new BottleTwo(), 
            new BottleOne(), new BottleTwo(),
            new BottleOne(), new BottleTwo(),            
        ]        
       
    );

}
