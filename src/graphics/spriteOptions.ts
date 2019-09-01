import Size from "./size";
import Point from "./point";
import Vector from "./vector";

export default interface SpriteOptions {
  context: CanvasRenderingContext2D
  position: Point;
  size: Size;
  maxDirectionalSpeed: number;
  initialVector: Vector;
}