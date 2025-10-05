import { Enumerable } from "../enumerable";

export function take<TValue>(
  source: Generator<TValue>,
  count: number
): Enumerable<TValue> {
  if (!Number.isSafeInteger(count)) {
    throw new RangeError("Arguments must be safe integers");
  }

  function* generator(): Generator<TValue> {
    let taken = 0;

    for (const item of source) {
      if (taken++ < count) {
        yield item;
      } else {
        break;
      }
    }
  }

  return new Enumerable<TValue>(generator());
}
