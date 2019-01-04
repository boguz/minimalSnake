// CONSTANTS
// document constants
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wallsCheckbox = document.getElementById('wallsCheckbox');     // walls checkbox
const speedCheckbox = document.getElementById('speedCheckbox');     // speed checkbox 
const sizeSelect = document.getElementById('sizeSelect');           // size select 
const scoreAmount = document.getElementById('scoreAmount');         // text element with score amount 
const scoreMax = document.getElementById('scoreMax');               // text element with score record 

// game constants
const gridSize = 20;                        // grid size in px
const cols = canvas.width / gridSize;       // number of columns
const rows = canvas.height / gridSize;      // number of rows

// VARIABLES
let frameRate = 12;                       // frame rate in frames per second
let lastTime = Date.now();                  // time variable for the game loop
let snakeDir = "right";                     // right, left, up, down
let snake = new Snake(0,0);                 // create snake at 0, 0
let food = new Food();                      // create food at random position
let score = 0;                              // Player score. Number of eaten fruits
let highScore = 0;                          // Start highest score at 0; 
let goThoughWalls = true;                   // ability yo go though walls. true or false
let previousPosition = {x: 0, y: 0};        // variable to debounce the key presses. Position of click
let increaseSpeed = false;                  // variable to toggle speed increase. true or false

// Initialize game
function init() {
    loop();
    score = 0;
    scoreAmount.innerText = score;

    if (localStorage.getItem('snakeHighScore')) {
        highScore = localStorage.getItem('snakeHighScore');
    }
    scoreMax.innerText = highScore;

}

// Loop Function
function loop() {
    let currentTime = Date.now();

    if (currentTime - lastTime >= 1000 / frameRate) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        food.draw();
        snake.update();
        snake.draw();
        snake.detectCollision();

        lastTime = currentTime;
    }

    window.requestAnimationFrame(loop);
}

// Eat piece of fruit
function eatFood() {
    // if increase speed is selected, increase speed by on each fifth eaten food
    if (increaseSpeed && score % 5 == 0) {
        frameRate ++;
    }

    food = new Food();
    score++;
    scoreAmount.innerText = score;
}

// Game over
// show "Game over" message, update scores and reset game
function gameover() {
    alert("Oooops, game over. Try again...");
    updateScores();
    resetGame();
    frameRate = 10;
}

// Reset game
// create new snake and new piece of fuit
function resetGame() {
    snake = new Snake(0,0);
    snakeDir = "right";
    food = new Food();
}

// Update scores
function updateScores() {
    if (highScore < score) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
    }
    scoreMax.innerText = highScore;
    score = 0;
    scoreAmount.innerText = score;
}

// EVENT LISTENERS+
// Listen to click and change direction of snake
window.addEventListener('keydown', function(e) {

    if (snake.pos.x != previousPosition.x || snake.pos.y != previousPosition.y) {
        if (e.key === "ArrowUp" && snakeDir !== "down") {
            snakeDir = "up";
        } else if (e.key === "ArrowDown" && snakeDir !== "up") {
            snakeDir = "down";
        } else if (e.key === "ArrowRight" && snakeDir !== "left") {
            snakeDir = "right";
        } else if (e.key === "ArrowLeft" && snakeDir !== "right") {
            snakeDir = "left";
        }
        previousPosition.x = snake.pos.x;
        previousPosition.y = snake.pos.y;
    }

    // "Game Over" button for debugging purpuses
    //else if (e.key === "q") {
    //    gameover();
    //} 
});

// Wall Checkbox
wallsCheckbox.addEventListener('change', function(e) {
    goThoughWalls = e.target.checked;
});

// Speed Checkbox
speedCheckbox.addEventListener('change', function(e) {
    increaseSpeed = e.target.checked;
});

// Initialize game on page load
init();