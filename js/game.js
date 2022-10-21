let canvas;
let world;
let keyboard = new Keyboard();
let backgroundmusic = new Audio('audio/backgroudmusic.mp3');
backgroundmusic.volume = 0.02; //0.02
let isMobile = false;
let showDescriptio = true;
let sound = true;

// device detection

function usedDeviceMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    renderMobilePage()
}

function renderMobilePage() {
    if (isMobile == true) {
        document.getElementById('headline').classList.add('d-none-important');
        document.getElementById('description').classList.add('d-none-important');
        document.getElementById('introScreen').classList.add('width100', 'height100');
        document.getElementById('placeButton').classList.remove('placeButton');
        document.getElementById('placeButton').classList.add('placeButtonMobile');
        document.getElementById('bottomBar').classList.remove('width100');
    }
}

function showDescription() {
    showDescription = localStorage.getItem('showDescription')
    if (showDescription == true || showDescription == null) {
        showDescriptioHtmlTemplate();
        renderMobilePage();
        document.getElementById('startButton').onclick = init;
    }
    else {
        init();
    }
}

function check() {
    document.getElementById('checkbox').src = 'img/checked.svg';
    document.getElementById('checkbox').onclick = uncheck;
    localStorage.removeItem('showDescription');
    localStorage.setItem('showDescription', 'true');
}

function uncheck() {
    document.getElementById('checkbox').src = 'img/unchecked.svg';
    document.getElementById('checkbox').onclick = check
    localStorage.removeItem('showDescription');
    localStorage.setItem('showDescription', 'false');
}
/**
 * This function will load the canvas and all other Elements on it
 */

function init() {
    initLevel1();
    canvasBtnTemplate();
    sound = localStorage.getItem('sound')
    if (sound == 'true') {
       soundOn(); 
    } else {
        soundOff();
    }
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // document.getElementById('startButton').classList.add('d-none');
    if (isMobile == false) {
        document.getElementById('fullscreen').classList.remove('d-none');
    } else if (isMobile == true) {
        fullscreen();
        document.getElementById('canvas').classList.add('width100', 'height100');
        document.getElementById('bottomBar').classList.remove('d-none-important');
        document.getElementById('speakerMobile').classList.remove('d-none');
        initTouchBtn();
    }
}


function soundOff() {
    sound = false;
    localStorage.setItem('sound', 'false')
    if (isMobile == false) {
        speaker = document.getElementById('speaker');
        speaker.innerHTML = `<img class="speaker" src="img/mute.png" onclick="soundOn()">`
        backgroundmusic.pause();
    } else if (isMobile == true) {
        speakerMobile = document.getElementById('speakerMobile');
        speakerMobile.innerHTML = `<img class="speaker" src="img/mute.png" ontouchstart="soundOn()">`
        backgroundmusic.pause();
    }

}

function soundOn() {
    sound = true;
    localStorage.setItem('sound', 'true')
    if (isMobile == false) {
        speaker = document.getElementById('speaker');
        speaker.innerHTML = `<img class="speaker" src="img/audio-speaker.png" onclick="soundOff()">`
        backgroundmusic.play();
    } else if (isMobile == true) {
        speakerMobile = document.getElementById('speakerMobile');
        speakerMobile.innerHTML = `<img class="speaker" src="img/audio-speaker.png" ontouchstart="soundOff()">`
        backgroundmusic.play();
    }
}

function fullscreen() {
    let fullscreen = document.getElementById('screen')
    enterFullscreen(fullscreen)
    if (isMobile == false) {
        document.getElementById('fullscreen').innerHTML = `<img onclick="closeFullscreen()" src="img/fullscreen-exit-32.ico" alt="">`
    }
    document.getElementById('headline').classList.add('d-none')
    document.getElementById('screen').classList.add('background')
}

function closeFullscreen() {
    exitFullscreen();
    document.getElementById('headline').classList.remove('d-none')
    document.getElementById('fullscreen').innerHTML = `<img onclick="fullscreen()" src="img/fullscreen-12-32.ico" alt="">`
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function loadCanvas() {
    document.getElementById('canvas').innerHTML = `<img src="img/9_intro_outro_screens/start/startscreen_1.png" alt="" width="720" height="480">`
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