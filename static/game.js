// initGame();
import * as enemies from "./enemies.js"

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    createMenu()
    enemies.createEnemy()
}

function createMenu(){
    let body = document.body
}


function loadBackGround(){
    let background = document.getElementsByClassName("playspace");
    background.innerHTML = '<img src="/static/pictures/LOTR/BackgroundOne.png" />';

}



window.onload = initGame


