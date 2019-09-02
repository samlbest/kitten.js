import Size from "../../graphics/size";

test("equals_should_return_true", () => {
  let sizeOne = new Size(1, 2)
  let sizeTwo = new Size(1, 2)
  
  expect(sizeOne.equals(sizeTwo)).toBe(true);
});

test("equals_should_return_false_1", () => {
  let sizeOne = new Size(1, 1)
  let sizeTwo = new Size(2, 1)
  
  expect(sizeOne.equals(sizeTwo)).toBe(false);
});

test("equals_should_return_false_2", () => {
  let sizeOne = new Size(2, 1)
  let sizeTwo = new Size(1, 2)
  
  expect(sizeOne.equals(sizeTwo)).toBe(false);
});

test("equals_should_return_false_3", () => {
  let sizeOne = new Size(2, 1)
  let sizeTwo = new Size(1, 1)
  
  expect(sizeOne.equals(sizeTwo)).toBe(false);
});

test("equals_should_return_false_4", () => {
  let sizeOne = new Size(1, 2)
  let sizeTwo = new Size(1, 1)
  
  expect(sizeOne.equals(sizeTwo)).toBe(false);
});

test("equals_should_return_false_5", () => {
  let sizeOne = new Size(1, 2)
  let sizeTwo = new Size(2, 1)
  
  expect(sizeOne.equals(sizeTwo)).toBe(false);
});