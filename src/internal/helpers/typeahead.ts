// Credits: https://github.com/melt-ui/melt-ui/blob/develop/src/lib/internal/helpers/typeahead.ts

import { debounce } from './time';
import { wrapArray } from './array';
import { isHTMLElement } from './dom';
import { isDisabled } from './attributes';

export type TypeaheadArgs = {
	/**
	 * What to do when a match is found, usually highlight/focus the element.
	 * @param element The element that matches the typed keys
	 */
	onMatch: (element: HTMLElement) => void;
	/**
	 * Get the current item, usually the active element.
	 * @returns The current item
	 */
	getCurrentItem?: () => Element | null | undefined;
	/**
	 * The delay before resetting the typed keys
	 */
	delay?: number;
};

export type HandleTypeaheadSearch = {
	/**
	 * Handle the typeahead search
	 * @param key The key that was pressed
	 * @param menuItems The menu items to search through
	 */
};

/**
 * Keys to ignore for typeahead so we aren't matching things
 * like `Shift menu item` or `Control center` or `Alt menu` when
 * a user presses those keys.
 */
const ignoredKeys = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'NumLock']);

/**
 * Default options for the typeahead search.
 * We default to roving focus when a match is found, but
 * you can override this with the `onMatch` option.
 */
const defaults = {
	getCurrentItem: () => document.activeElement,
	delay: 1000,
} satisfies Omit<TypeaheadArgs, 'onMatch'>;

export function createTypeaheadSearch(args: TypeaheadArgs) {
	const withDefaults = { ...defaults, ...args };
	let typedKeys: string[] = [];

	const resetTyped = debounce(() => {
        typedKeys = [];
    }, args.delay);

	const handleTypeaheadSearch = (key: string, items: HTMLElement[]) => {
		if (ignoredKeys.has(key)) return;
		const currentItem = withDefaults.getCurrentItem() || document.activeElement;

		typedKeys.push(key.toLowerCase());

		const candidateItems = items.filter((item) => {
			if (isDisabled(item)) {
				return false;
			}
			return true;
		});


		const isRepeated = typedKeys.length > 1 && typedKeys.every((char) => char === typedKeys[0]);
		const normalizeSearch = isRepeated ? typedKeys[0] : typedKeys.join('');
		const currentItemIndex = isHTMLElement(currentItem) ? candidateItems.indexOf(currentItem) : -1;

		let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0));
		const excludeCurrentItem = normalizeSearch.length === 1;
		if (excludeCurrentItem) {
			wrappedItems = wrappedItems.filter((v) => v !== currentItem);
		}

		const nextItem = wrappedItems.find((item) => item?.innerText && item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()));	

		if (isHTMLElement(nextItem) && nextItem !== currentItem) {
			withDefaults.onMatch(nextItem);
		}

		resetTyped();
	};

	return {
		resetTyped,
		handleTypeaheadSearch,
	};
}