import Point from "./point";
import Size from "./size";

export default class Rectangle {
  public position: Point;
  public size: Size;



  constructor(x: number, y: number, width: number, height: number) {
    this.position = new Point(x, y);
    this.size = new Size(width, height);
  }

  intersects(other: Rectangle): boolean { 
    return this.left() <= other.right() && this.right() >= other.left() 
      && this.top() <= other.bottom() && this.bottom() >= other.top();
  }

  
  intersectsLeft(other: Rectangle): boolean {
    return this.right() === other.left();
  }

  intersectsRight(other: Rectangle): boolean {
    return this.left() === other.right();
  }

  intersectsTop(other: Rectangle): boolean {
    return this.bottom() === other.top();
  }

  intersectsBottom(other: Rectangle): boolean {
    return this.top() === other.bottom();
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