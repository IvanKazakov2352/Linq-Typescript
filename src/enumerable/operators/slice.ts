import { Enumerable } from "../enumerable";

export function slice<T>(
  source: Generator<T>,
  start: number,
  end?: number | undefined
): Enumerable<T> {
  if (!Number.isSafeInteger(start)) {
    throw new RangeError(`Arguments must be safe integers`);
  }

  function* generator(): Generator<T> {
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

  return new Enumerable<T>(generator());
}
