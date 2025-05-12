import { Enumerable } from "../src/enumerable/enumerable"

describe("Testing the Map function", () => {
  it("Testing the Map function with a numeric array", () => {
    const query = new Enumerable([1, 2, 3, 4, 5])
      .Map(num => num += 2 * 5)
      .ToArray()

    expect(query).not.toBe([])
    expect(query).toHaveLength(5)
    expect(query).toEqual([11, 12, 13, 14, 15])
  })
  it("Concat of key and value in a map collection", () => {
    const map = new Map([[1, 'One'], [2, 'Two'], [3, 'Three'], [4, 'Four'], [5, 'Five']])
    const query = new Enumerable(map)
      .Map(([key, value]) => `key: [${key}] value: [${value}]`)
      .ToArray()

    expect(query).not.toBe([])
    expect(query).toHaveLength(5)
    expect(query).toEqual(["key: [1] value: [One]", "key: [2] value: [Two]", "key: [3] value: [Three]", "key: [4] value: [Four]", "key: [5] value: [Five]"])
  })
  it("Concat of key and value in a map collection", () => {
    const query = new Enumerable(new Enumerable([2, 4, 6, 8, 10]))
      .Map(num => num * 100 + num)
      .ToArray()
      
    expect(query).not.toBe([])
    expect(query).toHaveLength(5)
    expect(query).toEqual([202, 404, 606, 808, 1010])
  })
  it("Checking the request instance", () => {
    const query = new Enumerable(new Enumerable([2, 4, 6, 8, 10]))
      .Map(num => num * 100 + num)
      
    expect(query).toBeInstanceOf(Enumerable)
    expect(query.ToArray()).toBeInstanceOf(Array)
  })
  it("Collection and index data concatenation", () => {
    interface Data {
      index: number;
      num: number;
    }
    const query = new Enumerable(new Enumerable([2, 4, 6, 8, 10]))
      .Map(num => num * 100 + num)
      .Map<Data>((num, index) => ({ index, num }))
      .Where((obj) => obj.index === 0)
      .ToArray()
      
    expect(query).not.toBe([])
    expect(query).toHaveLength(1)
    expect(query).toEqual([{index: 0, num: 202}])
  })
})