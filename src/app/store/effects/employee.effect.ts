import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { employeeAction } from '../actions/empolyee.action';
import { EmployeeService } from './../../services/employee.service';

@Injectable()
export class EmployeeEffects {

  //listens for the 'Load Employees' action and triggers an HTTP request to fetch employee data.
  loadEmployees$ = createEffect(() => this.actions$.pipe(
    ofType(employeeAction.loadEmployees),  // Listen for the action to load employees
    exhaustMap(() => this.employeeService.getAllEmployees()  // Make an HTTP request to fetch employee data
      .pipe(
        map((data: any) => (employeeAction.loadEmployeesSuccess({payload: data}))),  // Dispatch success action with data
        catchError(() => of(employeeAction.loadEmployeesFailure()))  // Dispatch failure action on error
      ))
    )
  );
  
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}