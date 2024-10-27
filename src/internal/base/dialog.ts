import Alpine from "alpinejs";
import { safelySetId } from "../helpers/attributes";
import { defineComponent } from "../helpers/alpine";
import { warn } from "../helpers/logs";

export type BaseDialogOptions = {
    open: boolean;
    onOpenChange: ((open: boolean) => void) | null;
};

export type BaseDialogInternalOptions = {
    role: string | null;
    backdropClickClose: boolean;
};

export const BaseDialog = defineComponent(({
    internalOptions,
    userOptions = {}
}: { 
    internalOptions: BaseDialogInternalOptions;
    userOptions?: Partial<BaseDialogOptions>;
}) => {
    const defaultOptions: BaseDialogOptions = {
        open: false,
        onOpenChange: null,
    };

    return {
        options: Object.assign(defaultOptions, userOptions),

        init() {
            // The main logic is in the initAfterTeleport method 
            // wich is called via an x-init from the wrapperProps after teleporting the component.


            // TODO: alpine bind not working inside template so we manually need to x-bind the props from all items in the template
            Alpine.bind(this.$refs.trigger, this.triggerProps);
            // Alpine.bind(this.$refs.wrapper, this.wrapperInitProps);
            // console.log('BaseDialog initialized', this.$refs);

            // this.$el.querySelector('[x-ref="wrapper"]')?.setAttribute('x-bind', 'wrapperProps');
            // this.$el.querySelector('[x-ref="backdrop"]')?.setAttribute('x-bind', 'backdropProps');
            // this.$el.querySelector('[x-ref="content"]')?.setAttribute('x-bind', 'contentProps');
            // this.$el.querySelector('[x-ref="close"]')?.setAttribute('x-bind', 'closeProps');

            // Alpine.bind(this.$refs.wrapper, this.wrapperProps);
            // Alpine.bind(this.$refs.backdrop, this.backdropProps);
            // Alpine.bind(this.$refs.content, this.contentProps);
            // Alpine.bind(this.$refs.close, this.closeProps);

            // this.$el.querySelector('template')?.setAttribute('x-teleport', 'body');

            // const template = document.createElement('template');
            // template.content.appendChild(this.$refs.wrapper);
            // this.$refs.trigger.after(template);
            // template.setAttribute('x-teleport', 'body');
        },
        initAfterTeleport() {            
            if (!this.$refs.content) {
                throw new Error('Dialog component requires a content element with x-ref="content".');
            }

            if (!this.$refs.title || !this.$refs.description) {
                warn('Dialog component requires a title and a description element with x-ref="title" and x-ref="description" to be accessible.', this.$el);
            }

            safelySetId(this.$refs.content, this.$id('dialog-content'));
            if (this.$refs.title) {
                safelySetId(this.$refs.title, this.$id('dialog-title'));
            }
            if (this.$refs.description) {
                safelySetId(this.$refs.description, this.$id('dialog-description'));
            }

            // Alpine.bind(this.$refs.wrapper, this.wrapperProps);
            // Alpine.bind(this.$refs.backdrop, this.backdropProps);
            // Alpine.bind(this.$refs.content, this.contentProps);
            // Alpine.bind(this.$refs.close, this.closeProps);

            this.$watch('open', this.handleOpenChange.bind(this));
        },

        get open() {
            return this.options.open;
        },
        set open(value) {
            this.options.open = value;
        },

        openDialog() {
            this.open = true;
        },
        closeDialog() {
            this.open = false;
        },
        toggleDialog() {
            this.open = !this.open;
        },
        handleOpenChange(open: boolean) {
            if (typeof this.options.onOpenChange === 'function') {
                this.options.onOpenChange(open);
            }
        },

        triggerProps: {
            ['@click']() {
                this.toggleDialog();
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
        // wrapperInitProps: {
        //     ['x-init']() {
        //         this.initAfterTeleport();
        //     },
        // },
        wrapperProps: {
            ['x-show']() {
                return this.open;
            },
            ['@keydown.escape.window']() {
                this.closeDialog();
            },
            ['x-init']() {
                this.initAfterTeleport();
            },
        },
        backdropProps: {
            ['x-show']() {
                return this.open;
            },
            ['@click']() {
                if (internalOptions.backdropClickClose) {
                    this.closeDialog()
                }
            },
            ['x-transition.opacity']() {
                return '';
            },
            [':aria-hidden']() {
                return 'true';
            }
        },
        contentProps: {
            ['x-show']() {
                return this.open;
            },
            ['x-trap.inert.noscroll']() {
                return this.open;
            },
            ['x-transition']() {
                return '';
            },
            [':role']() {
                return internalOptions.role ?? 'dialog';
            },
            [':tabindex']() {
                return '-1';
            },
            [':aria-describedby']() {
                return this.$refs.description?.id;
            },
            [':aria-labelledby']() {
                return this.$refs.title?.id;
            },
        },
        closeProps: {
            ['@click']() {
                this.closeDialog()
            },
            [':type']() {
                return 'button';
            }
                
        }
    }
});