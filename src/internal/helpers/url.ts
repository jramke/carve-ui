
export function setUrlHash(value: string) {
    window.location.hash = value;
}

export function getUrlHash() {
    return window.location.hash.slice(1);
}

export function setUrlSearchParam(identifier: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(identifier, value);
    history.replaceState(null, '', url.toString());
}

export function getUrlSearchParam(identifier: string) {
    const url = new URL(window.location.href);
    return url.searchParams.get(identifier) || '';
}