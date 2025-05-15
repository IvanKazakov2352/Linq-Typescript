import { Dictionary } from "../src/dictionary/dictionary"
import { Enumerable } from "../src/enumerable/enumerable"

const iterableViaGenerator = {
  *[Symbol.iterator]() {
    yield { name: "Ivan", age: 18 };
    yield { name: "Liza", age: 25 };
    yield { name: "Anna", age: 30 };
  }
};

const devices: Map<string, number> = new Map<string, number>([
  ['IPhone 12', 0],
  ['IPhone 16 Pro', 1],
  ['IPad Pro', 2],
])

describe("Testing the ToDictionary function", () => {
  it("Creating an Dictionary instance with an array of numbers", () => {
    const dictionary = new Enumerable([1, 2, 3, 4, 5])
      .toDictionary()
    expect(dictionary).toBeInstanceOf(Dictionary)
  })
  it("Creating an Dictionary instance with an array of numbers", () => {
    const dictionary = new Enumerable([1, 2])
      .toDictionary()
    expect(dictionary.getDictionary()).toEqual({'0': 1, '1': 2})
    expect(dictionary.size).toBe(2)
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
    expect(dictionary.getDictionary()).toEqual({'0': { index: 0, num: 202 }})
    expect(dictionary.size).toBe(1)
  })
  it("Testing the presence of a value by key", () => {
    const query = new Enumerable([1, 2, 3, 4, 5])
      .toDictionary()
      .has("1")
    expect(query).toBe(true)
  })
  it("Testing when there is no value by key", () => {
    const query = new Enumerable([1, 2, 3, 4, 5])
      .toDictionary()
      .has("10")
    expect(query).toBe(false)
  })
  it("Testing Symbol iterator object", () => {
    const hasAnna = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .has("Anna")
    expect(hasAnna).toBe(true)

    const hasPetr = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .has("Petr")
    expect(hasPetr).toBe(false)
  })
  it("Dictionary cleaning test", () => {
    const clearedDictionary = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .clear()
    expect(clearedDictionary.getDictionary()).toEqual({})
    expect(clearedDictionary.size).toBe(0)
  })
  it("Dictionary add key and value", () => {
    const dictionary = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .add('Petr', { name: 'Petr', age: 12 })
    
    const result = {
      'Ivan': { name: "Ivan", age: 18 },
      'Liza': { name: "Liza", age: 25 },
      'Anna': { name: "Anna", age: 30 },
      'Petr': { name: "Petr", age: 12 },
    }
    expect(dictionary.getDictionary()).toEqual(result)
    expect(dictionary.size).toBe(4)
  })
  it("Add key and value after clearing the dictionary", () => {
    const dictionary = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .clear()
      .add('Petr', { name: 'Petr', age: 12 })

    const result = {
      'Petr': { name: "Petr", age: 12 },
    }
    expect(dictionary.getDictionary()).toEqual(result)
    expect(dictionary.size).toBe(1)
  })
  it("Dictionary add key and value error", () => {
    expect(() => new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .add('Ivan', { name: 'Ivan', age: 12 })
      .getDictionary()
    ).toThrow('The key already exists in the dictionary')
  })
  it("Delete a key-value pair from the dictionary", () => {
    const dictionary = new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .delete('Liza')
      .delete('Ivan')

    expect(dictionary.getDictionary()).toEqual({'Anna': { name: "Anna", age: 30 }})
    expect(dictionary.size).toBe(1)
  })
  it("Error when deleting a key-value pair from the dictionary", () => {
    expect(() => new Enumerable(iterableViaGenerator)
      .toDictionary((item) => item.name)
      .delete('Vahhhhh')
    ).toThrow("This key does not exist in the dictionary")
  })
  it("Converting Map to Dictionary then has, delete and size", () => {
    const resultDevices = new Enumerable(devices)
      .toDictionary(([key, _]) => key)

    expect(resultDevices.has('IPhone 12')).toBe(true)
    expect(resultDevices.size).toBe(3)
    expect(resultDevices.delete('IPhone 12').size).toBe(2)
    expect(resultDevices.clear().size).toBe(0)
    expect(resultDevices.add('IPhone 14 Pro', ['IPhone 14 Pro', 77]).size).toBe(1)
  })
})