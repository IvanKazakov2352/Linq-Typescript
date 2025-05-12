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

  public GetDictionary(): Record<TObjectKey, T> {
    return this.dictionary;
  }

  public ContainsKey(key: TObjectKey): boolean {
    if(key === null || key === undefined) {
      throw new Error('Dictionary search key not specified')
    }
    const dictionary = this.GetDictionary()
    return dictionary[key] ? true : false;
  }
}
