const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
const btnReset = document.querySelector('#reset_btn');

let canvasSize;
let elementsSize;
let timeStart;
let timePlayer;
let timeInterval;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined,
};
const goalPosition = {
    x: undefined,
    y: undefined,
};
let enemiesPosition = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function fixNumber(n) {
    return Number(n.toFixed(0));
}

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = fixNumber((canvasSize / 10) - 1);

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame() {
    console.log({canvasSize, elementsSize});

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowsCol = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowsCol});

    showLives();

    enemiesPosition = [];
    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowsCol.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const positionX = elementsSize * (colIndex + 1);
            const positionY = elementsSize * (rowIndex + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = positionX;
                    playerPosition.y = positionY;
                    //console.log({playerPosition});
                }
            } else if (col == 'I') {
                goalPosition.x = positionX;
                goalPosition.y = positionY;
            } else if (col == 'X') {
                enemiesPosition.push({
                    x: positionX,
                    y: positionY,
                });
            }

            game.fillText(emoji, positionX, positionY);
        })
    });

    movePlayer();
}

function movePlayer() {
    const goalCollisionX = goalPosition.x.toFixed(3) == playerPosition.x.toFixed(3);
    const goalCollisionY = goalPosition.y.toFixed(3) == playerPosition.y.toFixed(3);
    const goalCollision = goalCollisionX && goalCollisionY;

    if (goalCollision) {
        levelWin();
    }

    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    })

    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
    console.log('ganaste');
    level++;
    startGame();
}

function levelFail() {
    console.log('Chocaste');
    lives--;

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('se termino');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Superaste el record!';
        } else {
            pResult.innerHTML = 'No superaste el record buu';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Primera vez? Intenta superarlo';
    }
    console.log({recordTime, playerTime});
}

function showLives() {
    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnReset.addEventListener('click', resetGame);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') {
        moveUp();
    } else if (event.key == 'ArrowDown') {
        moveDown();
    } else if (event.key == 'ArrowLeft') {
        moveLeft();
    } else if (event.key == 'ArrowRight') {
        moveRight();
    }
}

function moveUp() {
    console.log('Me muevo arriba');

    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('out');
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveDown() {
    console.log('Me muevo abajo');
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('out');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}

function moveLeft() {
    console.log('Me muevo izquierda');
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('out');
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight() {
    console.log('Me muevo derecha');
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('out');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}

function resetGame() {
    location.reload();
}