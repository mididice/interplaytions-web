import { CONST } from '../const/const';
import { Block } from '../objects/block';
import { Cursor } from '../objects/cursor';
import { Api } from '../objects/Api';
import { Midi } from '@tonejs/midi'
import * as Tone from 'tone'


export class GameScene extends Phaser.Scene {
  private currentLevelArray: Block[] = [];
  private currentLevelWidth: number;
  private currentLevelHeight: number;
  private cursor: Cursor;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private actionKey: Phaser.Input.Keyboard.Key;
  private activatedBlockId: number;
  private timeTxt: Phaser.GameObjects.Text;
  private timeEvent: Phaser.Time.TimerEvent;
  private api: Api;
  private activatedAnimation: Phaser.GameObjects.Sprite;
  
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload(): void {
    this.load.image('title', './assets/images/scene/title.png');                
    this.load.spritesheet("animation1", "./assets/images/ani/01_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation2", "./assets/images/ani/02_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation3", "./assets/images/ani/03_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation4", "./assets/images/ani/04_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation5", "./assets/images/ani/05_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation6", "./assets/images/ani/06_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation7", "./assets/images/ani/07_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation8", "./assets/images/ani/08_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation9", "./assets/images/ani/09_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation10", "./assets/images/ani/10_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation11", "./assets/images/ani/11_animation.png", { frameWidth: 92, frameHeight: 92 });
    this.load.spritesheet("animation12", "./assets/images/ani/12_animation.png", { frameWidth: 92, frameHeight: 92 });
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
    this.cameras.main.setBackgroundColor('#121212');

    this.add.image(45, 45, 'title').setOrigin(0).setScrollFactor(0);
    this.add.text(1071,45, 'TURN', {color: '#fe5a45', fontSize: '22px', fontFamily: 'BauhausStd'}).
        // setFontStyle('BauhausStd-Bold').
        setOrigin(0);
    this.add.text(1171, 45, 'TIME LEFT', {color: '#fe5a45', fontSize: '22px', fontFamily: 'BauhausStd'}).
        setOrigin(0);
    this.add.text(1371, 45, 'YOUR SCORE', {color: '#fe5a45', fontSize: '22px', fontFamily: 'Bauhaus'}).
        setOrigin(0);

    this.timeTxt = this.add.text(1171, 77, '', {color: '#fe5a45', fontSize: '22px', fontFamily: 'Bauhaus'}).
        setOrigin(0);
    this.timeEvent = this.time.addEvent({delay: 100000000 ,callbackScope: this, loop: true})

    this.api = new Api();

    let tempLevel = CONST.levels[CONST.currentLevel];

    this.currentLevelWidth = tempLevel.width;
    this.currentLevelHeight = tempLevel.height;

    for (let y = 0; y < this.currentLevelHeight; y++) {
      for (let x = 0; x < this.currentLevelWidth; x++) {
        let blockType = tempLevel.data[y][x];
        this.currentLevelArray.push(
            new Block({
              scene: this,
              x: (x * CONST.tileSize) + 365,
              y: (y * CONST.tileSize) + 229,
              texture: 'block',
              type: blockType
            })
        )
      }
    }
  }

  update(): void {
    let minutes = this.timeEvent.getProgress().toString().substring(2, 4);
    let second = this.timeEvent.getProgress().toString().substring(5, 7);
    this.timeTxt.setText(minutes+":"+second);
  }

  /**
   * 애니메이션 실행
   * @param isTile 타일 or 경로 애니메이션인지 선택
   * @param index 타일인덱스
   * @param x 좌표값 x
   * @param y 좌표값 y
   */
  private playAnimation(isTile: boolean, index: number, x: number, y: number): Phaser.GameObjects.Sprite {
    let animationTarget = "animation";
    if (!isTile) {
      animationTarget = "animationb";
    }
    this.anims.create({
      key: "rolling"+index,
      frameRate: 59,
      frames: this.anims.generateFrameNumbers(animationTarget+index, { start: 0, end: 58 }),
      repeat: -1
    });
    let tile: Phaser.GameObjects.Sprite;
    tile = this.add.sprite(x, y, "rolling"+index);
    tile.play("rolling"+index);
    return tile;
  }

