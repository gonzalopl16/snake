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
}

function setGame(){
    snake = ['00','01','02','03'];
    score = snake.length;
    direction = 'ArrowRight';
}