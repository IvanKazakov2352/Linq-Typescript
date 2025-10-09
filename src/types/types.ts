import { Dictionary } from "../dictionary/dictionary";
import { Enumerable } from "../enumerable/enumerable";

export type TObjectKey = string | symbol | number

export interface IEnumerable<TValue> {
  where: (callback: (value: TValue, index: number) => boolean) => Enumerable<TValue>;
  select: <R>(callback: (value: TValue, index: number) => R) => Enumerable<R>;
  take(count: number): Enumerable<TValue>;
  takeWhile(callback: (value: TValue, index: number) => boolean): Enumerable<TValue>;
  skip(count: number): Enumerable<TValue>;
  skipWhile(callback: (value: TValue, index: number) => boolean): Enumerable<TValue>;
  slice(start: number, end?: number | undefined): Enumerable<TValue>;
  dispose: () => void;
  toArray(): TValue[];
  toDictionary(keySelector?: (item: TValue) => TObjectKey): Dictionary<TValue>;
  any(callback?: (item: TValue, index: number) => boolean): boolean;
  elementAt(index: number): TValue;
  buffer(chunkSize: number): Enumerable<TValue[]>;
  elementAtOrDefault(index: number, defaultValue?: TValue): TValue;
  first(callback?: (value: TValue, index: number) => boolean): TValue;
}

export interface IDictionary<TValue> {
  size: number;
  getDictionary(): Record<TObjectKey, TValue>;
  has(key: TObjectKey): boolean;
  clear(): Dictionary<TValue>;
  add(key: TObjectKey, value: TValue): Dictionary<TValue>;
  delete(key: TObjectKey): Dictionary<TValue>;
  get(key: TObjectKey): TValue | null;
  dispose(): void;
}