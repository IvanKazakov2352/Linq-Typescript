import { isFunction } from "../../utils/utils";

export function any<TValue>(
  source: Generator<TValue>,
  callback?: (item: TValue, index: number) => boolean
) {
  if (callback && !isFunction(callback)) {
    throw new TypeError("Callback must be a function");
  }
  
  if (callback) {
    let index = 0;
    for (const item of source) {
      if (callback(item, index++)) {
        return true;
      }
    }
    return false;
  } else {
    return !source.next().done;
  }
}
