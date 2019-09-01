import Rectangle from "../../graphics/rectangle";

test("intersects_should_return_true_same_dimensions", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(50, 50, 50, 50);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(true);
});

test("intersects_should_return_true_inside", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(51, 51, 40, 40);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(true);
});

test("intersects_should_return_true_left", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(0, 50, 50, 1);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(true);
});

test("intersects_should_return_true_right", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(100, 50, 100, 100);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(true);
});

test("intersects_should_return_true_top", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(50, 0, 1, 50);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(true);
});

test("intersects_should_return_true_bottom", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(50, 100, 1000, 1000);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(true);
});

test("intersects_should_return_false_left", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(0, 50, 49, 100);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(false);
});

test("intersects_should_return_false_top", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(50, 0, 1000, 49);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(false);
});

test("intersects_should_return_false_right", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(101, 50, 500, 500);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(false);
});

test("intersects_should_return_false_bottom", () => {
  let rectangleOne = new Rectangle(50, 50, 50, 50);
  let rectangleTwo = new Rectangle(50, 101, 1000, 1000);
  
  expect(rectangleOne.intersects(rectangleTwo)).toBe(false);
});