import { Dictionary } from "../dictionary/dictionary";
import { IEnumerable, TObjectKey } from "../types/types";
import { 
  COMPLETED_SEQUENCE, 
  DISPOSED_OBJECT, 
  IS_NOT_A_FUNCTION, 
  NOT_ITERATOR_TEXT 
} from "../utils/constants";
import { isFunction, isIterable } from "../utils/utils";
import {
  any,
  buffer,
  elementAt,
  elementAtOrDefault,
  first,
  firstOrDefault,
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
      throw new Error(NOT_ITERATOR_TEXT);
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
      throw new Error(DISPOSED_OBJECT);
    }
    return this.iterator[Symbol.iterator]();
  }

  public dispose(): void {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
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
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return any<TValue>(this.getSource(), callback);
  }

  public where(callback: (value: TValue, index: number) => boolean): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return where<TValue>(this.getSource(), callback);
  }

  public select<TResult>(
    callback: (value: TValue, index: number) => TResult
  ): Enumerable<TResult> {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return select<TValue, TResult>(this.getSource(), callback);
  }

  public take(count: number): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return take<TValue>(this.getSource(), count);
  }

  public takeWhile(
    callback: (value: TValue, index: number) => boolean
  ): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return takeWhile<TValue>(this.getSource(), callback);
  }

  public skip(count: number): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return skip<TValue>(this.getSource(), count)
  }

  public skipWhile(callback: (value: TValue, index: number) => boolean): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return skipWhile<TValue>(this.getSource(), callback)
  }

  public slice(start: number, end?: number | undefined): Enumerable<TValue> {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return slice<TValue>(this.getSource(), start, end);
  }

  public static range(start: number, count: number): Enumerable<number> {
    return range(start, count);
  }

  public elementAt(index: number): TValue {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return elementAt<TValue>(this.getSource(), index)
  }

  public elementAtOrDefault(index: number, defaultValue?: TValue): TValue {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return elementAtOrDefault<TValue>(this.getSource(), index, defaultValue)
  }

  public buffer(chunkSize: number): Enumerable<TValue[]> {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return buffer(this.getSource(), chunkSize)
  }

  public first(callback?: (value: TValue, index: number) => boolean): TValue {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return first(this.getSource(), callback)
  }

  public firstOrDefault(
    callback?: (value: TValue, index: number) => boolean, 
    defaultValue?: TValue
  ): TValue {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    if(this.isCompleted) {
      throw new Error(COMPLETED_SEQUENCE);
    }
    return firstOrDefault(this.getSource(), callback, defaultValue)
  }

  public toArray(): TValue[] {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }
    this.isCompleted = true
    return Array.from<TValue>(this.iterator);
  }

  public toDictionary(keySelector?: (item: TValue) => TObjectKey): Dictionary<TValue> {
    if (this.isDisposed) {
      throw new Error(DISPOSED_OBJECT);
    }

    if (keySelector && !isFunction(keySelector)) {
      throw new TypeError(IS_NOT_A_FUNCTION);
    }
    this.isCompleted = true
    return new Dictionary<TValue>(this.getSource(), keySelector);
  }
}