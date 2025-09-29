export function elementAt<T>(source: Generator<T>, index: number): T {
  if (!Number.isSafeInteger(index)) {
    throw new RangeError("Arguments must be safe integers");
  }

  if(index < 0) {
    throw new RangeError("Index must be a non-negative integer");
  }

  let currentIndex: number = 0;

  for (const item of source) {
    if (currentIndex === index) {
      return item;
    }
    currentIndex++;
  }

  throw new RangeError(`Index ${index} out of range`);
}
