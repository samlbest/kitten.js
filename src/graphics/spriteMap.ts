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
    this.sprites.forEach(sprite => {
      

      this.sprites.filter(element => element != sprite).forEach(other => {
        if (sprite.intersects(other)) {
          console.log("it intersects");

          sprite.reverseVector();
          other.reverseVector();
        }
      });

      if (sprite.intersectsHorizontalEdge()) {
        sprite.reverseYVector();
      }

      if (sprite.intersectsVerticalEdge()) {
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
    }
  }

  getAllDomElements(): Rectangle[] {
    var allElements: any = document.body.getElementsByTagName('*');
    var objects = new Array<Rectangle>();

    for (var i = 0; i < allElements.length; ++i) {
      var element = allElements[i];
      var x = element.offsetLeft;
      var y = element.offsetTop;
      var width = element.offsetWidth;
      var height = element.offsetHeight;

      var position = new Point(x, y);
      var size = new Size(width, height);

      if (x != 0 && y != 0 && width != 0 && height != 0) {
        objects.push(new Rectangle(position.x, position.y, size.width, size.height));
      }
    }

    return objects;
  }
}
