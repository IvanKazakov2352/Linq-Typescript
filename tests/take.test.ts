import { Enumerable } from "../src/enumerable/enumerable";
import { numbers, getUsers } from "./mock-data"

describe("Testing the take function", () => {
  it("First three numbers test", () => {
    using query = new Enumerable(numbers(15)).take(3)

    const result = query.toArray()
    expect(result.length).toBe(3);
    expect(result.length).not.toBe(5);
    expect(result).toHaveLength(3)
    expect(result).toEqual([0, 1, 2])
  });

  it("First 7 users", () => {
    using query = new Enumerable(getUsers(10)).take(7)

    const result = query.toArray()
    expect(result.length).toBe(7);
    expect(result.length).not.toBe(9);
    expect(result).toHaveLength(7)
  });

  it("Take + where", () => {
    using query = new Enumerable(numbers(15))
      .take(7)
      .where(num => num === 1 || num === 6)

    const result = query.toArray()
    expect(result.length).toBe(2);
    expect(result.length).not.toBe(17);
    expect(result).toHaveLength(2)
  });

  it("Take + range", () => {
    using query = new Enumerable(Enumerable.range(2, 9)).take(4)

    const result = query.toArray()
    expect(result.length).toBe(4);
    expect(result).toHaveLength(4);
    expect(result).toEqual([2, 3, 4, 5])
    expect(result).not.toEqual([6, 6, 6, 6])
  });
  it("Not safe integer", () => {
    using query = new Enumerable(Enumerable.range(0, 100))

    expect(() => query.take(('str') as any)).toThrow('Arguments must be safe integers')
  });
});
