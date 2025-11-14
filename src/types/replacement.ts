/**
 * Represents a recursive replacement object used for interpolating values in message templates.
 *
 * - Each key can be any value (`string`, `number`, `boolean`, `Date`, `function`, nested object, etc.).
 * - Supports nested structures for complex interpolation.
 * - Can be used directly with `intl-messageformat` or custom format handlers.
 *
 * @example
 * const replacements: Replacement = {
 *   name: "Alice",
 *   count: 5,
 *   nested: {
 *     score: 100
 *   },
 *   formatter: (value: unknown) => `<b>${value}</b>`
 * };
 */
export type Replacement = Record<string, unknown>;
