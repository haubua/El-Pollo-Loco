function canvasBtnTemplate() {
    document.getElementById('screen1').innerHTML = `<canvas class="canvas" id="canvas" width="720" height="480"></canvas>
                                                <div class="canvasBars">
                                                    <div id="topBar">    
                                                        <div class"placeholder"></div>
                                                        <button id="restartButton" class="d-none" onclick="window.location.reload()">Restart Game</button>
                                                        <div id="speakerMobile"  class="d-none">
                                                            <img src="img/audio-speaker.png" class="speaker" ontouchstart="SoundOff()">
                                                        </div>
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
}