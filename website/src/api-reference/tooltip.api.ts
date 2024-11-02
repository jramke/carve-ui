import type { APISchema } from "./schema";
import type { TooltipOptions } from "carve-ui";

import { createBooleanProp, createEnumProp, createNumberProp, createFunctionProp, createObjectProp } from "./schema";

export const tooltipSchema: APISchema<TooltipOptions> = {
    title: "tooltip",
    type: "x-data",
    description: "The root component containing the state and functionality.",
    props: {
        open: createBooleanProp("The open state of the tooltip", false),
        openDelay: createNumberProp("Delay in milliseconds before showing the tooltip on hover", 500),
        closeDelay: createNumberProp("Delay in milliseconds before hiding the tooltip", 0),
        placement: createEnumProp("Preferred placement of the tooltip relative to the trigger element", ["top", "right", "bottom", "left"], "top"),
        offset: createNumberProp("Distance in pixels between tooltip and trigger", 10),
        flip: createBooleanProp("Wether the tooltip should flip when not enough space is available", true),
        shift: createObjectProp("Shifts tooltip position for view optimization", { padding: 10 }),
        arrow: createBooleanProp('Display an arrow pointing to the trigger. Needs an element with `x-ref="arrow"` inside the content element.`', true),
        onOpenChange: createFunctionProp("Callback when tooltip open state changes", null),
    }
};
