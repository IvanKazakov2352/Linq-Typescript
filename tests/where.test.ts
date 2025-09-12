import { Enumerable } from "../src/enumerable/enumerable"

describe('Testing the where method', () => {
  it('Filtering of odd numbers', () => {
    using query = new Enumerable(Enumerable.range(0, 20))
      .where(num => num % 2 === 0)
      
    expect(query.toArray()).toHaveLength(10)
    expect(query.toArray()).not.toBe([])
  })
  it('Filtering two numbers 10 and 20', () => {
    using query = new Enumerable(Enumerable.range(0, 20))
      .where(num => num !== 10 && num !== 20)

    expect(query.toArray()).toHaveLength(19)
    expect(query.toArray()).not.toBe([])
  })
  it('Filtering key-value pairs in Map collection', () => {
    const statuses: Map<number, string> = new Map<number, string>([[1, 'Success'], [2, 'Failed'], [3, 'Pending']])
    const query = new Enumerable(statuses)
      .where(([key, value]) => key === 1 || key === 3 && value === 'Pending')
      .toArray()
      

    expect(query).not.toBe([])
    expect(query).toHaveLength(2)
    expect(query).toEqual([[1, 'Success'], [3, 'Pending']])
  })
  it('Filtering letters D in a string', () => {
    const str: string = "DrDrDfDgDhDjDk"
    const query = new Enumerable(str)
      .where((s) => s === "D")
      .toArray()
    
    expect(query).not.toBe([])
    expect(query).toHaveLength(7)
    expect(query).toEqual(['D','D','D','D','D','D','D'])
  })
  it('Filtering an array with users', () => {
    const users = [{ name: 'Ivan', age: 18 }, { name: 'Liza', age: 13 }, { name: 'Max', age: 17 }]

    const query = new Enumerable(users)
      .where((user) => user.name === "Ivan" || user.age === 17)
      .toArray()

    expect(query).not.toBe([])
    expect(query).toHaveLength(2)
    expect(query).toEqual([users[0], users[2]])
  })
})