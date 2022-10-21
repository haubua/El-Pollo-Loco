function canvasBtnTemplate() {
    document.getElementById('screen1').innerHTML = `<canvas class="canvas" id="canvas" width="720" height="480"></canvas>
                                                <div class="canvasBars">
                                                    <div id="topBar">    
                                                        <div class"placeholder"></div>
                                                        <div id="warning" class="d-none-important warning">You can only carry a maximum of 5 bottles!</div>
                                                        <div id="speakerMobile"  class="d-none">
                                                            <img src="img/audio-speaker.png" class="speaker" ontouchstart="SoundOff()">
                                                        </div>
                                                        <div id="fullscreen" class="d-none">
                                                            <img  onclick="fullscreen()" src="img/fullscreen-12-32.ico" style="margin-top: 6px";>
                                                        </div>
                                                    </div>
                                                    <div id="bottomBar" class="d-none-important">
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



function showDescriptioHtmlTemplate() {
    document.getElementById('screen1').innerHTML = `<div id="descriptionScreen">
                                                        <img id="introScreen" src="img/5_background/first_half_background.png" width="720" height="480">
                                                        <div id="placeButton" class="placeButton">
                                                                <div id="topBar"></div>
                                                                <div id="bottomBar" class="width100">
                                                                    <div class="checkboxCenter">
                                                                        <img id="checkbox" onclick="check()" src="img/unchecked.svg" style="width: 30px; height: 30px;">
                                                                        <p style="margin-top: 0; ">Don't show this again</p>
                                                                    </div>
                                                                    <div><button id="startButton" onclick="showDescription()">Start Game</button></div>
                                                                </div>
                                                            </div>
                                                        <div id="gameDescription">
                                                            <h3 >
                                                                To eliminate the Chickens you need to jump on them or you can throw bottle which you need 
                                                                to collect, don't waste all of you bottles, you will need them to kill 
                                                                the Endboss.
                                                            </h3>
                                                            
                                                            
                                                        </div>
                                                    </div>`
}
