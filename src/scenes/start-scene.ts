
export class StartScene extends Phaser.Scene {
  private currentLevelWidth: number;
  private currentLevelHeight: number;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private actionKey: Phaser.Input.Keyboard.Key;
  private activatedBlockId: number;

  private background: Phaser.GameObjects.Image;
  private startOnButton: Phaser.GameObjects.Image;
  private startOffButton: Phaser.GameObjects.Image;
  private howtoplayOnButton: Phaser.GameObjects.Image;
  private howtoplayOffButton: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: 'StartScene'
    });
  }

  preload(): void {
    this.load.image('background', './assets/images/scene/landing-page-grid.png');
    this.load.image('badge-3', './assets/images/scene/badge-3.png');
    this.load.image('howtoplay-off', './assets/images/scene/howtoplay-off.png');
    this.load.image('howtoplay-on', './assets/images/scene/howtoplay-on.png');
    this.load.image('start-off', './assets/images/scene/start-off.png');
    this.load.image('start-on', './assets/images/scene/start-on.png');
    this.load.image('title-rectangle', './assets/images/scene/title-rectangle.png');
  }

  create(): void {
    this.background = this.add.image(0, 0, 'background');
    let titleRectangle = this.add.image(10, 100, 'title-rectangle').setOrigin(0).setScrollFactor(0);
    this.startOnButton = this.createButton(10, 400, 'start-on', true);
    this.startOffButton = this.createButton(10, 400, 'start-off', false);
    this.howtoplayOnButton = this.createButton(10, 500, 'howtoplay-on', false);
    this.howtoplayOffButton = this.createButton(10, 500, 'howtoplay-off', true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.actionKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update(): void {
    this.handleInput();
  }

  private createButton(x: number, y: number, label: string, visible: boolean): Phaser.GameObjects.Image {
    return this.add.image(x, y, label).setOrigin(0).setScrollFactor(0).setVisible(visible)
  }

  private handleInput(): void { 
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.turnOnOff(true);
    } else if (Phaser.Input.Keyboard.JustUp(this.cursors.down)) {
      this.turnOnOff(false);
    }

    if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
      this.scene.start('BootScene');
    }
  }

  private turnOnOff(onOff: boolean): void {
    this.startOnButton.setVisible(onOff);
    this.startOffButton.setVisible(!onOff);
    this.howtoplayOnButton.setVisible(!onOff);
    this.howtoplayOffButton.setVisible(onOff);
  }
}
