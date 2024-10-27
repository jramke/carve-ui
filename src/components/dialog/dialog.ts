import { BaseDialog, BaseDialogOptions, type BaseDialogInternalOptions } from "src/internal/base/dialog";


export const Dialog = (userOptions: Partial<BaseDialogOptions> = {}) => {
    const internalOptions: BaseDialogInternalOptions = {
        role: 'dialog',
        // closeButton: true,
        backdropClickClose: true,
    };

    return BaseDialog({ internalOptions, userOptions });
};