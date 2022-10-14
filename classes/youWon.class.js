class YouWon extends DrawableObjects {
    world;
    height = 480;
    width = 720;
    x = 70;
    y = 0;

constructor () {
    super().loadImage('img/9_intro_outro_screens/game_over/youWon.jpeg');
    this.keepPosition();
}

keepPosition() {
    setInterval(() => {
        this.x = world.character.x -50;
    }, 145);
}
}