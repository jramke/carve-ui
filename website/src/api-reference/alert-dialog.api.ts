import type { APISchema } from "./schema";
import type { AlertDialogOptions } from "carve-ui";

import { createBooleanProp, createFunctionProp } from "./schema";

export const alertDialogSchema: APISchema<AlertDialogOptions> = {
    title: "alertDialog",
    type: "x-data",
    description: "The root component containing the state and functionality.",
    props: {
        open: createBooleanProp("The open state of the dialog", false),
        onOpenChange: createFunctionProp("Callback when the open state changes", null),
    }
};