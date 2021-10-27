// initGame();
import * as enemies from "./enemies.js"
import * as words from "./words.js"

const theme = document.getElementById('theme/lvl').innerText.split(' ')[0]
const level = document.getElementById('theme/lvl').innerText.split(' ')[1]
const battleGround = document.getElementById("battleground")
// level resources
const lotr = {enemies: 'lvl1.png', lvl1: 'BackgroundOne.png'}
const shrek = {}
const marvel = {}
let enemyCount = 0
const difficulty = "boss"


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
        enemy.innerHTML = `<img src="/static/pictures/${theme}/${playingTheme.enemies}" id='enemy${enemyCount}' style="height: 250px;"/>`;
        battleGround.appendChild(enemy);
        let enemyWord = document.createElement('span');
        enemyWord.setAttribute('class', 'caption')
        let newEnemy = document.getElementById(`enemy${enemyCount}`);
        enemyWord.innerHTML = getRandomWord();
        newEnemy.appendChild(enemyWord);
        enemyCount++;
    }
}


function getRandomWord(){
    let difficulties = {'easy': words.easyWords, 'normal': words.normalWords, 'boss': words.bossWords}
    console.log(difficulties[difficulty][Math.floor(Math.random() * difficulties[difficulty].length)])
    return difficulties[difficulty][Math.floor(Math.random() * difficulties[difficulty].length)]

}


window.onload = initGame
