import Alpine from "alpinejs";
import type { SelectItemOptions } from "./types";

import { defineComponent } from "src/internal/helpers/alpine";


export const SelectItem = defineComponent((valueObject: SelectItemOptions) => {
    return {
        init() {           
            // @ts-ignore
            if (this.valueObject === undefined) {
                throw new Error('SelectItem component requires parent Select component.');
            }

            if (!valueObject) {
                throw new Error('SelectItem component requires a value object.');
            }

            if (this.$refs.selectItemLabel) {
                Alpine.bind(this.$refs.selectItemLabel, this.selectItemLabelProps);
            } else {
                this.$el.textContent = valueObject.label;
            }

            // @ts-ignore
            this.setItemElementsContext(this.$el);
            // @ts-ignore
            this.setItemsContext(valueObject);

            if (this.isDisabled) {
                // @ts-ignore
                this.setDisabledIndexesContext(this.index);
            }

            Alpine.bind(this.$el, this.selectItemProps);
        },

        get isSelected(): boolean {
            // @ts-ignore
            const isSelected = this.value === valueObject.value;
            if (isSelected) {
                // @ts-ignore
                this.scrollToItem(this.$el);
            }
            return isSelected;
        },
        get index(): number {
            // @ts-ignore
            return this.items.findIndex((item: SelectItemType) => item.value === valueObject.value);
        },
        get isHighlighted(): boolean {
            // @ts-ignore
            const isHighlighted = this.highlightIndex === this.index;
            if (isHighlighted) {
                // @ts-ignore
                this.scrollToItem(this.$el);
                // this.$nextTick(() => {
                //     this.$el.focus();
                // })
            }
            return isHighlighted;
        },
        isDisabled: valueObject.disabled || false,

        toggleSelected() {
            if (this.isDisabled) return;
            // @ts-ignore
            this.value = this.isSelected ? '' : valueObject.value;
        },

        selectItemProps: {
            ['@click']() {
                this.toggleSelected();
            },
            ['@pointerenter']() {
                // @ts-ignore
                this.setHighlightIndex(this.index);
            },
            [':data-selected']() {
                if (this.isSelected) {
                    return '';
                }
            },
            [':data-highlighted']() {
                if (this.isHighlighted) {
                    return '';
                }
            },
            [':role']() {
                return 'option';
            },
            [':aria-selected']() {
                return this.isSelected;
            },
            [':tabindex']() {
                return this.isHighlighted ? '0' : '-1';
            },
            [':aria-disabled']() {
                return this.isDisabled;
            },
            [':data-disabled']() {
                return this.isDisabled;
            },
            [':data-index']() {
                return this.index;
            },
        },
        selectItemLabelProps: {
            ['x-text']() {
                return valueObject.label;
            },
        },
    };
});