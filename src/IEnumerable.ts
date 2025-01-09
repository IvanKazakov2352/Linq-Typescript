import { SelectorFn, TEnumerable } from "./types/IEnumerable.js";

export class IEnumerable<T> implements TEnumerable<T> {
  constructor(iterator: Iterable<T>) {
    this.iterator = iterator;
  }

  private iterator: Iterable<T>;
  private isDisposed: boolean = false;

  [Symbol.iterator](): Iterator<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object.");
    }

    return this.iterator[Symbol.iterator]();
  }

  public Dispose(): void {
    if(this.isDisposed) return

    this.iterator = [] as Iterable<T>;
    this.isDisposed = true;
  }

  private *getGenerator(): Generator<T> {
    for (const item of this.iterator) {
      yield item;
    }
  }

  public Where(callback: (value: T, index: number) => boolean): IEnumerable<T> {
    const source = this.getGenerator();

    function* generator(): Generator<T> {
      let index = 0;
      for (const value of source) {
        if (callback(value, index++)) {
          yield value;
        }
      }
    }

    return new IEnumerable<T>(generator());
  }

  public Map<TResult>(callback: (value: T, index: number) => TResult): IEnumerable<TResult> {
    const source = this.iterator;

    function* generator(): Generator<TResult> {
      let index = 0;
      for (const item of source) {
        yield callback(item, index++);
      }
    }

    return new IEnumerable<TResult>(generator());
  }

  public Unique<K = T>(selector?: SelectorFn<T, K>): IEnumerable<T> {
    const source = this.getGenerator();
    const set = new Set()
    const select = selector || ((item: T) => item as unknown as K);

    function* generator(): Generator<T> {
      for (const value of source) {
        const key = select(value);
        if (!set.has(key)) {
          set.add(key);
          yield value;
        }
      }
    }

    return new IEnumerable<T>(generator());
  }

  public ToArray(): T[] {
    return Array.from(this.iterator);
  }
}
