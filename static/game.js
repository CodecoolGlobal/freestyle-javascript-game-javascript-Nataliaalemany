// initGame();
import * as enemies from "./enemies.js"
import * as words from "./words.js"

const theme = document.getElementById('theme/lvl').innerText.split(' ')[0]
const level = document.getElementById('theme/lvl').innerText.split(' ')[1]
const battleGround = document.getElementById("battleground")
const input = document.getElementById('input')
// level resources
const lotr = {enemies: 'lvl1.png', lvl1: 'BackgroundOne.png'}
const shrek = {}
const marvel = {}
let enemyCount = 0
const difficulty = "normal"
let myDictionary = {}


function initGame() {
    let playingTheme = getTheme()
    playingTheme = getLevelBackground(playingTheme)
    document.body.style.backgroundImage = `url("/static/pictures/${theme}/${playingTheme.bgimage}")`
    document.body.style.backgroundImage = playingTheme.bgimage
    document.body.style.backgroundSize = "cover"
    setInterval(function(){spawnEnemy(playingTheme)}, 1500)
    checkWords()
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
    if(Object.keys(myDictionary).length < 3){
        let enemy = document.createElement('div');
        enemy.setAttribute('class', `enemy${enemyCount%3}`)
        enemy.setAttribute('id',`enemy${enemyCount}`)
        enemy.innerHTML = `<img src="/static/pictures/${theme}/${playingTheme.enemies}" id='enemy${enemyCount}' style="height: 250px;"/>`;
        battleGround.appendChild(enemy);
        let enemyWord = document.createElement('span');
        enemyWord.setAttribute('class', 'caption')
        let newEnemy = document.getElementById(`enemy${enemyCount}`);
        let wordToSave = getRandomWord();
        enemyWord.innerHTML = wordToSave;
        newEnemy.appendChild(enemyWord);
        myDictionary[wordToSave] = `enemy${enemyCount}`;
        enemyCount++;
    }
}


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

        delete myDictionary[input.value]
        console.log(Object.keys(myDictionary))
        input.value = ''
    }
}


function checkWords() {
    input.addEventListener('input', boldText);
    input.addEventListener('input', connectTextboxToWord);
}


window.onload = initGame
