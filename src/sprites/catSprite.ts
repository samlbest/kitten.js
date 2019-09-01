import Sprite from "../graphics/sprite";
import Cat from "./cat-small.png";

export default class CatSprite extends Sprite {
  protected render(): void {
    var img = new Image();
    img.src = Cat;
    this.canvasContext.drawImage(img,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height);
  }
}