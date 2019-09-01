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
    this.vector = new Vector(0, 0);
    this.maxDirectionalSpeed = options.maxDirectionalSpeed;

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

  updateLastPosition(): void {
    if (!this.lastPosition) {
      this.lastPosition = new Point(this.position.x, this.position.y);
      return;
    }

    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;
  }

  updatePosition(newPosition: Point) {
    this.updateLastPosition();

    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }

  correctedOffset(spritePosition: Point) {
    let xOffset = 0;
    let yOffset = 0;

    let containerSize = this.container.size;
    let containerOrigin = this.container.position;

    let nextPosition = spritePosition;

    // Need to increase current x-position to correct.
    if (nextPosition.x < containerOrigin.x) {
      xOffset = containerOrigin.x - nextPosition.x;
    }

    // Need to decrease current x-position to correct.
    else if (nextPosition.x + this.size.width > containerOrigin.x + containerSize.width) {
      xOffset = containerOrigin.x + containerSize.width - nextPosition.x - this.size.width;
    }

    // Need to increase current y-position to correct.
    if (nextPosition.y < containerOrigin.y) {
      yOffset = containerOrigin.y - nextPosition.y;
    }

    // Need to decrease current y-position to correct.
    else if (nextPosition.y + this.size.height > containerOrigin.y + containerSize.height) {
      yOffset = containerOrigin.y + containerSize.height - nextPosition.y - this.size.height;
    }

    return new Point(xOffset, yOffset);
  };

  set vector(newVector: Vector) {
    this._vector.x = Math.abs(newVector.x) > this.maxDirectionalSpeed ? this.maxDirectionalSpeed : newVector.x;
    this._vector.y = Math.abs(newVector.y) > this.maxDirectionalSpeed ? this.maxDirectionalSpeed : newVector.y;
  }

  get vector(): Vector {
    return this._vector;
  }

  move(): void {
    let nextPosition = this.getNextPosition();
    let correctedOffset = this.correctedOffset(nextPosition);
    let finalPosition = new Point(nextPosition.x + correctedOffset.x,
      nextPosition.y + correctedOffset.y);

    this.moveTo(finalPosition);
  }

  moveTo(newPosition: Point): void {
    this.canvasContext.clearRect(this.position.x, this.position.y, this.size.width, this.size.height);
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

  randomizeVector(): void {
    var newVector = new Vector(this.vector.x + Utilities.randomIntFromInterval(-3, 3),
      this.vector.y + Utilities.randomIntFromInterval(-3, 3));

    this.vector = newVector;
  }

  bounceOffRectangleIfIntersecting(rectangle: Rectangle) {
    let yRect = new Rectangle(this.position.x, this.position.y + this.vector.y, this.size.width, this.size.height);
    let xRect = new Rectangle(this.position.x + this.vector.x, this.position.y, this.size.width, this.size.height);

    if (yRect.intersects(rectangle)) {
      this.reverseYVector();
    }

    if (xRect.intersects(rectangle)) {
      this.reverseXVector();
    }
  }

  intersectsHorizontalEdge(rectangle: Rectangle) {
    return (this.position.y + this.size.height == rectangle.size.height && this.vector.y > 0) ||
      (this.position.y == 0 && this.vector.y < 0);
  }

  intersectsVerticalEdge(rectangle: Rectangle) {
    return (this.position.x + this.size.width == rectangle.size.width && this.vector.x > 0) ||
      (this.position.x == 0 && this.vector.x < 0);
  }

  intersectsContainerHorizontalBound(): boolean {
    return this.intersectsHorizontalEdge(this.container);
  }

  intersectsContainerVerticalBound(): boolean {
    return this.intersectsVerticalEdge(this.container);
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
}
