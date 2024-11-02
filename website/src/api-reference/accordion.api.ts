import type { APISchema } from "./schema";
import type { AccordionItemOptions, AccordionOptions } from "carve-ui";

import { createBooleanProp, createFunctionProp } from "./schema";

export const accordionSchema: APISchema<AccordionOptions> = {
    title: "accordion",
    type: "x-data",
    description: "The root component containing the state and functionality.",
    props: {
        onActiveAccordionChange: createFunctionProp("Callback when active accordion changes", null),
    }
};

export const accordionItemSchema: APISchema<AccordionItemOptions> = {
    title: "accordionItem",
    type: "x-data",
    description: "A single accordion item.",
    props: {
        initialOpen: createBooleanProp("The initial open state of the accordion item", false),
    }
};