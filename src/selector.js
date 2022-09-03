export default class Selector {
    constructor(game) {
      this.gameWidth = game.gameWidth;
      this.gameHeight = game.gameHeight;
  
      this.width = 60;
      this.height = 60;
  
      this.distance = 50;
      this.vertical = 0;
      this.horizontal = 0;
  
      this.position = {
        x: 295,
        y: 295,
      };
    }
  
    moveLeft() {
      this.horizontal = -this.distance;
    }
  
    moveRight() {
      this.horizontal = this.distance;
    }

    moveUp() {
        this.vertical = -this.distance; 
    }

    moveDown() {
        this.vertical = this.distance;
    }
  
    stop() {
      this.vertical = 0;
      this.horizontal = 0;
    }
  
    draw(ctx) {
      ctx.strokeStyle = "#c84b31";
      ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
  
    update(deltaTime) {
      this.position.x += this.horizontal;
      this.position.y += this.vertical;
      this.horizontal = 0;
      this.vertical = 0;
  
      if (this.position.x < 0) this.position.x = 0;
      if (this.position.y < 0) this.position.y = 0;
    
  
      if (this.position.x + this.width > this.gameWidth) {
        this.position.x = this.gameWidth - this.width;
      } 
      if (this.position.y + this.height > this.gameHeight) {
        this.position.y = this.gameHeight - this.height;
      }
    }
  }
  