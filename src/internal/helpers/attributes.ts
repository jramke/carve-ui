export function safelySetId(element: HTMLElement, id: string) {
    if (!element) return;
    if (!element.id) {
        element.id = id;
    }
    return element.id;
}

export function isDisabled(element: HTMLElement) {
    return element.getAttribute('disabled') === 'true' || element.getAttribute('aria-disabled') === 'true' || element.hasAttribute('data-disabled');
}