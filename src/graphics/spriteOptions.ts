import Size from "./size";
import Point from "./point";

export default interface SpriteOptions {
  context: CanvasRenderingContext2D
  position: Point;
  size: Size;
  maxDirectionalSpeed: number;
}