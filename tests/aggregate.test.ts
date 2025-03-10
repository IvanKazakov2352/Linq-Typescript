import { Enumerable } from "../src/enumerable"

describe("Testing the aggregation function", () => {
  it("Testing string addition", () => {
    const data = ["String", "Integer", "DateTime", "Float"]

    const aggregate = new Enumerable(data)
      .Aggregate("", (acc, curr) => acc += curr)

    expect(aggregate).toEqual("StringIntegerDateTimeFloat")
  })
  it("Testing the merging of objects", () => {
    const data = ["String", "Integer", "DateTime", "Float"]

    const aggregate = new Enumerable(data)
      .Aggregate({}, (acc, curr, index) => {
        return Object.assign(acc, {[`param${index}`]: curr})
      })
      
    expect(aggregate).toEqual({"param0": "String", "param1": "Integer", "param2": "DateTime", "param3": "Float"})
  })
})