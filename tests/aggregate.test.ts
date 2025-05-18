import { Enumerable } from "../src/enumerable/enumerable"

describe("Testing the aggregation function", () => {
  const data = ["String", "Integer", "DateTime", "Float"]
  let enumerable: Enumerable<string> |  null = null;

  beforeEach(() => {
    enumerable = new Enumerable(data)
  })

  it("Testing string addition", () => {
    if(enumerable) {
      const aggregate = enumerable.aggregate("", (acc, curr) => acc += curr)
      expect(aggregate).toEqual("StringIntegerDateTimeFloat")
    }
  })

  it("Testing the merging of objects", () => {
    if(enumerable) {
      const aggregate = enumerable.aggregate({}, (acc, curr, index) => {
        return Object.assign(acc, {[`param${index}`]: curr})
      }) 
      expect(aggregate).toEqual({
        "param0": "String",
        "param1": "Integer",
        "param2": "DateTime",
        "param3": "Float"
      })
    }
  })
})