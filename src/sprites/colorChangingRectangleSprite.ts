import Sprite from "../graphics/sprite";
import SpriteOptions from "../graphics/spriteOptions";
import Utilities from "../graphics/utilities";

export default class ColorChangingRectangleSprite extends Sprite {
  private color: string;

  constructor(colorChangeIntervalMs: number, options: SpriteOptions) {
    super(options);

    setInterval(() => {
      this.color = Utilities.getRandomColor();
    }, colorChangeIntervalMs)
  }

  render(): void {
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    this.canvasContext.closePath();
  }
}