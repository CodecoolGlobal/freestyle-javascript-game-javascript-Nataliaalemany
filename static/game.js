import * as words from "./words.js"
import * as enemies from "./enemies.js"

const theme = document.getElementById('theme/lvl').innerText.split(' ')[0]
const level = document.getElementById('theme/lvl').innerText.split(' ')[1]
const battleGround = document.getElementById("battleground")
const input = document.getElementById('input')

// level resources
const lotr = {enemies: enemies.lotrEnemies, lvl1: 'BackgroundOne.png', lvl2: 'BackgroundTwo.jpg', lvl3: 'BackgroundThree.png',
    lvl1boss: 'lvl1-boss.png', lvl2boss: 'lvl2-boss.png', lvl3boss: 'lvl3-boss.png'}
const shrek = {enemies: enemies.shrekEnemies, lvl1: 'BackgroundOne.png', lvl2: 'BackgroundTwo.jpg', lvl3: 'BackgroundThree.jpg',
    lvl1boss: 'lvl1-boss.png', lvl2boss: 'lvl2-boss.png', lvl3boss: 'lvl3-boss.png'}
const marvel = {enemies: enemies.marvelEnemies, lvl1: 'BackgroundOne.png', lvl2: 'BackgroundTwo.jpg', lvl3: 'BackgroundThree.png',
    lvl1boss: 'lvl1-boss.png', lvl2boss: 'lvl2-boss.png', lvl3boss: 'lvl3-boss.png'}
let difficulty = "normal"
let enemyIds = []
let score = 0
let health = 5
let myDictionary = {}
let availableEnemyIds = ['enemy0', 'enemy1', 'enemy2']
let deadEnemies = 0
let win = false
let bossAppearance = false
let goal = 15


function initGame() {
    console.log("test")
    let playingTheme = getTheme()
    playingTheme = getLevelData(playingTheme)
    document.body.style.backgroundImage = `url("/static/pictures/${theme}/${playingTheme.bgimage}")`
    document.body.style.backgroundImage = playingTheme.bgimage
    document.body.style.backgroundSize = "cover"
    let enemyFactory = setInterval(function () {spawnEnemy(playingTheme)}, 1500)
    let game = setInterval(function () {gameLogic()}, 50)
    let gameOverHandle = setInterval(function (){gameOver(enemyFactory, game, gameOverHandle)})
}

function clearBoard(){
    for(let i=0; i<battleGround.childNodes.length; i++){
        battleGround.removeChild(battleGround.children[i])
    }
}

function gameOver(enemyFactory, game, gameOverHandle){
    if(health===0 || win){
        clearInterval(enemyFactory)
        clearInterval(game)
        clearInterval(gameOverHandle)
        clearBoard()
        let gameOverText = win ? 'You are the champion!' : 'Game Over'
        battleGround.innerHTML = `<div class="center" id="gameover"><h1>` + gameOverText + `</h1><br><button class="normal-button" onclick=window.location.reload()>Play Again?</button><br>` +
            `<form action="/level_selection/${theme.toLowerCase()}"><button class="normal-button" type="submit">Go to level selection</button></form>
            <form action="/"><button class="normal-button" type="submit">Go to theme selection</button></form></div>`
    }
}

function gameLogic(){
    if(enemyIds.length !== 0) {
        moveEnemies()
    }
    displayStats()
    boldText()
    connectTextboxToWord()
    gameOver()
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
        playingTheme.boss = playingTheme.lvl1boss
        difficulty = 'easy'
        return playingTheme
    }
    else if(level === 'LVL2'){
        playingTheme.bgimage = playingTheme.lvl2
        playingTheme.enemies = playingTheme.enemies.lvl2
        playingTheme.boss = playingTheme.lvl2boss
        difficulty = 'normal'
        return playingTheme
    }
    else if(level === 'LVL3'){
        playingTheme.bgimage = playingTheme.lvl3
        playingTheme.enemies = playingTheme.enemies.lvl3
        playingTheme.boss = playingTheme.lvl3boss
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
    if (!bossAppearance){
        let randomEnemyPic = playingTheme.enemies[Math.floor(Math.random() * 2)]
        let enemyImage = ''
        if (score > goal) {
            enemyImage = `<img src="/static/pictures/${theme}/${playingTheme.boss}" style="height: 150px;"/>`
            difficulty = 'boss'
            bossAppearance = !bossAppearance
        } else {
            enemyImage = `<img src="/static/pictures/${theme}/${randomEnemyPic}" style="height: 100px;"/>`
        }
        let enemyIdToSpawn = availableEnemyIds[[Math.floor(Math.random() * availableEnemyIds.length)]]
        if(availableEnemyIds[0]) {
            let enemyDiv = document.createElement('div')
            enemyDiv.setAttribute('class', score > goal ? 'boss' : 'enemy')
            enemyDiv.setAttribute('id', enemyIdToSpawn)
            enemyDiv.innerHTML = enemyImage
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
        availableEnemyIds.push(currentEnemyId)
        delete myDictionary[input.value]
        let enemyIndex = enemyIds.indexOf(currentEnemyId)
        enemyIds.splice(enemyIndex, 1)
        input.value = ''
        score++
        deadEnemies++
        if (document.getElementById(currentEnemyId).classList.contains('boss')){
                win = true
            }
        battleGround.removeChild(document.getElementById(currentEnemyId))
    }
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
    height += 1 + score / 15
    height = `${height}px`
    return height
}

function enemyHeightCheck() {
    for(let x in enemyIds){
        let enemyToMove = enemyIds[x]
        let selectedEnemy = document.getElementById(enemyToMove)
        if (selectedEnemy.children[0].style.height  >= "400px") {
            battleGround.removeChild(selectedEnemy)
            let enemyToRemove = enemyIds[x]
            enemyIds.splice(enemyToRemove, 1)
            availableEnemyIds.push(selectedEnemy.id)
            delete myDictionary[selectedEnemy.children[1].innerText]
            health--
            deadEnemies++
            if (selectedEnemy.classList.contains('boss')){
                health = 0
            }
        }
    }
}


window.onload = initGame
