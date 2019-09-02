import Point from "../../graphics/point";

test("equals_should_return_true", () => {
  let pointOne = new Point(1, 2)
  let pointTwo = new Point(1, 2)
  
  expect(pointOne.equals(pointTwo)).toBe(true);
});

test("equals_should_return_false_1", () => {
  let pointOne = new Point(1, 1)
  let pointTwo = new Point(2, 1)
  
  expect(pointOne.equals(pointTwo)).toBe(false);
});

test("equals_should_return_false_2", () => {
  let pointOne = new Point(2, 1)
  let pointTwo = new Point(1, 2)
  
  expect(pointOne.equals(pointTwo)).toBe(false);
});

test("equals_should_return_false_3", () => {
  let pointOne = new Point(2, 1)
  let pointTwo = new Point(1, 1)
  
  expect(pointOne.equals(pointTwo)).toBe(false);
});

test("equals_should_return_false_4", () => {
  let pointOne = new Point(1, 2)
  let pointTwo = new Point(1, 1)
  
  expect(pointOne.equals(pointTwo)).toBe(false);
});

test("equals_should_return_false_5", () => {
  let pointOne = new Point(1, 2)
  let pointTwo = new Point(2, 1)
  
  expect(pointOne.equals(pointTwo)).toBe(false);
});