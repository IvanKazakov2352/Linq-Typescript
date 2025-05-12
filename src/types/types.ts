import { Dictionary } from "../dictionary/dictionary";
import { Enumerable } from "../enumerable/enumerable"

export type TObjectKey = string | symbol

export interface IEnumerable<T> {
  IsDisposed$: boolean;
  Where: (callback: (value: T, index: number) => boolean) => Enumerable<T>;
  Map: <TResult>(callback: (value: T, index: number) => TResult) => Enumerable<TResult>;
  Dispose: () => void;
  Aggregate: <TAccumulate>(
    seed: TAccumulate, 
    callback: (acc: TAccumulate, current: T, index: number) => TAccumulate
  ) => TAccumulate;
  ToDictionary(keySelector?: (item: T) => TObjectKey): Dictionary<T>;
}

export interface IDictionary<T> {
  GetDictionary(): Record<TObjectKey, T>;
  ContainsKey(key: TObjectKey): boolean;
}