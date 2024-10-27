import { BaseDialog, BaseDialogOptions, type BaseDialogInternalOptions } from "src/internal/base/dialog";


export const AlertDialog = (userOptions: Partial<BaseDialogOptions> = {}) => {
    const internalOptions: BaseDialogInternalOptions = {
        role: 'alertdialog',
        // closeButton: false,
        backdropClickClose: false,
    };

    return BaseDialog({ internalOptions, userOptions });
};