import Utilities from "./utilities";
import SpriteOptions from "./spriteOptions";
import Rectangle from "./rectangle";
import Vector from "./vector";
import Point from "./point";

export default class Sprite extends Rectangle {
  protected canvasContext: CanvasRenderingContext2D;
  private _vector: Vector = new Vector(0, 0);
  private maxDirectionalSpeed: number;
  private lastPosition: Point;
  private _container: Rectangle;

  constructor(options: SpriteOptions) {
    super(options.position.x, options.position.y, options.size.width, options.size.height);

    this.canvasContext = options.context;
    this.maxDirectionalSpeed = options.maxDirectionalSpeed;
    this.vector = options.initialVector;

    this.updateLastPosition();
  }

  set container(container: Rectangle) {
    this._container = container;
  }

  get container(): Rectangle {
    return this._container;
  }

  getNextPosition(): Point {
    return new Point(this.position.x + this.vector.x, this.position.y + this.vector.y);
  }

  set vector(newVector: Vector) {
    this._vector.x = Math.abs(newVector.x) > this.maxDirectionalSpeed ? this.maxDirectionalSpeed : newVector.x;
    this._vector.y = Math.abs(newVector.y) > this.maxDirectionalSpeed ? this.maxDirectionalSpeed : newVector.y;
  }

  get vector(): Vector {
    return this._vector;
  }

  move(): void {
    this.moveTo(this.getNextPosition());
  }

  moveTo(newPosition: Point): void {
    this.canvasContext.clearRect(this.position.x - 1, this.position.y - 1, this.size.width + 2, this.size.height + 2);
    this.position = newPosition;
    this.render();
  }

  reverseXVector(): void {
    this.vector = new Vector(this.vector.x * -1, this.vector.y);
  }

  reverseYVector(): void {
    this.vector = new Vector(this.vector.x, this.vector.y * -1);
  }

  reverseVector(): void {
    this.reverseXVector();
    this.reverseYVector();
  }

  bounceOffRectangleIfIntersecting(rectangle: Rectangle): void {
    let yRect = new Rectangle(this.position.x, this.position.y + this.vector.y, this.size.width, this.size.height);
    let xRect = new Rectangle(this.position.x + this.vector.x, this.position.y, this.size.width, this.size.height);

    if (yRect.intersects(rectangle)) {
      this.reverseYVector();
    }

    if (xRect.intersects(rectangle)) {
      this.reverseXVector();
    }
  }

  bounceOffContainer(): void {
    if (this.willCollideLeftOrRight()) {
      this.reverseXVector();
    }

    if (this.willCollideTopOrBottom()) {
      this.reverseYVector();
    }
  }

  render(): void {
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = 'green';
    this.canvasContext.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    this.canvasContext.closePath();
  }

  protected setPosition(newPosition: Point): void {
    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;

    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }

  private willCollideTopOrBottom(): boolean {
    let yRect = new Rectangle(this.position.x, this.position.y + this.vector.y, this.size.width, this.size.height);
    return (yRect.position.y < 0 || yRect.position.y + yRect.size.height > this.container.size.height)
  }

  private willCollideLeftOrRight(): boolean {
    let xRect = new Rectangle(this.position.x + this.vector.x, this.position.y, this.size.width, this.size.height);
    return (xRect.position.x < 0 || xRect.position.x + xRect.size.width > this.container.size.width)
  }

  private updateLastPosition(): void {
    if (!this.lastPosition) {
      this.lastPosition = new Point(this.position.x, this.position.y);
      return;
    }

    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;
  }

  private updatePosition(newPosition: Point) {
    this.updateLastPosition();

    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }
}
