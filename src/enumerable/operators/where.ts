import { IS_NOT_A_FUNCTION } from "../../utils/constants";
import { isFunction } from "../../utils/utils";
import { Enumerable } from "../enumerable";

export function where<TValue>(
  source: Generator<TValue>,
  callback: (value: TValue, index: number) => boolean
): Enumerable<TValue> {
  if (!isFunction(callback)) {
    throw new TypeError(IS_NOT_A_FUNCTION);
  }

  function* generator(): Generator<TValue> {
    let index = 0;
    for (const value of source) {
      if (callback(value, index++)) {
        yield value;
      }
    }
  }

  return new Enumerable<TValue>(generator());
}
