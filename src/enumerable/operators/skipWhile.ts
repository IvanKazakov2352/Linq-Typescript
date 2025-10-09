import { IS_NOT_A_FUNCTION } from "../../utils/constants";
import { isFunction } from "../../utils/utils";
import { Enumerable } from "../enumerable";

export function skipWhile<TValue>(
  source: Generator<TValue>,
  callback: (value: TValue, index: number) => boolean
): Enumerable<TValue> {
  if (!isFunction(callback)) {
    throw new TypeError(IS_NOT_A_FUNCTION);
  }
  
  function* generator(): Generator<TValue> {
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
