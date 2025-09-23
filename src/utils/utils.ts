export function isIterable<T>(iterator: Iterable<T>) {
  return iterator !== null && typeof iterator[Symbol.iterator] === "function";
}

export function isFunction(value: any): value is Function {
  return (
    typeof value === "function" &&
    typeof value.call === "function" &&
    typeof value.apply === "function"
  );
}
