import { CHUNK_SIZE_NON_NEGATIVE_INTEGER, NOT_SAFE_INTEGER } from "../../utils/constants";
import { Enumerable } from "../enumerable";

export function buffer<TValue>(
  source: Generator<TValue>,
  chunkSize: number
): Enumerable<TValue[]> {
  if (!Number.isSafeInteger(chunkSize)) {
    throw new RangeError(NOT_SAFE_INTEGER);
  }

  if(chunkSize <= 0) {
    throw new RangeError(CHUNK_SIZE_NON_NEGATIVE_INTEGER);
  }

  function* generator(): Generator<TValue[]> {
    let chunk: TValue[] = [];
    for (const item of source) {
      chunk.push(item);

      if (chunk.length === chunkSize) {
        yield chunk;
        chunk = [];
      }
    }

    if (chunk.length > 0) {
      yield chunk;
    }
  }

  return new Enumerable<TValue[]>(generator());
}
