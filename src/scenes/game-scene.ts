import { CONST } from '../const/const';
import { Block } from '../objects/block';
import { Cursor } from '../objects/cursor';
import { Api } from '../objects/api';
import { Stack } from '../objects/stack';
import * as Tone from 'tone'
import { Midi } from '@tonejs/midi'


export class GameScene extends Phaser.Scene {
  private currentLevelArray: Block[] = [];
  private currentLevelWidth: number;
  private currentLevelHeight: number;
  private cursor: Cursor;
  private point: number = 0;
  private turn: number = 0;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private actionKey: Phaser.Input.Keyboard.Key;
  private timeTxt: Phaser.GameObjects.Text;
  private pointTxt: Phaser.GameObjects.Text;
  private turnTxt: Phaser.GameObjects.Text;
  private gotTilesTxt: Phaser.GameObjects.Text;
  private timeLeft: number;
  private timeEvent: Phaser.Time.TimerEvent;
  private api: Api;
  private tileSound: Phaser.Sound.BaseSound;
  private stack: Stack<Phaser.GameObjects.Sprite>;
  private selected: Array<number> = [];
  private isFinished: Boolean;
  private synths: any = [];
  private lastElapsedTime: number;
  constructor() {
    super({
      key: 'GameScene'
    });
  }

  preload(): void {
    this.load.image('title', './assets/images/scene/title.png');                
    this.load.image('footer', './assets/images/scene/footer.png');
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
    this.load.image('gameover1', './assets/images/scene/gameover-popup-connected.png');                
    this.load.image('gameover2', './assets/images/scene/gameover-popup-non-left.png');                
    this.load.image('gameover3', './assets/images/scene/gameover-popup-timeup.png');
    this.load.audio('wavFiles_1', './assets/sound/wavFiles_1.wav');
    this.load.audio('wavFiles_2', './assets/sound/wavFiles_2.wav');
    this.load.audio('wavFiles_3', './assets/sound/wavFiles_3.wav');
    this.load.audio('wavFiles_4', './assets/sound/wavFiles_4.wav');
    this.load.audio('wavFiles_5', './assets/sound/wavFiles_5.wav');
    this.load.audio('wavFiles_6', './assets/sound/wavFiles_6.wav');
    this.load.audio('wavFiles_7', './assets/sound/wavFiles_7.wav');
    this.load.audio('wavFiles_8', './assets/sound/wavFiles_8.wav');
    this.load.audio('wavFiles_9', './assets/sound/wavFiles_9.wav');
    this.load.audio('wavFiles_10', './assets/sound/wavFiles_10.wav');
    this.load.audio('wavFiles_11', './assets/sound/wavFiles_11.wav');
    this.load.audio('wavFiles_12', './assets/sound/wavFiles_12.wav');

    this.timeLeft = 300;
    this.stack = new Stack<Phaser.GameObjects.Sprite>();
    this.load.image('cube1', './assets/images/cube/01.png');
    this.load.image('cube2', './assets/images/cube/02.png');
    this.load.image('cube3', './assets/images/cube/03.png');
    this.load.image('cube4', './assets/images/cube/04.png');
    this.load.image('cube5', './assets/images/cube/05.png');
    this.load.image('cube6', './assets/images/cube/06.png');
    this.load.image('cube7', './assets/images/cube/07.png');
    this.load.image('cube8', './assets/images/cube/08.png');
    this.load.image('cube9', './assets/images/cube/09.png');
    this.load.image('cube10', './assets/images/cube/10.png');
    this.load.image('cube11', './assets/images/cube/11.png');
    this.load.image('cube12', './assets/images/cube/12.png');

    this.loadFont("BauhausStd", "./assets/BauhausStd-Bold.otf");
  }


