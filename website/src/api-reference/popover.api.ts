import type { APISchema } from "./schema";
import type { PopoverOptions } from "carve-ui";

import { createBooleanProp, createEnumProp, createNumberProp, createFunctionProp, createObjectProp } from "./schema";

export const popoverSchema: APISchema<PopoverOptions> = {
    title: "popover",
    type: "x-data",
    description: "The root component containing the state and functionality.",
    props: {
        open: createBooleanProp("The open state of the popover", false),
        placement: createEnumProp("Preferred placement of the popover relative to the trigger element", ["top", "right", "bottom", "left"], "bottom"),
        offset: createNumberProp("Distance in pixels between popover and trigger", 10),
        flip: createBooleanProp("Wether the popover should flip when not enough space is available", true),
        shift: createObjectProp("Shifts popover position for view optimization", { padding: 10 }),
        arrow: createBooleanProp('Display an arrow pointing to the trigger. Needs an element with `x-ref="arrow"` inside the content element.`', true),
        onOpenChange: createFunctionProp("Callback when popover open state changes", null),
    }
};
