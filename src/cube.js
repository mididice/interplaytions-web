export default class Cube {
  constructor(game, position) {

    this.game = game;

    this.position = position;
    this.width = 50;
    this.height = 50;

    this.markedForDeletion = false;
  }

  update() {
  }

  draw(ctx) {
    ctx.rect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.stroke();
  }
}
