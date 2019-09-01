import SpriteMap from "./graphics/spritemap";
import CatSprite from "./sprites/catSprite";
import Point from "./graphics/point";
import Size from "./graphics/size";
import Vector from "./graphics/vector";
import Sprite from "./graphics/sprite";
import Utilities from "./graphics/utilities";

export default class Kitten {
  readonly version = "0.01";

  private container: HTMLElement;
  private parentContainer: HTMLElement;
  private canvas: HTMLCanvasElement;
  private spriteMap: SpriteMap;
  private loop: any;

  constructor() {
    this.init();
  }

  private init(): void {
    this.canvas = this.createCanvas();
    this.createSpawnButton();
    this.createPausePlayButton();

    this.spriteMap = new SpriteMap(this.canvas, 50);
    this.startLoop();
  }

  private startOrStopLoop(): void {
    if (!this.loop) {
      this.startLoop();
    }
    else {
      this.endLoop();
    }
  };

  private startLoop(): void {
    if (!this.loop) {
      this.loop = setInterval(() => {
        this.spriteMap.redrawSprites();
      }, 8);
    }
  };

  private endLoop() {
    if (this.loop) {
      clearInterval(this.loop);
      this.loop = null;
    }
  }

  private createSpawnButton(): HTMLElement {
    var button = document.createElement("div");
    this.container.appendChild(button);
    button.style.right = "6px";
    button.style.top = "6px";
    button.style.width = "5px";
    button.style.height = "5px";
    button.style.background = "#fc1ed3";
    button.style.position = "absolute";
    button.style.zIndex = "10000";
    button.style.cursor = "pointer";
    button.style.borderRadius = "2.5px";
    button.style.pointerEvents = "all";
    button.onclick = this.spawn.bind(this);

    return button;
  };

  private createPausePlayButton(): HTMLElement {
    var button = document.createElement("div");
    this.container.appendChild(button);
    button.style.right = "13px";
    button.style.top = "6px";
    button.style.width = "5px";
    button.style.height = "5px";
    button.style.background = "#921efc";
    button.style.position = "absolute";
    button.style.zIndex = "10000";
    button.style.cursor = "pointer";
    button.style.borderRadius = "2.5px";
    button.style.pointerEvents = "all";
    button.onclick = this.startOrStopLoop.bind(this);

    return button;
  };

  private spawn(): void {
    this.spriteMap.addSprite(this.getRandomSprite());
  }

  private getRandomSprite(): Sprite {
    let speed = Utilities.randomFloatFromInterval(1, 5);
    let size = Utilities.randomFloatFromInterval(15, 150);

    let options = {
      context: this.canvasContext(),
      position: new Point(0, 0),
      size: new Size(size, size),
      maxDirectionalSpeed: 5,
      initialVector: new Vector(speed, speed)
    };

    let sprites = [new CatSprite(options), new Sprite(options)];

    return sprites[Utilities.randomIntFromInterval(0, sprites.length - 1)];
  }

  private createCanvas(): HTMLCanvasElement {
    if (!this.container) {
      var canvasContainer = document.createElement("div");
      var body = document.querySelector("body");
      document.body.appendChild(canvasContainer);
      canvasContainer.style.position = "absolute";
      canvasContainer.style.left = "0px";
      canvasContainer.style.top = "0px";
      canvasContainer.style.width = body.scrollWidth + "px";
      canvasContainer.style.height = body.scrollHeight + "px";
      canvasContainer.style.zIndex = "10000";
      canvasContainer.style.pointerEvents = "none";

      this.parentContainer = body;
      this.container = canvasContainer;


      window.onresize = () => {
        var newHeight = this.parentContainer.scrollHeight;
        var newWidth = this.parentContainer.scrollWidth;

        this.canvas.style.width = newWidth + "px";
        this.canvas.style.height = newHeight + "px";
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
      };
    }

    var canvas = document.createElement("canvas");
    canvas.style.width = canvasContainer.scrollWidth + "px";
    canvas.style.height = canvasContainer.scrollHeight + "px";
    canvas.width = canvasContainer.scrollWidth;
    canvas.height = canvasContainer.scrollHeight;
    canvas.style.overflow = "visible";
    canvas.style.position = "absolute";

    this.container.appendChild(canvas);

    return canvas;

  }

  private canvasContext(): CanvasRenderingContext2D {
    if (this.canvas) {
      return this.canvas.getContext("2d");
    }

    return null;
  }
}