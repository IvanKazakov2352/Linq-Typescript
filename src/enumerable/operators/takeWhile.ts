import { isFunction } from "../../utils/utils";
import { Enumerable } from "../enumerable";

export function takeWhileFunction<T>(
  source: Generator<T, any, any>,
  callback: (value: T, index: number) => boolean
): Enumerable<T> {
  if (!isFunction(callback)) {
    throw new TypeError("Callback must be a function");
  }
  
  function* generator(): Generator<T> {
    let index = 0;

    for (const item of source) {
      if (callback(item, index++)) {
        yield item;
      } else {
        break;
      }
    }
  }

  return new Enumerable(generator());
}
