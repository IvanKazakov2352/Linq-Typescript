import { Enumerable } from "../src/enumerable"

describe("Testing the Range function", () => {
  it("Testing the Range function", () => {
    const range = Enumerable.Range(5, 5).ToArray()
    
    expect(range).not.toBe([])
    expect(range).toHaveLength(5)
    expect(range).toEqual([5, 6, 7, 8, 9])
  })
  it("Testing invalid arguments in Range method", () => {
    const errorText: string = "The value of the start number must not be negative"

    expect(() => Enumerable.Range(1, -1)).toThrow(errorText)
    expect(() => Enumerable.Range(-1, 0)).toThrow(errorText)
    expect(() => Enumerable.Range(-1, -2)).toThrow(errorText)
  })
  it("Generation of numeric range from 0 to 1_000_000", () => {
    const million: number = 1_000_000
    
    const range = Enumerable
      .Range(0, million)
      .ToArray()

    expect(range).not.toBe([])
    expect(range).toHaveLength(million)
  })
})