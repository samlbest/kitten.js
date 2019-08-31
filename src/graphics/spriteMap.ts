import Sprite from "sprite";
import Rectangle from "./rectangle";
import Point from "./point";
import Size from "./size";

export default class SpriteMap {   
    constructor(private canvas: HTMLCanvasElement, private maxSprites: number = 10, private sprites: Sprite[] = []) {
        this.canvas = canvas;
        this.maxSprites = maxSprites;
        this.sprites = sprites;
    }

    redrawSprites() {
        for (var i = 0; i < this.sprites.length; ++i) {
            var sprite = this.sprites[i];
            sprite.move();
      
            //sprite.correctVectorAndPositionIfNeeded(this.sprites, this.getAllDomElements(), this.canvas);

            
          }
    }

    addSprite(sprite: Sprite) {
        if (this.sprites.length < this.maxSprites) {
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
            objects.push(new Rectangle(position, size));
          }
        }
        return objects;
      }
}
