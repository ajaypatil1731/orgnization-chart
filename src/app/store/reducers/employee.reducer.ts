import { createReducer, on } from "@ngrx/store";
import { Employee } from "../../models/employee.model";
import { employeeAction } from "../actions/empolyee.action";

// Initial state for the employee feature
const initialState: Employee[] = [];

//Reducer to handle actions related to employees.
export const employeeReducer = createReducer(
  initialState, 
   
  //When the `loadEmployeesSuccess` action is triggered
  on(employeeAction.loadEmployeesSuccess, (state, action) => {
    return action.payload;
  }),

  //When the `loadEmployeesFailure` action is triggered
  on(employeeAction.loadEmployeesFailure, (state, action) => {
    return [];
  }),

  //When the `add` action is triggered, a new employee is added to the state.
  on(employeeAction.add, (state, action) => {
    return [...state, action.payload];  // Append the new employee to the state.
  }),

  //When the `update` action is triggered, an existing employee's data is updated.
  on(employeeAction.update, (state, action) => {
    return state.map((item: Employee) => {
      if (item.id === action.payload.id) {
        // Update the employee's data
        return { ...item, ...action.payload };
      } else if (item.parentId === action.payload.id) {
        // Update the manager name for all reportees (children)
        return { ...item, manager: action.payload.name };
      }
      return item;
    });
  }),

  //When the `changeReporteeManager` action is triggered, the manager of a reportee is updated. 
  //The new manager is assigned based on the `parentId` from the payload.
  on(employeeAction.changeReporteeManager, (state, action) => {
    let newManager = state.find((item: Employee) => item.id === action.payload.parentId);
    return state.map((item: Employee) => {
      return item.id === action.payload.id
        ? { ...item, ...action.payload, manager: newManager!.name } // Update the reportee's manager name.
        : item;
    });
  }),

  //When the `delete` action is triggered
  on(employeeAction.delete, (state, action) => {
    // Find all children (reportees) of the employee to be deleted
    let children = state.filter(item => item.parentId === action.payload.id).map(item => item.id);
    state = state.map(item => {
      return children.indexOf(item.id) !== -1
        ? { ...item, parentId: action.payload.parentId, manager: action.payload.manager } // Reassign manager for children
        : item;
    });
    // Return the state with the employee removed and their reportees reassigned
    return state.filter(item => item.id !== action.payload.id);
  })
);
