import { isFunction } from "../../utils/utils";
import { Enumerable } from "../enumerable";

export function select<TValue, TResult>(
  source: Generator<TValue>,
  callback: (value: TValue, index: number) => TResult
): Enumerable<TResult> {
  if (!isFunction(callback)) {
    throw new TypeError("Callback must be a function");
  }
  
  function* generator(): Generator<TResult> {
    let index = 0;
    for (const item of source) {
      yield callback(item, index++);
    }
  }

  return new Enumerable<TResult>(generator());
}
