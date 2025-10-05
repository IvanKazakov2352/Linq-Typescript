import { isFunction } from "../../utils/utils";
import { Enumerable } from "../enumerable";

export function takeWhile<TValue>(
  source: Generator<TValue>,
  callback: (value: TValue, index: number) => boolean
): Enumerable<TValue> {
  if (!isFunction(callback)) {
    throw new TypeError("Callback must be a function");
  }

  function* generator(): Generator<TValue> {
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
