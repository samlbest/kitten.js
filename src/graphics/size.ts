export default class Size {
    constructor(public width: number, public height: number) {
        this.width = width;
        this.height = height;
    }

    equals(other: Size): boolean {
      return this.width === other.width && this.height === other.height;
    }
}