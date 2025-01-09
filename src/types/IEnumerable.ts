import { IEnumerable } from "../IEnumerable.js"

export type TEnumerable<T> = {
  Where: (callback: (value: T, index: number) => boolean) => IEnumerable<T>;
  Map: <TResult>(callback: (value: T, index: number) => TResult) => IEnumerable<TResult>;
  Dispose: () => void;
  Unique: <K = T>(selector?: SelectorFn<T, K>) => IEnumerable<T>
}

export type SelectorFn<T, K> = (item: T) => K;