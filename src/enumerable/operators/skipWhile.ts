import { isFunction } from "../../utils/utils";
import { Enumerable } from "../enumerable";

export function skipWhileFunction<T>(
  source: Generator<T, any, any>,
  callback: (value: T, index: number) => boolean
): Enumerable<T> {
  if (!isFunction(callback)) {
    throw new TypeError("Callback must be a function");
  }
  
  function* generator(): Generator<T> {
    let index = 0;
    let skipping = true;

    for (const item of source) {
      if (skipping) {
        if (!callback(item, index++)) {
          skipping = false;
          yield item;
        }
      } else {
        yield item;
      }
    }
  }

  return new Enumerable(generator());
}
