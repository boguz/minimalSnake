class Snake {
    constructor(posX, posY) {
        this.pos = {x: posX, y: posY}
        this.velX = 0;
        this.velY = 0;
        this.tail = [this.pos];
    }

    update() {
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

        this.pos.x += this.velX * gridSize;
        this.pos.y += this.velY * gridSize;

        if (this.pos.x >= canvas.width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = canvas.width;
        } else if (this.pos.y >= canvas.height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = canvas.height;
        }

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

    draw() {
        for (let i = this.tail.length - 1; i >= 0; i--) {
            (i > 0) ? ctx.fillStyle = "rgba(142, 244, 193, .5)" : ctx.fillStyle = "rgba(102, 204, 153, .75)";
            ctx.fillRect(this.tail[i].x, this.tail[i].y, gridSize, gridSize);
        }
    }

    detectCollision() {
        if(this.tail[0].x === food.posX && this.tail[0].y === food.posY) {
            eatFood();
        }
    }
}