import type { TooltipOptions, OpenReason } from "./types";

import Alpine from "alpinejs";
import { safelySetId } from "src/internal/helpers/attributes";
import { defineComponent } from "src/internal/helpers/alpine";
import { floatingUiMethods } from "src/internal/base/floating";
import { makeHullFromElements } from "src/internal/helpers/polygon";
import { isPointerInGraceArea, isTouch } from "src/internal/helpers/pointer";


export const Tooltip = defineComponent((userOptions: Partial<TooltipOptions> = {}) => {
    const defaultOptions: TooltipOptions = {
        open: false,
        openDelay: 500,
        closeDelay: 0,
        placement: 'top',
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
                throw new Error('Tooltip component requires a content and a trigger element.');
            }

            safelySetId(this.$refs.content, this.$id('tooltip-content'));

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
            this.isPointerInsideTrigger = false;
            if (this.openTimeout) {
                window.clearTimeout(this.openTimeout);
            }
            if (this.closeTimeout) {
                window.clearTimeout(this.closeTimeout);
            }
        },

        get open() {
            return this.options.open;
        },
        set open(value) {
            this.options.open = value;
        },
        isPointerInsideContent: false,
        isPointerInsideTrigger: false,
        isMouseInTooltipArea: false,
        clickedTrigger: false,
        openReason: null as null | OpenReason,
        openTimeout: null as null | number,
        closeTimeout: null as null | number,

        ...floatingUiMethods(options),
        openTooltip(reason: OpenReason) {
            if (this.closeTimeout) {
                window.clearTimeout(this.closeTimeout);
                this.closeTimeout = null;
            }

            if (!this.openTimeout) {
                this.openTimeout = window.setTimeout(() => {
                    this.open = true;
                    // Don't override the reason if it's already set.
                    this.openReason = reason;
                    this.openTimeout = null;
                }, reason === 'focus' ? 0 : this.options.openDelay);
            }
        },
        closeTooltip(isBlur?: boolean) {
            if (this.openTimeout) {
                window.clearTimeout(this.openTimeout);
                this.openTimeout = null;
            }

            if (isBlur && this.isMouseInTooltipArea) {
                // Normally when blurring the trigger, we want to close the tooltip.
                // The exception is when the mouse is still in the tooltip area.
                // In that case, we have to set the openReason to pointer, so that
                // it can close when the mouse leaves the tooltip area.
                this.openReason = 'pointer';
                return;
            }

            if (!this.closeTimeout) {
                this.closeTimeout = window.setTimeout(() => {
                    this.open = false;
                    this.openReason = null;
                    if (isBlur) this.clickedTrigger = false;
                    this.closeTimeout = null;
                }, this.options.closeDelay);
            }

            
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
            ['@pointerenter'](e: PointerEvent) {
                this.isPointerInsideTrigger = true;
                if (isTouch(e)) return;
                this.openTooltip('pointer');
            },
            ['@pointerleave'](e: PointerEvent) {
                this.isPointerInsideTrigger = false;
                if (isTouch(e)) return;
                if (this.openTimeout) {
                    window.clearTimeout(this.openTimeout);
                    this.openTimeout = null;
                }
            },
            ['@pointerdown']() {
                // this.open = !this.open;
                // this.closeTooltip();
                this.open = false;
                this.clickedTrigger = true;
                if (this.openTimeout) {
                    window.clearTimeout(this.openTimeout);
                    this.openTimeout = null;
                }
            },
            ['@mousemove.document'](e: PointerEvent) {
                const polygon = makeHullFromElements([this.$refs.trigger, this.$refs.content]);
                this.isMouseInTooltipArea = this.isPointerInsideTrigger || this.isPointerInsideContent || isPointerInGraceArea(e, polygon);

                if (this.openReason !== 'pointer') return;

                if (!this.isMouseInTooltipArea) {
                    this.closeTooltip();
                }
            },
            ['@focus']() {
                if (this.clickedTrigger) return;
                this.openTooltip('focus');
            },
            ['@blur']() {
                this.closeTooltip(true);
            },
            [':aria-described-by']() {
                return this.$refs.content.id;
            },
            ['@keydown.escape']() {
                this.closeTooltip();
            },
            [':type']() {
                return 'button';
            },
            [':tabindex']() {
                return '0';
            },
        },
        contentProps: {
            ['@pointerdown']() {
                this.openTooltip('pointer');
            },
            ['@pointerenter']() {
                this.isPointerInsideContent = true;
            },
            ['@pointerleave']() {
                this.isPointerInsideContent = false;
            },
            ['x-show']() {
                return this.open;
            },
            ['x-transition']() {
                return '';
            },
            [':role']() {
                return 'tooltip';
            },
            [':tabindex']() {
                return '-1';
            },
        },
    }
});