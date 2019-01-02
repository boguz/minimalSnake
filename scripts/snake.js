class Snake {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.velX = 0;
        this.velY = 0;
        this.tail = [];
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

        this.posX += this.velX * gridSize;
        this.posY += this.velY * gridSize;

        if (this.posX >= canvas.width) {
            this.posX = 0;
        } else if (this.posX < 0) {
            this.posX = canvas.width;
        } else if (this.posY >= canvas.height) {
            this.posY = 0;
        } else if (this.posY < 0) {
            this.posY = canvas.height;
        }
        
        
        
        
    }

    draw() {
        //console.log(this.tail);
        ctx.fillStyle = "tomato";
        ctx.fillRect(this.posX, this.posY, gridSize, gridSize);
    }

    detectCollision() {
        if(this.posX === food.posX && this.posY === food.posY) {
            eatFood();
        }
    }
}