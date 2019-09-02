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
    this.canvasContext.clearRect(this.position.x - 1, this.position.y - 1,
      this.size.width + 2, this.size.height + 2);
    this.setPosition(newPosition);
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

  bounceOffRectangleIfIntersecting(rectangle: Rectangle): boolean {
    let nextPosition = this.getNextPosition();
    let yRect = new Rectangle(this.position.x, nextPosition.y, this.size.width, this.size.height);
    let xRect = new Rectangle(nextPosition.x, this.position.y, this.size.width, this.size.height);
    let nextRect = new Rectangle(nextPosition.x, nextPosition.y, 
      this.size.width, this.size.height);
    
    let bounced = false;

    if (yRect.intersects(rectangle)) {
      this.reverseYVector();
      bounced = true;
    }

    if (xRect.intersects(rectangle)) {
      this.reverseXVector();
      bounced = true;
    }

    if (!bounced && nextRect.intersects(rectangle)) {
      this.reverseVector();
      bounced = true;
    }


    return bounced;
  }

  bounceOffContainer(): boolean {
    let collidedX = this.willCollideLeftOrRight();
    let collidedY = this.willCollideTopOrBottom();

    if (collidedX) {
      this.reverseXVector();
    }

    if (collidedY) {
      this.reverseYVector();
    }

    return collidedX || collidedY;
  }

  render(): void {
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = 'green';
    this.canvasContext.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    this.canvasContext.closePath();
  }

  private setPosition(newPosition: Point): void {
    this.lastPosition = new Point(this.position.x, this.position.y);
    this.position = new Point(newPosition.x, newPosition.y);
  }

  private willCollideTopOrBottom(): boolean {
    if (!this.container) {
      return false;
    }

    let yRect = new Rectangle(this.position.x, this.position.y + this.vector.y, this.size.width, this.size.height);
    return (yRect.position.y <= 0 || yRect.position.y + yRect.size.height >= this.container.size.height)
  }

  private willCollideLeftOrRight(): boolean {
    if (!this.container) {
      return false;
    }

    let xRect = new Rectangle(this.position.x + this.vector.x, this.position.y, this.size.width, this.size.height);
    return (xRect.position.x <= 0 || xRect.position.x + xRect.size.width >= this.container.size.width)
  }
}
