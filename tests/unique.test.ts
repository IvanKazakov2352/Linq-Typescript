import { Enumerable } from "../src/enumerable"

describe("Testing the Unique function", () => {
  it("Testing Unique function with a numeric array", () => {
    const query = new Enumerable([1,1,1,2,3,3,5,4,4,4,6,5,2,5,2,1,1])
      .Unique()
      .ToArray()

    expect(query).toEqual([1, 2, 3, 5, 4, 6])
    expect(query).toHaveLength(6)
  })
  it("Testing Unique function with Map collection", () => {
    const collection: Map<string, number> = 
      new Map<string, number>([
        ['key', 11],
        ['key', 11],
        ['key1', 2],
        ['key1', 2],
        ['key1', 2],
        ['key', 2],
        ['key3', 3],
        ['key2', 5],
        ['key23', 5],
      ])
    const query = new Enumerable(collection)
      .Unique(([ key ]) => key)
      .ToArray()

    expect(query).toEqual([['key', 2], ['key1', 2], ['key3', 3], ['key2', 5], ['key23', 5]])
  })
  it("Testing the Unique function with the list of products", () => {
    const products = [{productId: '1', title: "IPhone"}, {productId: '2', title: "Nokia"}, {productId: '1', title: "IPhone12"}, {productId: '2', title: "Tefal"}]

    const query = new Enumerable(products)
      .Unique((product) => product.productId)
      .ToArray()
    
    expect(query).toEqual([products[0], products[1]])
  })
})