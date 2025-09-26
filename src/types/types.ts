import { Dictionary } from "../dictionary/dictionary";
import { Enumerable } from "../enumerable/enumerable";

export type TObjectKey = string | symbol | number

export interface IEnumerable<T> {
  where: (callback: (value: T, index: number) => boolean) => Enumerable<T>;
  select: <R>(callback: (value: T, index: number) => R) => Enumerable<R>;
  take(count: number): Enumerable<T>;
  takeWhile(callback: (value: T, index: number) => boolean): Enumerable<T>;
  skip(count: number): Enumerable<T>;
  skipWhile(callback: (value: T, index: number) => boolean): Enumerable<T>;
  slice(start: number, end?: number | undefined): Enumerable<T>;
  dispose: () => void;
  toArray(): T[];
  toDictionary(keySelector?: (item: T) => TObjectKey): Dictionary<T>;
  any(callback?: (item: T, index: number) => boolean): boolean;
}

export interface IDictionary<T> {
  size: number;
  getDictionary(): Record<TObjectKey, T>;
  has(key: TObjectKey): boolean;
  clear(): Dictionary<T>;
  add(key: TObjectKey, value: T): Dictionary<T>;
  delete(key: TObjectKey): Dictionary<T>;
  get(key: TObjectKey): T | null;
  dispose(): void;
}