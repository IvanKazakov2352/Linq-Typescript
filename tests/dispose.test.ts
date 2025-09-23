import { Enumerable } from "../src/enumerable/enumerable"

describe("Testing the Dispose function", () => {
  it("Testing the Dispose function", () => {
    const query = new Enumerable([1, 2, 3, 4, 5])
    const result = query.toArray()

    expect(result).not.toBe([])
    expect(result).toHaveLength(5)
    expect(result).toEqual([1, 2, 3, 4, 5])

    query.dispose()

    const errorText: string = 'Cannot iterate over a disposed object'
    expect(() => query.dispose()).toThrow(errorText)
    expect(() => query.where(num => num === 1)).toThrow(errorText)
    expect(() => query.toArray()).toThrow(errorText)
    expect(() => query.toDictionary()).toThrow(errorText)
    expect(() => query.aggregate(0, (acc, curr) => acc += curr)).toThrow(errorText)
    expect(() => query.map((i) => i.toFixed(0))).toThrow(errorText)
    expect(() => query.skip(1)).toThrow(errorText)
    expect(() => query.take(1)).toThrow(errorText)

    const dict = new Enumerable([1, 2, 3, 4, 5, 6])
      .toDictionary()

    dict.dispose()

    expect(() => dict.add(8, 8)).toThrow(errorText)
    expect(() => dict.clear()).toThrow(errorText)
    expect(() => dict.delete(8)).toThrow(errorText)
    expect(() => dict.dispose()).toThrow(errorText)
    expect(() => dict.get(8)).toThrow(errorText)
    expect(() => dict.getDictionary()).toThrow(errorText)
    expect(() => dict.has(8)).toThrow(errorText)
    expect(() => dict.size).toThrow(errorText)
  })
})