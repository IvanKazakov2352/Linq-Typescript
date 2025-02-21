import { IEnumerable } from "./types/types";
import { isIterable } from "./utils/utils";

export class Enumerable<T> implements IEnumerable<T> {
  constructor(iterator: Iterable<T>) {
    if(iterator === undefined || !isIterable<T>(iterator)) {
      throw new Error('The iterator object cannot be empty')
    }
    this.iterator = iterator;
  }

  private iterator: Iterable<T>;
  private isDisposed: boolean = false;

  public get isDisposed$(): boolean {
    return this.isDisposed;
  };

  public [Symbol.iterator](): Iterator<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object.");
    };

    return this.iterator[Symbol.iterator]();
  };

  public Dispose(): void {
    if(this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object.");
    };

    this.iterator = [] as Iterable<T>;
    this.isDisposed = true;
  };

  private *getGenerator(): Generator<T> {
    for (const item of this.iterator) {
      yield item;
    };
  };

  public Where(callback: (value: T, index: number) => boolean): Enumerable<T> {
    const source = this.getGenerator();

    function* generator(): Generator<T> {
      let index = 0;
      for (const value of source) {
        if (callback(value, index++)) {
          yield value;
        };
      };
    };

    return new Enumerable<T>(generator());
  };

  public Map<TResult>(callback: (value: T, index: number) => TResult): Enumerable<TResult> {
    const source = this.getGenerator();

    function* generator(): Generator<TResult> {
      let index = 0;
      for (const item of source) {
        yield callback(item, index++);
      };
    };

    return new Enumerable<TResult>(generator());
  };

  public static Range(start: number, count: number): Enumerable<number> {
    if(Math.sign(start) === -1 || count < 0) {
      throw new Error('The value of the start number must not be negative');
    };

    function* generator(): Generator<number> {
      for(let i = 0; i < count; i++) {
        yield start + i;
      };
    };

    return new Enumerable<number>(generator());
  };

  public Aggregate<TAccumulate>(
    seed: TAccumulate, 
    callback: (acc: TAccumulate, current: T, index: number) => TAccumulate
  ): TAccumulate {
    const source = this.getGenerator();
    let accumulator = seed;

    let index = 0;
    for (const item of source) {
      accumulator = callback(accumulator, item, index++);
    }

    return accumulator;
  };

  public ToArray(): T[] {
    return Array.from(this.iterator);
  };
}
