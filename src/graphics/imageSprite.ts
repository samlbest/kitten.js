import Sprite from "./sprite";
import SpriteOptions from "./spriteOptions";

export default class ImageSprite extends Sprite {
  constructor(private imagePath: string, spriteOptions: SpriteOptions) {
    super(spriteOptions);
  }

  render(): void {
    var img = new Image();
    img.src = this.imagePath;
    this.canvasContext.drawImage(img,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height);
  }
}