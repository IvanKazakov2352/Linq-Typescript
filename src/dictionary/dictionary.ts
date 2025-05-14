import { IDictionary, TObjectKey } from "../types/types";

export class Dictionary<T> implements IDictionary<T> {
  private dictionary: Record<TObjectKey, T> = {};
  private index = 0;

  constructor(
    source: Generator<T, any, any>,
    keySelector?: (item: T) => TObjectKey
  ) {
    for (const item of source) {
      const key = keySelector ? keySelector(item) : this.index;
      this.dictionary[key] = item;
      this.index++;
    }
  }

  private getGenerator() {
    const dict = this.getDictionary()
    
    function* source() {
      for (let key of Object.keys(dict)) {
        yield [key, dict[key]];
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

  public clear() {
    this.dictionary = {}
    this.index = 0
    const source = this.getGenerator()
    return new Dictionary(source)
  }
}
