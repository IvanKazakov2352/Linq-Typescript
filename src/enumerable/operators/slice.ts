import { Enumerable } from "../enumerable";

export function slice<TValue>(
  source: Generator<TValue>,
  start: number,
  end?: number | undefined
): Enumerable<TValue> {
  if (!Number.isSafeInteger(start)) {
    throw new RangeError("Arguments must be safe integers");
  }

  function* generator(): Generator<TValue> {
    let index = 0;

    for (const item of source) {
      if (index < start) {
        index++;
        continue;
      }

      if (end !== undefined && end !== null && Number.isSafeInteger(end)) {
        if (index >= end) {
          break;
        }
      }

      index++;

      yield item;
    }
  }

  return new Enumerable<TValue>(generator());
}
