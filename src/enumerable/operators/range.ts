import { INT32_MAX, INT32_MIN } from "../../utils/constants";
import { Enumerable } from "../enumerable";

export function range(
  start: number,
  count: number
): Enumerable<number> {
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(count)) {
    throw new RangeError(`Arguments must be safe integers`);
  }

  if (count < 0) {
    throw new RangeError(`Count must be non-negative. Received ${count}`);
  }

  if (start < INT32_MIN || start > INT32_MAX) {
    throw new RangeError(`Start must be between ${INT32_MIN} and ${INT32_MAX}`);
  }

  if (count > INT32_MAX) {
    throw new RangeError(`Count must be at most ${INT32_MAX}`);
  }

  if (count > 0) {
    const last = start + (count - 1);

    if (last > INT32_MAX) {
      throw new RangeError(
        `The range exceeds Int32.MaxValue. start + count - 1 = ${last}`
      );
    }

    if (last < INT32_MIN) {
      throw new RangeError(
        `The range goes below Int32.MinValue. start + count - 1 = ${last}`
      );
    }
  }

  function* generator(): Generator<number> {
    for (let i = 0; i < count; i++) {
      yield start + i;
    }
  }

  return new Enumerable<number>(generator());
}
