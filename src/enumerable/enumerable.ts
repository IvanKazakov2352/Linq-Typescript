import { Dictionary } from "../dictionary/dictionary";
import { IEnumerable, TObjectKey } from "../types/types";
import { isFunction, isIterable } from "../utils/utils";
import {
  anyFunction,
  rangeFunction,
  selectFunction,
  skipFuntion,
  skipWhileFunction,
  sliceFunction,
  takeFunction,
  takeWhileFunction,
  whereFunction,
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

    return anyFunction<T>(this.getGenerator(), callback);
  }

  public where(callback: (value: T, index: number) => boolean): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    return whereFunction<T>(this.getGenerator(), callback);
  }

  public select<R>(
    callback: (value: T, index: number) => R
  ): Enumerable<R> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    return selectFunction<T, R>(this.getGenerator(), callback);
  }

  public take(count: number): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    return takeFunction<T>(this.getGenerator(), count);
  }

  public takeWhile(
    callback: (value: T, index: number) => boolean
  ): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    return takeWhileFunction<T>(this.getGenerator(), callback);
  }

  public skip(count: number): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    return skipFuntion<T>(this.getGenerator(), count)
  }

  public skipWhile(
    callback: (value: T, index: number) => boolean
  ): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    return skipWhileFunction<T>(this.getGenerator(), callback)
  }

  public slice(start: number, end?: number | undefined): Enumerable<T> {
    if (this.isDisposed) {
      throw new Error("Cannot iterate over a disposed object");
    }

    return sliceFunction<T>(this.getGenerator(), start, end);
  }

  public static range(start: number, count: number): Enumerable<number> {
    return rangeFunction(start, count);
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