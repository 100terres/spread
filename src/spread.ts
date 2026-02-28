type TValueOrCallback<T> = T | (() => T);

type EmptySpread<T extends object | unknown[]> = T extends unknown[]
  ? []
  : object;

interface Evaluators<T extends object | unknown[]> {
  if: (condition: unknown) => T | EmptySpread<T>;
  unless: (condition: unknown) => T | EmptySpread<T>;
}

function evaluate<T>(valueOrCallback: TValueOrCallback<T>) {
  return valueOrCallback instanceof Function
    ? valueOrCallback()
    : valueOrCallback;
}

export default function spread<T extends object | unknown[]>(
  valueOrCallback: TValueOrCallback<T>,
): Evaluators<T> {
  /**
   * When the condition evaluates to `false` we return an empty array. Because
   * an array can be spread into both arrays and objects, we don’t have to
   * decide at runtime whether to return `[]` or `{}`, nor do we need to invoke
   * the callback unnecessarily.
   *
   * Why cast the empty array to an object?
   *
   * Spreading an array directly into another object `{ ...[] }` makes
   * TypeScript incorrectly merge all `Array.prototype` members (e.g., `push`,
   * `pop`, etc.) into the type of the resulting object.
   *
   * This is a known issue: https://github.com/microsoft/TypeScript/issues/9726
   *
   * By casting the empty array to `{}` we prevent those unwanted
   * Array.prototype types from being incorectly spread. When the caller expects
   * an array to be returned, the cast still resolves to an empty array as
   * intended.
   */
  const evaluateIf = (condition: unknown) =>
    condition ? evaluate(valueOrCallback) : ([] as EmptySpread<T>);

  return {
    if: evaluateIf,
    unless: (condition: unknown) => evaluateIf(!condition),
  };
}