  create(): void {
    this.cameras.main.setBackgroundColor('#121212');

    this.add.image(45, 45, 'title').setOrigin(0).setScrollFactor(0);
    this.add.image(0, 980, 'footer').setOrigin(0).setScrollFactor(0);
    this.gotTilesTxt = this.add.text(45, 1000, 'YOU HAVE GOT\n0 TILES', {color: '#121212', fontSize: '22px', fontFamily: 'BauhausStd'}).
    setOrigin(0);
    this.add.text(1071,45, 'TURN', {color: '#fe5a45', fontSize: '22px', fontFamily: 'BauhausStd'}).
      setOrigin(0);
    this.add.text(1171, 45, 'TIME LEFT', {color: '#fe5a45', fontSize: '22px', fontFamily: 'BauhausStd'}).
      setOrigin(0);
    this.add.text(1371, 45, 'YOUR SCORE', {color: '#fe5a45', fontSize: '22px', fontFamily: 'BauhausStd'}).
      setOrigin(0);
    this.pointTxt = this.add.text(1371, 77, '0', {color: '#fe5a45', fontSize: '22px', fontFamily: 'BauhausStd'}).
      setOrigin(0);
    this.turnTxt = this.add.text(1071, 77, '0', {color: '#fe5a45', fontSize: '22px', fontFamily: 'BauhausStd'}).
      setOrigin(0);
    this.timeTxt = this.add.text(1171, 77, '', {color: '#fe5a45', fontSize: '22px', fontFamily: 'BauhausStd'}).
      setOrigin(0);
    this.timeEvent = this.time.addEvent({delay: 10000000, callbackScope: this, loop: true})

    this.api = new Api();
    let nowLevel = Math.floor(Math.random() * 5);
    let tempLevel = CONST.levels[nowLevel];
    this.currentLevelArray = [];
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

    this.cursors = this.input.keyboard.createCursorKeys();
    this.actionKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.cursor = new Cursor({
      scene: this,
      x: CONST.levels[CONST.currentLevel].cursorStart[0] * CONST.tileSize,
      y: CONST.levels[CONST.currentLevel].cursorStart[1] * CONST.tileSize,
      texture: 'cursor',
      cursorStartPosition: CONST.levels[CONST.currentLevel].cursorStart
    });
    this.isFinished = false;
    this.point = 0;
    this.turn = 0;
    this.selected = [];
  }

  update(): void {
    this.countTimer();  
    this.handleInput();
    this.displayPoint();
    this.displayTurn();
    this.allTilesMatchedFinish();
  }

  private displayPoint(): void {
    this.pointTxt.setText(this.point.toString());
  }

  private displayTurn(): void {
    this.turnTxt.setText(this.turn.toString());
    this.gotTilesTxt.setText("YOU HAVE GOT\n"+this.turn+" TILES");
  }

  private countTimer(): void {
    let elapsedTime = this.timeEvent.getElapsedSeconds();
    if (this.isFinished == true) {
      elapsedTime = this.lastElapsedTime;
    }
    let currentTime = this.timeLeft - Math.floor(elapsedTime);
    let minute = Math.floor(currentTime / 60);
    let second = Math.floor(currentTime - (minute * 60));
    if (currentTime <= 0) {
      minute = 0;
      second = 0;
      this.timeOverFinish();
      // TODO : 씬이동
    } 
    this.timeTxt.setText(minute.toString().padStart(2, '0')+":"+second.toString().padStart(2, '0'));
  }

  private timeOverFinish(): void {
    this.add.image(665, 429, 'gameover3').setOrigin(0).setScrollFactor(0);
    this.sound.stopAll();
    this.scene.stop("game-scene");
    this.isFinished = true;
    this.lastElapsedTime = this.timeEvent.getElapsedSeconds();
    this.moveNextSceneByTime();
  }

  private allTilesMatchedFinish(): void {
    let totalTileCnt = 5;
    if (this.turn === totalTileCnt) {
      //this.theEnd();
      this.add.image(665, 429, 'gameover1').setOrigin(0).setScrollFactor(0);
      this.scene.stop("game-scene");
      this.turn = 0;
      this.isFinished = true;
      this.lastElapsedTime = this.timeEvent.getElapsedSeconds();
      this.moveNextSceneByTime();
    }
  }

  private nowayRouteFinish(): void {
    this.add.image(655, 429, 'gameover2').setOrigin(0).setScrollFactor(0);
    this.sound.stopAll();
    this.scene.stop("game-scene");
    this.isFinished = true;
    this.lastElapsedTime = this.timeEvent.getElapsedSeconds();
    this.moveNextSceneByTime();
  }

