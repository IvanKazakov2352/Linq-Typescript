import { Enumerable } from "../src/enumerable/enumerable"

describe("Testing the Dispose function", () => {
  it("Testing the Dispose function", () => {
    const enumerable = new Enumerable([1, 2, 3, 4, 5])

    expect(enumerable.toArray()).not.toBe([])
    expect(enumerable.toArray()).toHaveLength(5)
    expect(enumerable.toArray()).toEqual([1, 2, 3, 4, 5])
    expect(enumerable.isDisposed$).toBe(false)

    enumerable.dispose()

    expect(enumerable.toArray()).toHaveLength(0)
    expect(enumerable.toArray()).toEqual([])
    expect(enumerable.isDisposed$).toBe(true)

    try {
      enumerable.where(num => num === 1)
    } catch (error) {
      expect(enumerable.where(num => num === 1)).toThrow('Cannot iterate over a disposed object.')
    }
  })
})