import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Employee } from "../../models/employee.model";

export const allEmployees = createFeatureSelector<Employee[]>('employee');

export const getManagerForEmployee = (employee: Employee)=> createSelector(
    allEmployees,
    (state)=> {
        let childrenIds = findAllChildren(employee.id, state).map(item=> item.id);
        return state.filter((item: Employee)=> item.id !== employee.id && item.id !== employee.parentId && childrenIds.indexOf(item.id) === -1)
    }
)

export const getAllReportee = (id: string) => createSelector(
  allEmployees, 
  (state)=> {
    let childrenIds = findAllChildren(id, state).map(item=> item.id);
    let data: Employee[] = [];
    state.map((item: Employee)=> {
      if(id === item.id) {
        data.unshift(item);
      } else if(childrenIds.indexOf(item.id) !== -1) {
        data.push(item);
      }
    })
    return data;
  }
)

function findAllChildren(managerId: string, employees: Employee[]): any[] {
  const directChildren = employees.filter((employee: Employee) => employee.parentId === managerId);
  let allChildren = [...directChildren];
  directChildren.forEach((child: Employee) => {
    const recursiveChildren = findAllChildren(child.id, employees);
    allChildren = [...allChildren, ...recursiveChildren];
  });
  return allChildren;
}