import { User } from './mock-data';
import { Enumerable } from "../src/enumerable/enumerable"

describe("ElementAtOrDefault", () => {
  it("ElementAtOrDefault with object properties", () => {
    const people: User[] = [
      { name: "Alice", age: 25, id: 1 },
      { name: "Bob", age: 30, id: 2 },
      { name: "Charlie", age: 35, id: 3 }
    ];

    using query = new Enumerable(people)

    expect(query.elementAtOrDefault(0)).toEqual(people[0])
    expect(query.elementAtOrDefault(1)).toEqual(people[1])
    expect(query.elementAtOrDefault(2)).toEqual(people[2])
    expect(query.elementAtOrDefault(7, people[1])).toEqual(people[1])
    expect(query.elementAtOrDefault(8, people[2])).toEqual(people[2])
    expect(() => query.where(i => i.age === 25).elementAtOrDefault(2)).toThrow(`Index ${2} out of range`)
    expect(query.where(i => i.age === 25).elementAtOrDefault(2, people[2])).toEqual(people[2])
  });
  it("ElementAtOrDefault with number range", () => {
    using query = Enumerable.range(0, 100)
    expect(query.elementAtOrDefault(22)).toBe(22)
    expect(query.elementAtOrDefault(35)).toBe(35)
    expect(query.elementAtOrDefault(501, 1)).toBe(1)
  });
  it("Not safe integer", () => {
    using query = Enumerable.range(0, 100)

    expect(() => query.elementAtOrDefault(1.5)).toThrow("Arguments must be safe integers");
    expect(() => query.elementAtOrDefault(NaN)).toThrow("Arguments must be safe integers");
    expect(() => query.elementAtOrDefault(Infinity)).toThrow("Arguments must be safe integers");
    expect(() => query.elementAtOrDefault(-1)).toThrow("Index must be a non-negative integer");
    expect(() => query.elementAtOrDefault(114)).toThrow(`Index ${114} out of range`);
    expect(() => query.elementAtOrDefault(114, 1)).not.toThrow(`Index ${114} out of range`);
  });
});