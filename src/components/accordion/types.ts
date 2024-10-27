export type AccordionOptions = {
    onActiveAccordionChange: ((activeAccordion: string) => void) | null;
};

export type AccordionItemOptions = {
    initialOpen: boolean;
};