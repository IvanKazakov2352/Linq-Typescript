import { Enumerable } from "../src/enumerable/enumerable"

describe("Testing the toArray function", () => {
  it("Testing the toArray function", () => {
    const query = new Enumerable([1, 2, 3, 4, 5])
      .toArray()

    expect(query).not.toBe([])
    expect(query).toHaveLength(5)
    expect(query).toEqual([1, 2, 3, 4, 5])
  })
})