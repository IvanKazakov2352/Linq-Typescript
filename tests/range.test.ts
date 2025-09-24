import { Enumerable } from "../src/enumerable/enumerable"
import { INT32_MAX, INT32_MIN } from "../src/utils/constants"

describe("Range", () => {
  it("Testing the range function", () => {
    using range = Enumerable.range(5, 5)
    const result = range.toArray()

    expect(result).not.toBe([])
    expect(result).toHaveLength(5)
    expect(result).toEqual([5, 6, 7, 8, 9])
  })
  it("Testing invalid arguments in range method", () => {
    expect(() => Enumerable.range(1, -1)).toThrow(`Count must be non-negative. Received ${-1}`)
    expect(() => Enumerable.range(([1, 2, 3]) as any, ('string') as any)).toThrow(`Arguments must be safe integers`)
    expect(() => Enumerable.range(10, 25)).not.toThrow('Arguments must be safe integers')
    expect(() => Enumerable.range(INT32_MIN - 500, 1)).toThrow(`Start must be between ${INT32_MIN} and ${INT32_MAX}`)
    expect(() => Enumerable.range(INT32_MAX + 500, 1)).toThrow(`Start must be between ${INT32_MIN} and ${INT32_MAX}`)
    expect(() => Enumerable.range(22, INT32_MAX + 500)).toThrow(`Count must be at most ${INT32_MAX}`)
  })
  it("Generation of numeric range from 0 to 1_000_000", () => {
    const million: number = 1_000_000
    using range = Enumerable.range(0, million)

    const result = range.toArray()
    expect(result).not.toBe([])
    expect(result).toHaveLength(million)
  })
  it("Generation of a series of numbers from -10 to 1", () => {
    using range = Enumerable.range(-10, 12)

    const result = range.toArray()
    expect(result).toHaveLength(12)
    expect(result).not.toBe([])
    expect(result).toEqual([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1])
  })
})