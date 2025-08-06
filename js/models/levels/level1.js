
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
            new Chicken(380), new Smallchickens(500),
            new Chicken(630), new Smallchickens(700),
            new Chicken(950), new Chicken(1140),
            new Chicken(1300), new Smallchickens(1450),
            new Chicken(1800), new Smallchickens(2000),
            new Chicken(2200), new Chicken(2500)
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
