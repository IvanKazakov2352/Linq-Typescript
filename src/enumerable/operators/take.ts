import { Enumerable } from "../enumerable";

export function take<T>(
  source: Generator<T>,
  count: number
): Enumerable<T> {
  if (!Number.isSafeInteger(count)) {
    throw new RangeError(`Arguments must be safe integers`);
  }

  function* generator(): Generator<T> {
    let taken = 0;

    for (const item of source) {
      if (taken++ < count) {
        yield item;
      } else {
        break;
      }
    }
  }

  return new Enumerable<T>(generator());
}
