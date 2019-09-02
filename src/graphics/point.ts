export default class Point {
    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }

    equals(other: Point): boolean {
      return this.x === other.x && this.y === other.y;
    }
}