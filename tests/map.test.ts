import { Enumerable } from "../src/enumerable/enumerable"

describe("Testing the Map function", () => {
  it("Testing the Map function with a numeric array", () => {
    using query = new Enumerable([1, 2, 3, 4, 5])
      .map(num => num += 2 * 5)

    const result = query.toArray()

    expect(result).not.toBe([])
    expect(result).toHaveLength(5)
    expect(result).toEqual([11, 12, 13, 14, 15])
  })
  it("Concat of key and value in a map collection", () => {
    const map = new Map([[1, 'One'], [2, 'Two'], [3, 'Three'], [4, 'Four'], [5, 'Five']])

    using query = new Enumerable(map)
      .map(([key, value]) => `key: [${key}] value: [${value}]`)

    const result = query.toArray()

    expect(result).not.toBe([])
    expect(result).toHaveLength(5)
    expect(result).toEqual(["key: [1] value: [One]", "key: [2] value: [Two]", "key: [3] value: [Three]", "key: [4] value: [Four]", "key: [5] value: [Five]"])
  })
  it("Concat of key and value in a map collection", () => {
    using query = new Enumerable(new Enumerable([2, 4, 6, 8, 10]))
      .map(num => num * 100 + num)

    const result = query.toArray()
      
    expect(result).not.toBe([])
    expect(result).toHaveLength(5)
    expect(result).toEqual([202, 404, 606, 808, 1010])
  })
  it("Checking the request instance", () => {
    using query = new Enumerable(new Enumerable([2, 4, 6, 8, 10]))
      .map(num => num * 100 + num)
      
    expect(query).toBeInstanceOf(Enumerable)
    expect(query.toArray()).toBeInstanceOf(Array)
  })
  it("Collection and index data concatenation", () => {
    interface Data {
      index: number;
      num: number;
    }

    using query = new Enumerable(new Enumerable([2, 4, 6, 8, 10]))
      .map(num => num * 100 + num)
      .map<Data>((num, index) => ({ index, num }))
      .where((obj) => obj.index === 0)

    const result = query.toArray()
      
    expect(result).not.toBe([])
    expect(result).toHaveLength(1)
    expect(result).toEqual([{index: 0, num: 202}])
  })
  it('Callback argument error', () => {
    expect(() => new Enumerable([1, 2]).map('str' as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).map(1213123 as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).map((i) => i * 2)).not.toThrow('Callback must be a function')
  })
})