import { Enumerable } from "../src/enumerable/enumerable";

describe("Testing the take function", () => {
  it("Skipping first 50 values", () => {
    const numbers = new Enumerable(Enumerable.range(0, 100))
      .skip(50)
      .toArray()

    expect(numbers).toHaveLength(50)
    expect(numbers).toEqual(Enumerable.range(50, 50).toArray())
  });
  it("Skipping first 50 values and first 10 values", () => {
    const numbers = new Enumerable(Enumerable.range(0, 100))
      .skip(50)
      .take(10)
      .toArray()

    expect(numbers).toHaveLength(10)
    expect(numbers).toEqual(Enumerable.range(50, 10).toArray())
  });
  it("Skipping first 10 values and map transformation", () => {
    const numbers = new Enumerable(Enumerable.range(0, 20))
      .skip(10)
      .map(i => i * 2)
      .toArray()

    expect(numbers).toEqual([20, 22, 24, 26, 28, 30, 32, 34, 36, 38])
    expect(numbers).toHaveLength(10)
  });
  it("Skipping first 10 values and map transformation + take", () => {
    const numbers = new Enumerable(Enumerable.range(0, 20))
      .skip(10)
      .map(i => i * 2)
      .take(5)
      .toArray()

    expect(numbers).toEqual([20, 22, 24, 26, 28])
    expect(numbers).toHaveLength(5)
  });
});