import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Employee } from "../../models/employee.model";

export const allEmployees = createFeatureSelector<Employee[]>('employee');

export const getManagerForEmployee = (employee: Employee) => createSelector(
    allEmployees,
    (state) => {
        let childrenIds = findAllChildren(employee.id, state).map(item => item.id);
        return state.filter((item: Employee) =>
            item.id !== employee.id && // Exclude the employee itself
            item.id !== employee.parentId && // Exclude the current manager
            childrenIds.indexOf(item.id) === -1 // Exclude employees who are reportees
        );
    }
);

export const getAllReportee = (id: string) => createSelector(
    allEmployees, 
    (state) => {
        let childrenIds = findAllChildren(id, state).map(item => item.id);
        return state.filter(item=> item.id === id || childrenIds.indexOf(item.id) !== -1)
    }
);

//Recursively finds all direct and indirect children (reportees) for a given manager.
 
function findAllChildren(managerId: string, employees: Employee[]): any[] {
  // Get all direct children (employees whose parentId matches the managerId)
  const directChildren = employees.filter((employee: Employee) => employee.parentId === managerId);
  let allChildren = [...directChildren];
  // For each direct child, find their children recursively and add to the list
  directChildren.forEach((child: Employee) => {
    const recursiveChildren = findAllChildren(child.id, employees);
    allChildren = [...allChildren, ...recursiveChildren];
  });  
  return allChildren;
}