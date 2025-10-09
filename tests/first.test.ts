import { Enumerable } from "../src/enumerable/enumerable"
import { User } from "./mock-data";

describe("First", () => {
  it("First with filtered sequences", () => {
    using query = Enumerable.range(1, 10)
      .where(x => x % 2 === 0)
      .select(x => x * 10);

    expect(query.first()).toBe(20);
    expect(query.first(x => x > 50)).toBe(60);
  })
  it("First with predicate where and first value", () => {
    using query = Enumerable.range(1, 11);
    const result = query
      .where(i => i === 10)
      .first()

    expect(result).toBe(10)
  });
  it("First with predicate throws when no match", () => {
    using query = Enumerable.range(1, 5);
    expect(() => query.first(x => x > 10)).toThrow("Sequence contains no elements");
  });
  it("First with object properties", () => {
    const people: User[] = [
      { name: "Alice", age: 25, id: 1 },
      { name: "Bob", age: 30, id: 2 },
      { name: "Charlie", age: 35, id: 3 }
    ];

    using query = new Enumerable(people)

    expect(query.first(x => x.age === 35)).toEqual(people[2])
    expect(query.first(x => x.age === 25)).toEqual(people[0])
  });
  it("First with predicate returns first matching element", () => {
    using query = Enumerable.range(1, 10);
    const result = query.first(x => x > 5);
    expect(result).toBe(6);
  });
  it("First returns first element", () => {
    using query = Enumerable.range(10, 5);
    const result = query.first();
    expect(result).toBe(10);
  });
  it("First returns buffer element", () => {
    using query = Enumerable.range(10, 6);
    const result = query.buffer(2).first()
    expect(result).toEqual([10, 11])
  });
  it("Callback argument error", () => {
    expect(() => new Enumerable([1, 2]).first('str' as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).first(1213123 as any)).toThrow('Callback must be a function')
  });
});