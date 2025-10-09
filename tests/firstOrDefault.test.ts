import { Enumerable } from "../src/enumerable/enumerable"
import { User } from "./mock-data";

describe("FirstOrDefault", () => {
  it("FirstOrDefault with filtered sequences", () => {
    using query = Enumerable.range(1, 10)
      .where(x => x % 2 === 0)
      .select(x => x * 10);

    expect(query.firstOrDefault()).toBe(20);
    expect(query.firstOrDefault(x => x > 50)).toBe(60);
  });
  it("FirstOrDefault with predicate where and first value", () => {
    using query = Enumerable.range(1, 11);
    const result = query
      .where(i => i === 10)
      .firstOrDefault()

    expect(result).toBe(10)
  });
  it("FirstOrDefault with fallback predicate and default value", () => {
    using query = Enumerable.range(1, 11);
    const result = query.firstOrDefault(x => x === 25, 100)

    expect(result).toBe(100)
  });
  it("FirstOrDefault empty Set and empty Map", () => {
    using emptySet = new Enumerable(new Set<number>())
    using emptyMap = new Enumerable(new Map<number, number>())
    
    expect(() => emptySet.firstOrDefault()).toThrow("Sequence contains no elements");
    expect(() => emptyMap.firstOrDefault()).toThrow("Sequence contains no elements");
    expect(emptyMap.firstOrDefault(([key, value]) => value === 1 && key === 1, [1, 1])).toEqual([1, 1])
  });
  it("FirstOrDefault with object properties", () => {
    const people: User[] = [
      { name: "Alice", age: 25, id: 1 },
      { name: "Bob", age: 30, id: 2 },
      { name: "Charlie", age: 35, id: 3 }
    ];
  
    using query = new Enumerable(people)
  
    expect(query.firstOrDefault(x => x.age === 35)).toEqual(people[2])
    expect(query.firstOrDefault(x => x.age === 25)).toEqual(people[0])
  });
  it("FirstOrDefault with object properties and default value", () => {
    const people: User[] = [
      { name: "Alice", age: 25, id: 1 },
      { name: "Bob", age: 30, id: 2 },
      { name: "Charlie", age: 35, id: 3 }
    ];
  
    using query = new Enumerable(people)
  
    expect(query.firstOrDefault(x => x.age === 44, people[0])).toEqual(people[0])
  });
  it("FirstOrDefault with predicate throws when no match", () => {
    using query = Enumerable.range(1, 5);
    expect(() => query.firstOrDefault(x => x > 10)).toThrow("Sequence contains no elements");
  });
  it("FirstOrDefault with generator fallback data and default value", () => {
    function* generator() {
      for (let i = 1; i <= 10; i++) {
        yield i;
      }
    }
    using query = new Enumerable(generator())
    expect(() => query.firstOrDefault(x => x > 18)).toThrow("Sequence contains no elements");
    expect(query.firstOrDefault(x => x > 18, 1)).toBe(1)
  });
  it("FirstOrDefault with predicate returns first matching element", () => {
    using query = Enumerable.range(1, 10);
    const result = query.firstOrDefault(x => x > 5);
    expect(result).toBe(6);
  });
  it("FirstOrDefault returns first element", () => {
    using query = Enumerable.range(10, 5);
    const result = query.firstOrDefault();
    expect(result).toBe(10);
  });
  it("FirstOrDefault returns buffer element", () => {
    using query = Enumerable.range(10, 6);
    const result = query.buffer(2).firstOrDefault()
    expect(result).toEqual([10, 11])
  });
  it("Callback argument error", () => {
    expect(() => new Enumerable([1, 2]).firstOrDefault('str' as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).firstOrDefault(1213123 as any)).toThrow('Callback must be a function')
  });
});