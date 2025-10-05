import { Enumerable } from "../enumerable";

export function skip<TValue>(
  source: Generator<TValue>,
  count: number
): Enumerable<TValue> {
  if (!Number.isSafeInteger(count)) {
    throw new RangeError("Arguments must be safe integers");
  }
  
  function* generator(): Generator<TValue> {
    let skipped = 0;

    for (const item of source) {
      if (skipped++ < count) {
        continue;
      }
      yield item;
    }
  }

  return new Enumerable<TValue>(generator());
}
