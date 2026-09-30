/**
 * Adds a method to a built-in prototype without making it enumerable, so for...in over
 * the consumer's arrays and strings never lists the library's helpers.
 */
export const defineHiddenMethod = (
  target: object,
  name: string,
  method: (...args: never[]) => unknown
): void => {
  Object.defineProperty(target, name, {
    value: method,
    writable: true,
    configurable: true,
    enumerable: false,
  })
}
