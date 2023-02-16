const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};

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

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCol = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowsCol});

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
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
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