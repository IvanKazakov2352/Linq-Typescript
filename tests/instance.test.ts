import { Enumerable } from "../src/Enumerable"

describe('Creating an Enumerable instance', () => {
  it('Creating an Enumerable instance with an array of numbers', () => {
    const instance = new Enumerable([1, 2, 3])
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a string', () => {
    const instance = new Enumerable('СтрокаСтрокаСтрока')
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a Map collection', () => {
    const instance = new Enumerable(new Map([[1, 2]]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a Set collection', () => {
    const instance = new Enumerable(new Set([1, 2, 3, 4]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a typed array Uint32Array', () => {
    const instance = new Enumerable(new Uint32Array([1, 2, 3, 4, 5, 6, 7]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a typed array Uint8Array', () => {
    const instance = new Enumerable(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Creating an Enumerable instance with a typed array Uint16Array', () => {
    const instance = new Enumerable(new Uint16Array([1, 2, 3, 4, 5, 6, 7]))
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
    const instance = new Enumerable(iterableObject)
    expect(instance).toBeInstanceOf(Enumerable)
  })
})