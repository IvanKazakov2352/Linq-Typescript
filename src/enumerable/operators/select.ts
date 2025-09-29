import { isFunction } from "../../utils/utils";
import { Enumerable } from "../enumerable";

export function select<T, R>(
  source: Generator<T>,
  callback: (value: T, index: number) => R
): Enumerable<R> {
  if (!isFunction(callback)) {
    throw new TypeError("Callback must be a function");
  }
  
  function* generator(): Generator<R> {
    let index = 0;
    for (const item of source) {
      yield callback(item, index++);
    }
  }

  return new Enumerable<R>(generator());
}
