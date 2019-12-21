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

  private leftMouseButtonOnlyDown: boolean = false;
  private touchMoveInProgress: boolean = false;

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
    // Arrow key handlers
    this.addEventListener("keydown", this.processKeyPress);
    this.addEventListener("keyup", this.processKeyPress);

    // Mouse handlers
    this.addEventListener("click", this.processClick);
    this.addEventListener("mousedown", this.processClick);
    this.addEventListener("mouseup", this.setLeftButtonState);
    this.addEventListener("mousemove", this.processClick);

    // Touch handlers
    this.addEventListener("touchstart", this.processTap);
    this.addEventListener("touchmove", this.processTap);
    this.addEventListener("touchend", this.setTouchState)
  }

  private addEventListener(name: string, handler: (event: Event) => void, passive: boolean = false) {
    document.addEventListener(name, handler.bind(this), { passive: passive });
  }

  private setLeftButtonState(event: MouseEvent): void {
    this.leftMouseButtonOnlyDown = event.buttons === undefined 
      ? event.which === this.LEFT_MOUSE 
      : event.buttons === this.LEFT_MOUSE;
  }

  private processClick(event: MouseEvent): void {
    this.setLeftButtonState(event);

    if (this.leftMouseButtonOnlyDown) {
      this.moveTo(new Point(event.pageX - this.size.width/2, event.pageY - this.size.height/2));
    }
  }

  private setTouchState(event: TouchEvent): void {
    if (event.type === "touchend" && event.touches.length === 0) {
      this.touchMoveInProgress = false;
      return;
    }

    this.touchMoveInProgress = this.touchMoveInProgress || event.touches.length >= 3;
  }

  private processTap(event: TouchEvent): void {
    // Tap with 3+ fingers to start, then use one to move. Prevents overriding
    // standard touch behavior such as scrolling and navigation.
    this.setTouchState(event);

    if (this.touchMoveInProgress) {
      event.preventDefault(); // Prevent handling as mouse event
      let touch = event.touches[0];
      this.moveTo(new Point(touch.pageX - this.size.width/2, touch.pageY - this.size.height/2));
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