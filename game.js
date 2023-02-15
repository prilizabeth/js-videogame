const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

let canvasSize;
let elementsSize;

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

    mapRowsCol.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const positionX = elementsSize * (colIndex + 1);
            const positionY = elementsSize * (rowIndex + 1);
            game.fillText(emoji, positionX, positionY);
        })
    });

    // Lo mismo que el forEach pero con ciclo for
    //for (let row = 1; row <= 10; row++) {
       // for (let col = 1; col <= 10; col++) {
        //    game.fillText(emojis[mapRowsCol[row -1][col - 1]], elementsSize * col, elementsSize * row);
      //  }
    //}
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
}

function moveDown() {
    console.log('Me muevo abajo');
}

function moveLeft() {
    console.log('Me muevo izquierda');
}

function moveRight() {
    console.log('Me muevo derecha');
}