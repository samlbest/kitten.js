import Sprite from "./sprite";
import Rectangle from "./rectangle";
import Point from "./point";
import Size from "./size";

export default class SpriteMap {
  constructor(private canvas: HTMLCanvasElement, private maxSprites: number = 10, 
    private mapDomElements: boolean = false, private sprites: Sprite[] = []) {
    this.canvas = canvas;
    this.maxSprites = maxSprites;
    this.sprites = sprites;
  }

  redrawSprites(): void {
    this.sprites.forEach(sprite => {
      let obstacles = this.getAllObstacles(sprite);
      obstacles.forEach(other => {
        if (other instanceof Sprite) {
          sprite.bounceOffRectangleIfIntersecting(other);
          (other as Sprite).bounceOffRectangleIfIntersecting(sprite);
        }
        else {
          sprite.bounceOffRectangleIfIntersecting(other);
        }
      });

      sprite.bounceOffContainer();

      sprite.move();
    });
  }

  addSprite(sprite: Sprite): void {
    if (this.sprites.length < this.maxSprites) {
      sprite.container = new Rectangle(this.canvas.offsetLeft, 
        this.canvas.offsetTop, 
        this.canvas.scrollWidth, 
        this.canvas.scrollHeight
      );

      this.sprites.push(sprite);
      sprite.render();
    }
  }

  getAllObstacles(currentSprite: Sprite): Rectangle[] {
    var elements: Rectangle[] = new Array<Rectangle>();
    if (this.mapDomElements) {
      elements = this.getAllDomElements();
    }

    return elements.concat(this.sprites.filter(element => element != currentSprite));
  }

  getAllDomElements(): Rectangle[] {
    let allElements: any = document.body.getElementsByTagName("div");
    var objects = new Array<Rectangle>();

    for (var i = 0; i < allElements.length; ++i) {
      let element = allElements[i] as HTMLElement;
      if (element === null || element.offsetParent === null) {
        continue;
      }

      let x = element.offsetLeft;
      let y = element.offsetTop;
      let width = element.offsetWidth;
      let height = element.offsetHeight;

      let position = new Point(x, y);
      let size = new Size(width, height);

      if (x != 0 && y != 0 && width != 0 && height != 0) {
        objects.push(new Rectangle(position.x, position.y, size.width, size.height));
      }
    }

    return objects;
  }
}
