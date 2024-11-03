import { FloatingUiOptions } from "src/internal/base/floating";

export type TooltipOptions = {
    open: boolean;
    openDelay: number;
    closeDelay: number;
    onOpenChange: ((open: boolean) => void) | null;
} & FloatingUiOptions;

export type OpenReason = 'pointer' | 'focus';