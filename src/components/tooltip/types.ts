import { FloatingUiOptions } from "src/internal/base/floating";

export type TooltipOptions = {
    open: boolean;
    openDelay: number;
    closeDelay: number;
    onOpenChange: ((open: boolean) => void) | null;
} & FloatingUiOptions;

// export type TooltipOptions = {
// 	/**
// 	 * Controls whether the tooltip is currently visible
// 	 * @default {false}
// 	 */
// 	open: boolean;

// 	/**
// 	 * Delay in milliseconds before showing the tooltip
// 	 * @default {500}
// 	 */
// 	openDelay: number;

// 	/**
// 	 * Delay in milliseconds before hiding the tooltip
// 	 * @default {0}
// 	 */
// 	closeDelay: number;

// 	/**
// 	 * Preferred placement of the tooltip relative to the trigger element
// 	 * @default {'top'}
// 	 */
// 	placement: 'top' | 'right' | 'bottom' | 'left';

// 	/**
// 	 * Distance in pixels between the tooltip and the trigger element
// 	 * @default {10}
// 	 */
// 	offset: number;

// 	/**
// 	 * Whether the tooltip should flip to the opposite side when there's not enough space
// 	 * @default {true}
// 	 */
// 	flip: boolean;

// 	/**
// 	 * Configuration for shifting the tooltip along its axis to stay in view
// 	 * @default {{ padding: 10 }}
// 	 */
// 	shift: { padding: number };

// 	/**
// 	 * Whether to show the arrow pointing to the trigger element
// 	 * @default {true}
// 	 */
// 	arrow: boolean;

// 	/**
// 	 * Callback function triggered when the tooltip's open state changes
// 	 * @default {null}
// 	 */
// 	onOpenChange: ((open: boolean) => void) | null;
// }

export type OpenReason = 'pointer' | 'focus';