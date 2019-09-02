export default class Utilities {
    static randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static randomFloatFromInterval(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }

    static getRandomColor(): string {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    static extend(...args: object[]): object  {
        for (let i = 1; i < arguments.length; ++i) {
          for (let key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                arguments[0][key] = arguments[i][key];
            }
          }
        }
        return arguments[0];
      }
}