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
    this.load.image('badge-1', './assets/images/scene/badge_01.png');
    this.load.image('badge-2', './assets/images/scene/badge_02.png');
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
    this.load.spritesheet("animationb1", "./assets/images/ani/01_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb2", "./assets/images/ani/02_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb3", "./assets/images/ani/03_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb4", "./assets/images/ani/04_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb5", "./assets/images/ani/05_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb6", "./assets/images/ani/06_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb7", "./assets/images/ani/07_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb8", "./assets/images/ani/08_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb9", "./assets/images/ani/09_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb10", "./assets/images/ani/10_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb11", "./assets/images/ani/11_b_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animationb12", "./assets/images/ani/12_b_animation.png", { frameWidth: 92, frameHeight: 92 });
  }

  create(): void {
    this.prevY = 1;
    this.howtoplayStep = 0;
    this.bgm = this.sound.add('interplaytions_bgm');
    this.bgm.resume()
    this.bgm.play({"loop": true});
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.playAnimation(1, 512, 145);
    this.playAnimation(1, 1512, 345);
    this.playAnimation(1, 912, 645);
    this.playAnimation(1, 1512, 645);
    this.playAnimation(1, 812, 945);
    this.playAnimation(1, 1712, 1045);
    this.playAnimation(10, 1012, 245);
    this.playAnimation(10, 1312, 845);
    this.playAnimation(4, 712, 445);
    this.playAnimation(4, 1712, 545);
    this.playAnimation(4, 1812, 45);
    this.playAnimation(5, 1712, 145);
    this.playAnimation(9, 1912, 945);
    this.playAnimation(9, 1212, 1045);

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
        this.bgm.resetConfig();
        this.bgm.destroy();
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

  private playAnimation(index: number, x: number, y: number): void {
    const animationTarget = "animationb";
    const key = animationTarget+index;
    this.anims.create({
      key: key,
      frameRate: 59,
      frames: this.anims.generateFrameNumbers(animationTarget+index, { start: 0, end: 58 }),
      repeat: -1
    });
    let tile: Phaser.GameObjects.Sprite;
    tile = this.add.sprite(x, y, animationTarget+index);
    tile.play(animationTarget+index);
  }
}