  private moveNextScene(): void {
    this.scene.start('EndScene', {"map":0, "score": this.point, "selected": this.selected});
  }

  private moveNextSceneByTime(): void {
    const myTimeout = setTimeout(this.moveNextScene, 50000);
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
    if (isTile === false) {
      animationTarget = "animationb";
    }
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
    return tile;
  }

  /**
   * 애니메이션 정지
   */
  private stopAnimation(tile: Phaser.GameObjects.Sprite): void {
    if (tile){
      tile.stop();
    }
  }

  /**
   * 지나간 타일 애니메이션 정지 
   */
  private stopAllAnimcation(): void {
    while (this.stack.size() > 0) {
      this.stopAnimation(this.stack.pop());
    }
    this.stack.clear();
  }

  /**
   * 애니메이션 제거
   */
  private removeAnimation(tile: Phaser.GameObjects.Sprite): void {
    if (tile){
      tile.destroy();
    }
  }

  /**
   * 웨이브파일 재생
   */
  private playWave(tileIndex: number): void {
    this.disposeSynths();
    this.sound.stopAll();
    this.tileSound = this.sound.add('wavFiles_'+tileIndex, {"loop": true});
    this.tileSound.play();
  }

  /**
   * 웨이브파일 재생 종료
   */
  private stopWave(tileIndex: number): void {
    this.tileSound.stop();
  }

  private getAnimationKey(blockType: number, x: number, y: number): Phaser.GameObjects.Sprite {
    let selectedBlockType = this.cursor.getSelected();
    if (blockType === selectedBlockType) {
      return this.playAnimation(true, selectedBlockType, this.cursor.getXByParam(x), this.cursor.getYByParam(y));
    }
    return this.playAnimation(false, selectedBlockType, this.cursor.getXByParam(x), this.cursor.getYByParam(y));
  }

  private handleInput(): void {
    let oldX = this.cursor.getX();
    let oldY = this.cursor.getY();
    let dx = 0;
    let dy = 0;
    let width = CONST.levels[CONST.currentLevel].width;
    let height = CONST.levels[CONST.currentLevel].height;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      dx = 1;
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      dx = -1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      dy = -1;
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      dy = 1;
    }
    this.PressActionKey();
    
    if (this.isFinished) {
      return;
    }

