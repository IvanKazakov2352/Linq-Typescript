import { IS_NOT_A_FUNCTION } from "../../utils/constants";
import { isFunction } from "../../utils/utils";

export function any<TValue>(
  source: Generator<TValue>,
  callback?: (item: TValue, index: number) => boolean
): boolean {
  if (callback && !isFunction(callback)) {
    throw new TypeError(IS_NOT_A_FUNCTION);
  }
  
  function* generator(): Generator<boolean> {
    if(!callback) {
      yield !source.next().done
    } else {
      let index = 0;
      for (const item of source) {
        if (callback(item, index++)) {
          yield true
        }
      }
      yield false
    }
  }

  const result = generator().next()
  return !result.done ? result.value : false
}
