import { Enumerable } from "../src/enumerable/enumerable";

describe("Skip", () => {
  it("Skipping first 50 values", () => {
    using query = new Enumerable(Enumerable.range(0, 100))
      .skip(50)

    const result = query.toArray()
    expect(result).toHaveLength(50)
    expect(result).toEqual(Enumerable.range(50, 50).toArray())
  });
  it("Skipping first 50 values and first 10 values", () => {
    using query = new Enumerable(Enumerable.range(0, 100))
      .skip(50)
      .take(10)

    const result = query.toArray()
    expect(result).toHaveLength(10)
    expect(result).toEqual(Enumerable.range(50, 10).toArray())
  });
  it("Skipping first 10 values and select transformation", () => {
    using query = new Enumerable(Enumerable.range(0, 20))
      .skip(10)
      .select(i => i * 2)

    const result = query.toArray()
    expect(result).toEqual([20, 22, 24, 26, 28, 30, 32, 34, 36, 38])
    expect(result).toHaveLength(10)
  });
  it("Skipping first 10 values and select transformation + take", () => {
    using query = new Enumerable(Enumerable.range(0, 20))
      .skip(10)
      .select(i => i * 2)
      .take(5)

    const result = query.toArray()
    expect(result).toEqual([20, 22, 24, 26, 28])
    expect(result).toHaveLength(5)
  });
  it("Not safe integer", () => {
    using query = new Enumerable(Enumerable.range(0, 100))

    expect(() => query.skip(('str') as any)).toThrow('Arguments must be safe integers')
    expect(() => query.skip(10)).not.toThrow('Arguments must be safe integers')
  });
});