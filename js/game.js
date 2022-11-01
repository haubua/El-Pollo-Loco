let canvas;
let world;
let keyboard = new Keyboard();
let backgroundmusic = new Audio('audio/backgroudmusic.mp3');
backgroundmusic.volume = 0.02; //0.02
let isMobile = false;
let showDescription = true;
let sound = true;
let start = false;
let startGame = false;
let imagesLoaded = [];
let i = 0;


/**
 * this function will return if the for the game used device is a mobile device
 */

function checkUsedDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    setMobilePage();
}


/**
 * this function will set all classes for mobile devices
 */

function setMobilePage() {
    if (isMobile) {
        document.getElementById('headline').classList.add('d-none-important');
        document.getElementById('description').classList.add('d-none-important');
        document.getElementById('introScreen').classList.add('width100', 'height100');
        document.getElementById('placeButton').classList.remove('placeButton');
        document.getElementById('placeButton').classList.add('placeButtonMobile');
        document.getElementById('bottomBar').classList.remove('width100');
    }
}


/**
 * this function will show you a desscriptionpage before you start the game or
 * it will start the game if the checkbox was checked before
 */

function showDescriptionScreen() {
    showDescription = localStorage.getItem('showDescription')
    if (showDescription == 'true'|| showDescription == null) {
        showDescriptioHtmlTemplate();
        setMobilePage();
        document.getElementById('startButton').onclick = init;
    } else
        init();
}


/**
 * this function will will change the image if the checkbox was clicked and it will save the settings in the local storage
 */

function check() {
    document.getElementById('checkbox').src = 'img/checked.svg';
    document.getElementById('checkbox').onclick = uncheck;
    localStorage.removeItem('showDescription');
    localStorage.setItem('showDescription', 'false');
}

/**
 * this function will show the image of the unchecked checkbox and it will save the settings in the local storage
 */

function uncheck() {
    document.getElementById('checkbox').src = 'img/unchecked.svg';
    document.getElementById('checkbox').onclick = check;
    localStorage.removeItem('showDescription');
    localStorage.setItem('showDescription', 'true');
}


/**
 * This function will load the canvas and start the game
 */

function init() {
    startTheGame();
    initLevel1();
    canvasTemplate();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    if (!isMobile)
        document.getElementById('fullscreen').classList.remove('d-none');
    else if (isMobile)
        setMobileGame();
}


/**
 * this function will set the mobile view
 */

function setMobileGame() {
    fullscreen();
    document.getElementById('canvas').classList.add('width100', 'height100');
    document.getElementById('loadingScreen').classList.add('width100', 'height100');
    document.getElementById('bottomBar').classList.remove('d-none-important');
    document.getElementById('speakerMobile').classList.remove('d-none');
    initTouchBtn();
}


/**
 * this function will show you the loadingscreen and it will set a variable after all images are loaded
 */


function startTheGame() {
    document.getElementById('screen1').classList.add('d-none-important');
    document.getElementById('loadingScreen').classList.remove('d-none-important');
    setInterval(() => {
        if (!startGame && i == 141)
            setTimeout(() => {
                document.getElementById('screen1').classList.remove('d-none-important');
                document.getElementById('loadingScreen').classList.add('d-none-important');
                soundActive();
                startGame = true;
            }, 1500)
        if (!startGame)
            showProgress();
    }, 100)
}


/**
 * this function will show you the loadingprogress
 */

function showProgress() {
    let progress = +`${Math.round((100 / 141) * (i))}`
    document.getElementById('progress-bar').innerHTML = `${progress}%`;
    document.getElementById('progress-bar').style = `width: ${progress / 2}%`;
}


/**
 * checks if the sound is on, if it is then it will play a sound
 */

function soundActive() {
    sound = localStorage.getItem('sound')
    if (sound == 'true'|| sound == null)
        soundOn();
    else
        soundOff();
}


/**
 * this function will save your sound options and it will change the sound icons
 */

