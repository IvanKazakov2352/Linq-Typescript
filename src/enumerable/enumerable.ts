import { Dictionary } from "../dictionary/dictionary";
import { IEnumerable, TObjectKey } from "../types/types";
import { INT32_MAX, INT32_MIN } from "../utils/constants";
import { isIterable } from "../utils/utils";

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

  public dispose(): void {
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

  public where(callback: (value: T, index: number) => boolean): Enumerable<T> {
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

  public map<TResult>(callback: (value: T, index: number) => TResult): Enumerable<TResult> {
    const source = this.getGenerator();

    function* generator(): Generator<TResult> {
      let index = 0;
      for (const item of source) {
        yield callback(item, index++);
      };
    };

    return new Enumerable<TResult>(generator());
  };

  public static range(start: number, count: number): Enumerable<number> {
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(count)) {
      throw new RangeError(`Arguments must be safe integers.`);
    }

    if (count < 0) {
      throw new RangeError(`Count must be non-negative. Received ${count}.`);
    }

    if (start < INT32_MIN || start > INT32_MAX) {
      throw new RangeError(`Start must be between ${INT32_MIN} and ${INT32_MAX}.`);
    }

    if (count > INT32_MAX) {
      throw new RangeError(`Count must be at most ${INT32_MAX}.`);
    }

    if (count > 0) {
      const last = start + (count - 1);

      if (last > INT32_MAX) {
        throw new RangeError(`The range exceeds Int32.MaxValue. start + count - 1 = ${last}.`);
      }
      
      if (last < INT32_MIN) {
        throw new RangeError(`The range goes below Int32.MinValue. start + count - 1 = ${last}.`);
      }
    }

    function* generator(): Generator<number> {
      for (let i = 0; i < count; i++) {
        yield start + i;
      }
    }

    return new Enumerable<number>(generator());
  };

  public aggregate<TAccumulate>(
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

  public toArray(): T[] {
    return Array.from(this.iterator);
  };

  public toDictionary(keySelector?: (item: T) => TObjectKey): Dictionary<T> {
    const source = this.getGenerator();
    return new Dictionary(source, keySelector);
  };
}
