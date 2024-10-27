export function safelySetId(element: HTMLElement, id: string) {
    if (!element) return;
    if (!element.id) {
        element.id = id;
    }
    return element.id;
}