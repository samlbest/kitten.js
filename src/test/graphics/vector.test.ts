import Vector from "../../graphics/vector";

test("equals_should_return_true", () => {
  let vectorOne = new Vector(1, 2)
  let vectorTwo = new Vector(1, 2)
  
  expect(vectorOne.equals(vectorTwo)).toBe(true);
});

test("equals_should_return_false_1", () => {
  let vectorOne = new Vector(1, 1)
  let vectorTwo = new Vector(2, 1)
  
  expect(vectorOne.equals(vectorTwo)).toBe(false);
});

test("equals_should_return_false_2", () => {
  let vectorOne = new Vector(2, 1)
  let vectorTwo = new Vector(1, 2)
  
  expect(vectorOne.equals(vectorTwo)).toBe(false);
});

test("equals_should_return_false_3", () => {
  let vectorOne = new Vector(2, 1)
  let vectorTwo = new Vector(1, 1)
  
  expect(vectorOne.equals(vectorTwo)).toBe(false);
});

test("equals_should_return_false_4", () => {
  let vectorOne = new Vector(1, 2)
  let vectorTwo = new Vector(1, 1)
  
  expect(vectorOne.equals(vectorTwo)).toBe(false);
});

test("equals_should_return_false_5", () => {
  let vectorOne = new Vector(1, 2)
  let vectorTwo = new Vector(2, 1)
  
  expect(vectorOne.equals(vectorTwo)).toBe(false);
});