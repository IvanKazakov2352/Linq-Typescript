import { IDictionary, TObjectKey } from "../types/types";

export class Dictionary<T> implements IDictionary<T> {
  private dictionary: Record<TObjectKey, T> = {};
  private index = 0;
  private keySelector: (item: T) => TObjectKey

  constructor(
    source: Generator<T, any, any>,
    keySelector?: (item: T) => TObjectKey
  ) {
    this.keySelector = keySelector ?? ((item: T) => this.index)

    for (const item of source) {
      const key = this.keySelector(item)
      this.dictionary[key] = item;
      this.index++;
    }
  }

  private getGenerator(): Generator<T> {
    const dictionary = this.getDictionary()
    
    function* source() {
      for (const [key, value] of Object.entries(dictionary)) {
        yield value
      }
    }

    return source()
  }

  public getDictionary(): Record<TObjectKey, T> {
    return this.dictionary;
  }

  public containsKey(key: TObjectKey): boolean {
    if(key === null || key === undefined) {
      throw new Error('Dictionary search key not specified')
    }
    const dictionary = this.getDictionary()
    return Object.prototype.hasOwnProperty.call(dictionary, key);
  }

  public clear(): Dictionary<T> {
    this.dictionary = {}
    this.index = 0
    const source = this.getGenerator()
    return new Dictionary(source, this.keySelector)
  }

  public add(key: TObjectKey, value: T): Dictionary<T> {
    if(this.containsKey(key)) {
      throw new Error('The key already exists in the dictionary')
    }
    this.dictionary = {...this.dictionary, [key]: value}
    this.index++
    const source = this.getGenerator()
    return new Dictionary(source, this.keySelector)
  }
}
