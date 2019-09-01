import Point from "./point";
import Size from "./size";

export default class Rectangle {
  constructor(public position: Point, public size: Size) {
    this.position = position;
    this.size = size;
  }

  intersects(other: Rectangle): boolean {
    return this.topLeft().x < other.topRight().x && this.topRight().x > other.topLeft().x
      && this.topLeft().y > other.bottomLeft().y && this.bottomLeft().y > other.topLeft().y;
  }

  topLeft(): Point {
    return new Point(this.position.x, this.position.y);
  }

  topRight(): Point {
    return new Point(this.position.x + this.size.width, this.position.y);
  }

  bottomLeft(): Point {
    return new Point(this.position.x, this.position.y + this.size.height);
  }

  bottomRight(): Point {
    return new Point(this.position.x + this.size.width, this.position.y + this.size.height);
  }
}