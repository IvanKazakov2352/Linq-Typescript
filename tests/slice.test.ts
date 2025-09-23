import { Enumerable } from "../src/enumerable/enumerable";

describe("Testing the slice function", () => {
  it("Slice from 5 to 15", () => {
    using query = new Enumerable(Enumerable.range(0, 15))
      .slice(5, 15)

    const result = query.toArray()

    expect(result).not.toHaveLength(0)
    expect(result).toEqual([5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
  });
  it("Slice from 5 to 15 and skip 2", () => {
    using query = new Enumerable(Enumerable.range(0, 15))
      .slice(5, 15)
      .skip(2)

    const result = query.toArray()

    expect(result).not.toHaveLength(0)
    expect(result).toEqual([7, 8, 9, 10, 11, 12, 13, 14])
  });
  it("Slice from 5 to 15 and skip 2 and take 4", () => {
    using query = new Enumerable(Enumerable.range(0, 15))
      .slice(5, 15)
      .skip(2)
      .take(4)

    const result = query.toArray()

    expect(result).not.toHaveLength(0)
    expect(result).toEqual([7, 8, 9, 10])
  });
  it("Slice from 5 to 15 and skip 2 and take 4 and data addition", () => {
    using query = new Enumerable(Enumerable.range(0, 15))
      .slice(5, 15)
      .skip(2)
      .take(4)
      .map(i => i + 5)

    const result = query.toArray()

    expect(result).not.toHaveLength(0)
    expect(result).toEqual([7 + 5, 8 + 5, 9 + 5, 10 + 5])
  });
  it('Numbers start and end argument error', () => {
    expect(() => new Enumerable([1, 2]).slice(('str' as any))).toThrow('Arguments must be safe integers')
    const numbers = new Enumerable([1, 2])
      .slice(0, (() => {}) as any)
      .toArray()

    expect(numbers).toEqual([1, 2])
  })
  it('Slice from 250 to 350', () => {
    using query = new Enumerable(Enumerable.range(100, 500))
      .slice(250, 350)

    const result = query.toArray()

    expect(result).toHaveLength(100)
  })
  it('Slice from 250 to 350', () => {
    using query = new Enumerable(Enumerable.range(100, 500))
      .slice(250, 350)
      .where(i => i % 10 === 0)
      
    const result = query.toArray()
    expect(result).toHaveLength(10)
    expect(result).toEqual([350, 360, 370, 380, 390, 400, 410, 420, 430, 440])
  })
});
