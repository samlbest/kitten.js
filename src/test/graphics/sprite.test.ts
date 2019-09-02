import Sprite from "../../graphics/sprite";
import Point from "../../graphics/point";
import Size from "../../graphics/size";
import Vector from "../../graphics/vector";

test("getNextPosition_should_return_current_plus_vector", () => {
  let x = 1;
  let y = 2;
  let vectorX = 4;
  let vectorY = 7;
  let expected = new Point(x + vectorX, y + vectorY);

  let sprite = getSprite(x, y, 4, 4, 1000, vectorX, vectorY);
  
  expect(sprite.getNextPosition().equals(expected)).toBe(true);
});

let getSprite = (x: number, 
  y: number, 
  width: number, 
  height: number, 
  maxDirectionalSpeed: number,
  vectorX: number,
  vectorY: number) => {
  return new Sprite({
    context: null,
    position: new Point(x, y),
    size: new Size(width, height),
    maxDirectionalSpeed: maxDirectionalSpeed,
    initialVector: new Vector(vectorX, vectorY)
  });
};