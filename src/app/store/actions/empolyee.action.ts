import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Employee } from "../../models/employee.model";

export const employeeAction = createActionGroup({
    source: 'Employee API',
    events: {
        'Load Employees': emptyProps(),
        'Load Employees Success': props<{payload: Employee[]}>(),
        'Load Employees Failure': emptyProps(),
        'Add': props<{payload: Employee}>(),
        'Update': props<{payload: Employee}>(),
        'Change Reportee Manager': props<{payload: Employee}>(),
        'Delete':  props<{payload: Employee}>()
    }
})