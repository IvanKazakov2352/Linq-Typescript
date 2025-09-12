import { Enumerable } from "../src/enumerable/enumerable"

describe("Testing the toArray function", () => {
  it("Testing the toArray function", () => {
    using query = new Enumerable([1, 2, 3, 4, 5])

    expect(query.toArray()).not.toBe([])
    expect(query.toArray()).toHaveLength(5)
    expect(query.toArray()).toEqual([1, 2, 3, 4, 5])
  })
})