function soundOff() {
    sound = false;
    localStorage.setItem('sound', 'false');
    if (!isMobile) {
        speaker = document.getElementById('speaker');
        speaker.innerHTML = `<img class="speaker" src="img/mute.png" onclick="soundOn()">`;
        backgroundmusic.pause();
    } else if (isMobile) {
        speakerMobile = document.getElementById('speakerMobile');
        speakerMobile.innerHTML = `<img class="speaker" src="img/mute.png" ontouchstart="soundOn()">`;
        backgroundmusic.pause();
    }
}


/**
 * this function will save your sound options and it will change the sound icons
 */

function soundOn() {
    sound = true;
    localStorage.setItem('sound', 'true')
    if (!isMobile) {
        speaker = document.getElementById('speaker');
        speaker.innerHTML = `<img class="speaker" src="img/audio-speaker.png" onclick="soundOff()">`;;
        backgroundmusic.play();
    } else if (isMobile) {
        speakerMobile = document.getElementById('speakerMobile');
        speakerMobile.innerHTML = `<img class="speaker" src="img/audio-speaker.png" ontouchstart="soundOff()">`;
        backgroundmusic.play();
    }
}


/**
 *  this function will set the fullscreen settings 
 */

function fullscreen() {
    let fullscreen = document.getElementById('screen');
    enterFullscreen(fullscreen);
    document.getElementById('headline').classList.add('d-none');
    document.getElementById('screen').classList.add('background');
    if (!isMobile) 
        document.getElementById('fullscreen').innerHTML = 
        `<img onclick="closeFullscreen()" src="img/fullscreen-exit-32.ico" alt="">`;
}


/**
 * this function set the settings if you close the fullscreen
 */

function closeFullscreen() {
    exitFullscreen();
    document.getElementById('headline').classList.remove('d-none');
    document.getElementById('fullscreen').innerHTML = `<img onclick="fullscreen()" src="img/fullscreen-12-32.ico" alt="">`;
}


/**
 * this function will enter the fullscreen
 * 
 * @param {*} element 
 */

function enterFullscreen(element) {
    if (element.requestFullscreen) 
        element.requestFullscreen();
     else if (element.msRequestFullscreen) 
        element.msRequestFullscreen();
     else if (element.webkitRequestFullscreen) 
        element.webkitRequestFullscreen();
}


/**
 * this function will leave the fullscreen
 */

function exitFullscreen() {
    if (document.exitFullscreen) 
        document.exitFullscreen();
     else if (document.webkitExitFullscreen) 
        document.webkitExitFullscreen();
}


/**
 * This function will be activated as soon as you press a key, this key´s will change the status of variables
 */

window.addEventListener("keydown", (e) => {
    if (e.keyCode == '38') 
        keyboard.up = true;
    else if (e.keyCode == '40') 
        keyboard.down = true;
    else if (e.keyCode == '37') 
        keyboard.left = true;
    else if (e.keyCode == '39') 
        keyboard.right = true;
    else if (e.keyCode == '32') 
        keyboard.space = true;
    else if (e.keyCode == '68') 
        keyboard.d = true;
});


/**
 * This function will be activated as soon as the pressed key goes up, and it will change the status of variables
 */

window.addEventListener("keyup", (e) => {
    if (e.keyCode == '38') 
        keyboard.up = false;
    if (e.keyCode == '40') 
        keyboard.down = false;
    else if (e.keyCode == '37')
        keyboard.left = false;
    else if (e.keyCode == '39') 
        keyboard.right = false;
    else if (e.keyCode == '32') 
        keyboard.space = false;
    else if (e.keyCode == '68') 
        keyboard.d = false;
});


/**
 * this function is for mobile devices, it will set the keyboard variales as soon as you touch a btn
 */

function initTouchBtn() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    })
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.left = false;
    })
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    })
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.right = false;
    })
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.up = true;
    })
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.up = false;
    })
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.d = true;
    })
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.d = false;
    })
}