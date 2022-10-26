import { forEach } from 'lodash';
import { CONST } from '../const/const';
import { ICursorConstructor } from '../interfaces/cursor.interface';

export class Cursor extends Phaser.GameObjects.Image {
  private currentPosition: [number, number];
  private activated: boolean;
  private selected: number;
  private pathCnt: number = 0;
  private beforePosition: Array<[number, number]>;

  constructor(aParams: ICursorConstructor) {
    super(
      aParams.scene,
      aParams.x,
      aParams.y,
      aParams.texture,
      aParams.cursorStartPosition
    );

    this.currentPosition = aParams.cursorStartPosition;
    this.initVariables();
    this.initImage();

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.pathCnt = 0;
    this.activated = false;
    this.beforePosition = [];
  }

  public initActivatedValue(): void {
    this.pathCnt = 0;
    this.beforePosition = [];
  }

  private initImage(): void {
    this.setOrigin(0, 0);
    this.moveTo(0, 0);
  }

  public moveTo(x: number, y: number): void {
    if (this.isActivated) {
      this.beforePosition.push(this.currentPosition);
    }
    this.printBefore();
    this.currentPosition = [x, y];
    this.setPosition((x * CONST.tileSize) + 315, (y * CONST.tileSize) + 179);
  }

  /**
   * printBefore
   */
  public printBefore() {
    for (let i = 0; i < this.beforePosition.length; i++) {
      const element = this.beforePosition[i];
      console.log(element);
    }  
  }
  public getX(): number {
    return this.currentPosition[0];
  }

  public getY(): number {
    return this.currentPosition[1];
  }

  public getXPosition(): number {
    return this.currentPosition[0] * CONST.tileSize + 365;
  }

  public getYPosition(): number {
    return this.currentPosition[1] * CONST.tileSize + 229;
  }

  public getXByParam(x: number): number {
    return x * CONST.tileSize + 365;
  }

  public getYByParam(y: number): number {
    return y * CONST.tileSize + 229;
  }

  public isActivated(): boolean {
    return this.activated;
  }

  public setActivated(): void {
    this.activated = !this.activated;
  }

  public getSelected(): number {
    return this.selected;
  }

  public setSelected(tileIndex: number): void {
    this.selected = tileIndex;
  }

  public getPathCnt(): number {
    return this.pathCnt;
  }

  public addPathCnt(): void {
    this.pathCnt++;
  }

  public initPathCnt(): void {
    this.pathCnt = 0;
  }

  public setBeforeDirection(x: number, y:number): void {
    this.beforePosition.push([x, y]);
  }

  public getBeforeDirection(): [number, number] {
    let tmp = this.beforePosition.pop();
    this.beforePosition.push(tmp!);
    return tmp;
    // return this.beforePosition.pop();
  }

  public getBeforeY(): number {
    return this.beforePosition.at(this.beforePosition.length)[1];
  }

  public getBeforeX(): number {
    return this.beforePosition.at(this.beforePosition.length)[0];
  }
}
