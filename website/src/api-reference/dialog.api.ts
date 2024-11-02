import type { APISchema } from "./schema";
import type { DialogOptions } from "carve-ui";

import { createBooleanProp, createFunctionProp } from "./schema";

export const dialogSchema: APISchema<DialogOptions> = {
    title: "dialog",
    type: "x-data",
    description: "The root component containing the state and functionality.",
    props: {
        open: createBooleanProp("The open state of the dialog", false),
        onOpenChange: createFunctionProp("Callback when the open state changes", null),
    }
};