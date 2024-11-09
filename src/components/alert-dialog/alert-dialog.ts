import { BaseDialog, type BaseDialogInternalOptions } from "src/internal/base/dialog";
import { AlertDialogOptions } from "./types";


export const AlertDialog = (userOptions: Partial<AlertDialogOptions> = {}) => {
    const internalOptions: BaseDialogInternalOptions = {
        role: 'alertdialog',
        // closeButton: false,
        backdropClickClose: false,
    };

    return BaseDialog({ internalOptions, userOptions });
};