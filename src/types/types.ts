import { Dictionary } from "../dictionary/dictionary";
import { Enumerable } from "../enumerable/enumerable"

export type TObjectKey = string | symbol

export interface IEnumerable<T> {
  isDisposed$: boolean;
  where: (callback: (value: T, index: number) => boolean) => Enumerable<T>;
  map: <TResult>(callback: (value: T, index: number) => TResult) => Enumerable<TResult>;
  dispose: () => void;
  aggregate: <TAccumulate>(
    seed: TAccumulate, 
    callback: (acc: TAccumulate, current: T, index: number) => TAccumulate
  ) => TAccumulate;
  toArray(): T[];
  toDictionary(keySelector?: (item: T) => TObjectKey): Dictionary<T>;
}

export interface IDictionary<T> {
  getDictionary(): Record<TObjectKey, T>;
  containsKey(key: TObjectKey): boolean;
  clear(): void;
}