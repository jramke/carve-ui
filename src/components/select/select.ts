import Alpine from "alpinejs";
import type { SelectItemOptions, SelectOptions } from "./types";

import { defineComponent } from "src/internal/helpers/alpine";
import { floatingUiMethods } from "src/internal/base/floating";
import { warn } from "src/internal/helpers/logs";
import { safelySetId } from "src/internal/helpers/attributes";
import { createTypeaheadSearch } from "src/internal/helpers/typeahead";
import { kbd, LAST_KEYS, FIRST_KEYS } from "src/internal/helpers/keyboard";


export const Select = defineComponent((userOptions: Partial<SelectOptions> = {}) => {
    const defaultOptions: SelectOptions = {
        onValueChange: null,
        onOpenChange: null,
        value: '',
        open: false,
        label: '',
        placement: 'bottom',
        offset: 10,
        flip: true,
        shift: { padding: 10 },
        arrow: false,
    };

    const INTERACTION_KEYS = [kbd.ARROW_LEFT, kbd.ESCAPE, kbd.ARROW_RIGHT, kbd.SHIFT, kbd.CAPS_LOCK, kbd.CONTROL, kbd.ALT, kbd.META, kbd.ENTER, kbd.F1, kbd.F2, kbd.F3, kbd.F4, kbd.F5, kbd.F6, kbd.F7, kbd.F8, kbd.F9, kbd.F10, kbd.F11, kbd.F12];

    const options = Object.assign(defaultOptions, userOptions);

    return {
        options,

        init() {
            if (!this.$refs.trigger) {
                throw new Error('Select component requires a trigger element.');
            }

            if (!this.$refs.content) {
                throw new Error('Select component requires a content element.');
            }

            if (!this.$refs.label && !this.options.label) {
                warn('Tabs component should have a label element or a label option for accessibility.', this.$el);
            }
            if (this.$refs.label) {
                safelySetId(this.$refs.label, this.$id('select-label'));
            }

            safelySetId(this.$refs.trigger, this.$id('select-trigger'));
            safelySetId(this.$refs.selectValue, this.$id('select-value'));
            safelySetId(this.$refs.content, this.$id('select-content'));

            this.initContent();
            this.initArrow();

            Alpine.bind(this.$el, this.selectProps);
            Alpine.bind(this.$refs.trigger, this.triggerProps);
            Alpine.bind(this.$refs.content, this.contentProps);

            this.defaultLabel = this.$refs.selectValue.textContent || '';
            Alpine.bind(this.$refs.selectValue, this.selectValueProps);

            const { handleTypeaheadSearch } = createTypeaheadSearch({
                onMatch: (element) => {
                    const index = this.itemElements.indexOf(element);
                    console.log('onMatch', index);
                    this.setHighlightIndex(index);
                },
                getCurrentItem: () => {
                    console.log('getCurrentItem', this.itemElements[this.highlightIndex]);
                    return this.itemElements[this.highlightIndex];
                },
            });
            this.handleTypeaheadSearch = handleTypeaheadSearch;

            this.$watch('value', this.handleValueChange.bind(this));
            this.$watch('open', this.handleOpenChange.bind(this));
        },
        destroy() {
            this.cleanup?.();
        },

        get value() {
            return this.options.value;
        },
        set value(value) {
            this.options.value = value;
        },
        get valueObject() {
            return this.items!.find(item => item.value === this.value) || null;
        },
        set valueObject(value) {
            this.value = value?.value || '';
        },
        get open() {
            return this.options.open;
        },
        set open(value) {
            this.options.open = value;
        },
        // get items() {
        //     return this.options.items;
        // },
        // set items(value) {
        //     this.options.items = value;
        // },
        defaultLabel: '',
        highlightIndex: -1,
        items: [] as SelectItemOptions[],
        itemElements: [] as HTMLElement[],
        disabledIndexes: [] as number[],

        closeSelect(focusTrigger = true) {
            this.open = false;            
            if (focusTrigger) {
                this.$refs.trigger.focus();
            }
        },
        openSelect() {
            this.open = true;
            this.$refs.trigger.focus();
        },
        toggleSelectOpen() {
            this.open = !this.open;
            this.$refs.trigger.focus();
        },
        setHighlightIndex(index: number) {
            if (this.disabledIndexes.includes(index)) {
                return;
            }
            this.highlightIndex = index;
        },
        highlightNext() {
            let nextIndex = this.highlightIndex + 1;
            if (this.disabledIndexes.includes(nextIndex)) {
                // this.highlightIndex = nextIndex;
                // this.highlightNext();
                // return;
                nextIndex++;
            }
            if (nextIndex >= this.items!.length) {
                return;
            }
            this.setHighlightIndex(nextIndex);
        },
        highlightPrevious() {
            let previousIndex = this.highlightIndex - 1;
            if (this.disabledIndexes.includes(previousIndex)) {
                // this.highlightIndex = previousIndex;
                // this.highlightPrevious();
                // return;
                previousIndex--;
            }
            if (previousIndex < 0) {
                return;
            }
            this.setHighlightIndex(previousIndex);
        },
        setValueFromHighlight(e: Event | null = null) {
            if (!this.open || this.highlightIndex === -1) return;

            const newValue = this.items![this.highlightIndex].value;
            
            if (newValue === this.value) {
                this.value = '';
            } else {
                this.value = newValue;
            }
            e && e.preventDefault();
        },
        scrollToItem(item: HTMLElement) {
            item.scrollIntoView({ block: 'nearest' });
        },
        handleTypeaheadSearch: (() => {}) as ReturnType<typeof createTypeaheadSearch>['handleTypeaheadSearch'],
        setItemsContext(item: SelectItemOptions) {
            if (!item || this.items.includes(item)) return;
            this.items.push(item);
        },
        setItemElementsContext(element: HTMLElement) {
            if (!element || this.itemElements.includes(element)) {
                return;
            }
            this.itemElements.push(element);
        },
        setDisabledIndexesContext(index: number) {
            if (this.disabledIndexes.includes(index)) return;
            this.disabledIndexes.push(index);
        },
        ...floatingUiMethods(options),
        handleValueChange(value: string) {
            this.closeSelect();
            if (typeof this.options.onValueChange === 'function') {
                this.options.onValueChange(value);
            }
        },
        handleOpenChange(open: boolean) {
            if (this.value) {
                const valueIndex = this.items!.findIndex(item => item.value === this.value);
                this.setHighlightIndex(valueIndex);
            } else {
                this.setHighlightIndex(0);
            }

            if (open) {
                this.setupAutoUpdate();
            } else {
                this.cleanup?.();
            }

            if (typeof this.options.onOpenChange === 'function') {
                this.options.onOpenChange(open);
            }
        },

        selectProps: {
            ['@keydown.escape.prevent']() {
                this.closeSelect();
            },
            ['@keydown.arrow-down.prevent']() {
                this.highlightNext();
            },
            ['@keydown.arrow-up.prevent']() {
                this.highlightPrevious();
            },
            ['@keydown'](e: KeyboardEvent) {
                if (!this.open) {
                    if (INTERACTION_KEYS.includes(e.key)) {
                        return;
                    }
                    if (e.key === kbd.TAB) {
                        return;
                    }
                    if (e.key === kbd.BACKSPACE) {
                        return;
                    }
                    if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
                        return;
                    }
                }

                this.openSelect();

                if (LAST_KEYS.includes(e.key)) {
                    e.preventDefault();
                    this.setHighlightIndex(this.items!.length - 1);
                    return;
                }
                if (FIRST_KEYS.includes(e.key)) {
                    e.preventDefault();
                    this.setHighlightIndex(0);
                    return;
                }

                this.handleTypeaheadSearch(e.key, this.itemElements);                
            },
            ['@focusout'](e: FocusEvent) {
                const relatedTarget = e.relatedTarget as HTMLElement;                
                if (relatedTarget && !this.$root.contains(relatedTarget)) {
                    this.closeSelect(false);
                }
            },
            ['@keydown.enter'](e: KeyboardEvent) {
                this.setValueFromHighlight(e);
            },
            ['@keydown.space'](e: KeyboardEvent) {
                this.setValueFromHighlight(e);
            },
        },
        triggerProps: {
            ['@click']() {
                this.toggleSelectOpen();
            },
            [':type']() {
                return 'button';
            },
            [':aria-haspopup']() {
                return 'listbox';
            },
            [':aria-expanded']() {
                return this.open;
            },
            [':aria-controls']() {
                return this.$refs.content.id;
            },
            [':aria-labelledby']() {
                if (this.$refs.label && !this.options.label) {
                    let ids: string[] = [];
                    ids.push(this.$refs.label.id);
                    if (this.$refs.selectValue) {
                        ids.push(this.$refs.selectValue.id);
                    }
                    return ids.join(' ');
                }
            },
            [':aria-label']() {
                if (this.options.label) {
                    return this.options.label;
                }
            },
        },
        selectValueProps: {
            ['x-text']() {
                return this.valueObject ? this.valueObject.label : this.defaultLabel;
            },
        },
        contentProps: {
            ['x-show']() {
                return this.open;
            },
            ['@click.away']() {
                this.closeSelect();
            },
            ['x-transition:enter']() {
                return '';
            },
            [':role']() {
                return 'listbox';
            },
            [':aria-labelledby']() {
                if (this.$refs.label) {
                    return this.$refs.label.id;
                }
                return this.$refs.trigger.id;
            },
            [':tabindex']() {
                return '-1';
            },
        },
    };
});