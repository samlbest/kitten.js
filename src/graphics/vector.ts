export default class Vector {
    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
    }

    equals(other: Vector): boolean {
      return this.x === other.x && this.y === other.y;
    }

    magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}