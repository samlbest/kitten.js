import Point from "./point";
import Size from "./size";

export default class Rectangle {
  public position: Point;
  public size: Size;

  constructor(x: number, y: number, width: number, height: number) {
    this.position = new Point(x, y);
    this.size = new Size(width, height);
  }

  equals(other: Rectangle): boolean {
    return this.position.equals(other.position) && this.size.equals(other.size);
  }

  intersects(other: Rectangle): boolean { 
    return this.left() <= other.right() && this.right() >= other.left() 
      && this.top() <= other.bottom() && this.bottom() >= other.top();
  }

  left(): number {
    return this.position.x;
  }

  right(): number {
    return this.position.x + this.size.width;
  }

  bottom(): number {
    return this.position.y + this.size.height;
  }

  top(): number {
    return this.position.y;
  }
}