import { createReducer, on } from "@ngrx/store";
import { Employee } from "../../models/employee.model";
import { employeeAction } from "../actions/empolyee.action";

const initialState: Employee[] = [];

export const employeeReducer = createReducer(
  initialState,
  // Listen for all employee load success action 
  on(employeeAction.loadEmployeesSuccess, (state, action) => {
    return action.payload;
  }),
  // Listen for all employee load failure action
  on(employeeAction.loadEmployeesFailure, (state, action) => {
    return [];
  }),
  // Listen for new employee add action
  on(employeeAction.add, (state, action) => {
    return [...state, action.payload];
  }),
  // Listen for update employee action
  on(employeeAction.update, (state, action) => {
    return state.map((item: Employee) => {
      if(item.id === action.payload.id) {
        return { ...item, ...action.payload };
      } else if(item.parentId === action.payload.id) { // If change in name then update all reportees manager name
        return { ...item, manager: action.payload.name };
      }
      return item;
    });
  }),
  // Listen for change reporting manager action
  on(employeeAction.changeReporteeManager, (state, action) => {
    let newManager = state.find((item: Employee)=> item.id === action.payload.parentId);
    return state.map((item: Employee)=> {
      return item.id === action.payload.id ? {...item, ...action.payload, ...{manager: newManager!.name}} : item;
    });
  }),
  // Listen for employee delete action
  on(employeeAction.delete, (state, action) => {
    let children = state.filter(item=> item.parentId === action.payload.id).map(item=> item.id);
    state = state.map(item=> {
      return  children.indexOf(item.id) !== -1 ? {...item, parentId: action.payload.parentId, manager: action.payload.manager } : item;
    });
    return state.filter(item=> item.id !== action.payload.id)
  })
);
