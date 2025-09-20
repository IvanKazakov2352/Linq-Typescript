import { Enumerable } from "../src/enumerable/enumerable"

describe("Testing the toArray function", () => {
  it("Testing the toArray function", () => {
    using query = new Enumerable([1, 2, 3, 4, 5])

    const result = query.toArray()
    expect(result).not.toBe([])
    expect(result).toHaveLength(5)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })
})