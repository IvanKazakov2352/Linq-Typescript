import { User } from './mock-data';
import { Enumerable } from "../src/enumerable/enumerable"

describe("Buffer", () => {
  it("Splits array into chunks of specified size", () => {
    using query = Enumerable.range(1, 7).buffer(3);
    const result = query.toArray();
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });
  it("Handles exact division", () => {
    using query = Enumerable.range(1, 6).buffer(2);
    const result = query.toArray();
    expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
  });
  it("Works with chunk size 1", () => {
    using query = Enumerable.range(1, 3).buffer(1);
    const result = query.toArray();
    expect(result).toEqual([[1], [2], [3]]);
  });
  it("Handles large chunk size", () => {
    using query = Enumerable.range(1, 3).buffer(10);
    const result = query.toArray();
    expect(result).toEqual([[1, 2, 3]]);
  });
  it("Chaining with other methods", () => {
    using query = Enumerable.range(1, 10)
      .where(x => x % 2 === 0)
      .buffer(2)
      .select(chunk => chunk.reduce((a, b) => a + b, 0));

    const result = query.toArray();
    expect(result).toEqual([6, 14, 10]);
  });
  it("Lazy process", () => {
    function* generator() {
      for (let i = 1; i <= 10; i++) {
        yield i;
      }
    }

    using query = new Enumerable(generator())
      .buffer(3)
      .take(2);

    const result = query.toArray();
    expect(result).toEqual([[1, 2, 3], [4, 5, 6]]);
  });
  it("Works with objects", () => {
    const objects: User[] = [
      { id: 1, name: "Alice", age: 18 },
      { id: 2, name: "Bob", age: 20 },
      { id: 3, name: "Charlie", age: 25 },
      { id: 4, name: "David", age: 55 }
    ];
    
    using query = new Enumerable(objects).buffer(2);
    const result = query.toArray();
    
    expect(result).toEqual([
      [objects[0], objects[1]],
      [objects[2], objects[3]]
    ]);
  });
  it("Not safe integer", () => {
    using query = Enumerable.range(0, 100)

    expect(() => query.buffer(1.5)).toThrow("Arguments must be safe integers");
    expect(() => query.buffer(NaN)).toThrow("Arguments must be safe integers");
    expect(() => query.buffer(Infinity)).toThrow("Arguments must be safe integers");
    expect(() => query.buffer(-1)).toThrow("Chunk size must be a non-negative integer");
  });
});