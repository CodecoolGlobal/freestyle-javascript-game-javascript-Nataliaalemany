// initGame();
import * as words from "./words.js"
import * as enemies from "./enemies.js"

const theme = document.getElementById('theme/lvl').innerText.split(' ')[0]
const level = document.getElementById('theme/lvl').innerText.split(' ')[1]
const battleGround = document.getElementById("battleground")
const input = document.getElementById('input')
// level resources
const lotr = {enemies: enemies.lotrEnemies, lvl1: 'BackgroundOne.png', lvl2: 'BackgroundTwo.jpg', lvl3: 'BackgroundThree.png'}
const shrek = {enemies: enemies.shrekEnemies, lvl1: 'BackgroundOne.png', lvl2: 'BackgroundTwo.jpg', lvl3: 'BackgroundThree.jpg'}
const marvel = {enemies: enemies.marvelEnemies}
let enemyCount = 0
let difficulty = "normal"
let moveOrder = 0
let enemyIds = []
let score = 0
let health = 0
let myDictionary = {}
let spawnedEnemies = 0


function initGame() {
    let playingTheme = getTheme()
    playingTheme = getLevelData(playingTheme)
    document.body.style.backgroundImage = `url("/static/pictures/${theme}/${playingTheme.bgimage}")`
    document.body.style.backgroundImage = playingTheme.bgimage
    document.body.style.backgroundSize = "cover"
    setInterval(function(){spawnEnemy(playingTheme)},500)
    setInterval(function(){gameLogic(playingTheme)}, 250)
    checkWords()
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
        difficulty = 'easy'
        return playingTheme
    }
    else if(level === 'LVL2'){
        playingTheme.bgimage = playingTheme.lvl2
        playingTheme.enemies = playingTheme.enemies.lvl2
        difficulty = 'normal'
        return playingTheme
    }
    else if(level === 'LVL3'){
        playingTheme.bgimage = playingTheme.lvl3
        playingTheme.enemies = playingTheme.enemies.lvl3
        difficulty = 'hard'
        return playingTheme
    }
}

function spawnEnemy(playingTheme){
    if(enemyCount !== 3){
        let enemy = document.createElement('div');
        enemy.setAttribute('class', `enemy${spawnedEnemies}`)
        enemy.setAttribute('id',`enemy${spawnedEnemies}`)
        let randomEnemy = playingTheme.enemies[Math.floor(Math.random() * 2)]
        enemy.innerHTML = `<img src="/static/pictures/${theme}/${randomEnemy}" id='enemy${spawnedEnemies}' style="height: 100px;"/>`;
        battleGround.appendChild(enemy);
        let enemyWord = document.createElement('span');
        enemyWord.setAttribute('class', 'caption')
        let newEnemy = document.getElementById(`enemy${spawnedEnemies}`);
        let wordToSave = getRandomWord();
        enemyWord.innerHTML = wordToSave;
        newEnemy.appendChild(enemyWord);
        if(enemyIds.length > 0){
            enemyIds.push(`enemy${spawnedEnemies}`)
        }else{
            enemyIds.unshift(`enemy${spawnedEnemies}`)
        }
        myDictionary[wordToSave] = `enemy${spawnedEnemies}`;

        enemyCount++;
        spawnedEnemies++;
        if(spawnedEnemies === 3){
            spawnedEnemies = 0
        }
    }
}


function getRandomWord(){
    let difficulties = {'easy': words.easyWords, 'normal': words.normalWords, 'hard': words.hardWords, 'boss': words.bossWords};
    return difficulties[difficulty][Math.floor(Math.random() * difficulties[difficulty].length)];
}


function boldText(){
    for (let i=0;i<Object.keys(myDictionary).length;i++) {
        let enemyWord = battleGround.children[i].children[1].innerHTML
        enemyWord = enemyWord.replace('<b>', '').replace('</b>', '')
        if (enemyWord.startsWith(input.value)) {
            enemyWord = enemyWord.replace(input.value, '<b>' + input.value + '</b>')
            battleGround.children[i].children[1].innerHTML = enemyWord
        }
    }
}


function connectTextboxToWord(){
    if (myDictionary.hasOwnProperty(input.value)){
        let currentEnemyId = myDictionary[input.value];
        battleGround.removeChild(document.getElementById(currentEnemyId));
        delete myDictionary[input.value];
        score += 10;
        health += 1;
        input.value = '';
    }
}


function checkWords() {
    input.addEventListener('input', boldText);
    input.addEventListener('input', connectTextboxToWord);
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
