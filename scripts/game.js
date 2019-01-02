// CONSTANTS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wallsCheckbox = document.getElementById('wallsCheckbox');

const gridSize = 10;                                // grid size in px
const frameRate = 10;                               // frame rate in frames per second
const cols = canvas.width / gridSize;               // number of columns
const rows = canvas.height / gridSize;              // number of rows

const scoreAmount = document.getElementById('scoreAmount');  // text element with score amount 
const scoreMax = document.getElementById('scoreMax');  // text element with score amount 

// VARIABLES
let lastTime = Date.now();
let snakeDir = "right";                             // right, left, up, down
let snake = new Snake(0,0);                         // create snake at 0, 0
let food = new Food();                              // create food at random position
let score = 0;                                      // Player score. Number of eaten fruits
let highScore = 0;                                  // Start highest score at 0; 
let goThoughWalls = true;                           // ability yo go though walls. true or false
let pressTime;                                      // variable to debounce the key presses. Time of click
let lastPressTime = 0;                              // variable to debounde the ket presses. time of last click


// Initialize game
function init() {
    loop();
    score = 0;
    scoreAmount.innerText = score;
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

function eatFood() {
    food = new Food();
    score++;
    scoreAmount.innerText = score;
}

function gameover() {
    alert("Oooops, game over. Try again...");
    updateScores();
    resetGame(); 
}

function resetGame() {
    snake = new Snake(0,0);
    snakeDir = "right";
    food = new Food();
}

function updateScores() {
    if (highScore < score) {
        highScore = score;
    }
    scoreMax.innerText = highScore;
    score = 0;
    scoreAmount.innerText = score;

}

// Event Listeners

// Listen to click and change direction of snake
window.addEventListener('keydown', function(e) {
    pressTime = Date.now();

    if (pressTime - lastPressTime > frameRate * 5) {
        if (e.key === "ArrowUp" && snakeDir !== "down") {
            snakeDir = "up";
        } else if (e.key === "ArrowDown" && snakeDir !== "up") {
            snakeDir = "down";
        } else if (e.key === "ArrowRight" && snakeDir !== "left") {
            snakeDir = "right";
        } else if (e.key === "ArrowLeft" && snakeDir !== "right") {
            snakeDir = "left";
        }
        lastPressTime = pressTime;
    }


    

    else if (e.key === "q") {
        gameover();
    }
});

// Wall Checkbox
wallsCheckbox.addEventListener('change', function(e) {
    goThoughWalls = e.target.checked;
});

init();

