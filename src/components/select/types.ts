import { FloatingUiOptions } from "src/internal/base/floating";

export type SelectOptions = {
    onValueChange: ((value: string) => void) | null;
    onOpenChange: ((open: boolean) => void) | null;
    value: string;
    open: boolean;
    label: string;
}  & FloatingUiOptions;

export type SelectItemOptions = {
    value: string;
    label: string;
    disabled?: boolean;
};