    if (dx !== 0 || dy !== 0) {
      let newX = oldX + dx;
      let newY = oldY + dy;
      if (newX < 0 || newX >= width || newY < 0 || newY >= height) return;
      if (!this.cursor.isActivated()) {
        this.cursor.moveTo(newX, newY);
        return;
      }
      let nextBlockType = this.getBlockType(newX, newY);
      let selectedBlockType = this.cursor.getSelected();
      if (nextBlockType === selectedBlockType) {
        let animationKey = this.getAnimationKey(nextBlockType, newX, newY);
        this.stack.push(animationKey);
        this.markAsPassed(newX, newY);
        this.calculatePoint();
        this.endTurn();
        this.cursor.moveTo(newX, newY);
        this.stopWave(selectedBlockType);
        this.chooseMidi(this.turn, selectedBlockType);
        return;
      }
      
      if (newX === this.cursor.getBeforeX() && newY === this.cursor.getBeforeY()) {
        this.markAsPath(oldX, oldY);
        this.rollback(newX, newY);
        return;
      }

      if (nextBlockType !== 0) return;
      this.markAsPassed(newX, newY);
      this.cursor.addPathCnt();
      this.cursor.setBeforeDirection(oldX, oldY);
      let animationKey = this.getAnimationKey(nextBlockType, newX, newY);
      this.stack.push(animationKey);
      this.cursor.moveTo(newX, newY);
    }
  }

  private rollback(x: number, y: number): void {
    this.stack.pop().destroy();
    this.cursor.removeRecentBeforeDirection();
    this.cursor.rollbackPathCnt();
    this.cursor.moveTo(x, y);
  }

  private PressActionKey(): void {
    if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
      if (this.isFinished) {
        this.moveNextScene();
      }
      const tileIndex = this.getBlockType(this.cursor.getX(), this.cursor.getY());
      let createdAnimationKey: Phaser.GameObjects.Sprite;
      // cancel selected tile
      if (this.cursor.getPathCnt() === 0 && this.cursor.isActivated()) {
        this.setBlockType(this.cursor.getX(), this.cursor.getY(), this.cursor.getSelected());
        this.endTurn();
        return;
      }
      // prevent selected tile and path
      if (tileIndex === 99) {
        return;
      }
      // select tile
      if (tileIndex !== 0) {
        if (!this.cursor.isActivated()) {
          this.playWave(tileIndex);
          if (!this.checkNowayRoute(this.cursor.getX(), this.cursor.getY())) this.nowayRouteFinish();
          this.startTurn();
          this.markAsPassed(this.cursor.getX(), this.cursor.getY());
          this.cursor.setSelected(tileIndex);
          createdAnimationKey = this.playAnimation(true, tileIndex, this.cursor.getXPosition(), this.cursor.getYPosition());
          this.stack.push(createdAnimationKey);
        } 
      }
    }
  }

  private startTurn(): void {
    this.cursor.setActivatedValue(true);
    this.cursor.initActivatedValue();
  }

  private endTurn(): void {
    this.stopAllAnimcation();
    this.cursor.setActivatedValue(false);
    this.cursor.initActivatedValue();
    this.sound.stopAll();
  }

  private calculatePoint(): void {
    this.point += this.cursor.getPathCnt() * 100 + 1000;
    this.turn++;
    this.setFinishedTileOnFooter(this.cursor.getSelected());
    this.selected.push(this.cursor.getSelected());
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

  setBlockType(x: number, y: number, type: number): void {
    this.currentLevelArray[y * this.currentLevelWidth + x].setType(type);
  }

  private markAsPassed(x: number, y: number): void {
    let tmpBlock = this.getBlock(x, y);
    tmpBlock.setType(99);
  }

  private markAsPath(x: number, y: number): void {
    let tmpBlock = this.getBlock(x, y);
    tmpBlock.setType(0);
  }

  private setFinishedTileOnFooter(blockType: number): void {
    this.add.image(350+((this.turn-1)*139), 985, `cube${blockType}`).setOrigin(0).setScrollFactor(0);
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
      this.playMidi(result, sequence);
    });
  }

  private disposeSynths(): void {
    while(this.synths.length) {
      const synth = this.synths.shift();
			synth.dispose();
    }
  }

  /**
   * 서버를 호출하여 미디파일을 연주합니다.
   * 게임에서 5번째 호출인 경우 지금까지 생성한 미디파일을 합쳐서 연주합니다.
   */
  private async playMidi(url : string, sequence: number): Promise<void> {
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
    }).then( midi => {
      if (sequence === 5) {
        this.api.combine()
        .then((res) => res.json())
        .then(result => {
          this.playMidi(result, 0);
        });  
      }
    })
  }

  private dx: number[] = [1, -1, 0, 0];
  private dy: number[] = [0, 0, 1,-1];
  private checkNowayRoute(x: number, y: number): boolean {
    let currentBlockType = this.getBlock(x, y).getType();
    let list = new Array<[number, number]>();
    list.push([x, y]);
    let visited = new Array<boolean>(this.currentLevelHeight * this.currentLevelWidth);
    for (let i = 0; i < visited.length; i++) visited[i] = false;
    visited[y * this.currentLevelWidth + x] = true;
    while (list.length !== 0) {
      let tmpPosition = list.pop();
      for (let i = 0; i < 4; i++) {
        let nx = tmpPosition[0] + this.dx[i];
        let ny = tmpPosition[1] + this.dy[i];

        if (nx < 0 || ny < 0 || nx >= this.currentLevelWidth || ny >= this.currentLevelHeight ) continue;
        if (visited[ny * this.currentLevelWidth + nx]) continue;

        let tmpBlockType = this.getBlock(nx, ny).getType();
        if (tmpBlockType === currentBlockType) return true;
        if (tmpBlockType !== 0) continue;
        
        list.push([nx, ny]);
        visited[ny * this.currentLevelWidth + nx] = true;
      }
    }
    return false;
  }

  loadFont(name: string, url: string): void {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
  }
}
