import Sprite from "../../graphics/sprite";
import Point from "../../graphics/point";
import Size from "../../graphics/size";
import Vector from "../../graphics/vector";
import Rectangle from "../../graphics/rectangle";

const { createCanvas } = require("canvas");
const canvas: HTMLCanvasElement = createCanvas(200, 200);
const canvasCtx: CanvasRenderingContext2D = canvas.getContext("2d");

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

  expect(sprite.vector.equals(maxVector)).toBe(true);
});

test("move_should_update_position", () => {
  let vector = new Vector(10, 10);
  let expectedPosition = new Point(10, 10);

  let sprite = getSprite(0, 0, 1, 1, 10, vector.x, vector.y);
  sprite.move();

  expect(sprite.position.equals(expectedPosition)).toBe(true);
});

test("moveTo_should_update_position", () => {
  let vector = new Vector(10, 10);
  let expectedPosition = new Point(130, 130);

  let sprite = getSprite(0, 0, 1, 1, 10, vector.x, vector.y);
  sprite.moveTo(expectedPosition);

  expect(sprite.position.equals(expectedPosition)).toBe(true);
});

test("reverseXVector_should_reverseX", () => {
  let vector = new Vector(10, 10);
  let expectedVector = new Vector(-10, 10);

  let sprite = getSprite(0, 0, 1, 1, 10, vector.x, vector.y);
  sprite.reverseXVector();

  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("reverseYVector_should_reverseY", () => {
  let vector = new Vector(10, 10);
  let expectedVector = new Vector(10, -10);

  let sprite = getSprite(0, 0, 1, 1, 10, vector.x, vector.y);
  sprite.reverseYVector();

  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("reverseVector_should_reverseBoth", () => {
  let vector = new Vector(10, 10);
  let expectedVector = new Vector(-10, -10);

  let sprite = getSprite(0, 0, 1, 1, 10, vector.x, vector.y);
  sprite.reverseVector();

  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffRectangleIfIntersecting_should_not_change", () => {
  let vector = new Vector(10, 10);
  let expectedVector = new Vector(10, 10);
  let spritePosition = new Point(10, 10);
  let spriteSize = new Size(10, 10);

  let obstacle = new Rectangle(31, 31, 50, 50);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  expect(sprite.bounceOffRectangleIfIntersecting(obstacle)).toBe(false);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffRectangleIfIntersecting_should_reverse_both", () => {
  let vector = new Vector(1, 1);
  let expectedVector = new Vector(-1, -1);
  let spritePosition = new Point(10, 10);
  let spriteSize = new Size(10, 10);

  let obstacle = new Rectangle(21, 21, 50, 50);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  expect(sprite.bounceOffRectangleIfIntersecting(obstacle)).toBe(true);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffRectangleIfIntersecting_should_reversex_right", () => {
  let vector = new Vector(1, 1);
  let expectedVector = new Vector(-1, 1);
  let spritePosition = new Point(10, 10);
  let spriteSize = new Size(10, 10);

  let obstacle = new Rectangle(21, 5, 50, 50);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  expect(sprite.bounceOffRectangleIfIntersecting(obstacle)).toBe(true);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffRectangleIfIntersecting_should_reversex_left", () => {
  let vector = new Vector(-1, -1);
  let expectedVector = new Vector(1, -1);
  let spritePosition = new Point(11, 10);
  let spriteSize = new Size(10, 10);

  let obstacle = new Rectangle(0, 5, 10, 50);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  expect(sprite.bounceOffRectangleIfIntersecting(obstacle)).toBe(true);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffRectangleIfIntersecting_should_reversey_top", () => {
  let vector = new Vector(1, 1);
  let expectedVector = new Vector(1, -1);
  let spritePosition = new Point(10, 5);
  let spriteSize = new Size(4, 4);

  let obstacle = new Rectangle(0, 10, 50, 10);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  expect(sprite.bounceOffRectangleIfIntersecting(obstacle)).toBe(true);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffRectangleIfIntersecting_should_reversey_bottom", () => {
  let vector = new Vector(-1, -1);
  let expectedVector = new Vector(-1, 1);
  let spritePosition = new Point(10, 11);
  let spriteSize = new Size(4, 4);

  let obstacle = new Rectangle(0, 0, 50, 10);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  expect(sprite.bounceOffRectangleIfIntersecting(obstacle)).toBe(true);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffContainer_should_not_reverse_null_container", () => {
  let vector = new Vector(1, 1);
  let expectedVector = new Vector(1, 1);
  let spritePosition = new Point(10, 11);
  let spriteSize = new Size(4, 4);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  expect(sprite.bounceOffContainer()).toBe(false);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffContainer_should_reversex_left", () => {
  let vector = new Vector(-1, 1);
  let expectedVector = new Vector(1, 1);
  let spritePosition = new Point(1, 11);
  let spriteSize = new Size(4, 4);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  sprite.container = new Rectangle(0, 0, 100, 100);

  expect(sprite.bounceOffContainer()).toBe(true);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffContainer_should_reversex_right", () => {
  let vector = new Vector(1, 1);
  let expectedVector = new Vector(-1, 1);
  let spritePosition = new Point(95, 11);
  let spriteSize = new Size(4, 4);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  sprite.container = new Rectangle(0, 0, 100, 100);

  expect(sprite.bounceOffContainer()).toBe(true);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffContainer_should_reversey_top", () => {
  let vector = new Vector(-1, -1);
  let expectedVector = new Vector(-1, 1);
  let spritePosition = new Point(5, 1);
  let spriteSize = new Size(4, 4);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  sprite.container = new Rectangle(0, 0, 100, 100);

  expect(sprite.bounceOffContainer()).toBe(true);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
});

test("bounceOffContainer_should_reversey_bottom", () => {
  let vector = new Vector(1, 1);
  let expectedVector = new Vector(1, -1);
  let spritePosition = new Point(11, 95);
  let spriteSize = new Size(4, 4);

  let sprite = getSprite(spritePosition.x, spritePosition.y,
    spriteSize.width, spriteSize.height, 10, vector.x, vector.y);

  sprite.container = new Rectangle(0, 0, 100, 100);

  expect(sprite.bounceOffContainer()).toBe(true);
  expect(sprite.vector.equals(expectedVector)).toBe(true);
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