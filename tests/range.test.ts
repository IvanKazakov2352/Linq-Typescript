import { Enumerable } from "../src/enumerable/enumerable"
import { INT32_MAX, INT32_MIN } from "../src/utils/constants"

describe("Testing the Range function", () => {
  it("Testing the Range function", () => {
    const range = Enumerable.Range(5, 5).ToArray()
    
    expect(range).not.toBe([])
    expect(range).toHaveLength(5)
    expect(range).toEqual([5, 6, 7, 8, 9])
  })
  it("Testing invalid arguments in Range method", () => {
    expect(() => Enumerable.Range(1, -1)).toThrow(`Count must be non-negative. Received ${-1}.`)
    expect(() => Enumerable.Range(([1, 2, 3]) as any, ('string') as any)).toThrow(`Arguments must be safe integers.`)
    expect(() => Enumerable.Range(INT32_MIN - 500, 1)).toThrow(`Start must be between ${INT32_MIN} and ${INT32_MAX}.`)
    expect(() => Enumerable.Range(INT32_MAX + 500, 1)).toThrow(`Start must be between ${INT32_MIN} and ${INT32_MAX}.`)
    expect(() => Enumerable.Range(22, INT32_MAX + 500)).toThrow(`Count must be at most ${INT32_MAX}.`)
  })
  it("Generation of numeric range from 0 to 1_000_000", () => {
    const million: number = 1_000_000
    
    const range = Enumerable
      .Range(0, million)
      .ToArray()

    expect(range).not.toBe([])
    expect(range).toHaveLength(million)
  })
  it("Generation of numeric range from 0 to 1_000_000", () => {
    const million: number = 1_000_000
    
    const range = Enumerable
      .Range(0, million)
      .ToArray()

    expect(range).not.toBe([])
    expect(range).toHaveLength(million)
  })
  it("Generation of a series of numbers from -10 to 1", () => {
    const range = Enumerable
      .Range(-10, 12)
      .ToArray()

    expect(range).toHaveLength(12)
    expect(range).not.toBe([])
    expect(range).toEqual([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1])
  })
})