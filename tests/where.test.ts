import { Enumerable } from "../src/enumerable/enumerable"

describe('Testing the where method', () => {
  it('Filtering of odd numbers', () => {
    using query = new Enumerable(Enumerable.range(0, 20))
      .where(num => num % 2 === 0)

    const result = query.toArray()
    expect(result).toHaveLength(10)
    expect(result).not.toBe([])
  })
  it('Filtering two numbers 10 and 20', () => {
    using query = new Enumerable(Enumerable.range(0, 20))
      .where(num => num !== 10 && num !== 20)

    const result = query.toArray()
    expect(result).toHaveLength(19)
    expect(result).not.toBe([])
  })
  it('Filtering key-value pairs in Map collection', () => {
    const statuses: Map<number, string> = new Map<number, string>([[1, 'Success'], [2, 'Failed'], [3, 'Pending']])
    using query = new Enumerable(statuses)
      .where(([key, value]) => key === 1 || key === 3 && value === 'Pending')

    const result = query.toArray()
    expect(result).not.toBe([])
    expect(result).toHaveLength(2)
    expect(result).toEqual([[1, 'Success'], [3, 'Pending']])
  })
  it('Filtering letters D in a string', () => {
    const str: string = "DrDrDfDgDhDjDk"
    using query = new Enumerable(str)
      .where((s) => s === "D")

    const result = query.toArray()
    expect(result).not.toBe([])
    expect(result).toHaveLength(7)
    expect(result).toEqual(['D','D','D','D','D','D','D'])
  })
  it('Filtering an array with users', () => {
    const users = [{ name: 'Ivan', age: 18 }, { name: 'Liza', age: 13 }, { name: 'Max', age: 17 }]

    using query = new Enumerable(users)
      .where((user) => user.name === "Ivan" || user.age === 17)

    const result = query.toArray()
    expect(result).not.toBe([])
    expect(result).toHaveLength(2)
    expect(result).toEqual([users[0], users[2]])
  })

  it('Callback argument error', () => {
    expect(() => new Enumerable([1, 2]).where('str' as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).where(1213123 as any)).toThrow('Callback must be a function')
    expect(() => new Enumerable([1, 2]).where((i) => i === 2)).not.toThrow('Callback must be a function')
  })
})