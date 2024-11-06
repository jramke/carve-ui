import Collapse from '@alpinejs/collapse';
import Focus from '@alpinejs/focus';
import Resize from '@alpinejs/resize';

import { Accordion, AccordionItem } from './accordion';
import { Popover } from './popover';
import { Dialog } from './dialog';
import { AlertDialog } from './alert-dialog';
import { Tooltip } from './tooltip';
import { Tabs, TabContent, TabTrigger } from './tabs';
import { Select, SelectItem } from './select';

// Export all types for direct usage
export * from './types';

// Export all components for direct usage
export {
    Accordion,
    AccordionItem,

    Popover,

    Dialog,

    AlertDialog,

    // DropdownMenu,

    Tooltip,

    Tabs,
    TabContent,
    TabTrigger,

    Select,
    SelectItem,
};

// Component registry for registration system
export const components = {
    accordion: { name: 'accordion', component: Accordion },
    accordionItem: { name: 'accordionItem', component: AccordionItem },

    popover: { name: 'popover', component: Popover },

    dialog: { name: 'dialog', component: Dialog },

    alertDialog: { name: 'alertDialog', component: AlertDialog },

    tooltip: { name: 'tooltip', component: Tooltip },

    tabs: { name: 'tabs', component: Tabs },
    tabContent: { name: 'tabContent', component: TabContent },
    tabTrigger: { name: 'tabTrigger', component: TabTrigger },

    select: { name: 'select', component: Select },
    selectItem: { name: 'selectItem', component: SelectItem },
} as const;

// Plugin registry
export const plugins = [Collapse, Focus, Resize];

export type ComponentKey = keyof typeof components;