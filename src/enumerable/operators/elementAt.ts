import { INDEX_NON_NEGATIVE_INTEGER, NOT_SAFE_INTEGER } from "../../utils/constants";

export function elementAt<TValue>(source: Generator<TValue>, index: number): TValue {
  if (!Number.isSafeInteger(index)) {
    throw new RangeError(NOT_SAFE_INTEGER);
  }

  if(index < 0) {
    throw new RangeError(INDEX_NON_NEGATIVE_INTEGER);
  }

  function* generator(): Generator<TValue> {
    let current: number = 0;
    for (const item of source) {
      if (current++ === index) {
        yield item;
      }
    }
  }
  
  const result = generator().next()
  if(result.done) {
    throw new RangeError(`Index ${index} out of range`);
  }
  return result.value
}
