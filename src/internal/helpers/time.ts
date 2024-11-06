export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: any[]) => any>(fn: T, wait = 500) {
	let timeout: ReturnType<typeof setTimeout>;

	const debounced = (...args: Parameters<T>) => {
		clearTimeout(timeout);
		const later = () => fn(...args);
		timeout = setTimeout(later, wait);
	};

	debounced.destroy = () => clearTimeout(timeout);
	return debounced;
}