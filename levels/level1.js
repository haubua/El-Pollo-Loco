let level1;

function initLevel1() {
    
level1 = new Level(
    [
        new Cloud()
    ],
    [
        new Chicken(0),
        new Chicken(1),
        new Chicken(2),
        new Babychicken(3),
        new Babychicken(4),
        new Endboss(5),
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ],
    [
        new Coin(280, 190, 0),
        new Coin(320, 160, 1),
        new Coin(360, 130, 2),
        new Coin(400, 100, 3),
        new Coin(440, 130, 4),
        new Coin(480, 160, 5),
        new Coin(520, 190, 6),
        new Coin(1120, 100, 7),
        new Coin(1160, 100, 8),
        new Coin(1200, 100, 9),
        new Coin(1720, 140, 10),
        new Coin(1760, 110, 11),
        new Coin(1800, 140, 12)
    ],
    [
        new Bottle(400),
        new Bottle(440),
        new Bottle(720),
        new Bottle(1000),
        new Bottle(1120),
        new Bottle(1440),
        new Bottle(1480),
        new Bottle(1880),
        new Bottle(1960),
        new Bottle(2200)
    ]
)}