class Endscreen extends DrawableObjects {
    height = 480;
    width = 720;
    x = 70;
    y = 0;

    images_endscreen = [
        'img/5_background/first_half_background.png',
        'img/9_intro_outro_screens/game_over/oh no you lost!.png'
    ]


constructor () {
    super().loadImage('img/5_background/second_half_background.png','img/9_intro_outro_screens/game_over/oh no you lost!.png');
  
   
}



}