export function elementAtOrDefault<TValue>(
  source: Generator<TValue>, 
  index: number, 
  defaultValue?: TValue | undefined
): TValue {
  if (!Number.isSafeInteger(index)) {
    throw new RangeError("Arguments must be safe integers");
  }

  if(index < 0) {
    throw new RangeError("Index must be a non-negative integer");
  }

  let current: number = 0;

  for (const item of source) {
    if (current++ === index) {
      return item;
    }
  }

  if(defaultValue !== undefined)
    return defaultValue

  throw new RangeError(`Index ${index} out of range`);
}