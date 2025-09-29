import { Enumerable } from "../src/enumerable/enumerable"

describe("Any", () => {
  it("Any on non-empty sequence without predicate", () => {
    const query = Enumerable.range(1, 5);
    const result = query.any();
    expect(result).toBe(true);
  });
  it("Any on empty array", () => {
    const query = new Enumerable([])
    const result = query.any();
    expect(result).toBe(false);
  });
  it("Any on one element in the array", () => {
    const query = new Enumerable([{ age: 18, name: "John" }])
    const result = query.any();
    expect(result).toBe(true);
  });
  it("Any with predicate that returns true", () => {
    const query = Enumerable.range(1, 10);
    const result = query.any(x => x > 5);
    expect(result).toBe(true);
  });
  it("Any with predicate that returns false", () => {
    const query = Enumerable.range(1, 5);
    const result = query.any(x => x > 10);
    expect(result).toBe(false);
  });
  it("Any with index in predicate", () => {
    const query = Enumerable.range(10, 5);
    const result = query.any((x, index) => index === 3);
    expect(result).toBe(true);
  });
  it("Any stops on first match", () => {
    let callCount = 0;
    const predicate = (x: number) => {
      callCount++;
      return x === 3;
    };

    using query = Enumerable.range(1, 10);
    const result = query.any(predicate);

    expect(result).toBe(true);
    expect(callCount).toBe(3);
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
    
    const hasYoungPerson = query.any(p => p.age < 30);
    const hasOldPerson = query.any(p => p.age > 40);

    expect(hasYoungPerson).toBe(true);
    expect(hasOldPerson).toBe(false);
  });
  it("Any find a and bc word", () => {
    const words = ["a", "ab", "abc", "abcd", "abcde"];
    using query = new Enumerable(words)

    const hasAWord = query.any((word) => word === 'a')
    const hasBcWord = query.any((word) => word === 'bc')
    
    expect(hasAWord).toBe(true)
    expect(hasBcWord).toBe(false)
  });
});