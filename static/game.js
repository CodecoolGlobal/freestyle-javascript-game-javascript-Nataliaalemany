// initGame();
import * as enemies from "./enemies.js"

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    create_menu()
    enemies.create_enemy()
}

function create_menu(){
    let body = document.body
    body.style.backgroundImage = "url(static/pictures/bg.png)"
    body.style.backgroundRepeat = "no-repeat"
    body.style.maxHeight = "100vh"
    body.style.maxWidth = "100%"
}

window.onload = initGame


