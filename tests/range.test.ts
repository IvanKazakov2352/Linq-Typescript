import { Enumerable } from "../src/enumerable/enumerable"
import { INT32_MAX, INT32_MIN } from "../src/utils/constants"

describe("Testing the range function", () => {
  it("Testing the range function", () => {
    const range = Enumerable.range(5, 5).toArray()
    
    expect(range).not.toBe([])
    expect(range).toHaveLength(5)
    expect(range).toEqual([5, 6, 7, 8, 9])
  })
  it("Testing invalid arguments in range method", () => {
    expect(() => Enumerable.range(1, -1)).toThrow(`Count must be non-negative. Received ${-1}.`)
    expect(() => Enumerable.range(([1, 2, 3]) as any, ('string') as any)).toThrow(`Arguments must be safe integers.`)
    expect(() => Enumerable.range(INT32_MIN - 500, 1)).toThrow(`Start must be between ${INT32_MIN} and ${INT32_MAX}.`)
    expect(() => Enumerable.range(INT32_MAX + 500, 1)).toThrow(`Start must be between ${INT32_MIN} and ${INT32_MAX}.`)
    expect(() => Enumerable.range(22, INT32_MAX + 500)).toThrow(`Count must be at most ${INT32_MAX}.`)
  })
  it("Generation of numeric range from 0 to 1_000_000", () => {
    const million: number = 1_000_000
    
    const range = Enumerable
      .range(0, million)
      .toArray()

    expect(range).not.toBe([])
    expect(range).toHaveLength(million)
  })
  it("Generation of a series of numbers from -10 to 1", () => {
    const range = Enumerable
      .range(-10, 12)
      .toArray()

    expect(range).toHaveLength(12)
    expect(range).not.toBe([])
    expect(range).toEqual([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1])
  })
})