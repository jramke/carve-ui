/**
 * Wraps an array around itself at a given starting index.
 * @example ```ts
 * wrapArray(['a', 'b', 'c', 'd'], 2);
 * ['c', 'd', 'a', 'b']
 * ```
 * @see https://github.com/radix-ui/primitives
 */
export function wrapArray<T>(array: T[], startIndex: number): T[] {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}