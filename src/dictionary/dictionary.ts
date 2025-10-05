import { IDictionary, TObjectKey } from "../types/types";
import { isFunction } from "../utils/utils";

export class Dictionary<TValue> implements IDictionary<TValue> {
  private dictionary: Record<TObjectKey, TValue> = {};
  private index = 0;
  private selector: (item: TValue) => TObjectKey;
  private isDisposed: boolean = false;
  
  constructor(
    source: Generator<TValue>,
    selector?: (item: TValue) => TObjectKey
  ) {
    if(selector && !isFunction(selector)) {
      throw new TypeError('Callback must be a function');
    }
    
    this.selector = selector ?? ((_: TValue) => this.index)

    for (const item of source) {
      const key = this.selector(item)
      this.dictionary[key] = item;
      this.index++;
    }
  }

  public [Symbol.dispose]() {
    this.dispose()
  }

  private getSource(): Generator<TValue> {
    const dictionary = this.getDictionary()
    
    function* source() {
      for (const [_, value] of Object.entries(dictionary)) {
        yield value
      }
    }

    return source()
  }

  public get size(): number {
    if(this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    };

    let count: number = 0;
    const source = this.getSource()

    for (const _ of source) {
      count++
    }

    return count
  }

  public dispose(): void {
    if(this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    };
    
    this.dictionary = {}
    this.index = 0
    this.isDisposed = true
  }

  public getDictionary(): Record<TObjectKey, TValue> {
    if(this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    };
    return this.dictionary;
  }

  public has(key: TObjectKey): boolean {
    if(this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    };

    if(key === null || key === undefined) {
      throw new Error('Dictionary search key not specified')
    }
    
    return Object.prototype.hasOwnProperty.call(this.getDictionary(), key);
  }

  public clear(): Dictionary<TValue> {
    if(this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    };

    this.dictionary = {}
    this.index = 0
    return new Dictionary(this.getSource(), this.selector)
  }

  public add(key: TObjectKey, value: TValue): Dictionary<TValue> {
    if(this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    };

    if(this.has(key)) {
      throw new Error('The key already exists in the dictionary')
    }

    this.dictionary[key] = value
    this.index++
    return new Dictionary(this.getSource(), this.selector)
  }

  public delete(key: TObjectKey): Dictionary<TValue> {
    if(this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    };

    if(!this.has(key)) {
      throw new Error('This key does not exist in the dictionary')
    }

    delete this.dictionary[key]
    this.index--
    return new Dictionary(this.getSource(), this.selector)
  }

  public get(key: TObjectKey): TValue | null {
    if(this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    };
    return this.has(key) ? this.dictionary[key] : null
  }
}
