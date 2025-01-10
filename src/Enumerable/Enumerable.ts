import { IEnumerable } from "../types/IEnumerable.js";
import { SelectorFn } from "../types/Selector.js";

export class Enumerable<T> implements IEnumerable<T> {
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

  public Where(callback: (value: T, index: number) => boolean): Enumerable<T> {
    const source = this.getGenerator();

    function* generator(): Generator<T> {
      let index = 0;
      for (const value of source) {
        if (callback(value, index++)) {
          yield value;
        }
      }
    }

    return new Enumerable<T>(generator());
  }

  public Map<TResult>(callback: (value: T, index: number) => TResult): Enumerable<TResult> {
    const source = this.iterator;

    function* generator(): Generator<TResult> {
      let index = 0;
      for (const item of source) {
        yield callback(item, index++);
      }
    }

    return new Enumerable<TResult>(generator());
  }

  public Unique<K = T>(selector?: SelectorFn<T, K>): Enumerable<T> {
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

    return new Enumerable<T>(generator());
  }

  public static Range(start: number, count: number): Enumerable<number> {
    if(Math.sign(start) === -1 || count < 0) {
      throw new Error('The value of the start number must not be negative')
    }

    function* generator(): Generator<number> {
      for(let i = 0; i < count; i++) {
        yield start + i;
      }
    }

    return new Enumerable<number>(generator());
  }

  public ToArray(): T[] {
    return Array.from(this.iterator);
  }
}
