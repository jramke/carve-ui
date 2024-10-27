import type { AccordionItemOptions } from "./types";

import Alpine from "alpinejs";
import { safelySetId } from "src/internal/helpers/attributes";
import { defineComponent } from "src/internal/helpers/alpine";


export const AccordionItem = defineComponent((userOptions: Partial<AccordionItemOptions> = {}) => {
    const defaultOptions: AccordionItemOptions = {
        initialOpen: false,
    };

    return {
        itemOptions: Object.assign(defaultOptions, userOptions),

        init() {
            // @ts-ignore
            if (this.activeAccordion === undefined) {
                throw new Error('AccordionItem component requires parent Accordion component.');
            }
            
            if (!this.$refs.content || !this.$refs.trigger) {
                throw new Error('AccordionItem component requires a content and a button element with x-ref="content" and x-ref="trigger".');
            }

            safelySetId(this.$el, this.$id('accordion-item'));
            safelySetId(this.$refs.content, this.$id('accordion-content'));
            safelySetId(this.$refs.trigger, this.$id('accordion-trigger'));

            Alpine.bind(this.$refs.trigger, this.triggerProps);
            Alpine.bind(this.$refs.content, this.contentProps);

            if (this.initialOpen) {
                this.openAccordion();
            }
        },

        get initialOpen() {
            return this.itemOptions.initialOpen;
        },
        set initialOpen(value) {
            this.itemOptions.initialOpen = value;
        },
        get isOpen() {
            // @ts-ignore
            return this.activeAccordion.includes(this.$root.id);
        },

        openAccordion() {
            // @ts-ignore
            this.setActiveAccordion(this.$root.id);
        },

        triggerProps: {
            ['@click']() {
                this.openAccordion();
            },
            [':aria-expanded']() {
                return this.isOpen;
            },
            [':aria-controls']() {
                return this.$refs.content?.id;
            }
        },
        contentProps: {
            ['x-show']() {
                return this.isOpen;
            },
            ['x-collapse']() {
                return '';
            },
            [':aria-labelledby']() {
                return this.$refs.trigger?.id;
            },
        }
    }
});