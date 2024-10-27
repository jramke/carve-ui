import { computePosition, autoUpdate, offset, flip, shift, arrow } from "@floating-ui/dom";
import { defineComponent } from "../helpers/alpine";

export type FloatingUiOptions = {
    placement: 'top' | 'right' | 'bottom' | 'left';
    offset: number;
    flip: boolean;
    shift: { padding: number };
    arrow: boolean;
};

export const floatingUiMethods = defineComponent((options: FloatingUiOptions) => {
    return {
        initContent() {
            Object.assign(this.$refs.content.style, {
                position: 'absolute',
                zIndex: 1,
                left: 0,
                top: 0,
                width: 'max-content',
            });
        },
        initArrow() {
            if (options.arrow === false) {
                this.$refs?.arrow?.remove();
                return;
            }

            if (!this.$refs.arrow) return;

            Object.assign(this.$refs.arrow.style, {
                position: 'absolute',
            });
        },
        cleanup: null as (() => void) | null,
        setupAutoUpdate() {
            this.cleanup = autoUpdate(this.$refs.trigger, this.$refs.content, this.update.bind(this));
        },
        update() {
            computePosition(this.$refs.trigger, this.$refs.content, {
                placement: options.placement,
                middleware: [
                    options.offset ? offset(options.offset) : null,
                    options.flip ? flip() : null,
                    options.shift ? shift(options.shift) : null,
                    options.arrow && this.$refs.arrow ? arrow({ element: this.$refs.arrow }) : null,
                ]
            }).then(this.updatePosition.bind(this));
        },
        updatePosition({ x, y, placement, middlewareData }) {
            Object.assign(this.$refs.content.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

            this.updateArrowPosition(placement, middlewareData.arrow);
        },
        updateArrowPosition(placement: any, arrowData: any) {
            if (!this.$refs.arrow || !arrowData) return;
    
            const { x: arrowX, y: arrowY } = arrowData;
            const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right',
            }[placement.split('-')[0]];
            
            const arrowBorderStyles = {
                top: {
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderTop: '',
                    borderLeft: '',
                },
                right: {
                    borderBottom: 'none',
                    borderRight: '',
                    borderTop: 'none',
                    borderLeft: '',
                },
                bottom: {
                    borderBottom: '',
                    borderRight: '',
                    borderTop: 'none',
                    borderLeft: 'none',
                },
                left: {
                    borderBottom: 'none',
                    borderRight: 'none',
                    borderTop: '',
                    borderLeft: '',
                },
            }
    
            Object.assign(this.$refs.arrow.style, {
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                right: '',
                bottom: '',
                [staticSide]: 'calc(var(--arrow-size, 10px) / -2)',
                height: 'var(--arrow-size, 10px)',
                width: 'var(--arrow-size, 10px)',
                position: 'absolute',
                backgroundColor: 'inherit',
                zIndex: 'inherit',
                transform: 'rotate(45deg)',
                ...arrowBorderStyles[staticSide],
            });
        },
    };
});