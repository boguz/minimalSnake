// CONSTANTS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridSize = 10;                                // grid size in px
const frameRate = 10;                               // frame rate in frames per second
const cols = canvas.width / gridSize;               // number of columns
const rows = canvas.height / gridSize;              // number of rows
const scoreAmount = document.getElementById('scoreAmount');  // text element with score amount 

// VARIABLES
let lastTime = Date.now();
let snakeDir = "right";                             // right, left, up, down
let snake = new Snake(0,0);                         // create snake at 0, 0
let food = new Food();
let score = 0;                                      // Player score. Number of eaten fruits


// Initialize game
function init() {
    loop();
    score = 0;
    scoreAmount.innerText = score;
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

// Event Listener
// Listen to click and change direction of snake
window.addEventListener('keydown', function(e) {
    if (e.key === "ArrowUp" && snakeDir !== "down") {
        snakeDir = "up";
    } else if (e.key === "ArrowDown" && snakeDir !== "up") {
        snakeDir = "down";
    } else if (e.key === "ArrowRight" && snakeDir !== "left") {
        snakeDir = "right";
    } else if (e.key === "ArrowLeft" && snakeDir !== "right") {
        snakeDir = "left";
    }
});

init();

