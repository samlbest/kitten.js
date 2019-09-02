import Sprite from "../../graphics/sprite";
import Point from "../../graphics/point";
import Size from "../../graphics/size";
import Vector from "../../graphics/vector";

const { createCanvas } = require('canvas')
const canvas = createCanvas(200, 200)
const canvasCtx = canvas.getContext('2d')

test("getNextPosition_should_return_current_plus_vector", () => {
  let x = 1;
  let y = 2;
  let vectorX = 4;
  let vectorY = 7;
  let expected = new Point(x + vectorX, y + vectorY);

  let sprite = getSprite(x, y, 4, 4, 1000, vectorX, vectorY);
  
  expect(sprite.getNextPosition().equals(expected)).toBe(true);
});

test("set_vector_should_lock_to_max", () => {
  let maximum = 5;
  let maxVector = new Vector(maximum, maximum);

  let sprite = getSprite(0, 0, 1, 1, maximum, 1, 1);

  sprite.vector = new Vector(6, 7);

  expect(sprite.vector.equals(maxVector)).toBeTruthy();
});

let getSprite = (x: number, 
  y: number, 
  width: number, 
  height: number, 
  maxDirectionalSpeed: number,
  vectorX: number,
  vectorY: number) => {

  return new Sprite({
    context: canvasCtx,
    position: new Point(x, y),
    size: new Size(width, height),
    maxDirectionalSpeed: maxDirectionalSpeed,
    initialVector: new Vector(vectorX, vectorY)
  });
};