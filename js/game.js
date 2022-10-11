let canvas;
let world;
let keyboard = new Keyboard();
let backgroundmusic = new Audio('audio/backgroudmusic.mp3');
backgroundmusic.volume = 0.02; //0.02

/**
 * This function will load the canvas and all other Elements on it
 */

function init() {
    initLevel1();
    document.getElementById('screen').innerHTML = `<canvas id="canvas" width="720" height="480"></canvas>`
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    soundOn();
    
}

function soundOff() {
    speaker = document.getElementById('speaker');
    speaker.innerHTML = `<img class="speaker" src="img/mute.png" onclick="soundOn()">`
    backgroundmusic.pause();
}

function soundOn() {
    speaker = document.getElementById('speaker');
    backgroundmusic.play();
    speaker.innerHTML = `<img class="speaker" src="img/audio-speaker.png" onclick="soundOff()">`
}


/**
 * This function will be activated as soon as you press a key, this key´s will change the status of variables
 */

window.addEventListener("keydown", (e) => {
    if (e.keyCode == '38') {
        keyboard.up = true;
    }
    else if (e.keyCode == '40') {
        keyboard.down = true;
    }
    else if (e.keyCode == '37') {
        keyboard.left = true;
    }
    else if (e.keyCode == '39') {
        keyboard.right = true;
    }
    else if (e.keyCode == '32') {
        keyboard.space = true;
    } 
    else if (e.keyCode == '68') {
        keyboard.d = true;
    } 
});

/**
 * This function will be activated as soon as the pressed key goes up, and it will change the status of variables
 */

window.addEventListener("keyup", (e) => {
    if (e.keyCode == '38') {
        keyboard.up = false;
    }
    if (e.keyCode == '40') {
        keyboard.down = false;
    }
    else if (e.keyCode == '37') {
        keyboard.left = false;
    }
    else if (e.keyCode == '39') {
        keyboard.right = false;
    }
    else if (e.keyCode == '32') {
        keyboard.space = false;
    }
    else if (e.keyCode == '68') {
        keyboard.d = false;
    } 
});





