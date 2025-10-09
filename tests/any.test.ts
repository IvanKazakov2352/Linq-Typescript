import { Enumerable } from "../src/enumerable/enumerable"

describe("Any", () => {
  it("Any on non-empty sequence without predicate", () => {
    const query = Enumerable.range(1, 5);
    expect(query.any()).toBe(true);
  });
  it("Any on empty array", () => {
    const query = new Enumerable([])
    expect(query.any()).toBe(false);
  });
  it("Any on empty Set", () => {
    const query = new Enumerable(new Set())
    expect(query.any()).toBe(false);
  });
  it("Any on empty Map and Uint8Array", () => {
    const query = new Enumerable(new Map([]))
    const query2 = new Enumerable(new Uint8Array())
    expect(query.any()).toBe(false);
    expect(query2.any()).toBe(false);
  });
  it("Any on Set value", () => {
    const query = new Enumerable(new Set([1, 2]))
    expect(query.any()).toBe(true);
  });
  it("Any on one element in the array", () => {
    const query = new Enumerable([{ age: 18, name: "John" }])
    expect(query.any()).toBe(true);
  });
  it("Any with predicate that returns true", () => {
    const query = Enumerable.range(1, 10);
    expect(query.any(x => x > 5)).toBe(true);
  });
  it("Any with predicate that returns false", () => {
    const query = Enumerable.range(1, 5);
    expect(query.any(x => x > 10)).toBe(false);
  });
  it("Any with index in predicate", () => {
    const query = Enumerable.range(10, 5);
    expect(query.any((x, index) => index === 3)).toBe(true);
  });
  it("Any stops on first match", () => {
    let count = 0;
    const predicate = (x: number) => {
      count++;
      return x === 3;
    };

    using query = Enumerable.range(1, 10);
    const result = query.any(predicate);

    expect(result).toBe(true);
    expect(count).toBe(3);
  });
  it("Any with object properties", () => {
    interface Person {
      name: string;
      age: number;
    }

    const people: Person[] = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 35 }
    ];

    using query = new Enumerable(people);
    expect(query.any()).toBe(true)
    
    const hasYoungPerson = query.any(p => p.age < 30);
    const hasOldPerson = query.any(p => p.age > 40);

    expect(hasYoungPerson).toBe(true);
    expect(hasOldPerson).toBe(false);
  });
  it("Any find a and bc word", () => {
    const words = ["a", "ab", "abc", "abcd", "abcde"];
    using query = new Enumerable(words)

    const hasAChar = query.any((word) => word === 'a')
    const hasBcWord = query.any((word) => word === 'bc')
    
    expect(hasAChar).toBe(true)
    expect(hasBcWord).toBe(false)
  });
  it('Callback argument error', () => {
    expect(() => new Enumerable([1, 2]).any(123123123 as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).any((i) => i === 2)).not.toThrow('Callback must be a function')
  })
});