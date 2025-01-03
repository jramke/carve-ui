export type TabsOptions = {
    onActiveTabChange: ((activeTab: string) => void) | null;
    initialActive: string;
    orientation: 'horizontal' | 'vertical';
    urlSync: 'hash' | 'search' | false;
    label?: string;
};

export type TabTriggerOptions = string;

export type TabContentOptions = string;