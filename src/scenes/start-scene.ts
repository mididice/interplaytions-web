export class StartScene extends Phaser.Scene {
  private currentLevelWidth: number;
  private currentLevelHeight: number;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private actionKey: Phaser.Input.Keyboard.Key;
  private activatedBlockId: number;

  private layer: Phaser.GameObjects.Container;
  private background: Phaser.GameObjects.Image;
  private startOnButton: Phaser.GameObjects.Image;
  private startOffButton: Phaser.GameObjects.Image;
  private howtoplayOnButton: Phaser.GameObjects.Image;
  private howtoplayOffButton: Phaser.GameObjects.Image;

  private howtoplayPopup1: Phaser.GameObjects.Image;
  private howtoplayPopup2: Phaser.GameObjects.Image;
  private howtoplayPopup3: Phaser.GameObjects.Image;

  private bgm: Phaser.Sound.BaseSound;
  private prevY: number;
  private howtoplayStep: number;

  constructor() {
    super({
      key: 'StartScene'
    });
  }

  preload(): void {
    this.load.image('background', './assets/images/scene/landing-page-grid.png');
    this.load.image('badge-1', './assets/images/scene/badge-1.png');
    this.load.image('badge-2', './assets/images/scene/badge-2.png');
    this.load.image('badge-3', './assets/images/scene/badge-3.png');
    this.load.image('howtoplay-off', './assets/images/scene/howtoplay-off.png');
    this.load.image('howtoplay-on', './assets/images/scene/howtoplay-on.png');
    this.load.image('start-off', './assets/images/scene/start-off.png');
    this.load.image('start-on', './assets/images/scene/start-on.png');
    this.load.image('title-rectangle', './assets/images/scene/title-rectangle.png');
    this.load.audio('interplaytions_bgm', './assets/sound/interplaytions_bgm.wav');
    this.load.image('howtoplay-popup1', './assets/images/scene/how-to-play-popup-1.png');
    this.load.image('howtoplay-popup2', './assets/images/scene/how-to-play-popup-2.png');
    this.load.image('howtoplay-popup3', './assets/images/scene/how-to-play-popup-3.png');

  }

  create(): void {
    this.prevY = 1;
    this.howtoplayStep = 0;
    this.bgm = this.sound.add('interplaytions_bgm', {"loop": true});
    this.bgm.play();
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.add.image(67, 35, 'badge-1').setOrigin(0).setScrollFactor(0);
    this.add.image(67, 100, 'badge-2').setOrigin(0).setScrollFactor(0);
    this.add.image(67, 300, 'title-rectangle').setOrigin(0).setScrollFactor(0);
    this.startOnButton = this.createButton(83, 600, 'start-on', true);
    this.startOffButton = this.createButton(83, 600, 'start-off', false);
    this.howtoplayOnButton = this.createButton(83, 700, 'howtoplay-on', false);
    this.howtoplayOffButton = this.createButton(83, 700, 'howtoplay-off', true);
    this.add.image(67, 900, 'badge-3').setOrigin(0).setScrollFactor(0);
    this.howtoplayPopup1 = this.createButton(767, 100, 'howtoplay-popup1', false);
    this.howtoplayPopup2 = this.createButton(767, 100, 'howtoplay-popup2', false);
    this.howtoplayPopup3 = this.createButton(767, 100, 'howtoplay-popup3', false);
    
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
        this.bgm.stop();
      } else if (this.prevY === -1) {
        this.howtoplayStep += 1;
        
        this.howtoplayPopup1.setVisible(false);
        this.howtoplayPopup2.setVisible(false);
        this.howtoplayPopup3.setVisible(false);
        if (this.howtoplayStep === 1) {
          this.howtoplayPopup1.setVisible(true);
        } else if (this.howtoplayStep === 2) {
          this.howtoplayPopup2.setVisible(true);
        } else if (this.howtoplayStep === 3) {
          this.howtoplayPopup3.setVisible(true);
          this.howtoplayStep = -1;
        } 
      }
    }
  }

  private turnOnOff(onOff: boolean): void {
    this.startOnButton.setVisible(onOff);
    this.startOffButton.setVisible(!onOff);
    this.howtoplayOnButton.setVisible(!onOff);
    this.howtoplayOffButton.setVisible(onOff);
  }
}
