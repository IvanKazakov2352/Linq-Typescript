import { Dictionary } from "../src/dictionary/dictionary"
import { Enumerable } from "../src/enumerable/enumerable"

const iterableViaGenerator = {
  *[Symbol.iterator]() {
    yield { name: "Ivan", age: 18 };
    yield { name: "Liza", age: 25 };
    yield { name: "Anna", age: 30 };
  }
};

describe("Testing the ToDictionary function", () => {
  it("Creating an Dictionary instance with an array of numbers", () => {
    const dictionary = new Enumerable([1, 2, 3, 4, 5])
      .toDictionary()
    expect(dictionary).toBeInstanceOf(Dictionary)
  })
  it("Creating an Dictionary instance with an array of numbers", () => {
    const dictionary = new Enumerable([1, 2])
      .toDictionary()
      .getDictionary()
    expect(dictionary).toEqual({'0': 1, '1': 2})
  })
  it("Creating array filtering, array conversion and dictionary conversion", () => {
    interface Data {
      index: number;
      num: number;
    }
    const dictionary = new Enumerable([2, 4, 6, 8, 10])
      .map(num => num * 100 + num)
      .map<Data>((num, index) => ({ index, num }))
      .where((obj) => obj.index === 0)
      .toDictionary()
      .getDictionary()
    expect(dictionary).toEqual({'0': { index: 0, num: 202 }})
  })
  it("Testing the presence of a value by key", () => {
    const query = new Enumerable([1, 2, 3, 4, 5])
      .toDictionary()
      .containsKey("1")
    expect(query).toBe(true)
  })
  it("Testing when there is no value by key", () => {
    const query = new Enumerable([1, 2, 3, 4, 5])
      .toDictionary()
      .containsKey("10")
    expect(query).toBe(false)
  })
  it("Testing Symbol iterator object", () => {
    const hasAnna = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .containsKey("Anna")
    expect(hasAnna).toBe(true)

    const hasPetr = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .containsKey("Petr")
    expect(hasPetr).toBe(false)
  })
  it("Dictionary cleaning test", () => {
    const clearedDictionary = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .clear()
      .getDictionary()
    expect(clearedDictionary).toEqual({})
  })
  it("Dictionary add key and value", () => {
    const dictionary = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .add('Petr', { name: 'Petr', age: 12 })
      .getDictionary()
    
    const result = {
      'Ivan': { name: "Ivan", age: 18 },
      'Liza': { name: "Liza", age: 25 },
      'Anna': { name: "Anna", age: 30 },
      'Petr': { name: "Petr", age: 12 },
    }
    expect(dictionary).toEqual(result)
  })
  it("Add key and value after clearing the dictionary", () => {
    const dictionary = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .clear()
      .add('Petr', { name: 'Petr', age: 12 })
      .getDictionary()

    const result = {
      'Petr': { name: "Petr", age: 12 },
    }
    expect(dictionary).toEqual(result)
  })
  it("Dictionary add key and value error", () => {
    expect(() => new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .add('Ivan', { name: 'Ivan', age: 12 })
      .getDictionary()
    ).toThrow('The key already exists in the dictionary')
  })
})