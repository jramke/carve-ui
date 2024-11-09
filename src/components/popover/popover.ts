import type { PopoverOptions } from "./types";

import Alpine from "alpinejs";
import { safelySetId } from "src/internal/helpers/attributes";
import { defineComponent } from "src/internal/helpers/alpine";
import { floatingUiMethods } from "src/internal/base/floating";


export const Popover = defineComponent((userOptions: Partial<PopoverOptions> = {}) => {
    const defaultOptions: PopoverOptions = {
        open: false,
        placement: 'bottom',
        offset: 10,
        flip: true,
        shift: { padding: 10 },
        arrow: true,
        onOpenChange: null,
    };

    const options = Object.assign(defaultOptions, userOptions);

    return {
        options,

        init() {
            if (!this.$refs.content || !this.$refs.trigger) {
                throw new Error('Popover component requires a content and a trigger element.');
            }

            safelySetId(this.$refs.content, this.$id('popover-content'));

            Alpine.bind(this.$refs.trigger, this.triggerProps);
            Alpine.bind(this.$refs.content, this.contentProps);

            this.initContent();
            this.initArrow();

            this.$watch('open', this.handleOpenChange.bind(this));

            if (this.open) {
                this.setupAutoUpdate();
            }
        },
        destroy() {
            this.cleanup?.();
        },

        get open() {
            return this.options.open;
        },
        set open(value) {
            this.options.open = value;
        },

        ...floatingUiMethods(options),
        openPopover() {
            this.open = true;
        },
        closePopover() {
            this.open = false;
        },
        togglePopover() {
            this.open = !this.open;
        },
        handleOpenChange(open: boolean) {
            if (open) {
                this.setupAutoUpdate();
            } else {
                this.cleanup?.();
            }
            if (typeof this.options.onOpenChange === 'function') {
                this.options.onOpenChange(open);
            }
        },

        triggerProps: {
            ['@click']() {
                this.togglePopover();
            },
            [':aria-expanded']() {
                return this.open;
            },
            [':aria-controls']() {
                return this.$refs.content?.id;
            },
            [':aria-haspopup']() {
                return 'dialog';
            },
            [':type']() {
                return 'button';
            }
        },
        contentProps: {
            ['x-show']() {
                return this.open;
            },
            ['x-transition']() {
                return '';
            },
            ['x-trap.inert']() {
                return this.open;
            },
            ['@click.outside']() {
                this.closePopover();
            },
            ['@keydown.escape']() {
                this.closePopover();
            },
            [':role']() {
                return 'dialog';
            },
            [':tabindex']() {
                return '-1';
            },
        },
    }
});