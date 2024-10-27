
export function getStyle(el: HTMLElement, prop: string): string {
    return window.getComputedStyle(el).getPropertyValue(prop);
}