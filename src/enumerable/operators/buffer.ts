import { Enumerable } from "../enumerable";

export function buffer<TValue>(
  source: Generator<TValue>,
  chunkSize: number
): Enumerable<TValue[]> {
  if (!Number.isSafeInteger(chunkSize)) {
    throw new RangeError("Arguments must be safe integers");
  }

  if(chunkSize <= 0) {
    throw new RangeError("Chunk size must be a non-negative integer");
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
