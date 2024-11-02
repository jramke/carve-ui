import type { APISchema } from "./schema";
import type { TabsOptions, TabTriggerOptions } from "carve-ui";

import { createEnumProp, createFunctionProp, createStringProp } from "./schema";

export const tabsSchema: APISchema<TabsOptions> = {
    title: "tabs",
    type: "x-data",
    description: "The root component containing the state and functionality.",
    props: {
        initialActive: createStringProp("The initial active tab value", ""),
        orientation: createEnumProp("The orientation of the tabs. Used for the arrow key control and aria-attribute", ["horizontal", "vertical"], "horizontal"),
        label: createStringProp('The label for the tabs component. The tablist element should have an aria-label. Alternatively you can add an element with `x-ref="label"` wich will be used for aria-labelledby.', ""),
        urlSync: createEnumProp("The method for syncing the active tab with the URL, either via search parameters or hash.", ["hash", "search", "*false*"], "false"),
        onActiveTabChange: createFunctionProp("A callback function that is called when the active tab changes", null),
    }
};

export const tabTriggerSchema: APISchema<Record<string, TabTriggerOptions>> = {
    title: "tabTrigger",
    type: "x-data",
    description: "A trigger element for a tab.",
    props: {
        value: createStringProp("The unique value of the tab trigger to link it with a content slide", ""),
    }
};

export const tabContentSchema: APISchema<Record<string, TabTriggerOptions>> = {
    title: "tabContent",
    type: "x-data",
    description: "A content element for a tab.",
    props: {
        value: createStringProp("The unique value of the tab content to link it with a trigger", ""),
    }
};