import { Enumerable } from "../src/enumerable"

describe("Testing the Dispose function", () => {
  it("Testing the Dispose function", () => {
    const enumerable = new Enumerable([1, 2, 3, 4, 5])

    expect(enumerable.ToArray()).not.toBe([])
    expect(enumerable.ToArray()).toHaveLength(5)
    expect(enumerable.ToArray()).toEqual([1, 2, 3, 4, 5])
    expect(enumerable.isDisposed$).toBe(false)

    enumerable.Dispose()

    expect(enumerable.ToArray()).toHaveLength(0)
    expect(enumerable.ToArray()).toEqual([])
    expect(enumerable.isDisposed$).toBe(true)

    try {
      enumerable.Where(num => num === 1)
    } catch (error) {
      expect(enumerable.Where(num => num === 1)).toThrow('Cannot iterate over a disposed object.')
    }
  })
})