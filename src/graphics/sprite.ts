import Utilities from "./utilities";
import SpriteOptions from "./spriteOptions";
import Rectangle from "./rectangle";
import Vector from "./vector";
import Point from "./point";

export default class Sprite extends Rectangle {
    private canvasContext: CanvasRenderingContext2D;
    private _vector: Vector = new Vector(0, 0);
    private maxDirectionalSpeed: number;
    private lastPosition: Point;
    
    constructor(options: SpriteOptions) {
        super(options.position, options.size);

        this.canvasContext = options.context;
        this.vector = new Vector(0, 0);
        this.maxDirectionalSpeed = options.maxDirectionalSpeed;

        this.updateLastPosition();
        
        this.render();
    }

    updateLastPosition(): void {
        if (!this.lastPosition) {
            this.lastPosition = new Point(this.position.x, this.position.y);
            return;
        }

        this.lastPosition.x = this.position.x;
        this.lastPosition.y = this.position.y;
    }

    updatePosition(newPosition: Point) {
        this.updateLastPosition();

        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }

    set vector(newVector: Vector) {
        this._vector.x = Math.abs(newVector.x) > this.maxDirectionalSpeed ? this.maxDirectionalSpeed : newVector.x;
        this._vector.y = Math.abs(newVector.y) > this.maxDirectionalSpeed ? this.maxDirectionalSpeed : newVector.y;
    }

    get vector(): Vector {
        return this._vector;
    }

    move(): void {
        this.moveTo(new Point(this.position.x + this.vector.x, this.position.y + this.vector.y));
    }

    moveTo(newPosition: Point): void {
        this.canvasContext.clearRect(this.position.x, this.position.y, this.size.width, this.size.height);
        this.position = newPosition;
        this.render();
    }

    randomizeVector(): void {
        var newVector = new Vector(this.vector.x + Utilities.randomIntFromInterval(-3, 3),
            this.vector.y + Utilities.randomIntFromInterval(-3, 3));

        this.vector = newVector;
    }

    protected render(): void {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = 'green';
        this.canvasContext.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        this.canvasContext.closePath();
    }
    
    protected setPosition(newPosition: Point): void {
        this.lastPosition.x = this.position.x;
        this.lastPosition.y = this.position.y;

        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}
