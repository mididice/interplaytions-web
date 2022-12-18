import 'phaser';
import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';
import { StartScene } from './scenes/start-scene';
import { EndScene } from './scenes/end-scene';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';

const config: Phaser.Types.Core.GameConfig = {
  title: 'Interplaytions',
  url: 'https://github.com/mididice/interplaytions-web',
  version: '1.0',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
    zoom: 1,
  },
  type: Phaser.AUTO,
  parent: 'game',
  scene: [StartScene, BootScene, GameScene, EndScene],
  backgroundColor: '#24232e',
  render: { pixelArt: true, antialias: false },
  plugins: {
    global: [{
      key: 'WebFontLoader',
      plugin: WebFontLoaderPlugin,
      start: true
    }]
  }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  var game = new Game(config);
});
