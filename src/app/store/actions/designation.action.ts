import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Designation } from "../../models/designation.model";

export const designationAction = createActionGroup({
    source: 'Designation API',
    
    events: {
        'Load Designation': emptyProps(),  //Action triggered to initiate loading of designations.
        'Load Designations Success': props<{ payload: Designation[] }>(), //Action triggered when the list of designations is successfully loaded.
        'Load Designations Failure': emptyProps()  //Action triggered when an error occurs while loading designations.
    }
})