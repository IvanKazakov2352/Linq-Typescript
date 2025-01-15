import { Enumerable } from "../src/enumerable/Enumerable"

describe('Создание инстанса Enumerable', () => {
  it('Создание инстанса Enumerable с массивом', () => {
    const instance = new Enumerable([1, 2, 3])
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Создание инстанса Enumerable со строкой', () => {
    const instance = new Enumerable('СтрокаСтрокаСтрока')
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Создание инстанса Enumerable с объектом Map', () => {
    const instance = new Enumerable(new Map([[1, 2]]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Создание инстанса Enumerable с объектом Set', () => {
    const instance = new Enumerable(new Set([1, 2, 3, 4]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Создание инстанса Enumerable с типизированным массивом Uint32Array', () => {
    const instance = new Enumerable(new Uint32Array([1, 2, 3, 4, 5, 6, 7]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Создание инстанса Enumerable с типизированным массивом Uint8Array', () => {
    const instance = new Enumerable(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Создание инстанса Enumerable с типизированным массивом Uint16Array', () => {
    const instance = new Enumerable(new Uint16Array([1, 2, 3, 4, 5, 6, 7]))
    expect(instance).toBeInstanceOf(Enumerable)
  })
  it('Создание инстанса Enumerable с итерируемым объектом', () => {
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