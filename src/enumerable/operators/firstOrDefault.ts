import {
  IS_NOT_A_FUNCTION,
  SEQUENCE_CONTAINS_NO_ELEMENTS,
} from "../../utils/constants";
import { isFunction } from "../../utils/utils";

export function firstOrDefault<TValue>(
  source: Generator<TValue>,
  callback?: (item: TValue, index: number) => boolean,
  defaultValue?: TValue | undefined
): TValue {
  if (callback && !isFunction(callback)) {
    throw new TypeError(IS_NOT_A_FUNCTION);
  }

  if (!callback) {
    const result = source.next();
    if (result.done) {
      throw new Error(SEQUENCE_CONTAINS_NO_ELEMENTS);
    }
    return result.value;
  }

  function* generator(): Generator<TValue> {
    if(callback) {
      let index = 0;

      for (const item of source) {
        if (callback(item, index++)) {
          yield item;
        }
      }
    }
  }

  const result = generator().next();

  if(result.done && defaultValue === undefined) {
    throw new Error(SEQUENCE_CONTAINS_NO_ELEMENTS);
  } else if(result.done && defaultValue) {
    return defaultValue
  } else {
    return result.value
  }
}
