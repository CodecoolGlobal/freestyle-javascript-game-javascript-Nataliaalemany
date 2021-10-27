// initGame();
import * as words from "./words.js"
import * as enemies from "./enemies.js"

const theme = document.getElementById('theme/lvl').innerText.split(' ')[0]
const level = document.getElementById('theme/lvl').innerText.split(' ')[1]
const battleGround = document.getElementById("battleground")
// level resources
const lotr = {enemies: enemies.lotrEnemies, lvl1: 'BackgroundOne.png', lvl2: 'BackgroundTwo.jpg', lvl3: 'BackgroundThree.png'}
const shrek = {enemies: enemies.shrekEnemies, lvl1: 'BackgroundOne.png', lvl2: 'BackgroundTwo.jpg', lvl3: 'BackgroundThree.jpg'}
const marvel = {enemies: enemies.marvelEnemies}
let enemyCount = 0
const difficulty = "normal"
let moveOrder = 0
let enemyIds = []
let score = 0
let health = 0
let spawnedEnemies = 0


function initGame() {
    let playingTheme = getTheme()
    playingTheme = getLevelData(playingTheme)
    document.body.style.backgroundImage = `url("/static/pictures/${theme}/${playingTheme.bgimage}")`
    document.body.style.backgroundImage = playingTheme.bgimage
    document.body.style.backgroundSize = "cover"
    setInterval(function(){spawnEnemy(playingTheme)},500)
    setInterval(function(){gameLogic(playingTheme)}, 250)
}

function gameLogic(){
    if(enemyIds.length !== 0) {
        if(enemyCount === 1){
            moveEnemies()
        }else if(enemyIds.length === 2){
            moveEnemies()
            moveOrder++
            if(moveOrder === 2){
                moveOrder = 0
            }
        }else if(enemyIds.length === 3){
            moveEnemies()
            moveOrder++
        }if (moveOrder === 3) {
                moveOrder = 0
        }
    }
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
    if(enemyCount !== 3){
        let enemy = document.createElement('div');
        enemy.setAttribute('id', `enemy${spawnedEnemies}`)
        let randomEnemy = playingTheme.enemies[Math.floor(Math.random() * 2)]
        enemy.innerHTML = `<img src="/static/pictures/${theme}/${randomEnemy}" id='enemy${spawnedEnemies}' style="height: 100px;"/>`;
        battleGround.appendChild(enemy);
        let enemyWord = document.createElement('span');
        enemyWord.setAttribute('class', 'caption')
        let newEnemy = document.getElementById(`enemy${spawnedEnemies}`);
        enemyWord.innerHTML = getRandomWord();
        newEnemy.appendChild(enemyWord);
        if(enemyIds.length > 0){
            enemyIds.push(`enemy${enemyCount}`)

        }else{
            enemyIds.unshift(`enemy${enemyCount}`)
        }
        enemyCount++;
        console.log(`Enemy ${spawnedEnemies} spawned!`)
        spawnedEnemies++;
        if(spawnedEnemies === 3){
            spawnedEnemies = 0
        }
    }
}


function getRandomWord(){
    let difficulties = {'easy': words.easyWords, 'normal': words.normalWords, 'boss': words.bossWords}
    return difficulties[difficulty][Math.floor(Math.random() * difficulties[difficulty].length)]

}

function moveEnemies(){
    let enemyToMove = enemyIds.indexOf(`enemy${moveOrder}`)
    let selectedEnemy = document.getElementById(enemyIds[enemyToMove])
    selectedEnemy.children[0].style.height = addToHeight(selectedEnemy.children[0].style.height)
    enemyHeightCheck()
}
function addToHeight(height){
    height = height.replace("px","")
    height = parseInt(height)
    height += 10
    height = `${height}px`
    return height
}

function enemyHeightCheck(){
    let enemyToMove = enemyIds.indexOf(`enemy${moveOrder}`)
    let selectedEnemy = document.getElementById(enemyIds[enemyToMove])
    if (selectedEnemy.children[0].style.height === "200px") {
        battleGround.removeChild(selectedEnemy)
        let enemyToRemove = enemyIds.indexOf(`enemy${moveOrder}`)
        enemyIds.splice(enemyToRemove)
        enemyCount--
    }
}
window.onload = initGame
