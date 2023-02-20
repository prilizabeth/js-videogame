const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives');

let canvasSize;
let elementsSize;
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

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10) - 1;

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
                    console.log({playerPosition});
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

    // Lo mismo que el forEach pero con ciclo for
    //for (let row = 1; row <= 10; row++) {
       // for (let col = 1; col <= 10; col++) {
        //    game.fillText(emojis[mapRowsCol[row -1][col - 1]], elementsSize * col, elementsSize * row);
      //  }
    //}
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
        level= 0;
        lives= 3;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('se termino');
}

function showLives() {
    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

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