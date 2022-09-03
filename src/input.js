export default class InputHandler {
    constructor(selector, game) {
      document.addEventListener('keydown', event => {
        switch (event.key) {
          case 'ArrowLeft':
            selector.moveLeft();
            break;
          case 'ArrowUp':
            selector.moveUp();
            break;
          case 'ArrowRight':
            selector.moveRight();
            break;
          case 'ArrowDown':
            selector.moveDown();
            break;
          case 'Escape':
            game.togglePause();
            break;
          case 'Enter':
            game.start();
            break;
        }
      });
  
      document.addEventListener('keyup', event => {
        switch (event.key) {
          case 'ArrowLeft':
            if (selector.speed < 0) selector.stop();
            break;
          case 'ArrowRight':
            if (selector.speed > 0) selector.stop();
            break;
          case 'ArrowUp':
            if (selector.speed < 0) selector.stop();
            break;
          case 'ArrowDown':
            if (selector.speed > 0) selector.stop();
            break;
        }
      });
    }
  }
  