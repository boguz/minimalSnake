class Snake {
    constructor(posX, posY) {
        this.pos = {x: posX, y: posY}
        this.velX = 0;
        this.velY = 0;
        this.tail = [this.pos];
    }

    // Detect collisions
    detectCollision() {
        // detect colision with food
        if (this.tail[0].x === food.posX && this.tail[0].y === food.posY) {
            eatFood();
        }

        // detect collision with tail
        if (this.tail.length > 1) {
            for (let i = this.tail.length - 1; i > 1; i--) {
                if (this.tail[0].x === this.tail[i].x && this.tail[0].y === this.tail[i].y) {
                    gameover();
                }
            }
        }
    }

    // Draw snake on canvas
    draw() {
        for (let i = this.tail.length - 1; i >= 0; i--) {
            (i > 0) ? ctx.fillStyle = "rgba(142, 244, 193, .5)" : ctx.fillStyle = "rgba(102, 204, 153, .75)";
            ctx.fillRect(this.tail[i].x, this.tail[i].y, gridSize, gridSize);
        }
    }

    // Update the snake parameters
    update() {
        this.updateDirection();
        this.updatePosition();
        this.updateTail();
    }

    // UPdate snake's direction
    updateDirection() {
        if (snakeDir === "right") {
            this.velX = 1;
            this.velY = 0;
        } else if (snakeDir === "left") {
            this.velX = -1;
            this.velY = 0;
        } else if (snakeDir === "up") {
            this.velX = 0;
            this.velY = -1;
        } else if (snakeDir === "down") {
            this.velX = 0;
            this.velY = 1;
        }
    }

    // Update Snake's position
    updatePosition() {
        this.pos.x += this.velX * gridSize;
        this.pos.y += this.velY * gridSize;

        if (goThoughWalls) {
            if (this.pos.x >= canvas.width) {
                this.pos.x = 0;
            } else if (this.pos.x < 0) {
                this.pos.x = canvas.width;
            } else if (this.pos.y >= canvas.height) {
                this.pos.y = 0;
            } else if (this.pos.y < 0) {
                this.pos.y = canvas.height;
            }
        } else {
            if (this.pos.x >= canvas.width ||
                this.pos.x < 0 ||
                this.pos.y >= canvas.height ||
                this.pos.y < 0) {
                    gameover();
                }
        }
    }

    // Update Snake's Tail
    updateTail() {
        this.tail.push({x: this.pos.x, y: this.pos.x});

        if (this.tail.length > 1) {
            for (let i = this.tail.length - 1; i >= 0; i--) {
                if (i > 0) {
                    this.tail[i].x = this.tail[i-1].x;
                    this.tail[i].y = this.tail[i-1].y;
                }
            }
        }
        
        this.tail = this.tail.slice(0, score + 2);
    }
    
}