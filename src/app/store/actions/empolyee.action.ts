import { createAction, props } from "@ngrx/store";
import { Employee } from "../../models/employee.model";

export const addEmployee = createAction(
    '[Employee] Add',
    props<{payload: Employee}>()
);

export const updateEmployee = createAction(
    '[Employee] Update',
    props<{payload: Employee}>()
);

export const changeReporteeManager = createAction(
    '[Employee] Change Reportee Manager',
    props<{payload: Employee}>()
);

export const deleteEmployee = createAction(
    '[Employee] Delete',
    props<{payload: Employee}>()
);