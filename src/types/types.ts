import { Enumerable } from "../enumerable"

export interface IEnumerable<T> {
  isDisposed$: boolean;
  Where: (callback: (value: T, index: number) => boolean) => Enumerable<T>;
  Map: <TResult>(callback: (value: T, index: number) => TResult) => Enumerable<TResult>;
  Dispose: () => void;
  Aggregate: <TAccumulate>(
    seed: TAccumulate, 
    callback: (acc: TAccumulate, current: T, index: number) => TAccumulate
  ) => TAccumulate;
}