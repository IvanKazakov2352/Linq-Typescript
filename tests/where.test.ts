import { Enumerable } from "../src/enumerable/Enumerable"

describe('Testing the Where method', () => {
  it('Filtering of odd numbers', () => {
    const enumerable = new Enumerable(Enumerable.Range(0, 20))

    const numbers = enumerable
      .Where(num => num % 2 === 0)
      .ToArray()

    expect(numbers).toHaveLength(10)
    expect(numbers).not.toBe([])
  })
  it('Filtering two numbers 10 and 20', () => {
    const enumerable = new Enumerable(Enumerable.Range(0, 20))

    const numbers = enumerable
      .Where(num => num !== 10 && num !== 20)
      .ToArray()

    expect(numbers).toHaveLength(19)
    expect(numbers).not.toBe([])
  })
  it('Working with the Map collection', () => {
    const statuses: Map<number, string> = new Map<number, string>([[1, 'Success'], [2, 'Failed'], [3, 'Pending']])
    const enumerable = new Enumerable(statuses)

    const query = enumerable
      .Where(([key, value]) => key === 1 || key === 3 && value === 'Pending')
      .ToArray()

    expect(query).not.toBe([])
    expect(query).toHaveLength(2)
    expect(query).toEqual([[1, 'Success'], [3, 'Pending']])
  })
})