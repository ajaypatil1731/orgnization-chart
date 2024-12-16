import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Designation } from "../../models/designation.model";

export const designationAction = createActionGroup({
    source: 'Designation API',
    events: {
        'Load Designation': emptyProps(),
        'Load Designations Success': props<{payload: Designation[]}>(),
        'Load Designations Failure': emptyProps()
    }
})