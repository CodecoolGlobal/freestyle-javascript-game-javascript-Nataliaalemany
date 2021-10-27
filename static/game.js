// initGame();
import * as enemies from "./enemies.js"

const theme = document.getElementById('theme/lvl').innerText.split(' ')[0]
const level = document.getElementById('theme/lvl').innerText.split(' ')[1]
const battleGround = document.getElementById("battleground")
// level resources
const lotr = {enemy: 'troll.png', lvl1: 'BackgroundOne.png'}
const shrek = {}
const marvel = {}
let enemyCount = 0
let word = 'cheese'


function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    let playingTheme = getTheme()
    playingTheme = getLevelBackground(playingTheme)
    document.body.style.backgroundImage = `url("/static/pictures/${theme}/${playingTheme.bgimage}")`
    document.body.style.backgroundImage = playingTheme.bgimage
    document.body.style.backgroundSize = "cover"
    setInterval(function(){spawnEnemy(playingTheme)}, 1500)
}

function getTheme() {
    if(theme === "LOTR"){
        return lotr
    }
    else if(theme === "Avengers"){
        return marvel
    }
    else if(theme === "Shrek"){
        return shrek
    }
}

function getLevelBackground(playingTheme) {
    if(level === 'LVL1'){
        playingTheme.bgimage = playingTheme.lvl1
        return playingTheme
    }
    else if(level === 'LVL2'){
        playingTheme.bgimage = playingTheme.lvl2
        return playingTheme
    }
    else if(level === 'LVL3'){
        playingTheme.bgimage = playingTheme.lvl3
        return playingTheme
    }
}

function spawnEnemy(playingTheme){
    if(enemyCount < 3){
        let enemy = document.createElement('div');
        enemy.setAttribute('id', `enemy${enemyCount}`)
        enemy.innerHTML = `<img src="/static/pictures/${theme}/${playingTheme.enemy}" id='enemy${enemyCount}' style="height: 250px;"/>`;
        battleGround.appendChild(enemy);
        let enemyWord = document.createElement('span');
        enemyWord.setAttribute('class', 'caption')
        let newEnemy = document.getElementById(`enemy${enemyCount}`);
        enemyWord.innerHTML = word;
        newEnemy.appendChild(enemyWord);
        enemyCount++;
    }
}
window.onload = initGame
