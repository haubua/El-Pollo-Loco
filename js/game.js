let canvas;
let world;
let keyboard = new Keyboard();
let backgroundmusic = new Audio('audio/backgroudmusic.mp3');
backgroundmusic.volume = 0.00; //0.02
let isMobile = false;

// device detection

function usedDeviceMobile() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    renderMobilePage()
}

function renderMobilePage() {
    if (isMobile == true) {
        document.getElementById('description').classList.add('d-none');
        document.getElementById('headline').classList.add('d-none');
    }
}

/**
 * This function will load the canvas and all other Elements on it
 */

function init() {
    initLevel1();
    document.getElementById('screen1').innerHTML = `<canvas class="canvas" id="canvas" width="720" height="480"></canvas>
                                                <div class="canvasBars">
                                                    <div id="topBar">    
                                                        <div class"placeholder"></div>
                                                        <button id="restartButton" class="d-none" onclick="window.location.reload()">Restart Game</button>
                                                        <div id="fullscreen" class="d-none">
                                                            <img  onclick="fullscreen()" src="img/fullscreen-12-32.ico" style="margin-top: 6px";>
                                                        </div>
                                                    </div>
                                                    <div id="bottomBar" class="d-none">
                                                        <div id="bottomBarLeft">
                                                            <img  id="btnLeft" src="img/arrow-left-32.ico" class="btnBottomBar";>
                                                            <img  id="btnRight" src="img/arrow-right-32.ico" class="btnBottomBar";>
                                                        </div>
                                                        <div id="bottomBarRight">
                                                            <img  id="btnJump" onclick="" src="img/arrow-up-32.ico" class="btnBottomBar";>
                                                            <img  id="btnThrow" src="img/salsa-bottle-32.ico" class="btnBottomBar";>
                                                        </div>
                                                    </div>
                                                </div>
                                                    `
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    soundOn();
    document.getElementById('startButton').classList.add('d-none');
    if (isMobile == false) {
        document.getElementById('fullscreen').classList.remove('d-none');
    } else if (isMobile == true) {
        fullscreen();
        document.getElementById('canvas').classList.add('width100', 'height100');
        document.getElementById('bottomBar').classList.remove('d-none');
        document.getElementById('topBar').classList.add('screenCenter')
        initTouchBtn();
    }
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

function fullscreen() {
    let fullscreen = document.getElementById('screen')
    enterFullscreen(fullscreen)
    if (isMobile == false) {
        document.getElementById('fullscreen').innerHTML = `<img onclick="closeFullscreen()" src="img/fullscreen-exit-32.ico" alt="" style="
    filter: invert(1)">`
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