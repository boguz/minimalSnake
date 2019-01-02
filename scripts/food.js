class Food {
    constructor() {
        this.randomPosition();
    }

    randomPosition() {
        this.posX = Math.floor(cols * Math.random()) * gridSize;
        this.posY = Math.floor(rows * Math.random()) * gridSize;
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.posX, this.posY, gridSize, gridSize);
    }
}