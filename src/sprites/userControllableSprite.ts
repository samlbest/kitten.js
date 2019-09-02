import SpriteOptions from "../graphics/spriteOptions";
import JarSprite from "./jarSprite";
import Vector from "../graphics/vector";
import Rectangle from "../graphics/rectangle";
import Point from "../graphics/point";

export default class UserControllableSprite extends JarSprite {
  private readonly ARROW_DOWN: string = "ArrowDown";
  private readonly ARROW_UP: string = "ArrowUp";
  private readonly ARROW_LEFT: string = "ArrowLeft";
  private readonly ARROW_RIGHT: string = "ArrowRight";
  private readonly LEFT_MOUSE: number = 1;

  private currentDirections: string[] = [];

  private mouseDown: number = 0;

  private speed: number;
  private initialized: boolean = false;

  constructor(spriteOptions: SpriteOptions) {
    super(spriteOptions);

    this.vector = new Vector(0, 0);
    this.speed = spriteOptions.maxDirectionalSpeed;
  }

  render(): void {
    super.render();
    if (!this.initialized) {
      this.initialized = true;

      this.moveTo(new Point(
        (this.container.size.width + this.container.position.x) / 2, 
        (this.container.position.y + this.container.size.height) / 2));
      this.setEventHandlers();
    }
  }

  bounceOffContainer(): boolean {
    return false;
  }

  bounceOffRectangleIfIntersecting(other: Rectangle): boolean {
    return false;
  }

  private setEventHandlers(): void {
    document.onkeydown = this.processKeyPress.bind(this);
    document.onkeyup = this.processKeyUp.bind(this);
    document.onclick =this.processClick.bind(this);
    document.onmousedown = this.processMouseDown.bind(this);
    document.onmouseup = this.processMouseUp.bind(this);
    document.onmousemove = this.processClick.bind(this);
  }

  private processMouseDown(event: MouseEvent): void {
    if (event.which === this.LEFT_MOUSE) {
      ++this.mouseDown;
    }
  }

  private processMouseUp(event: MouseEvent): void {
    if (event.which === this.LEFT_MOUSE) {
      --this.mouseDown;
    }
  }

  private isClicking(): boolean {
    return this.mouseDown !== 0;
  }

  private processClick(event: MouseEvent): void {
    if (this.isClicking()) {
      this.moveTo(new Point(event.pageX - this.size.width/2, event.pageY - this.size.height/2));
    }
  }

  private processKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case this.ARROW_DOWN:
        let pressingUp = this.currentDirections.find(value => value == this.ARROW_UP);
        this.vector.y = pressingUp ? -this.speed : 0;
        break;
      case this.ARROW_UP:
          let pressingDown = this.currentDirections.find(value => value == this.ARROW_DOWN);
          this.vector.y = pressingDown ? this.speed : 0;
        break;
      case this.ARROW_LEFT:
          let pressingRight = this.currentDirections.find(value => value == this.ARROW_RIGHT);
          this.vector.x = pressingRight ? this.speed : 0;
        break;
      case this.ARROW_RIGHT:
          let pressingLeft = this.currentDirections.find(value => value == this.ARROW_LEFT);
          this.vector.x = pressingLeft ? -this.speed : 0;
        break;
    }

    this.currentDirections = this.currentDirections.filter((value) => value != event.key);
  }

  private processKeyPress(event: KeyboardEvent): void {
    this.currentDirections.push(event.key);
    switch (event.key) {
      case this.ARROW_DOWN:
        this.vector.y = this.speed;
        break;
      case this.ARROW_UP:
        this.vector.y = -this.speed;
        break;
      case this.ARROW_LEFT:
        this.vector.x = -this.speed;
        break;
      case this.ARROW_RIGHT:
        this.vector.x = this.speed;
        break;
    }
  }
}