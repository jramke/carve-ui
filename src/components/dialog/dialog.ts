import { BaseDialog, type BaseDialogInternalOptions } from "src/internal/base/dialog";
import { DialogOptions } from "./types";


export const Dialog = (userOptions: Partial<DialogOptions> = {}) => {
    const internalOptions: BaseDialogInternalOptions = {
        role: 'dialog',
        // closeButton: true,
        backdropClickClose: true,
    };

    return BaseDialog({ internalOptions, userOptions });
};