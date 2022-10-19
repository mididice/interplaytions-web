import { CONST } from '../const/const';
import { ICursorConstructor } from '../interfaces/cursor.interface';

export class Cursor extends Phaser.GameObjects.Image {
  private currentPosition: [number, number];
  private activated: boolean;
  private selected: number;
  private pathCnt: number;
  private beforeDirection: number;

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
  }

  private initImage(): void {
    this.setOrigin(0, 0);
    this.moveTo(0, 0);
  }

  public moveTo(x: number, y: number): void {
    this.currentPosition = [x, y];
    this.setPosition((x * CONST.tileSize) + 315, (y * CONST.tileSize) + 179);
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
}