  /**
   * 애니메이션 종료
   */
  private stopAnimation(tile: Phaser.GameObjects.Sprite): void {
    tile.stop();
  }

  private handleInput(): void {
    let oldX = this.cursor.getX();
    let oldY = this.cursor.getY();
    let dx = 0;
    let dy = 0;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      dx = 1;
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      dx = -1;
    }

    if (!this.cursor.isActivated()) {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        dy = -1;
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        dy = 1;
      }
    }

    if (dx !== 0 || dy !== 0) {
      let newX = oldX + dx;
      let newY = oldY + dy;

      if (this.getBlockType(newX, newY) !== 1) {
        this.cursor.moveTo(newX, newY);

        if (this.cursor.isActivated()) {
          this.swapTwoBlocks(
            this.getBlockIndex(oldX, oldY),
            this.getBlockIndex(newX, newY)
          );

          this.cursor.setActivated();
        }
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
      if (this.getBlockType(this.cursor.getX(), this.cursor.getY()) !== 0) {
        this.cursor.setActivated();
      }
    }
  }

  getBlock(x: number, y: number): Block {
    return this.currentLevelArray[y * this.currentLevelWidth + x];
  }

  getBlockIndex(x: number, y: number): number {
    return y * this.currentLevelWidth + x;
  }

  getBlockType(x: number, y: number): number {
    return this.currentLevelArray[y * this.currentLevelWidth + x].getType();
  }

  getBlockTypeById(id: number): number {
    return this.currentLevelArray[id].getType();
  }

  swapTwoBlocks(blockId0: number, blockId1: number): void {
    let type0 = this.getBlockTypeById(blockId0);
    let type1 = this.getBlockTypeById(blockId1);
    this.currentLevelArray[blockId0].setType(type1);
    this.currentLevelArray[blockId1].setType(type0);
  }

  public checkMatches(): void {
    let matches: number[] = [];

    for (let y = 1; y < this.currentLevelHeight - 1; y++) {
      for (let x = 1; x < this.currentLevelWidth - 1; x++) {
        if (this.getBlockType(x, y) > 1) {
          if (this.isSameTypeAroundMe(x, y)) {
            matches.push(this.getBlockIndex(x, y));
          }
        }
      }
    }

    for (let i = 0; i < matches.length; i++) {
      this.currentLevelArray[matches[i]].activateDead();
    }
  }

  public isSameTypeAroundMe(x: number, y: number): boolean {
    let me = this.getBlockType(x, y);

    let leftOfMe = this.getBlockType(x - 1, y);
    let rightOfMe = this.getBlockType(x + 1, y);
    let topOfMe = this.getBlockType(x, y - 1);
    let bottomOfMe = this.getBlockType(x, y + 1);
    if (
      me === leftOfMe ||
      me === rightOfMe ||
      me === topOfMe ||
      me === bottomOfMe
    ) {
      return true;
    }

    return false;
  }

  /**
   * 선택하면 서버를 호출하여 미디 파일을 받아 연주합니다.
   * @param sequence : 순서
   * @param index : 선택한 미디 인덱스
   */
  private chooseMidi(sequence: number, index: number): void {
    this.api.connect(sequence, index)
    .then((res) => res.json())
    .then(result => {
      this.playMidi(result);
    });
  }

  
  /**
   * 서버에 호출하여 지금까지 생성한 미디파일을 합쳐서 연주합니다.
   */
   private theEnd(): void {
    this.api.combine()
    .then((res) => res.json())
    .then(result => {
      this.playMidi(result);
    });
  }


  private async playMidi(url : string): Promise<void> {
    const midi = await Midi.fromUrl(url)
    const now = Tone.now() + 0.5
		midi.tracks.forEach(track => {
      const synth = new Tone.PluckSynth().toDestination();
			track.notes.forEach(note => {
			  synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
			})
		})
  }
}
