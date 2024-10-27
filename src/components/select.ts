import { defineComponent } from "src/internal/helpers/alpine";

export type SelectOptions = {
    onSelectedOptionChange: ((selectedOption: string) => void) | null;
    initialSelected: string;
};

export const Select = defineComponent((userOptions: Partial<SelectOptions> = {}) => {

    return {
        
    };
});