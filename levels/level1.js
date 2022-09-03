let level1;

function initLevel1() {

level1 = new Level(
    [
        new Cloud()
    ],
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Babychicken(),
        new Babychicken(),
        new Endboss(),
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
        new Coins(300, 190),
        new Coins(340, 160),
        new Coins(380, 130),
        new Coins(420, 100),
        new Coins(460, 130),
        new Coins(500, 160),
        new Coins(540, 190),
        new Coins(1140, 100),
        new Coins(1180, 100),
        new Coins(1220, 100),
        new Coins(1740, 140),
        new Coins(1780, 110),
        new Coins(1820, 140)
    ],
    [
        new Bottle(400),
        new Bottle(450),
        new Bottle(700),
        new Bottle(1000),
        new Bottle(1200),
        new Bottle(1500),
    ]

)
}