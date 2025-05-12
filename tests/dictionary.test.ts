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
})