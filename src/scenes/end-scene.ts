
export class EndScene extends Phaser.Scene {
  private currentLevelWidth: number;
  private currentLevelHeight: number;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private actionKey: Phaser.Input.Keyboard.Key;
  private activatedBlockId: number;

  private background: Phaser.GameObjects.Image;
  private homeOnButton: Phaser.GameObjects.Image;
  private homeOffButton: Phaser.GameObjects.Image;
  private restartOnButton: Phaser.GameObjects.Image;
  private restartOffButton: Phaser.GameObjects.Image;
  private prevY: number;

  constructor() {
    super({
      key: 'EndScene'
    });
  }

  preload(): void {
    this.load.image('background', './assets/images/scene/landing-page-grid.png');
    this.load.image('badge-1', './assets/images/scene/badge-1.png');
    this.load.image('badge-2', './assets/images/scene/badge-2.png');
    this.load.image('score-bg', './assets/images/scene/score-bg.png');
    this.load.image('restart-off', './assets/images/scene/restart-off.png');
    this.load.image('restart-on', './assets/images/scene/restart-on.png');
    this.load.image('home-off', './assets/images/scene/home-off.png');
    this.load.image('home-on', './assets/images/scene/home-on.png');
  }

  create(): void {
    this.prevY = 1;
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.add.image(67, 35, 'badge-1').setOrigin(0).setScrollFactor(0);
    this.add.image(67, 100, 'badge-2').setOrigin(0).setScrollFactor(0);
    this.add.image(67, 300, 'score-bg').setOrigin(0).setScrollFactor(0);
    this.createScore(200, 400, 1234);
    this.homeOnButton = this.createButton(83, 600, 'home-on', true);
    this.homeOffButton = this.createButton(83, 600, 'home-off', false);
    this.restartOnButton = this.createButton(83, 700, 'restart-on', false);
    this.restartOffButton = this.createButton(83, 700, 'restart-off', true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.actionKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update(): void {
    this.handleInput();
  }

  private createScore(x: number, y: number, score: number) : void {
    var text = this.add.text(x + 120, y + 6, ""+score, { font: '120px BauhausStd', color: '#000' }).setShadow(1, 1).setScrollFactor(0);
  }

  private createButton(x: number, y: number, label: string, visible: boolean): Phaser.GameObjects.Image {
    return this.add.image(x, y, label).setOrigin(0).setScrollFactor(0).setVisible(visible);
  }

  private handleInput(): void { 
    let dy = 0;
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      dy -= 2;
    } else if (Phaser.Input.Keyboard.JustUp(this.cursors.up)) {
      dy += 2;
    }
    if (dy !== 0) {
      this.prevY = this.prevY + dy;
    }
    if (this.prevY < 0) {
      this.prevY = -1;
      this.turnOnOff(false);
    } else {
      this.prevY = 1;
      this.turnOnOff(true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
      if (this.prevY === 1) {
        this.scene.start('BootScene');
      } else if (this.prevY === -1) {
        this.scene.start('StartScene');
      }
    }
  }

  private turnOnOff(onOff: boolean): void {
    this.homeOnButton.setVisible(onOff);
    this.homeOffButton.setVisible(!onOff);
    this.restartOnButton.setVisible(!onOff);
    this.restartOffButton.setVisible(onOff);
  }
}
