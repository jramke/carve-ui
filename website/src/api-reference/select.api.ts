import type { APISchema } from "./schema";
import type { SelectOptions, SelectItemOptions } from "carve-ui";

import { createEnumProp, createFunctionProp, createObjectProp, createBooleanProp, createStringProp, createNumberProp } from "./schema";

export const selectSchema: APISchema<SelectOptions> = {
    title: "select",
    type: "x-data",
    description: "The root component containing the state and functionality.",
    props: {
        value: createStringProp("The currently selected value. This can also used to set a default value.", ""),
        open: createBooleanProp("Whether the select list is open or not.", false),
        label: createStringProp('The label for the select component wich sets the aria-label. Alternatively you can add an element with `x-ref="label` wich will be used for aria-labelledby.', ""),
        placement: createEnumProp("Preferred placement of the select list relative to the trigger element", ["top", "right", "bottom", "left"], "bottom"),
        offset: createNumberProp("Distance in pixels between select list and trigger", 10),
        flip: createBooleanProp("Wether the select list should flip when not enough space is available", true),
        shift: createObjectProp("Shifts select list position for view optimization", { padding: 10 }),
        arrow: createBooleanProp('Display an arrow pointing to the trigger. Needs an element with `x-ref="arrow"` inside the content element.`', true),
        onOpenChange: createFunctionProp("Callback when select open state changes", null),
        onValueChange: createFunctionProp("Callback when the selected value changes", null),
    }
};

export const selectItemSchema: APISchema<SelectItemOptions> = {
    title: "selectItem",
    type: "x-data",
    description: "A select item, which must be a child of the content element.",
    props: {
        value: createStringProp("The value of the item.", ""),
        label: createStringProp("The label of the item.", ""),
        disabled: createBooleanProp("Whether the item is disabled or not.", false),
    }
};