import { Result } from '../objects/result';
import { CONST } from '../const/const';
import { Block } from '../objects/block';
import { Api } from '../objects/api';
import * as Tone from 'tone'
import { Midi } from '@tonejs/midi'


export class EndScene extends Phaser.Scene {
  private currentLevelArray: Block[] = [];

  private currentLevelWidth: number;
  private currentLevelHeight: number;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private actionKey: Phaser.Input.Keyboard.Key;
  private gotTilesTxt: Phaser.GameObjects.Text;
  private homeOnButton: Phaser.GameObjects.Image;
  private homeOffButton: Phaser.GameObjects.Image;
  private restartOnButton: Phaser.GameObjects.Image;
  private restartOffButton: Phaser.GameObjects.Image;
  private prevY: number;
  private map: string;
  private score: number;
  private selected: Array<number>;
  private synths: any = [];
  private api: Api;

  constructor() {
    super({
      key: 'EndScene'
    });
  }

  init(data: Result): void {
    this.map = data.map;
    this.score = data.score;
    this.selected = data.selected; 
  }

  preload(): void {
    this.load.image('background', './assets/images/scene/landing-page-grid.png');
    this.load.image('badge-1', './assets/images/scene/badge-1.png');
    this.load.image('badge-2', './assets/images/scene/badge-2.png');
    this.load.image('score-bg', './assets/images/scene/score-bg.png');
    this.load.image('home-on', './assets/images/scene/home-on.png');
    this.load.image('home-off', './assets/images/scene/home-off.png');
    this.load.image('restart-on', './assets/images/scene/restart-on.png');
    this.load.image('restart-off', './assets/images/scene/restart-off.png');
    this.load.image('footer', './assets/images/scene/footer.png');

    this.load.image('cube1', '/assets/images/cube/01.png');
    this.load.image('cube2', '/assets/images/cube/02.png');
    this.load.image('cube3', '/assets/images/cube/03.png');
    this.load.image('cube4', '/assets/images/cube/04.png');
    this.load.image('cube5', '/assets/images/cube/05.png');
    this.load.image('cube6', '/assets/images/cube/06.png');
    this.load.image('cube7', '/assets/images/cube/07.png');
    this.load.image('cube8', '/assets/images/cube/08.png');
    this.load.image('cube9', '/assets/images/cube/09.png');
    this.load.image('cube10', '/assets/images/cube/10.png');
    this.load.image('cube11', '/assets/images/cube/11.png');
    this.load.image('cube12', '/assets/images/cube/12.png');

    this.load.pack('preload', './assets/pack.json', 'preload');
  }

  create(): void {
    this.prevY = 1;
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.add.image(67, 35, 'badge-1').setOrigin(0).setScrollFactor(0);
    this.add.image(67, 100, 'badge-2').setOrigin(0).setScrollFactor(0);
    this.add.image(67, 300, 'score-bg').setOrigin(0).setScrollFactor(0);
    this.createScore(84, 425, this.score);
    this.homeOnButton = this.createButton(83, 600, 'home-on', true);
    this.homeOffButton = this.createButton(83, 600, 'home-off', false);
    this.restartOnButton = this.createButton(83, 700, 'restart-on', false);
    this.restartOffButton = this.createButton(83, 700, 'restart-off', true);
    this.add.image(0, 980, 'footer').setOrigin(0).setScrollFactor(0);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.actionKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.createYouHaveGot();
    this.api = new Api();

    let tempLevel = CONST.levels[+this.map];
    this.currentLevelArray = [];
    this.currentLevelWidth = tempLevel.width;
    this.currentLevelHeight = tempLevel.height;

    for (let y = 0; y < this.currentLevelHeight; y++) {
      for (let x = 0; x < this.currentLevelWidth; x++) {
        let blockType = tempLevel.data[y][x];
        this.currentLevelArray.push(
            new Block({
              scene: this,
              x: (x * CONST.tileSize) + 712,
              y: (y * CONST.tileSize) + 244,
              texture: 'block',
              type: blockType
            })
        )
      }
    }
    this.combineMidi(this.selected);
  }

  update(): void {
    this.handleInput();
  }

  private createScore(x: number, y: number, score: number) : void {
    var text = this.add.text(x + 150, y + 10, ""+score, { font: '120px BauhausStd', color: '#000' }).setShadow(1, 1).setScrollFactor(0);
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
        this.disposeSynths();
        this.scene.start('StartScene');
      } else if (this.prevY === -1) {
        this.disposeSynths();
        this.scene.start('BootScene');
      }
    }
  }

  private turnOnOff(onOff: boolean): void {
    this.homeOnButton.setVisible(onOff);
    this.homeOffButton.setVisible(!onOff);
    this.restartOnButton.setVisible(!onOff);
    this.restartOffButton.setVisible(onOff);
  }

  private createYouHaveGot(): void {
    const selecetedTiles = this.selected;
    const tileLength = selecetedTiles.length;
    this.gotTilesTxt = this.add.text(45, 1000, 'YOU HAVE GOT\n'+tileLength+' TILES', {color: '#121212', fontSize: '22px', fontFamily: 'BauhausStd'});
    for (let i = 0; i< tileLength; i++) {
      this.add.image(350+(i*139), 985, "cube"+selecetedTiles[i]).setOrigin(0).setScrollFactor(0);
    }
  }

  /**
   * 서버를 호출하여 지금까지 생성된 미디 파일의 합을 받아 연주합니다.
   * 미디파일 위치를 리턴받습니다.
   */
  private combineMidi(selected: Array<number>): void {
    if (selected.length == 5) {
      this.api.combine()
      .then((res) => res.json())
      .then(result => {
        this.playMidi(result);
      });
    }
  }

  /**
   * 미디파일을 연주합니다.
   * 미디파일의 위치를 입력받습니다.
   */
  private async playMidi(url : string): Promise<void> {
    this.disposeSynths();
    const now = Tone.now() + 0.5
    await Midi.fromUrl(url)
    .then(midi => {
      midi.tracks.forEach(track => {
        const synth = new Tone.FMSynth().toDestination();
        synth.set({envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }});
        track.notes.forEach(note => {
          synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
        });
        this.synths.push(synth);
      })
    })
  }

  /**
   * 모든 음악을 종료합니다.
   */
  private disposeSynths(): void {
    while(this.synths.length) {
      const synth = this.synths.shift();
			synth.dispose();
    }
  }
}
