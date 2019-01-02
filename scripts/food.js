class Food {
    constructor() {
        this.randomPosition();
        this.colors = ['rgba(214, 69, 65, 1)',
                       'rgba(241, 169, 160, 1)',
                       'rgba(245, 230, 83, 1)',
                       'rgba(245, 215, 110, 1)',
                       'rgba(248, 148, 6, 1)',
                       'rgba(242, 120, 75, 1)',
                       'rgba(197, 239, 247, 1)',
                       'rgba(34, 167, 240, 1)',
                       'rgba(255, 148, 120, 1)',
                       'rgba(246, 36, 89, 1)',
                       'rgba(140, 20, 252, 1)',
                       'rgba(150, 54, 148,1)',
                       'rgba(255, 203, 5, 1)'];
        this.color = this.chooseColor();
    }

    // choose random color from the colors array
    chooseColor() {
        let randomIndex = Math.floor(Math.random() * this.colors.length);
        return this.colors[randomIndex];
    }

    // draw the food on the canvas
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, gridSize, gridSize );     
    }

    // create random position for the food location
    randomPosition() {
        this.posX = Math.floor(cols * Math.random()) * gridSize;
        this.posY = Math.floor(rows * Math.random()) * gridSize;

        // prevent food from being created "on top" of snake
        for (let i = snake.tail.length; i > 0; i--) {
            if (this.posX == snake.tail[i - 1].x && this.posY == snake.tail[i - 1].y) {
                this.randomPosition();
            }
        }   
    }
}