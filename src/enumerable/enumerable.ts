import { Dictionary } from "../dictionary/dictionary";
import { IEnumerable, TObjectKey } from "../types/types";
import { isFunction, isIterable } from "../utils/utils";
import {
  any,
  elementAt,
  elementAtOrDefault,
  range,
  select,
  skip,
  skipWhile,
  slice,
  take,
  takeWhile,
  where,
} from "./operators";

export class Enumerable<TValue> implements IEnumerable<TValue> {
  constructor(iterator: Iterable<TValue>) {
    if (iterator === undefined || !isIterable<TValue>(iterator)) {
      throw new Error("The iterator object cannot be empty");
    }
    this.iterator = iterator;
  }

  private iterator: Iterable<TValue>;
  private isDisposed: boolean = false;
  private isCompleted: boolean = false;

  public [Symbol.dispose]() {
    this.dispose();
  }

  public [Symbol.iterator](): Iterator<TValue> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return this.iterator[Symbol.iterator]();
  }

  public dispose(): void {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    this.iterator = [] as Iterable<TValue>;
    this.isDisposed = true;
    this.isCompleted = true;
  }

  private *getSource(): Generator<TValue> {
    for (const item of this.iterator) {
      yield item;
    }
  }

  public any(callback?: (item: TValue, index: number) => boolean): boolean {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return any<TValue>(this.getSource(), callback);
  }

  public where(callback: (value: TValue, index: number) => boolean): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return where<TValue>(this.getSource(), callback);
  }

  public select<TResult>(
    callback: (value: TValue, index: number) => TResult
  ): Enumerable<TResult> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return select<TValue, TResult>(this.getSource(), callback);
  }

  public take(count: number): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return take<TValue>(this.getSource(), count);
  }

  public takeWhile(
    callback: (value: TValue, index: number) => boolean
  ): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return takeWhile<TValue>(this.getSource(), callback);
  }

  public skip(count: number): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return skip<TValue>(this.getSource(), count)
  }

  public skipWhile(callback: (value: TValue, index: number) => boolean): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return skipWhile<TValue>(this.getSource(), callback)
  }

  public slice(start: number, end?: number | undefined): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return slice<TValue>(this.getSource(), start, end);
  }

  public static range(start: number, count: number): Enumerable<number> {
    return range(start, count);
  }

  public elementAt(index: number): TValue {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return elementAt<TValue>(this.getSource(), index)
  }

  public elementAtOrDefault(index: number, defaultValue?: TValue): TValue {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    if(this.isCompleted) {
      throw new Error("Cannot iterate over an already completed sequence");
    }
    return elementAtOrDefault<TValue>(this.getSource(), index, defaultValue)
  }

  public toArray(): TValue[] {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    this.isCompleted = true
    return Array.from<TValue>(this.iterator);
  }

  public toDictionary(keySelector?: (item: TValue) => TObjectKey): Dictionary<TValue> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    if (keySelector && !isFunction(keySelector)) {
      throw new TypeError("Callback must be a function");
    }
    this.isCompleted = true
    return new Dictionary<TValue>(this.getSource(), keySelector);
  }
}