const number1El = document.getElementById('number1')
const number2El = document.getElementById('number2')
const resultEl = document.getElementById('result')
const correctButtonEl = document.getElementById('correct-btn')
const wrongButtonEl = document.getElementById('wrong-btn')
const scoreEl = document.getElementById('score')
const gameOver = document.getElementById('gameOver')
const timingEl = document.getElementById('timing')
const GAMESPEED = 1 * 10000
timingEl.innerHTML = GAMESPEED;




const elems = document.querySelectorAll('.modal'); //get all
const instances = M.Modal.init(elems, {
    onCloseEnd: () => {
        location.href = 'index.html'
    }
}); //init all
const gameOverModal = M.Modal.getInstance(gameOver); //remark yours






//function to generate number between 0 and 10
const generateRandomNumber = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



//function to change our numbers randomly
const generateRandomNumbers = () => {
    console.log(Math.random());
    if (Math.random()>0.5) {
        resultEl.innerHTML = Number(number1El.innerHTML) + Number(number2El.innerHTML) 
    } else {
        number1El.innerHTML = generateRandomNumber(0, 20);
    number2El.innerHTML = generateRandomNumber(0, 20);
    resultEl.innerHTML = generateRandomNumber(0, 20);
    }
    
}

//start is Date.now();
let start;
let timer
let startCountDownTimer = () => {
    timer = setInterval(() => {
        timingEl.innerHTML = (start + (GAMESPEED)) - Date.now();
        if (timingEl.innerHTML <= '0') {
            clearInterval(timer)
            timingEl.innerHTML = '0';
        }
    }, 50)
}


var gameSound = new Audio('game.wav');
gameSound.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);


const startGame = () => {
    //first use of game
    generateRandomNumbers();
    gameSound.play();

    //change start to call the timer with 'right' 2000ms
    start = Date.now();
    startCountDownTimer();

    updateGame();

}


//how many times should game update itself
let gameInterval;

function updateGame() {
    gameInterval = setInterval(() => {
        //generate new numbers
        if (!isLost()) {
            console.log(start, Date.now());
            if (Date.now() - start > 100) {
                generateRandomNumbers();
            }
        } else {
            endGame();
        }

    }, GAMESPEED)

}

function isLost() {
    return Number(scoreEl.innerHTML) <= 0 || Number(timingEl.innerHTML) <= 0
}

function getNext() {
    startGame();
}

function endGame() {
    console.log('ending game');
    gameOverModal.open();
    clearInterval(gameInterval);
    gameSound.pause()
    clearInterval(timer)
}

function rightAnswer() {
    scoreEl.innerHTML++;
    start += GAMESPEED;
    generateRandomNumbers();
}

function isRightCalc() {
    return Number(number1El.innerHTML) + Number(number2El.innerHTML) === Number(resultEl.innerHTML)
}

function isWrongCalc() {
    return Number(number1El.innerHTML) + Number(number2El.innerHTML) !== Number(resultEl.innerHTML)
}
//attach listners
correctButtonEl.addEventListener("mousedown", () => {
    if (isRightCalc()) {
        rightAnswer();
    } else {
        console.log('touch start');
        endGame();
    }
})
wrongButtonEl.addEventListener("mousedown", () => {
    if (isWrongCalc()) {
        rightAnswer();
    } else {
        endGame();
    }
})




document.addEventListener('DOMContentLoaded', function () {
    startGame();
});