import { getMockData } from './mock-data';
import { Enumerable } from "../src/enumerable/enumerable";

describe("SkipWhile", () => {
  it("Skip values ​​until the value is equal to 6", () => {
    using query = new Enumerable(getMockData(50))
      .skipWhile(x => x.value % 3 !== 0)

    const result = query.toArray()
    expect(result).toHaveLength(4)
  });
  it("Skip while less than 5", () => {
    using query = new Enumerable(Enumerable.range(1, 10))
      .skipWhile(x => x < 5);
      
    const result = query.toArray();
    expect(result).toEqual([5, 6, 7, 8, 9, 10]);
  });
  it("Skip while even numbers", () => {
    using query = new Enumerable(Enumerable.range(1, 10))
      .skipWhile(x => x % 2 === 0);

    const result = query.toArray();
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  it("Skip while index less than 3", () => {
    using query = new Enumerable(Enumerable.range(10, 5))
      .skipWhile((_, index) => index < 3);
      
    const result = query.toArray();
    expect(result).toEqual([13, 14]);
  });
  it("Skip all elements (condition always true)", () => {
    using query = new Enumerable(Enumerable.range(1, 5))
      .skipWhile(x => x < 10);

    const result = query.toArray();
    expect(result).toEqual([]);
  });
  it("Skip no elements (condition immediately false)", () => {
    using query = new Enumerable(Enumerable.range(1, 5))
      .skipWhile(x => x > 10);

    const result = query.toArray();
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("Skip while string length less than 3", () => {
    const words = ["a", "ab", "abc", "abcd", "abcde"];
    using query = new Enumerable(words)
      .skipWhile(word => word.length < 3);

    const result = query.toArray();
    expect(result).toEqual(["abc", "abcd", "abcde"]);
  });
  it('Callback argument error', () => {
    expect(() => new Enumerable([1, 2]).skipWhile('str' as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).skipWhile(1213123 as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).skipWhile(null as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).skipWhile((i) => i <= 6)).not.toThrow('Callback must be a function')
  })
});