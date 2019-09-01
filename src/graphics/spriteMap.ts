import Sprite from "./sprite";
import Rectangle from "./rectangle";
import Point from "./point";
import Size from "./size";

export default class SpriteMap {
  constructor(private canvas: HTMLCanvasElement, private maxSprites: number = 10, private sprites: Sprite[] = []) {
    this.canvas = canvas;
    this.maxSprites = maxSprites;
    this.sprites = sprites;
  }

  redrawSprites(): void {
    let domElements = this.getAllDomElements();

    this.sprites.forEach(sprite => {
      let obstacles: Array<Rectangle> = domElements.concat(this.sprites.filter(element => element != sprite));

      obstacles.forEach(other => {
        if (other instanceof Sprite) {
          sprite.bounceOffRectangleIfIntersecting(other);
          (other as Sprite).bounceOffRectangleIfIntersecting(sprite);
        }
        else {
          sprite.bounceOffRectangleIfIntersecting(other);
        }
      });

      if (sprite.intersectsContainerHorizontalBound()) {
        sprite.reverseYVector();
      }

      if (sprite.intersectsContainerVerticalBound()) {
        sprite.reverseXVector();
      }

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

  getAllDomElements(): Rectangle[] {
    let allElements: any = document.body.getElementsByTagName('*');
    var objects = new Array<Rectangle>();

    for (var i = 0; i < allElements.length; ++i) {
      let element = allElements[i];
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
