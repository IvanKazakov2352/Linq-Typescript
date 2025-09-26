import { isFunction } from "../../utils/utils";

export function anyFunction<T>(
  source: Generator<T, any, any>,
  callback?: (item: T, index: number) => boolean
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
