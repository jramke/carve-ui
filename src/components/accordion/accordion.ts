import type { AccordionOptions } from "./types";

import Alpine from "alpinejs";
import { defineComponent } from "src/internal/helpers/alpine";


export const Accordion = defineComponent((userOptions: Partial<AccordionOptions> = {}) => {
    const defaultOptions: AccordionOptions = {
        onActiveAccordionChange: null,
    };

    return {
        options: Object.assign(defaultOptions, userOptions),

        init() {
            Alpine.bind(this.$el, this.accordionProps);

            if (!this.$el.hasAttribute('role')) {
                this.$el.setAttribute('role', 'presentation');
            }
            this.$watch('activeAccordion', this.handleActiveAccordionChange.bind(this));
        },

        activeAccordion: '',
        lastActiveAccordion: '',

        setActiveAccordion(id: string) {
            this.lastActiveAccordion = this.activeAccordion;
            this.activeAccordion = (this.activeAccordion == id) ? '' : id;
        },
        handleActiveAccordionChange(activeAccordion: string) {
            if (typeof this.options.onActiveAccordionChange === 'function') {
                this.options.onActiveAccordionChange(activeAccordion);
            }
        },

        accordionProps: {
            ['@beforeprint.window']() {
                const items = Array.from(this.$el.children ?? []);
                const ids = items.map(item => item.id);
                this.setActiveAccordion(ids.join(','));
            },
            ['@afterprint.window']() {
                this.activeAccordion = this.lastActiveAccordion;
            },
        }
    }
});