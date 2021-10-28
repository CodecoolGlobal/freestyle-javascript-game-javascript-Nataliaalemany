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
const marvel = {enemies: enemies.marvelEnemies, lvl1: 'BackgroundOne.png', lvl2: 'BackgroundTwo.jpg', lvl3: 'BackgroundThree.png'}
let difficulty = "normal"
let enemyIds = []
let score = 0
let health = 10
let myDictionary = {}
let availableEnemyIds = ['enemy0', 'enemy1', 'enemy2']


function initGame() {
    let playingTheme = getTheme()
    playingTheme = getLevelData(playingTheme)
    document.body.style.backgroundImage = `url("/static/pictures/${theme}/${playingTheme.bgimage}")`
    document.body.style.backgroundImage = playingTheme.bgimage
    document.body.style.backgroundSize = "cover"
    setInterval(function(){spawnEnemy(playingTheme)},1500)
    setInterval(function(){gameLogic(playingTheme)}, 50)
    // checkWords()
}

function gameLogic(){
    if(enemyIds.length !== 0) {
        moveEnemies()
    }
    displayStats()
    boldText()
    connectTextboxToWord()
}

function getTheme() {
    if(theme === "LOTR"){
        return lotr
    }
    else if(theme === "Marvel"){
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
function displayStats(){
    let healthPoints = document.getElementsByClassName('hp')
    let scorePoints = document.getElementsByClassName('score')
    healthPoints[0].innerText = `HP: ${health}`
    scorePoints[0].innerText = `Score: ${score}`
}
function spawnEnemy(playingTheme){
    if(availableEnemyIds[0]){
        let enemyIdToSpawn = availableEnemyIds[[Math.floor(Math.random() * availableEnemyIds.length)]]
        let enemyDiv = document.createElement('div')
        enemyDiv.setAttribute('class', enemyIdToSpawn)
        enemyDiv.setAttribute('id', enemyIdToSpawn)
        let randomEnemyPic = playingTheme.enemies[Math.floor(Math.random() * 2)]
        enemyDiv.innerHTML = `<img src="/static/pictures/${theme}/${randomEnemyPic}" style="height: 100px;"/>`
        battleGround.appendChild(enemyDiv)
        let enemyWord = document.createElement('spawn')
        enemyWord.setAttribute('class', 'caption')
        let wordToSave = getRandomWord()
        enemyWord.innerHTML = wordToSave
        enemyDiv.appendChild(enemyWord)
        enemyIds.push(enemyIdToSpawn)
        myDictionary[wordToSave] = enemyIdToSpawn
        let index = availableEnemyIds.indexOf(enemyIdToSpawn)
        availableEnemyIds.splice(index, 1)
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
        let currentEnemyId = myDictionary[input.value]
        battleGround.removeChild(document.getElementById(currentEnemyId))
        availableEnemyIds.push(currentEnemyId)
        delete myDictionary[input.value]
        let enemyIndex = enemyIds.indexOf(currentEnemyId)
        enemyIds.splice(enemyIndex, 1)
        input.value = ''
    }
}


function checkWords() {
    input.addEventListener('input', boldText);
    input.addEventListener('input', connectTextboxToWord);
}

function moveEnemies(){
    for(let i=0; i<=enemyIds.length-1; i++){
        let battleGround = document.getElementById('battleground')
        battleGround.children[i].children[0].style.height = addToHeight(battleGround.children[i].children[0].style.height)
        enemyHeightCheck()
    }
}
function addToHeight(height){
    height = height.replace("px","")
    height = parseInt(height)
    height += 1
    height = `${height}px`
    return height
}

function enemyHeightCheck() {
    for(let x in enemyIds){
        let enemyToMove = enemyIds[x]
        let selectedEnemy = document.getElementById(enemyToMove)
        if (selectedEnemy.children[0].style.height === "400px") {
            battleGround.removeChild(selectedEnemy)
            let enemyToRemove = enemyIds[x]
            enemyIds.splice(enemyToRemove, 1)
            availableEnemyIds.push(selectedEnemy.id)
            delete myDictionary[selectedEnemy.children[1].innerText]
            console.log(enemyIds)
            console.log(availableEnemyIds)
        }
    }
}

window.onload = initGame
