export function isIterable<T>(iterator: Iterable<T>) {
  return iterator !== null && typeof iterator[Symbol.iterator] === "function";
}