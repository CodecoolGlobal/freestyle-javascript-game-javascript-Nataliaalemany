// initGame();
import * as words from "./words.js"
import * as enemies from "./enemies.js"

const theme = document.getElementById('theme/lvl').innerText.split(' ')[0]
const level = document.getElementById('theme/lvl').innerText.split(' ')[1]
const battleGround = document.getElementById("battleground")
// level resources
const lotr = {enemies: enemies.lotrEnemies, lvl1: 'BackgroundOne.png', lvl2: 'BackgroundTwo.jpg', lvl3: 'BackgroundThree.png'}
const shrek = {enemies: enemies.shrekEnemies}
const marvel = {enemies: enemies.marvelEnemies}
let enemyCount = 0
const difficulty = "normal"


function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    let playingTheme = getTheme()
    playingTheme = getLevelData(playingTheme)
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

function getLevelData(playingTheme) {
    if(level === 'LVL1'){
        playingTheme.bgimage = playingTheme.lvl1
        playingTheme.enemies = playingTheme.enemies.lvl1
        return playingTheme
    }
    else if(level === 'LVL2'){
        playingTheme.bgimage = playingTheme.lvl2
        playingTheme.enemies = playingTheme.enemies.lvl2
        return playingTheme
    }
    else if(level === 'LVL3'){
        playingTheme.bgimage = playingTheme.lvl3
        playingTheme.enemies = playingTheme.enemies.lvl3
        return playingTheme
    }
}

function spawnEnemy(playingTheme){
    if(enemyCount < 3){
        let enemy = document.createElement('div');
        enemy.setAttribute('id', `enemy${enemyCount}`)
        let randomEnemy = playingTheme.enemies[Math.floor(Math.random() * 2)]
        enemy.innerHTML = `<img src="/static/pictures/${theme}/${randomEnemy}" id='enemy${enemyCount}' style="height: 250px;"/>`;
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
