import { Enumerable } from "../Enumerable/Enumerable.js"
import { SelectorFn } from "./Selector.js";

export interface IEnumerable<T> {
  Where: (callback: (value: T, index: number) => boolean) => Enumerable<T>;
  Select: <TResult>(callback: (value: T, index: number) => TResult) => Enumerable<TResult>;
  Dispose: () => void;
  Unique: <K = T>(selector?: SelectorFn<T, K>) => Enumerable<T>;
  Aggregate: <TAccumulate>(seed: TAccumulate, callback: (acc: TAccumulate, current: T, index: number) => TAccumulate) => TAccumulate
}