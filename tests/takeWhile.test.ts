import { Enumerable } from "../src/enumerable/enumerable";

describe("TakeWhile", () => {
  it("Until the value is less than or equal to 6", () => {
    using query = new Enumerable(Enumerable.range(0, 25))
      .takeWhile((v) => v <= 6)

    const result = query.toArray()
    expect(result).not.toEqual([])
    expect(result).toHaveLength(7)
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6])
  });
  it("Until the value is less than 6", () => {
    using query = new Enumerable(Enumerable.range(0, 25))
      .takeWhile((v) => v < 6)

    const result = query.toArray()
    expect(result).not.toEqual([])
    expect(result).toHaveLength(6)
    expect(result).toEqual([0, 1, 2, 3, 4, 5])
  });
  it("The number 3 is not divisible without a remainder", () => {
    using query = new Enumerable(Enumerable.range(1, 10))
      .takeWhile(v => v % 3 !== 0)

    const result = query.toArray()
    expect(result).toHaveLength(2)
    expect(result).toEqual([1, 2])
  });
  it("Take while value divisible by 3 (starting from 0)", () => {
    using query = new Enumerable(Enumerable.range(0, 10))
      .takeWhile(x => x % 3 === 0);

    const result = query.toArray();
    expect(result).toEqual([0]);
  });
  it("Take while string contains 'a'", () => {
    const words = ["apple", "banana", "avocado", "cherry", "apricot"];
    using query = new Enumerable(words)
      .takeWhile(word => word.includes('a'));

    const result = query.toArray();
    expect(result).toEqual(["apple", "banana", "avocado"]);
  });
  it("Take while less than 6", () => {
    using query = new Enumerable(Enumerable.range(1, 10))
      .takeWhile(x => x < 6);

    const result = query.toArray();
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("Take while odd numbers", () => {
    using query = new Enumerable(Enumerable.range(1, 10))
      .takeWhile(x => x % 2 === 1);

    const result = query.toArray();
    expect(result).toEqual([1]);
  });
  it("Take while index less than 3", () => {
    using query = new Enumerable(Enumerable.range(100, 5))
      .takeWhile((_, index) => index < 3);

    const result = query.toArray();
    expect(result).toEqual([100, 101, 102]);
  });
  it("Take all elements (condition always true)", () => {
    using query = new Enumerable(Enumerable.range(1, 5))
      .takeWhile(x => x > 0);

    const result = query.toArray();
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("Take no elements (condition immediately false)", () => {
    using query = new Enumerable(Enumerable.range(1, 5))
      .takeWhile(x => x < 0);
      
    const result = query.toArray();
    expect(result).toEqual([]);
  });
  it('Callback argument error', () => {
    expect(() => new Enumerable([1, 2]).takeWhile('str' as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).takeWhile(1213123 as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).takeWhile(null as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).takeWhile((i) => i <= 6)).not.toThrow('Callback must be a function')
  })
});