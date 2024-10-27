import { safelySetId } from "../internal/helpers/attributes";
import { floatingUiMethods } from "../internal/base/floating";

const SELECTION_KEYS = ['Enter', ' '];
const FIRST_KEYS = ['ArrowDown', 'PageUp', 'Home'];
const LAST_KEYS = ['ArrowUp', 'PageDown', 'End'];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const SUB_OPEN_KEYS = [...SELECTION_KEYS, 'ArrowRight'];
const SUB_CLOSE_KEYS = ['ArrowLeft'];

export const DropdownMenu = (userOptions = {}) => {
    const defaultOptions = {
        open: false,
        placement: 'bottom',
        offset: 10,
        flip: true,
        shift: { padding: 10 },
        arrow: true,
        onOpenChange: null,
    };

    return {
        options: Object.assign(defaultOptions, userOptions),

        init() {
            if (!this.$refs.panel || !this.$refs.trigger) {
                throw new Error('DropdownMenu component requires a panel and a trigger element.');
            }

            safelySetId(this.$refs.panel, this.$id('dropdown-panel'));

            this.initPanel();
            this.initArrow();

            this.$watch('open', this.handleOpenChange.bind(this));

            if (this.open) {
                this.setupAutoUpdate();
            }
        },

        get open() {
            return this.options.open;
        },
        set open(value) {
            this.options.open = value;
        },
        items: {},

        ...floatingUiMethods(),
        handleOpenChange(open) {
            // const items = this.$refs.panel.querySelectorAll('[role="menuitem"]');
            console.log('open', this.items);
            if (open) {
                this.items[Object.keys(this.items)[0]]?.focus();
                this.setupAutoUpdate();
            } else {
                this.cleanup?.();
            }
            if (typeof this.options.onOpenChange === 'function') {
                this.options.onOpenChange(open);
            }
        },
        handleKeyboard(event) {
            console.log('key', event.key);
        },

        triggerProps: {
            ['@click']() {
                this.open = !this.open;
            },
            [':aria-expanded']() {
                return this.open;
            },
            [':aria-controls']() {
                return this.$refs.panel?.id;
            },
            [':aria-haspopup']() {
                return 'menu';
            },
            [':type']() {
                return 'button';
            }
        },
        panelProps: {
            ['x-init']() {
                this.$el.removeEventListener('keydown', this.handleKeyboard);
                this.$el.addEventListener('keydown', this.handleKeyboard);
            },
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
                this.open = false;
            },
            ['@keydown.escape']() {
                this.open = false;
            },
            [':role']() {
                return 'menu';
            },
            [':tabindex']() {
                return '0';
            },
            [':aria-orientation']() {
                return 'vertical';
            },
        },
        itemProps: {
            ['x-init']() {
                // console.log('init item', this.$el.id);
                // this.items.push(this.$el);
                this.items[this.$el.id] = this.$el;
            },
            ['@click']() {
                this.open = false;
            },
            [':role']() {
                return 'menuitem';
            },
            [':tabindex']() {
                // console.log('tabindex', this.$el, this.items);
                // if (Object.keys(this.items).length === 0) {
                //     console.log('first item');
                //     return '0';
                // } else {
                //     console.log('not first item');
                // }
                return '-1';
            },
            [':id']() {
                return this.$el.id || this.$id('dropdown-item');
            }
        },
        separatorProps: {
            [':role']() {
                return 'separator';
            },
            [':aria-orientation']() {
                return 'horizontal';
            },
            [':id']() {
                return this.$el.id || this.$id('dropdown-item');
            }
        }
    }
};