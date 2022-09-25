let board = document.getElementById('board');
let scoreBoard = document.getElementById('scoreBoard');
let startBtn = document.getElementById('start');
let gameOver = document.getElementById('gameOver');

let boardSize = 10;
let gameSpeed = 100;
let squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};
let directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
};

let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

startBtn.addEventListener('click',startGame);

//Funciones
function startGame(){
    setGame();
    gameOver.style.display = 'none';
    startBtn.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown',directionEvent);
    moveInterval = setInterval(() => 
                    moveSnake(),gameSpeed);
}

function setGame(){
    snake = ['00','01','02','03'];
    score = snake.length-4;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () =>
    new Array(boardSize).fill(squareTypes.emptySquare));
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
}

function createBoard (){
    boardSquares.forEach((i,iIndex) => {
        i.forEach((j,jIndex) => {
            let squareValue = `${iIndex}${jIndex}`;
            let squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    });
}

function drawSquare (square, type){
    let [i,j] = square.split('');
    boardSquares[i][j] = squareTypes[type];
    let squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if(type === 'emptySquare'){
        emptySquares.push(square);
    }else{
        if(emptySquares.indexOf(square) !== -1){
            emptySquares.splice(emptySquares.indexOf(square),1);
        }
    }
}

function drawSnake (){
    snake.forEach(square =>{
        drawSquare(square, 'snakeSquare');
    })
}

function updateScore(){
    scoreBoard.innerText = score;
}

function createRandomFood(){
    let randomEmptySquare = emptySquares[Math.floor(Math.random()*emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
}

function setDirection(newDirection){
    direction = newDirection;
}

function directionEvent(key){
    switch (key.code) {
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code)
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code)
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code)
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code)
            break;
    }
}

function moveSnake(){
    let newSquare = String(
        Number(snake[snake.length-1]) + directions[direction])
        .padStart(2,'0');
    let [i,j] = newSquare.split('');
    if(newSquare < 0 || 
        newSquare > boardSize*boardSize || 
        (direction === 'ArrowRight' && j == 0)||
        (direction === 'ArrowLeft' && j == 9 ||
        boardSquares[i][j] === squareTypes.snakeSquare)){
            gameOverF();
    }else {
            snake.push(newSquare);
            if(boardSquares[i][j] === squareTypes.foodSquare){
                addFood()
            }else{
                let emptySquare = snake.shift();
                drawSquare(emptySquare, 'emptySquare');
            }
            drawSnake();
    }
}

function gameOverF(){
    gameOver.style.display = 'block';
    clearInterval(moveInterval)
    startBtn.disabled = false;
}

function addFood(){
    score++;
    updateScore();
    createRandomFood();
}