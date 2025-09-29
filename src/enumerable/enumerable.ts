import { Dictionary } from "../dictionary/dictionary";
import { IEnumerable, TObjectKey } from "../types/types";
import { isFunction, isIterable } from "../utils/utils";
import {
  any,
  elementAt,
  range,
  select,
  skip,
  skipWhile,
  slice,
  take,
  takeWhile,
  where,
} from "./operators";

export class Enumerable<T> implements IEnumerable<T> {
  constructor(iterator: Iterable<T>) {
    if (iterator === undefined || !isIterable<T>(iterator)) {
      throw new Error("The iterator object cannot be empty");
    }
    this.iterator = iterator;
  }

  private iterator: Iterable<T>;
  private isDisposed: boolean = false;

  public [Symbol.dispose]() {
    this.dispose();
  }

  public [Symbol.iterator](): Iterator<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return this.iterator[Symbol.iterator]();
  }

  public dispose(): void {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    this.iterator = [] as Iterable<T>;
    this.isDisposed = true;
  }

  private *getGenerator(): Generator<T> {
    for (const item of this.iterator) {
      yield item;
    }
  }

  public any(callback?: (item: T, index: number) => boolean): boolean {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return any<T>(this.getGenerator(), callback);
  }

  public where(callback: (value: T, index: number) => boolean): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return where<T>(this.getGenerator(), callback);
  }

  public select<R>(
    callback: (value: T, index: number) => R
  ): Enumerable<R> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return select<T, R>(this.getGenerator(), callback);
  }

  public take(count: number): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return take<T>(this.getGenerator(), count);
  }

  public takeWhile(
    callback: (value: T, index: number) => boolean
  ): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return takeWhile<T>(this.getGenerator(), callback);
  }

  public skip(count: number): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return skip<T>(this.getGenerator(), count)
  }

  public skipWhile(
    callback: (value: T, index: number) => boolean
  ): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return skipWhile<T>(this.getGenerator(), callback)
  }

  public slice(start: number, end?: number | undefined): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return slice<T>(this.getGenerator(), start, end);
  }

  public static range(start: number, count: number): Enumerable<number> {
    return range(start, count);
  }

  public elementAt(index: number): T {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return elementAt(this.getGenerator(), index)
  }

  public toArray(): T[] {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }
    return Array.from<T>(this.getGenerator());
  }

  public toDictionary(keySelector?: (item: T) => TObjectKey): Dictionary<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    if (keySelector && !isFunction(keySelector)) {
      throw new TypeError("Callback must be a function");
    }
    
    return new Dictionary<T>(this.getGenerator(), keySelector);
  }
}