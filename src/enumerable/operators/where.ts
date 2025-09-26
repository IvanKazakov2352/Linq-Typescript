import { isFunction } from "../../utils/utils";
import { Enumerable } from "../enumerable";

export function whereFunction<T>(
  source: Generator<T, any, any>,
  callback: (value: T, index: number) => boolean
): Enumerable<T> {
  if (!isFunction(callback)) {
    throw new TypeError("Callback must be a function");
  }

  function* generator(): Generator<T> {
    let index = 0;
    for (const value of source) {
      if (callback(value, index++)) {
        yield value;
      }
    }
  }

  return new Enumerable<T>(generator());
}
