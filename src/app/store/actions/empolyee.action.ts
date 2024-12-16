import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Employee } from "../../models/employee.model";

export const employeeAction = createActionGroup({
    source: 'Employee API',
    events: {
        'Load Employees': emptyProps(), //Action triggered to load the list of employees.
        'Load Employees Success': props<{ payload: Employee[] }>(), //Action triggered when the list of employees is successfully loaded.
        'Load Employees Failure': emptyProps(), //Action triggered when an error occurs while loading employees.
        'Add': props<{ payload: Employee }>(), //Action triggered to add a new employee.
        'Update': props<{ payload: Employee }>(), //Action triggered to update an existing employee.
        'Change Reportee Manager': props<{ payload: Employee }>(), //Action triggered to change the reportee's manager.
        'Delete': props<{ payload: Employee }>() //Action triggered to delete an employee.
    }
})
