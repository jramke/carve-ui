import { FloatingUiOptions } from "src/internal/base/floating";

export type PopoverOptions = {
    open: boolean;
    onOpenChange: ((open: boolean) => void) | null;
} & FloatingUiOptions;