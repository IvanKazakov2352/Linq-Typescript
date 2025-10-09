import { Enumerable } from "../src/enumerable/enumerable"
import { User } from "./mock-data";

describe("ElementAt", () => {
  it("ElementAt with object properties", () => {
    const people: User[] = [
      { name: "Alice", age: 25, id: 1 },
      { name: "Bob", age: 30, id: 2 },
      { name: "Charlie", age: 35, id: 3 }
    ];

    using query = new Enumerable(people)

    expect(query.elementAt(0)).toEqual(people[0])
    expect(query.elementAt(1)).toEqual(people[1])
    expect(query.elementAt(2)).toEqual(people[2])
  });
  it("ElementAt find a and bc word", () => {
    const words = ["a", "ab", "bc", "abcd", "abcde"];
    using query = new Enumerable(words)

    expect(query.elementAt(0)).toEqual(words[0])
    expect(query.elementAt(2)).toEqual(words[2])
  });
  it("Not safe integer", () => {
    using query = Enumerable.range(0, 100)

    expect(() => query.elementAt(1.5)).toThrow("Arguments must be safe integers");
    expect(() => query.elementAt(NaN)).toThrow("Arguments must be safe integers");
    expect(() => query.elementAt(Infinity)).toThrow("Arguments must be safe integers");
    expect(() => query.elementAt(-1)).toThrow("Index must be a non-negative integer");
    expect(() => query.elementAt(114)).toThrow(`Index ${114} out of range`);
  });
});