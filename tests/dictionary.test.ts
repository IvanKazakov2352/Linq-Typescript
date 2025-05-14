import { Dictionary } from "../src/dictionary/dictionary"
import { Enumerable } from "../src/enumerable/enumerable"

describe("Testing the ToDictionary function", () => {
  it("Creating an Dictionary instance with an array of numbers", () => {
    const dictionary = new Enumerable([1, 2, 3, 4, 5])
      .ToDictionary()
    expect(dictionary).toBeInstanceOf(Dictionary)
  })
  it("Creating an Dictionary instance with an array of numbers", () => {
    const dictionary = new Enumerable([1, 2])
      .ToDictionary()
      .GetDictionary()
    expect(dictionary).toEqual({'0': 1, '1': 2})
  })
  it("Creating array filtering, array conversion and dictionary conversion", () => {
    interface Data {
      index: number;
      num: number;
    }
    const dictionary = new Enumerable([2, 4, 6, 8, 10])
      .Map(num => num * 100 + num)
      .Map<Data>((num, index) => ({ index, num }))
      .Where((obj) => obj.index === 0)
      .ToDictionary()
      .GetDictionary()
    expect(dictionary).toEqual({'0': { index: 0, num: 202 }})
  })
  it("Testing the presence of a value by key", () => {
    const query = new Enumerable([1, 2, 3, 4, 5])
      .ToDictionary()
      .ContainsKey("1")
    expect(query).toBe(true)
  })
  it("Testing when there is no value by key", () => {
    const query = new Enumerable([1, 2, 3, 4, 5])
      .ToDictionary()
      .ContainsKey("10")
    expect(query).toBe(false)
  })
  it("Testing Symbol iterator object ", () => {
    const iterableViaGenerator = {
      *[Symbol.iterator]() {
        yield { name: "Ivan", age: 18 };
        yield { name: "Liza", age: 25 };
        yield { name: "Anna", age: 30 };
      }
    };
    const hasAnna = new Enumerable(iterableViaGenerator)
      .ToDictionary((item) => item.name)
      .ContainsKey("Anna")
    expect(hasAnna).toBe(true)

    const hasPetr = new Enumerable(iterableViaGenerator)
      .ToDictionary((item) => item.name)
      .ContainsKey("Petr")
    expect(hasPetr).toBe(false)
  })
})