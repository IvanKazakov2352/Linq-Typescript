import { Dictionary } from "../dictionary/dictionary";
import { Enumerable } from "../enumerable/enumerable";

export type TObjectKey = string | symbol | number

export interface IEnumerable<T> {
  where: (callback: (value: T, index: number) => boolean) => Enumerable<T>;
  map: <TResult>(callback: (value: T, index: number) => TResult) => Enumerable<TResult>;
  take(count: number): Enumerable<T>;
  skip(count: number): Enumerable<T>;
  dispose: () => void;
  aggregate: <TAccumulate>(
    seed: TAccumulate, 
    callback: (acc: TAccumulate, current: T, index: number) => TAccumulate
  ) => TAccumulate;
  toArray(): T[];
  toDictionary(keySelector?: (item: T) => TObjectKey): Dictionary<T>;
}

export interface IDictionary<T> {
  size: number;
  getDictionary(): Record<TObjectKey, T>;
  has(key: TObjectKey): boolean;
  clear(): Dictionary<T>;
  add(key: TObjectKey, value: T): Dictionary<T>;
  delete(key: TObjectKey): Dictionary<T>;
  get(key: TObjectKey): T | null;
}