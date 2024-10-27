import type { AlpineComponent } from 'alpinejs'

export const defineComponent = <P, T>(fn: (params: P) => AlpineComponent<T>) => fn;
// export function defineComponent<Options, ParentContext = {}>(
//     fn: (options: Partial<Options>) => AlpineComponent & ParentContext
// ) {
//     return fn;
// }
// export const defineComponent = <P, T, C = {}>(
//     fn: (params: P, parentContext?: C) => AlpineComponent<T>
// ) => fn;