export type SelectOptions = {
    onSelectedOptionChange: ((selectedOption: string) => void) | null;
    initialSelected: string;
};