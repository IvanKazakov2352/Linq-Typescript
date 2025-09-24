import { Enumerable } from "../src/enumerable/enumerable"
import { numbers } from "./mock-data"

describe('Creating an Enumerable instance', () => {
  it('Creating an Enumerable instance with an array of numbers', () => {
    using instance = new Enumerable(numbers(15))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a string', () => {
    using instance = new Enumerable('String')
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a Map collection', () => {
    using instance = new Enumerable(new Map([[1, 2]]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a Set collection', () => {
    using instance = new Enumerable(new Set(numbers(15)))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a typed array Uint32Array', () => {
    using instance = new Enumerable(new Uint32Array(numbers(15)))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a typed array Uint8Array', () => {
    using instance = new Enumerable(new Uint8Array(numbers(15)))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a typed array Uint16Array', () => {
    using instance = new Enumerable(new Uint16Array(numbers(15)))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with an iterated object', () => {
    const iterableObject = {
      [Symbol.iterator]() {
        return {
          next() {
            return { value: "Value", done: true }
          }
        }
      }
    }
    using instance = new Enumerable(iterableObject)
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Generating 2,000,000 values', () => {
    using instance = new Enumerable(Enumerable.range(0, 2_000_000))
    const result = instance.toArray()

    expect(result).toHaveLength(2_000_000)
    expect(result).not.toEqual([])
  })
  it('Not creating instance', () => {
    expect(() => new Enumerable(123123 as any)).toThrow('The iterator object cannot be empty')
  })
})