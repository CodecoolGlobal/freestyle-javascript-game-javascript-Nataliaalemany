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
const difficulty = "normal"
let enemyIds = []
let score = 0
let health = 10
let myDictionary = {}
let spawnedEnemies = 0
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


// function spawnEnemy(playingTheme){
//     if(enemyCount !== 3){
//         debugger
//         let enemyIdToSpawn = availableEnemyIds[[Math.floor(Math.random() * availableEnemyIds.length)]]
//         let enemy = document.createElement('div');
//         enemy.setAttribute('class', enemyIdToSpawn)
//         enemy.setAttribute('id',enemyIdToSpawn)
//         let randomEnemy = playingTheme.enemies[Math.floor(Math.random() * 2)]
//         enemy.innerHTML = `<img src="/static/pictures/${theme}/${randomEnemy}" style="height: 100px;"/>`;
//         battleGround.appendChild(enemy);
//
//         let enemyWord = document.createElement('span');
//         enemyWord.setAttribute('class', 'caption')
//         let newEnemy = document.getElementById(enemyIdToSpawn);
//         let wordToSave = getRandomWord();
//         enemyWord.innerHTML = wordToSave;
//         newEnemy.appendChild(enemyWord);
//         if(enemyIds.length > 0){
//             enemyIds.push(enemyIdToSpawn)
//         }else{
//             enemyIds.unshift(enemyIdToSpawn)
//         }
//         myDictionary[wordToSave] = enemyIdToSpawn;
//
//         enemyCount++;
//         spawnedEnemies++
//         let index = availableEnemyIds.indexOf(enemyIdToSpawn)
//         availableEnemyIds.splice(index,1)
//         if(spawnedEnemies === 3){
//             spawnedEnemies = 0
//         }
//     }
// }


function getRandomWord(){
    let difficulties = {'easy': words.easyWords, 'normal': words.normalWords, 'boss': words.bossWords};
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
        console.log(enemyIds)
        enemyIds.splice(enemyIndex, 1)
        console.log(enemyIds)
        input.value = ''
    }
}


function checkWords() {
    input.addEventListener('input', boldText);
    input.addEventListener('input', connectTextboxToWord);
}

function moveEnemies(){
    // for(let i=0; i<=enemyCount-1; i++){
    //     let enemyToMove = enemyIds.indexOf(enemyIds[i])
    //     let selectedEnemy = document.getElementById(enemyIds[enemyToMove])
    //     selectedEnemy.children[0].style.height = addToHeight(selectedEnemy.children[0].style.height)
    //     enemyHeightCheck()
    // }
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
    // for (let x = 0; x <= enemyCount - 1; x++) {
    //     let enemyToMove = enemyIds.indexOf(enemyIds[x])
    //     let selectedEnemy = document.getElementById(enemyIds[enemyToMove])
    //     if (selectedEnemy.children[0].style.height === "400px") {
    //         battleGround.removeChild(selectedEnemy)
    //         let enemyToRemove = enemyIds.indexOf(enemyIds[x])
    //         availableEnemyIds.push(enemyIds[enemyToRemove])
    //         enemyIds.splice(enemyToRemove, 1)
    //         enemyCount--
    //         delete myDictionary[selectedEnemy.children[1].innerText]
    //         health--
    //     }
    // }

    // for(let x=0; x<enemyCount-1; x++){
    //     let battleGround = document.getElementById('battleground')
    //     if(battleGround.children[x].children[0].style.height === "400px"){
    //         debugger
    //         availableEnemyIds.push(battleGround.children[x].getAttribute('id'))
    //         let enemyIndex = enemyIds.indexOf(battleGround.children[x].getAttribute('id'))
    //         enemyIds.splice(enemyIndex)
    //         enemyCount--
    //         battleGround.removeChild(battleGround.children[x])
    //         delete myDictionary[battleGround.children[x].innerText]
    //     }
    // }
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
